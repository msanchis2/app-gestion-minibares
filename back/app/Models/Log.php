<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Log
 *
 * @property $id
 * @property $fechaCreacion
 * @property $mensage
 * @property $proceso
 * @property $accion
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Log extends Model
{
    
    static $rules = [
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['fechaCreacion','mensage','proceso','accion'];



}
