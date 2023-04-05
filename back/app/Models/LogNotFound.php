<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class LogNotFound
 *
 * @property $id
 * @property $fechaCreacion
 * @property $usuarioId
 * @property $usuarioNombre
 * @property $usuarioRolesId
 * @property $nombreEmpresa
 * @property $controlador
 * @property $accion
 * @property $codigoError
 * @property $mensage
 *
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class LogNotFound extends Model
{
    
    static $rules = [
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['fechaCreacion','usuarioId','usuarioNombre','usuarioRolesId','nombreEmpresa','controlador','accion','codigoError','mensage'];



}
