<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Posteo
 *
 * @property $id
 * @property $inventarioId
 * @property $tipoId
 * @property $fecha
 *
 * @property Inventario $inventario
 * @property TiposPosteo $tiposPosteo
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Posteo extends Model
{
    
    static $rules = [
		'inventarioId' => 'required',
		'tipoId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['inventarioId','tipoId','fecha'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function inventario()
    {
        return $this->hasOne('App\Models\Inventario', 'id', 'inventarioId');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function tiposPosteo()
    {
        return $this->hasOne('App\Models\TiposPosteo', 'id', 'tipoId');
    }
    

}
