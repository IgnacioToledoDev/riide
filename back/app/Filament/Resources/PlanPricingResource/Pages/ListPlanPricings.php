<?php

namespace App\Filament\Resources\PlanPricingResource\Pages;

use App\Filament\Resources\PlanPricingResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPlanPricings extends ListRecords
{
    protected static string $resource = PlanPricingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
