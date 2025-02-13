<?php

namespace App\Models\Types;

enum BillingCycle: string
{
    case MONTHLY = 'monthly';
    case YEARLY = 'yearly';

    public function getLabel(): string
    {
        return match ($this) {
            self::MONTHLY => 'Mensual',
            self::YEARLY => 'Anual',
        };
    }
}
