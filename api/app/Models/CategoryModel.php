<?php

namespace App\Models;

class CategoryModel extends Connector
{
    private $builder;

    public $defaultUserCategory;

    public function __construct()
    {
        parent::__construct();
        $this->builder = $this->db->table($this->kategori);
        $user = auth()->getProvider()->findByCredentials(['username' => 'default_category']);
        $this->defaultUserCategory = $user->id;
        $this->basicFilter = array_merge($this->basicFilter, ['category_type !=' => 'transfer']);
    }

    public function updateDefaultCategoryVisibility(int $value): void
    {
        $this->settingBuilder->update(['value' => $value], ['key' => 'hide_default_category']);   
    }

    public function getData(int $limit, int $offset, string $orderBy, string $sort = 'ASC', string $search = ''): array
    {
        $query = $this->search('category_name', $search);
        $hideDefault = $this->getDefaultCategorySetting();
        if($hideDefault === 1) {
            $query->where($this->basicFilter);
        } else {
            $query->where(['deleted' => 0, 'category_type !=' => 'transfer'])
            ->whereIn('user_id', [$this->defaultUserCategory, auth()->id()]);
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
        $hideDefault = $this->getDefaultCategorySetting();
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

    public function getDefaultCategorySetting(): int
    {
        return $this->settingBuilder->getWhere(['key' => 'hide_default_category'])->getResult()[0]->value;
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