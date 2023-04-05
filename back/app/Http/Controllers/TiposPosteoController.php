<?php

namespace App\Http\Controllers;

use App\Models\TiposPosteo;
use Illuminate\Http\Request;

/**
 * Class TiposPosteoController
 * @package App\Http\Controllers
 */
class TiposPosteoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     * * @OA\Get(
     *     path="/api/tipos_posteos",
     *     tags={"TiposPosteos"},
     *     summary="List all tipos_posteos",
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
        $tiposPosteos = TiposPosteo::all();
        return response()->json($tiposPosteos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
     *  @OA\Post(
     *     path="/api/tipos_posteos",
    *     tags={"TiposPosteos"},
    *     summary="Crea un tipo de posteo",
    *     description="Metodo para crear un tipo de posteo",
    *     @OA\RequestBody(
    *         description="Objeto JSON que contiene los datos para crear un nuevo tipo de posteo",
    *         required=true,
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Tipo de posteo creado con exito."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )*/
    public function store(Request $request)
    {
        request()->validate(TiposPosteo::$rules);

        $tiposPosteo = TiposPosteo::create($request->all());
        return response()->json($tiposPosteo);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     * 
     * @OA\Get(
     *     path="/api/tipos_posteos/{id}",
    *     tags={"TiposPosteos"},
    *     summary="Obtiene un tipo de posteo",
    *     description="Metodo para obtener un tipo de posteo.",
    *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="nombre",
     *                     type="string",
     *                     description="Nombre del tipo"
     *                 ),
     *                 @OA\Property(
     *                     property="descripcion",
     *                     type="string",
     *                     description="Descripcion del tipo"
     *                 ),
     *                 @OA\Property(
     *                     property="facturaSN",
     *                     type="string",
     *                     description="Indica si es un valor a añadir en la factura o no"
     *                 )
     *          )
     *      )
     *    ),
    *     @OA\Response(
    *         response=200,
    *         description="Tipo de posteo obtenido con exito.",
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )*/
    public function show($id)
    {
        $tiposPosteo = TiposPosteo::find($id);
        return response()->json($tiposPosteo);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  TiposPosteo $tiposPosteo
     * @return \Illuminate\Http\Response
     *
     *   * @OA\Put(
    *     path="/api/tipos_posteos/{id}",
    *     tags={"TiposPosteos"},
    *     summary="Actualiza un tipo de posteo",
    *     description="Metodo para actualizar un tipo de posteo",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="id del tipo de posteo.",
    *         required=true,
    *         @OA\Schema(
    *             type="integer"
    *         )
    *     ),
    *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="nombre",
     *                     type="string",
     *                     description="Nombre del tipo"
     *                 ),
     *                 @OA\Property(
     *                     property="descripcion",
     *                     type="string",
     *                     description="Descripcion del tipo"
     *                 ),
     *                 @OA\Property(
     *                     property="facturaSN",
     *                     type="string",
     *                     description="Indica si es un valor a añadir en la factura o no"
     *                 ),
     *          )
     *      )
     *    ),
    *     @OA\Response(
    *         response=200,
    *         description="Tipo de posteo actualizado con exito."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function update(Request $request, TiposPosteo $tiposPosteo)
    {
        request()->validate(TiposPosteo::$rules);

        $tiposPosteo->update($request->all());
        return response()->json($tiposPosteo);

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
       * @OA\Delete(
    *     path="/api//tipos_posteos/{id}",
    *     tags={"TiposPosteos"},
    *     summary="Elimina un tipo de posteo",
    *     description="Metodo para eliminar un tipo de posteo",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="id del tipo de posteo.",
    *         required=true,
    *         @OA\Schema(
    *             type="integer"
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Tipo de posteo eliminado con exito."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function destroy($id)
    {
        if(TiposPosteo::find($id)){
            TiposPosteo::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
