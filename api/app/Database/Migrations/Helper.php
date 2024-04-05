<?php namespace App\Database\Migrations;

use App\Models\Connector;

class Helper extends Connector
{
    public function fixCreatedAndModifiedField(string $table, string $type = 'TIMESTAMP'): void
    {
        $createdSql = "ALTER TABLE `{$table}` 
                CHANGE `created` `created` {$type} 
                NULL DEFAULT CURRENT_TIMESTAMP"; 

        $modifiedSql = "ALTER TABLE `{$table}` 
                CHANGE `modified` `modified` {$type} 
                on update CURRENT_TIMESTAMP NULL 
                DEFAULT CURRENT_TIMESTAMP"; 

        $this->db->simpleQuery($createdSql);
        $this->db->simpleQuery($modifiedSql);
    }
}