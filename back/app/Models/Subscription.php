<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;

class Subscription extends Model
{
    protected $fillable = [
        'user_id',
        'plan_id',
        'status',
        'paypal_subscription_id',
        'start_date',
        'end_date',
        'last_payment_date',
        'next_payment_date',
        'cancelled_at',
    ];

    public function user(): belongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): belongsTo
    {
        return $this->belongsTo(Plan::class);
    }
}
