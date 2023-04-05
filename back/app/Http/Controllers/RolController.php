<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class RolController
 * @package App\Http\Controllers
 */
class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
          *
     * * @OA\Get(
     *     path="/api/roles",
     *     tags={"Roles"},
     *     summary="List all roles",
     *     @OA\Response(
     *         response=200,
     *          description="Successful operation"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * ) 
     */
    public function index()
    {
        $roles = Rol::all();
        return response()->json($roles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    * @OA\Post(
    *     path="/api/roles",
    *     summary="Crear Rol",
    *     tags={"Roles"},
    *     security={ {"bearerAuth": {} }},
    *     @OA\RequestBody(
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="nombre",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="activoSN",
    *                     type="string"
    *                 ),
    *                 required={"nombre","activoSN"}
    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Rol creado."
    *     ),
    *     @OA\Response(
    *         response=422,
    *         description="Error en los parametros enviados."
    *     ),
    * )
    */
    public function store(Request $request)
    {
        request()->validate(Rol::$rules);

        $rol = Rol::create($request->all());
        return response()->json($rol);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
    * @OA\Get(
    *     path="/api/roles/{id}",
    *     summary="Mostrar Rol",
    *     tags={"Roles"},
    *     security={ {"bearerAuth": {} }},
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(
    *             type="integer",
    *             format="int64"
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Rol encontrado."
    *     ),
    *     @OA\Response(
    *         response=404,
    *         description="Rol no encontrado."
    *     ),
    * )
    */
    public function show($id)
    {
        $rol = Rol::find($id);
        return response()->json($rol);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Rol $rol
     * @return \Illuminate\Http\Response
     *
    * @OA\Put(
    *     path="/api/roles/{id}",
    *     summary="Actualizar Rol",
    *     tags={"Roles"},
    *     security={ {"bearerAuth": {} }},
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(
    *             type="integer",
    *             format="int64"
    *         )
    *     ),
    *     @OA\RequestBody(
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="nombre",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="activoSN",
    *                     type="string"
    *                 ),
    *                 required={"nombre","activoSN"}
    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Rol actualizado."
    *     ),
    *     @OA\Response(
    *         response=422,
    *         description="Error en los parametros enviados."
    *     ),
    * )
    */
    public function update(Request $request, Rol $rol)
    {
        request()->validate(Rol::$rules);

        $rol->update($request->all());
        return response()->json($rol);

    }
    //
    //Al cambiar el nombre del modelo que genera laravel por defecto la funcion update no funciona y hay que hacerlo a mano:
    //
    public function actualiza($id, $nombre, $activo)
    {
        DB::table("rols")->where("id", $id)
                         ->update(["nombre" => $nombre,
                                   "activoSN" => $activo]);
        $rol = Rol::find($id);

        return response()->json($rol);

    }
    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     *
    * @OA\Delete(
    *     path="/api/roles/{id}",
    *     summary="Eliminar Rol",
    *     tags={"Roles"},
    *     security={ {"bearerAuth": {} }},
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(
    *             type="integer",
    *             format="int64"
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Rol eliminado."
    *     ),
    *     @OA\Response(
    *         response=404,
    *         description="Rol no encontrado."
    *     ),
    * )
    */
    public function destroy($id)
    {
        if(Rol::find($id)){
            Rol::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
