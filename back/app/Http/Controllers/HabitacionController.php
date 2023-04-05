<?php

namespace App\Http\Controllers;

use App\Models\Habitacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UtilsController;

/**
 * Class HabitacionController
 * @package App\Http\Controllers
 */
class HabitacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/api/habitaciones",
     *     operationId="getHabitaciones",
     *     tags={"Habitaciones"},
     *     summary="Obtener listado de habitaciones",
     *     @OA\Response(
     *         response=200,
     *         description="Listado de habitaciones"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    public function index()
    {
        $habitaciones = json_decode(json_encode(Habitacion::all()));
        foreach($habitaciones as $clave => $valor){
            //
            //Arreglamos la imagen
            //
            if (!file_exists($valor->imagen)) 
                $valor->imagen = "imagenes/sinimagen.jpg";
        }
        return response()->json($habitaciones);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    * @OA\Post(
    *     path="/api/habitaciones",
    *     operationId="insertHabitaciones",
    *     tags={"Habitaciones"},
    *     summary="Crear una nueva habitación",
    *     @OA\RequestBody(
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="hotelId",
    *                     type="integer",
    *                     description="Id del hotel"
    *                 ),
    *                 @OA\Property(
    *                     property="nombre",
    *                     type="string",
    *                     description="Nombre de la habitación"
    *                 ),
    *                 @OA\Property(
    *                     property="imagen",
    *                     type="string",
    *                     description="Imagen de la habitación"
    *                 ),
    *                 required={"hotelId", "nombre", "imagen"}
    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Habitación creada correctamente"
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function store(Request $request)
    {
        request()->validate(Habitacion::$rules);

        $habitacion = json_decode(Habitacion::create(array("hotelId" => $request->hotelId,
                                                           "nombre" => $request->nombre,
                                                           "imagen" => UtilsController::subeImagen($request->imagen, ""))));
        return response()->json($habitacion);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/api/habitaciones/{id}",
     *     operationId="getHabitacionById",
     *     tags={"Habitaciones"},
     *     summary="Obtener Habitación por Id",
     *     @OA\Parameter(
     *         description="Id de la habitación",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *           type="integer",
     *           format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Habitación encontrada"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    public function show($id)
    {
        $valor_devuelto = Habitacion::find($id);

        $valor_devuelto_aux = json_decode(json_encode($valor_devuelto));
        if (!file_exists($valor_devuelto_aux->imagen)) 
            $valor_devuelto_aux->imagen = "imagenes/sinimagen.jpg";

        return response()->json($valor_devuelto_aux);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Habitacion $habitacione
     * @return \Illuminate\Http\Response
     *
     * @OA\Put(
     *     path="/api/habitaciones/{id}",
     *     operationId="updateHabitacion",
     *     tags={"Habitaciones"},
     *     summary="Actualizar habitación por Id",
     *     @OA\Parameter(
     *         description="Id de la habitación",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *           type="integer",
     *           format="int64"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="hotelId",
     *                     type="integer",
     *                     description="Id del hotel"
     *                 ),
     *                 @OA\Property(
     *                     property="nombre",
     *                     type="string",
     *                     description="Nombre de la habitación"
     *                 ),
     *                 @OA\Property(
     *                     property="imagen",
     *                     type="string",
     *                     description="Imagen de la habitación"
     *                 ),
     *                 required={"hotelId", "nombre", "imagen"}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Habitación actualizada correctamente"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    public function update(Request $request, Habitacion $habitacion)
    {
        request()->validate(Habitacion::$rules);
        
        $habitacion->update($request->all());

        return response()->json($habitacion);

    }
    //
    //Al cambiar el nombre del modelo que genera laravel por defecto la funcion update no funciona y hay que hacerlo a mano:
    //
    public function actualiza(Request $request)
    {
        DB::table("habitaciones")->where("id", $request->id)
                                 ->update(["hotelId" => $request->hotelId,
                                           "nombre" => $request->nombre,
                                           "imagen" => UtilsController::subeImagen($request->imagen, "")]);
        $habitacion = Habitacion::find($request->id);

        return response()->json($habitacion);

    }

    public function devuelvehabitacionesporhotel($id)
    {
        $inventarios = DB::select('SELECT a.*, b.nombre as nombreHotel
                                     FROM habitaciones a,
                                          hoteles b
                                    where b.id = '.$id.' and 
                                          a.hotelId = b.id');
        foreach($inventarios as $clave => $valor){
            //
            //Arreglamos la imagen
            //
            if (!file_exists($valor->imagen)) 
                $valor->imagen = "imagenes/sinimagen.jpg";
        }
        return response()->json($inventarios);

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     *   
     * @OA\Delete(
     *     path="/api/habitaciones/{id}",
     *     operationId="deleteHabitacion",
     *     tags={"Habitaciones"},
     *     summary="Eliminar habitación por Id",
     *     @OA\Parameter(
     *         description="Id de la habitación",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *           type="integer",
     *           format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Habitación eliminada correctamente"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    public function destroy($id)
    {
        if(Habitacion::find($id)){
            Habitacion::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
    public function generahabitaciones(Request $request){
        //
        //Obtenemos las variables
        //
        $hotelId = $request->input("hotelId");
        $habIni = $request->input("habIni");
        $habFin = $request->input("habFin");
        $incluirProductosdef = $request->input("incluirProductosdef");
        if($incluirProductosdef == "S"){
            foreach($request->all() as $clave => $valor){
                if ((strpos($clave, 'producto_') === 0 ) && ($valor == "S")){
                    $aux = explode("_",str_replace("producto_", "", $clave));
                    $productos[] = array("hotelId" => $aux[0], 
                                         "productoId" => $aux[1], 
                                         "fechaCaducidad" => $aux[2], 
                                         "cantidad" => ($request->input("cantidad-".$aux[0]."-".$aux[1]."-".$aux[2])) ? $request->input("cantidad-".$aux[0]."-".$aux[1]."-".$aux[2]) : 1
                                        );
                }
            }
        }
        //
        //vamos a introducir todas las habitaciones y movemos, si se ha decidido, los productos del almacen a ellas
        //
        for($i=$habIni;$i<=$habFin;$i++){
            //
            //Hacemos el insert en habitaciones y nos quedamos con el Id
            //
            DB::insert('insert into habitaciones (hotelId, nombre) values (?, ?)', [$hotelId, $i]);
            $habitacionId = DB::getPdo()->lastInsertId();
            //
            //Si hay que incluir los productos asociados:
            //
            if($incluirProductosdef == "S"){
                //
                //hacemos un bucle para recorrer todos los productos e ir movíendolos
                //
                foreach($productos as $clave => $valor){
                    //
                    //Introducimos tantos registros como cantidades existan
                    //
                    for($j=0;$j<$valor["cantidad"];$j++){
                        //
                        //Movemos el producto del inventario a la habitación
                        //
                        DB::table('inventarios')->where('hotelId',  $valor["hotelId"])
                                                ->where('productoId',  $valor["productoId"])
                                                ->where('fechaCaducidad', $valor["fechaCaducidad"])
                                                ->where('situacion', 'A')
                                                ->limit(1)
                                                ->update(['situacion' => 'H',
                                                        'habitacionId' => $habitacionId
                                                        ]);
                    }
                }
            }
        }
        return true;
    }
}
