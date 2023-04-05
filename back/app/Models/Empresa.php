<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Empresa
 *
 * @property $id
 * @property $nombre
 * @property $descripcion
 * @property $telefono
 * @property $nombreContacto
 * @property $razonSocial
 * @property $cifnif
 * @property $tipoCifNif
 * @property $imagen
 *
 * @property Hotel[] $hoteles
 * @property Rol[] $roles
 * @property UsuariosEmpresa[] $usuariosEmpresas
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Empresa extends Model
{
    protected $table = "empresas";
    static $rules = [
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre','descripcion','telefono','nombreContacto','razonSocial','tipoCifNif','cifnif','imagen'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function hoteles()
    {
        return $this->hasMany('App\Models\Hotel', 'empresaId', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function roles()
    {
        return $this->hasMany('App\Models\Rol', 'empresaId', 'id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function usuariosEmpresas()
    {
        return $this->hasMany('App\Models\UsuariosEmpresa', 'empresaId', 'id');
    }
    

}
