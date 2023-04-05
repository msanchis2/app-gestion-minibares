<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Rol
 *
 * @property $id
 * @property $nombre
 * @property $activoSN
 *
 * @property RolesPermiso[] $rolesPermisos
 * @property Usuario[] $usuarios
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Rol extends Model
{
    protected $table = "rols";
    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre','activoSN'];
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rolesPermisos()
    {
        return $this->hasMany('App\Models\RolesPermiso', 'roleId', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function usuarios()
    {
        return $this->hasMany('App\Models\Usuario', 'rolesId', 'id');
    }
    

}
