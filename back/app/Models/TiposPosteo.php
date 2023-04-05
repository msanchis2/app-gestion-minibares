<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TiposPosteo
 *
 * @property $id
 * @property $nombre
 * @property $descripcion
 * @property $facturaSN
 *
 * @property Posteo[] $posteos
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class TiposPosteo extends Model
{
    
    static $rules = [
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre','descripcion','facturaSN'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posteos()
    {
        return $this->hasMany('App\Models\Posteo', 'tipoId', 'id');
    }
    

}
