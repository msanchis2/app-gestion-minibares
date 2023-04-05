<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class HotelController
 * @package App\Http\Controllers
 */
class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/api/hoteles",
     *     tags={"Hoteles"},
     *     summary="listar hoteles",
     *     @OA\Response(
     *         response=200,
     *         description="mostrar hoteles."
     *     ),
     * )
     */
    public function index()
    {
        $hoteles = json_decode(json_encode(Hotel::all()));
        foreach($hoteles as $clave => $valor){
            //
            //Arreglamos la imagen
            //
            if (!file_exists($valor->imagen)) 
                $valor->imagen = "imagenes/sinimagen.jpg";
        }
        return response()->json($hoteles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    * @OA\Post(
    *     path="/api/hoteles",
    *     tags={"Hoteles"},
    *     summary="guardar hotel",
    *     @OA\RequestBody(
    *         description="Datos para guardar un hotel",
    *         required=true,
    *         @OA\JsonContent(
    *             type="object",
    *             @OA\Property(
    *                 property="empresaId",
    *                 type="integer"
    *             ),
    *             @OA\Property(
    *                 property="nombre",
    *                 type="string"
    *             ),
    *             @OA\Property(
    *                 property="direccion",
    *                 type="string"
    *             ),
    *             @OA\Property(
    *                 property="telefonoContacto",
    *                 type="string"
    *             ),
    *             @OA\Property(
    *                 property="personaContacto",
    *                 type="string"
    *             ),
    *             @OA\Property(
    *                 property="imagen",
    *                 type="string"
    *             ),
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="guardar un hotel."
    *     ),
    * )
    */
    public function store(Request $request)
    {
        request()->validate(Hotel::$rules);

        $hotel = json_decode(Hotel::create(array("empresaId" => $request->empresaId, 
                                                 "nombre" => $request->nombre,
                                                 "direccion" => $request->direccion,
                                                 "telefonoContacto" => $request->telefonoContacto,
                                                 "personaContacto" => $request->personaContacto,
                                                 "imagen" => UtilsController::subeImagen($request->imagen, ""))));
        return response()->json($hotel);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
    * @OA\Get(
    *     path="/api/hoteles/{id}",
    *     tags={"Hoteles"},    
    *     summary="mostrar hotel por id",
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
    *         description="mostrar un hotel por id."
    *     ),
    * )
    */
    public function show($id)
    {
        $hotel = json_decode(json_encode(Hotel::find($id)));
        if (!file_exists($hotel->imagen)) 
            $hotel->imagen = "imagenes/sinimagen.jpg";

        return response()->json($hotel);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Hotel $hotel
     * @return \Illuminate\Http\Response
     *
    * @OA\Put(
    *     path="/api/hoteles/{id}",
    *     tags={"Hoteles"},
    *     summary="Actualizar hotel por id",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         @OA\Schema(
    *             type="integer"
    *         )
    *     ),
    *     @OA\RequestBody(
    *         description="Datos para actualizar un hotel",
    *         required=true,
    *         @OA\JsonContent(
    *             type="object",
    *             @OA\Property(
    *                 property="empresaId",
    *                 type="integer"
    *             ),
    *             @OA\Property(
    *                 property="nombre",
    *                 type="string"
    *             ),
    *             @OA\Property(
    *                 property="direccion",
    *                 type="string"
    *             ),
    *             @OA\Property(
    *                 property="telefonoContacto",
    *                 type="string"
    *             ),
    *             @OA\Property(
    *                 property="personaContacto",
    *                 type="string"
    *             ),
    *             @OA\Property(
    *                 property="imagen",
    *                 type="string"
    *             ),
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="actualizar un hotel por id."
    *     ),
    * )
    */

    public function update(Request $request, Hotel $hotel)
    {
        request()->validate(Hotel::$rules);

        $hotel->update($request->all());

        return response()->json($hotel);

    }
    //
    //Al cambiar el nombre del modelo que genera laravel por defecto la funcion update no funciona y hay que hacerlo a mano:
    //
    public function actualiza(Request $request)
    {
        DB::table("hoteles")->where("id", $request->id)
                            ->update(["nombre" => $request->nombre,
                                    "direccion" => $request->direccion,
                                    "telefonoContacto" => $request->telefonoContacto,
                                    "personaContacto" => $request->personaContacto,
                                    "imagen" => UtilsController::subeImagen($request->imagen, "")]);

        $hotel = Hotel::find($request->id);

        return response()->json($hotel);

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     *
    * @OA\Delete(
    *     path="/api/hoteles/{id}",
    *     tags={"Hoteles"},
    *     summary="Eliminar hotel por id",
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
    *         description="eliminar un hotel por id."
    *     ),
    * )
    */
    public function destroy($id)
    {
        if(Hotel::find($id)){
            Hotel::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
    
    public function hotelesporempresa($id){
    
        $hoteles = DB::table('hoteles')->where('empresaId', $id)->get();
        return response()->json($hoteles);

    }
}
