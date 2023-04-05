<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ResetPassword
 *
 * @property $id
 * @property $userId
 * @property $fechaCreacion
 *
 * @property User $user
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class ResetPassword extends Model
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
    protected $fillable = ['userId','fechaCreacion'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'userId');
    }
    

}
