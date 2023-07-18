<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class roles extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       \App\Models\Role::create([
            'name' => 'admin',
            'add' => true,
            'edit' => true,
            'delete' => true,
            'view' => true,
       ]);

        \App\Models\Role::create([
            'name' => 'writer',
            'add' => true,
            'edit' => true,
            'delete' => false,
            'view' => true,
        ]);

        \App\Models\Role::create([
            'name' => 'reader',
            'add' => false,
            'edit' => false,
            'delete' => false,
            'view' => true,
        ]);


    }
}
