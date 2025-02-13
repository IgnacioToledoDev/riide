<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PlanResource\Pages;
use App\Filament\Resources\PlanResource\RelationManagers;
use App\Models\Plan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Checkbox;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;

class PlanResource extends Resource
{
    protected static ?string $model = Plan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'Planes';
    protected static ?string $navigationGroup = 'Planes';
    protected static ? string $modelLabel = 'Plan';
    protected static ?int $navigationSort = 1;


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->label('Nombre')
                    ->placeholder('Nombre de la plan'),
                TextInput::make('storage_limit')
                    ->label('Limite de almacenamiento')
                    ->required()
                    ->numeric(),
                TextInput::make('bandwidth_limit')
                    ->label('Limite de ancho de banda')
                    ->required()
                    ->numeric(),
                TextInput::make('ram_limit')
                    ->label('Limite de RAM')
                    ->required()
                    ->numeric(),
                Checkbox::make('is_public')
                    ->label('Publicado')
                    ->default(false),
                Checkbox::make('is_popular')
                    ->label('Mas popular')
                    ->default(false),
                Textarea::make('description')
                    ->label('Descripcion')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nombre')
                    ->sortable(),
                TextColumn::make('storage_limit')
                    ->label('Limite de almacenamiento')
                    ->sortable(),
                TextColumn::make('bandwidth_limit')
                    ->label('Limite de ancho de banda')
                    ->sortable(),
                TextColumn::make('ram_limit')
                    ->label('Limite de RAM')
                    ->sortable(),
                IconColumn::make('is_public')
                    ->label('Publicado')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-badge')
                    ->falseIcon('heroicon-o-x-mark'),
                IconColumn::make('is_popular')
                    ->label('Mas popular')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-badge')
                    ->falseIcon('heroicon-o-x-mark'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Editar '),
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
            'index' => Pages\ListPlans::route('/'),
            'create' => Pages\CreatePlan::route('/create'),
            'edit' => Pages\EditPlan::route('/{record}/edit'),
        ];
    }
}
