<?php

namespace App\Interfaces;

interface PayPalSubcriptionsInterface
{
    public function create(int $plan_id, int $coupon_user_id, string $method, float $amount = 0);
    public function cancel(string $subscription_id = null);
    public function pause();
    public function resume();
}
