<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Habitacion
 *
 * @property $id
 * @property $hotelId
 * @property $nombre
 * @property $imagen
 *
 * @property Hotel $hotel
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Habitacion extends Model
{
    protected $table = "habitaciones";
    static $rules = [
		'hotelId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['hotelId','nombre','imagen'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function hotel()
    {
        return $this->hasOne('App\Models\Hotel', 'id', 'hotelId');
    }
    

}
