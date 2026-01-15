<?php namespace App\Controllers;

use App\Models\SignModel;
class SignSetting extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new SignModel();    
    }

    public function getData()
    {
        $data = $this->model->getSignersByUserId(auth()->id());
        $levels = [1, 2, 3];
        $existingLevel = array_column($data, 'level');
        foreach($data as $d) {
            $d->level = (int)$d->level;
        }        

        $unusedLevels = array_values(array_diff($levels, $existingLevel));

        if(count($data) === 0){
            $data = [
                (object)[
                    'id' => null,
                    'level' => 1,
                    'name' => 'Level 1',
                    'position' => 'Penandatangan 1',
                    'user_id' => auth()->id(),
                    'created_at' => null,
                    'updated_at' => null,
                    'deleted_at' => null
                ],
                (object)[
                    'id' => null,
                    'level' => 2,
                    'name' => 'Level 2',
                    'position' => 'Penandatangan 2',
                    'user_id' => auth()->id(),
                    'created_at' => null,
                    'updated_at' => null,
                    'deleted_at' => null
                ],
                (object)[
                    'id' => null,
                    'level' => 3,
                    'name' => 'Level 3',
                    'position' => 'Penandatangan 3',
                    'user_id' => auth()->id(),
                    'created_at' => null,
                    'updated_at' => null,
                    'deleted_at' => null
                ]
            ];
        } elseif(count($data) === 1){
            $data[] = (object)[
                'id' => null,
                'level' => $unusedLevels[0],
                'name' => 'Level ' . $unusedLevels[0],
                'position' => 'Penandatangan ' . $unusedLevels[0],
                'user_id' => auth()->id(),
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null
            ];
            $data[] = (object)[
                'id' => null,
                'level' => $unusedLevels[1],
                'name' => 'Level ' . $unusedLevels[1],
                'position' => 'Penandatangan ' . $unusedLevels[1],
                'user_id' => auth()->id(),
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null
            ];
        } elseif(count($data) === 2){
            $data[] = (object)[
                'id' => null,
                'level' => $unusedLevels[0],
                'name' => 'Level ' . $unusedLevels[0],
                'position' => 'Penandatangan ' . $unusedLevels[0],
                'user_id' => auth()->id(),
                'created_at' => null,
                'updated_at' => null,
                'deleted_at' => null
            ];
        }

        usort($data, fn($a, $b) => $a->level <=> $b->level);

        return $this->response->setJSON([
            'status' => 'success',
            'data' => $data,
        ]);
    }

}