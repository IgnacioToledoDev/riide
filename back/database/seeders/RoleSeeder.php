<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'role_admin', 'guard_name' => 'api', 'web']);
        Role::create(['name' => 'role_user', 'guard_name' => 'api', 'web']);
    }
}
