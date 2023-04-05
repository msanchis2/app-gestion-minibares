<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
/**
 * Class User
 *
 * @property $id
 * @property $name
 * @property $email
 * @property $email_verified_at
 * @property $password
 * @property $remember_token
 * @property $created_at
 * @property $updated_at
 * @property $activoSN
 * @property $hash
 * @property $usuarioInactivo
 * @property $fechaInactivo
 * @property $enviomailSN
 * @property $tmpPassword
 * @property $telefono
 *
 * @property ResetPassword[] $resetPasswords
 * @property SuccessLogin[] $successLogins
 * @property UsuarioHotel[] $usuariosHoteles
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class User extends Authenticatable implements JWTSubject
{
    
    static $rules = [
		'name' => 'required',
		'email' => 'required',
        'rolesId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['rolesId','name','email','password','activoSN','hash','usuarioInactivo','fechaInactivo','enviomailSN','tmpPassword','telefono','avatar'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function resetPasswords()
    {
        return $this->hasMany('App\Models\ResetPassword', 'userId', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function successLogins()
    {
        return $this->hasMany('App\Models\SuccessLogin', 'userId', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function usuariosHoteles()
    {
        return $this->hasMany('App\Models\UsuarioHotel', 'userId', 'id');
    }
    

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
