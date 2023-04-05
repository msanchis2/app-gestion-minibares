<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class UsuarioHotel
 *
 * @property $id
 * @property $userId
 * @property $hotelId
 * @property $hotelNombre
 * @property Hotel $hotel
 * @property User $user
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class UsuarioHotel extends Model
{
    protected $table = "usuarios_hoteles";
    static $rules = [
		'userId' => 'required',
		'hotelId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['userId','hotelId','hotelNombre', 'hotel_defecto_sn'];


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
    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'userId');
    }
    

}
