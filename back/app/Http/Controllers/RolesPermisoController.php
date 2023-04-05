<?php

namespace App\Http\Controllers;

use App\Models\RolesPermiso;
use Illuminate\Http\Request;

/**
 * Class RolesPermisoController
 * @package App\Http\Controllers
 */
class RolesPermisoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * 
     * @OA\Get(
     *     path="/api/roles_permisos",
     *     tags={"RolesPermisos"},
     *     summary="List all roles_permisos",
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
        $rolesPermisos = RolesPermiso::all();
        return response()->json($rolesPermisos);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    * @OA\Post(
    *     path="/api/roles_permisos/{roleId}",
    *      operationId="storeRolesPermisos",
    *      tags={"RolesPermisos"},
    *      summary="Registra un permiso de un rol",
    *      description="Registra un permiso de un rol",
    *      @OA\Parameter(
    *          name="roleId",
    *          description="ID del rol",
    *          required=true,
    *          in="path",
    *          @OA\Schema(
    *              type="integer"
    *          )
    *      ),
    *      @OA\RequestBody(
    *      	@OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="roleId",
    *                     type="string",
    *                     description="Role Id relacionado"
    *                 ),
    *                 @OA\Property(
    *                     property="controlador",
    *                     type="string",
    *                     description="Controlador que se ejecuta"
    *                 ),
    *                 @OA\Property(
    *                     property="accion",
    *                     type="string",
    *                     description="Acción que se ejecuta"
    *                 )
    *             )
    *         )
    *      ),
    *      @OA\Response(
    *          response=200,
    *          description="Permiso creado correctamente",
    *       ),
    *      @OA\Response(response=400, description="Bad Request"),
    *      @OA\Response(response=404, description="Resource Not Found"),
    *      security={
    *           {"api_key_security_example": {}}
    *      },
    * )
    */

    public function store(Request $request)
    {
        request()->validate(RolesPermiso::$rules);

        $rolesPermiso = RolesPermiso::create($request->all());
        return response()->json($rolesPermiso);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
    * @OA\Get(
    *     path="/api/roles_permisos/{id}",
    *      operationId="showRolesPermisosById",
    *      tags={"RolesPermisos"},
    *      summary="Obtiene un permiso de un rol",
    *      description="Obtiene un permiso con el id especificado de un rol",
    *      @OA\Parameter(
    *          name="id",
    *          description="ID del permiso",
    *          required=true,
    *          in="path",
    *          @OA\Schema(
    *              type="integer"
    *          )
    *      ),
    *      @OA\Response(
    *          response=200,
    *          description="Success",
    *       ),
    *      @OA\Response(response=400, description="Bad Request"),
    *      @OA\Response(response=404, description="Resource Not Found"),
    *      security={
    *           {"api_key_security_example": {}}
    *      },
    * )
    */
    public function show($id)
    {
        $rolesPermiso = RolesPermiso::find($id);
        return response()->json($rolesPermiso);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  RolesPermiso $rolesPermiso
     * @return \Illuminate\Http\Response
     *
    * @OA\Put(
    *      path="/api/roles_permisos/{id}",
    *      operationId="updateRolesPermisosById",
    *      tags={"RolesPermisos"},
    *      summary="Actualiza un permiso de un rol",
    *      description="Actualiza un permiso con el id especificado de un rol",
    *      @OA\Parameter(
    *          name="id",
    *          description="ID del permiso",
    *          required=true,
    *          in="path",
    *          @OA\Schema(
    *              type="integer"
    *          )
    *      ),
    *       @OA\RequestBody(
    *      	@OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="roleId",
    *                     type="string",
    *                     description="Role Id relacionado"
    *                 ),
    *                 @OA\Property(
    *                     property="controlador",
    *                     type="string",
    *                     description="Controlador que se ejecuta"
    *                 ),
    *                 @OA\Property(
    *                     property="accion",
    *                     type="string",
    *                     description="Acción que se ejecuta"
    *                 )
    *             )
    *         )
    *      ),
    *      @OA\RequestBody(
    *      	required=true,
    *      	@OA\JsonContent(ref="#/components/schemas/RolesPermiso")
    *      ),
    *      @OA\Response(
    *          response=200,
    *          description="Success",
    *       ),
    *      @OA\Response(response=400, description="Bad Request"),
    *      @OA\Response(response=404, description="Resource Not Found"),
    *      security={
    *           {"api_key_security_example": {}}
    *      },
    * )
    */
    public function update(Request $request, RolesPermiso $rolesPermiso)
    {
        request()->validate(RolesPermiso::$rules);

        $rolesPermiso->update($request->all());
        return response()->json($rolesPermiso);

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     *
    * @OA\Delete(
    *      path="/api/roles_permisos{id}",
    *      operationId="destroyRolesPermisosById",
    *      tags={"RolesPermisos"},
    *      summary="Elimina un permiso de un rol",
    *      description="Elimina un permiso con el id especificado de un rol",
    *      @OA\Parameter(
    *          name="id",
    *          description="ID del permiso",
    *          required=true,
    *          in="path",
    *          @OA\Schema(
    *              type="integer"
    *          )
    *      ),
    *      @OA\Response(
    *          response=200,
    *          description="Success",
    *       ),
    *      @OA\Response(response=400, description="Bad Request"),
    *      @OA\Response(response=404, description="Resource Not Found"),
    *      security={
    *           {"api_key_security_example": {}}
    *      },
    * )
    */
    public function destroy($id)
    {
        if(RolesPermiso::find($id)){
            RolesPermiso::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
