<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(roles::class);    

        \App\Models\User::create([
            'name' => 'omar',
            'email' => 'omar@omar.com',
            'email_verified_at' => now(),
            'password' => bcrypt(123456),
            'remember_token' => \Str::random(10),
            'role_id' => \App\Models\Role::where('name', 'admin')->first()->id,        
        ]);

        \App\Models\User::factory(10)->create();
    }
}
