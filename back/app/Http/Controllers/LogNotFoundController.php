<?php

namespace App\Http\Controllers;

use App\Models\LogNotFound;
use Illuminate\Http\Request;

/**
 * Class LogNotFoundController
 * @package App\Http\Controllers
 
 */

class LogNotFoundController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/api/log_not_founds",
     *     tags={"LogNotFound"},
     *     summary="List all log_not_founds",
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
        $logNotFounds = LogNotFound::paginate();
        return response()->json($logNotFounds);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    * @OA\Post(
    *     path="/log_not_founds",
    *     tags={"LogNotFound"},
    *     summary="Crear un log not found",
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="fechaCreacion",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="usuarioId",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="usuarioNombre",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="usuarioRolesId",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="nombreEmpresa",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="controlador",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="accion",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="codigoError",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="mensage",
    *                     type="string"
    *                 ),
    *                 example={
    *                     "fechaCreacion": "2020-01-01T00:00:00",
    *                     "usuarioId": "1",
    *                     "usuarioNombre": "Admin",
    *                     "usuarioRolesId": "1",
    *                     "nombreEmpresa": "MyCompany",
    *                     "controlador": "Inventarios",
    *                     "accion": "index",
    *                     "codigoError": "404",
    *                     "mensage": "No existen inventarios"
    *                 }
    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Crear un log not found."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */

    public function store(Request $request)
    {
        request()->validate(LogNotFound::$rules);

        $logNotFound = LogNotFound::create($request->all());
        return response()->json($logNotFound);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
    * @OA\Get(
    *     path="/log_not_founds/{id}",
    *     tags={"LogNotFound"},
    *     summary="Mostrar información de un log not found específico",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(
    *             type="integer"
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Mostrar información de un log not found específico."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function show($id)
    {
        $logNotFound = LogNotFound::find($id);
        return response()->json($logNotFound);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  LogNotFound $logNotFound
     * @return \Illuminate\Http\Response
     *
    * @OA\Put(
    *     path="/log_not_founds/{id}",
    *     tags={"LogNotFound"},    
    *     summary="Actualizar un log not found específico",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(
    *             type="integer"
    *         )
    *     ),
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="fechaCreacion",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="usuarioId",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="usuarioNombre",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="usuarioRolesId",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="nombreEmpresa",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="controlador",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="accion",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="codigoError",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="mensage",
    *                     type="string"
    *                 ),
    *                 example={
    *                     "fechaCreacion": "2020-01-01T00:00:00",
    *                     "usuarioId": "1",
    *                     "usuarioNombre": "Admin",
    *                     "usuarioRolesId": "1",
    *                     "nombreEmpresa": "MyCompany",
    *                     "controlador": "Inventarios",
    *                     "accion": "index",
    *                     "codigoError": "404",
    *                     "mensage": "No existen inventarios"
    *                 }
    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Actualizar un log not found específico."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function update(Request $request, LogNotFound $logNotFound)
    {
        request()->validate(LogNotFound::$rules);

        $logNotFound->update($request->all());
        return response()->json($logNotFound);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     *
    * @OA\Delete(
    *     path="/log_not_founds/{id}",
    *     tags={"LogNotFound"},
    *     summary="Eliminar un log not found específico",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(
    *             type="integer"
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Eliminar un log not found específico."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function destroy($id)
    {
        if(LogNotFound::find($id)){
            LogNotFound::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
