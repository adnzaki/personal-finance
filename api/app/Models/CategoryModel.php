<?php

namespace App\Models;

class CategoryModel extends Connector
{
    private $builder;

    public $defaultUserCategory;

    public $defaultCategorySettingKey;

    public function __construct()
    {
        parent::__construct();
        $this->builder = $this->db->table($this->kategori);
        $user = auth()->getProvider()->findByCredentials(['username' => 'default_category']);
        $this->defaultUserCategory = $user->id;
        $this->basicFilter = array_merge($this->basicFilter, ['category_type !=' => 'transfer']);

        $this->defaultCategorySettingKey = 'hide_default_category-user_id_' . auth()->id();
    }

    public function updateDefaultCategoryVisibility(int $value): void
    {
        $defaultCategorySetting = $this->getDefaultCategorySetting()->exists;
        if(!$defaultCategorySetting) {
            $this->settingBuilder->insert(['key' => $this->defaultCategorySettingKey, 'value' => $value]);
        } else {
            $this->settingBuilder->update(['value' => $value], ['key' => $this->defaultCategorySettingKey]);   
        }
    }

    public function getDetail(int $id)
    {
        return $this->builder->getWhere(['id' => $id])->getResult()[0];
    }

    public function getData(int $limit, int $offset, string $search = '', ?string $categoryType = null): array
    {
        $query = $this->search('category_name', $search);
        $hideDefault = $this->getDefaultCategorySetting()->value;
        if($hideDefault === 1) {
            $query->where($this->basicFilter);
        } else {
            $query->where(['deleted' => 0, 'category_type !=' => 'transfer'])
            ->whereIn('user_id', [$this->defaultUserCategory, auth()->id()]);
        }

        if($categoryType !== null) {
            $query->where(['category_type' => $categoryType]);
        }
        
        $userOrder = $this->defaultUserCategory > auth()->id() ? 'ASC' : 'DESC';
        return $query->limit($limit, $offset)
                     ->orderBy('user_id', $userOrder)
                     ->orderBy("FIELD(category_type, 'income', 'expense')", '', false)
                     ->get()->getResult();
    }

    public function getTotalRows(string $search = ''): int
    {
        $query = $this->search('category_name', $search);
        $hideDefault = $this->getDefaultCategorySetting()->value;
        if ($hideDefault === 1) {
            $query->where($this->basicFilter);
        } else {
            $query->where(['deleted' => 0, 'category_type !=' => 'transfer'])
                  ->whereIn('user_id', [$this->defaultUserCategory, auth()->id()]);
        }

        return $query->countAllResults();
    }

    public function insert(array $data): int
    {
        $this->builder->insert($data);

        return $this->db->insertID();
    }

    public function update(array $data, int $id): void
    {
        $this->builder->update($data, ['id' => $id]);
    }

    public function delete(int $id): bool
    {
        return $this->builder->update(['deleted' => 1], ['id' => $id]);
    }

    public function getDefaultCategorySetting(): object
    {
        $query = $this->settingBuilder->getWhere(['key' => $this->defaultCategorySettingKey]);
        if($query->getNumRows() > 0) {
            return (object)[
                'exists' => true,
                'value' => (int)$query->getResult()[0]->value
            ];
        } else {
            return (object)[
                'exists' => false,
                'value' => 1
            ];
        }
    }

    private function search(string $searchBy, string $search)
    {
        $select = $this->builder->select('id, user_id, category_name, category_type');
        if (! empty($search)) {
            $select->like($searchBy, $search);
        }

        return $select;
    }
}