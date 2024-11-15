<?php namespace App\Database\Migrations;

class Helper
{
    public function fixCreatedAndModifiedField(string $table, string $type = 'TIMESTAMP'): void
    {
        $db = db_connect();
        $createdSql = "ALTER TABLE `{$table}` 
                CHANGE `created` `created` {$type} 
                NULL DEFAULT CURRENT_TIMESTAMP"; 

        $modifiedSql = "ALTER TABLE `{$table}` 
                CHANGE `modified` `modified` {$type} 
                on update CURRENT_TIMESTAMP NULL 
                DEFAULT CURRENT_TIMESTAMP"; 

        $db->simpleQuery($createdSql);
        $db->simpleQuery($modifiedSql);
    }
}