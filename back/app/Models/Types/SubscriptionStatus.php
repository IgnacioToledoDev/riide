<?php

namespace App\Models\Types;

enum SubscriptionStatus: string
{
    case ACTIVE = 'active';
    case PENDING = 'pending';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Activo',
            self::PENDING => 'Pendiente',
            self::CANCELLED => 'Cancelado',
        };
    }
}
