<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Hotel
 *
 * @property $id
 * @property $empresaId
 * @property $nombre
 * @property $direccion
 * @property $telefonoContacto
 * @property $personaContacto
 * @property $imagen
 *
 * @property Empresa $empresa
 * @property Habitacion[] $habitaciones
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Hotel extends Model
{
    protected $table = "hoteles";
    protected $primaryKey = 'id';
    static $rules = [
		'empresaId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['empresaId','nombre','direccion','telefonoContacto','personaContacto','imagen'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function empresa()
    {
        return $this->hasOne('App\Models\Empresa', 'id', 'empresaId');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function habitaciones()
    {
        return $this->hasMany('App\Models\Habitacion', 'hotelId', 'id');
    }
    

}
