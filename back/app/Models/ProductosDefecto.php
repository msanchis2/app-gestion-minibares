<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProductosDefecto
 *
 * @property $id
 * @property $hotelId
 * @property $productoId
 * @property $updated_at
 * @property $created_at
 *
 * @property Hotel $hotel
 * @property Producto $producto
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class ProductosDefecto extends Model
{
    protected $table = "productos_defecto";

    static $rules = [
		'hotelId' => 'required',
		'productoId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['hotelId','productoId'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function hotel()
    {
        return $this->hasOne('App\Models\Hotel', 'id', 'hotelId');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function producto()
    {
        return $this->hasOne('App\Models\Producto', 'id', 'productoId');
    }
    

}
