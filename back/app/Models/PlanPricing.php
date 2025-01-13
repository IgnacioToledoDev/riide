<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlanPricing extends Model
{
    protected $table = 'plan_pricing';

    public const MONTHLY = 'monthly';
    public const YEARLY = 'yearly';
    public const billingCycle = [
        self::MONTHLY,
        self::YEARLY
    ];

    protected $fillable = [
        'plan_id',
        'price',
        'billing_cycle'
    ];

    public function plan(): belongsTo
    {
        return $this->belongsTo(Plan::class);
    }
}
