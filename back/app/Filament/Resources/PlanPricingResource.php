<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PlanPricingResource\Pages;
use App\Filament\Resources\PlanPricingResource\RelationManagers;
use App\Models\Plan;
use App\Models\PlanPricing;
use App\Models\Types\BillingCycle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;

class PlanPricingResource extends Resource
{
    // todo!!! when create a monthly pricing cannot create other with the same billing cycle
    protected static ?string $model = PlanPricing::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Planes';
    protected static ?int $navigationSort = 2;
    protected static ?string $modelLabel = 'Precios de plan';
    protected static ?string $navigationLabel = 'Precios de planes';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('plan_id')
                    ->label('Plan')
                    ->placeholder('Seleccione una plan...')
                    ->relationship('plan', 'name'),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->label('Precio'),
                Select::make('billing_cycle')
                    ->options(collect(BillingCycle::cases())->mapWithKeys(fn($cycle) => [$cycle->value => $cycle->getLabel()]))
                    ->required()
                    ->placeholder('Seleccione una opcion...')
                    ->label('Forma de subcripcion al plan'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('plan.name')
                    ->label('Plan'),
                TextColumn::make('price')
                    ->label('Precio'),
                TextColumn::make('billing_cycle')
                    ->label('Subcripcion')
                    ->formatStateUsing(fn (string $state) => BillingCycle::tryFrom($state)?->getLabel() ?? $state),
            ])
            ->filters([
                SelectFilter::make('billing_cycle')
                    ->label('Filtrar por Suscripción')
                    ->options(collect(BillingCycle::cases())->mapWithKeys(fn ($cycle) => [$cycle->value => $cycle->getLabel()]))
                    ->attribute('billing_cycle'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPlanPricings::route('/'),
            'create' => Pages\CreatePlanPricing::route('/create'),
            'edit' => Pages\EditPlanPricing::route('/{record}/edit'),
        ];
    }
}
