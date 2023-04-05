<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SuccessLogin
 *
 * @property $id
 * @property $userId
 * @property $usuarioNombre
 * @property $fechaCreacion
 *
 * @property User $user
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class SuccessLogin extends Model
{
    
    static $rules = [
		'userId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['userId','usuarioNombre','fechaCreacion'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'userId');
    }
    

}
