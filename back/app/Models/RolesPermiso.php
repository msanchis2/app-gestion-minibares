<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class RolesPermiso
 *
 * @property $id
 * @property $roleId
 * @property $controlador
 * @property $accion
 *
 * @property Role $role
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class RolesPermiso extends Model
{
    
    static $rules = [
		'roleId' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['roleId','controlador','accion'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function role()
    {
        return $this->hasOne('App\Models\Role', 'id', 'roleId');
    }
    

}
