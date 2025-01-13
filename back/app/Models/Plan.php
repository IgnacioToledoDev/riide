<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    protected $table = 'plans';
    protected $fillable = [
        'name',
        'description',
        'storage_limit',
        'bandwidth_limit',
        'ram_limit',
        'is_public',
        'is_popular',
    ];

    public function planPricing(): HasMany
    {
        return $this->hasMany(PlanPricing::class, 'plan_id');
    }
}
