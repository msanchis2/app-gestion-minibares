<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Inventario
 *
 * @property $id
 * @property $productoId
 * @property $fechaCaducidad
 * @property $situacion
 * @property $habitacionId
 *
 * @property Posteo[] $posteos
 * @property Producto $producto
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Inventario extends Model
{
    protected $table = "inventarios";
    static $rules = [
		'productoId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['hotelId','productoId','usuario_posteo_id','fechaCaducidad','situacion','habitacionId','posteoSN','fecha_posteo'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posteos()
    {
        return $this->hasMany('App\Models\Posteo', 'inventarioId', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function producto()
    {
        return $this->hasOne('App\Models\Producto', 'id', 'productoId');
    }
    

}
