<?php

namespace App\Http\Controllers;

use App\Models\Posteo;
use Illuminate\Http\Request;

/**
 * Class PosteoController
 * @package App\Http\Controllers
 */
class PosteoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/api/posteos",
     *     tags={"Posteos"},
     *     description="Obtiene la lista de posteos",
     *     @OA\Response(
     *         response=200,
     *         description="Lista de posteos."
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    public function index()
    {
        $posteos = Posteo::paginate();
        return response()->json($posteos);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    * @OA\Post(
    *     path="/api/posteos",
    *     tags={"Posteos"},
    *     description="Crea un posteo",
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(
    *             required={"inventarioId", "tipoId", "fecha"},
    *             @OA\Property(property="inventarioId", type="integer"),
    *             @OA\Property(property="tipoId", type="integer"),
    *             @OA\Property(property="fecha", type="datetime")
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Posteo creado."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function store(Request $request)
    {
        request()->validate(Posteo::$rules);

        $posteo = Posteo::create($request->all());
        return response()->json($posteo);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
    * @OA\Get(
    *     path="/api/posteos/{id}",
    *     tags={"Posteos"},
    *     description="Obtiene un posteo por su id",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="Id del posteo a obtener",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Posteo obtenido."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function show($id)
    {
        $posteo = Posteo::find($id);
        return response()->json($posteo);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Posteo $posteo
     * @return \Illuminate\Http\Response
     *
        * @OA\Put(
    *     path="/api/posteos/{id}",
    *     tags={"Posteos"},
    *     description="Actualiza un posteo",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="Id del posteo a actualizar",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(
    *             required={"inventarioId", "tipoId", "fecha"},
    *             @OA\Property(property="inventarioId", type="integer"),
    *             @OA\Property(property="tipoId", type="integer"),
    *             @OA\Property(property="fecha", type="datetime")
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Posteo actualizado."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */

    public function update(Request $request, Posteo $posteo)
    {
        request()->validate(Posteo::$rules);

        $posteo->update($request->all());
        return response()->json($posteo);

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     * 
     * @OA\Delete(
    *     path="/api/posteos/{id}",
    *     tags={"Posteos"},
    *     description="Elimina un posteo por su id",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="Id del posteo a eliminar",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Posteo eliminado."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function destroy($id)
    {
        if(Posteo::find($id)){
            Posteo::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
