<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class InventarioController
 * @package App\Http\Controllers
 */
class InventarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     * @OA\Get(
     *     path="/api/inventarios",
     *     tags={"Invetario"},     
     *     summary="Mostrar información de los inventarios",
     *     @OA\Response(
     *         response=200,
     *         description="Mostrar información de los inventarios."
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    public function index()
    {
        $inventarios = DB::table('inventarios')->where('situacion', 'A')->get();
        $datos = array();
        $json_devuelto = array();
        //
        //Metemos en un array la cantidad de cada hotel-producto-fechacaducidad
        //
        foreach($inventarios as $clave => $valor){

            $producto = json_decode(DB::table('productos')->where('id', $valor->productoId)->get())[0];
            if (!file_exists($producto->imagen)) 
                $producto->imagen = "imagenes/sinimagen.jpg";

            if(isset($datos[$valor->hotelId."-".$producto->id."-".$valor->fechaCaducidad."-".$producto->imagen."-".$producto->nombre]))
                $datos[$valor->hotelId."-".$producto->id."-".$valor->fechaCaducidad."-".$producto->imagen."-".$producto->nombre] += 1;
            else
                $datos[$valor->hotelId."-".$producto->id."-".$valor->fechaCaducidad."-".$producto->imagen."-".$producto->nombre] = 1;
        }
        //
        //Tratamos el array obtenido y lo preparamos para después convertir en json
        //
        foreach($datos as $clave => $valor){
            $registro = explode("-", $clave);
            $json_devuelto[]= array("hotelId" => $registro[0], 
                                    "productoId"=>$registro[1], 
                                    "fechaCaducidad"=>$registro[2].'-'.$registro[3].'-'.$registro[4],
                                    "fechaCaducidadMostrar"=>$registro[4].'/'.$registro[3].'/'.$registro[2],
                                    "cantidad"=>$valor, 
                                    "imagen" => $registro[5],
                                    "nombreProducto" => $registro[6]);
        }

        return response()->json($json_devuelto);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    * @OA\Post(
    *     path="/api/inventarios",
    *     tags={"Invetario"},
    *     summary="Crear un inventario",
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\MediaType(
    *             mediaType="application/json",
    *             @OA\Schema(
    *                 @OA\Property(
    *                     property="productoId",
    *                     type="integer"
    *                 ),
    *                 @OA\Property(
    *                     property="fechaCaducidad",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="situacion",
    *                     type="string"
    *                 ),
    *                 @OA\Property(
    *                     property="habitacionId",
    *                     type="integer"
    *                 ),
    *                 example={
    *                     "productoId": 1,
    *                     "fechaCaducidad": "2020-01-01",
    *                     "situacion": "A",
    *                     "habitacionId": null
    *                 }
    *             )
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Crear un inventario."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function store(Request $request)
    {
        request()->validate(Inventario::$rules);

        for($i=0;$i<$request->cantidad;$i++){
            DB::insert('insert into inventarios (hotelId, 
                                                 productoId, 
                                                 situacion, 
                                                 fechaCaducidad)
                                          values (?, ?, ?, ?)', 
                                                 [$request->hotelId, 
                                                  $request->productoId, 
                                                  'A', 
                                                  $request->fechaCaducidad]);
            $inventario[] = DB::getPdo()->lastInsertId();
        }

        $inventarios = DB::select('SELECT * 
                                     FROM inventarios
                                    where id in ('.implode(",", $inventario).')');


        return response()->json($inventario);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
    * @OA\Get(
    *     path="/api/inventarios/{id}",
    *     tags={"Invetario"},
    *     summary="Mostrar información de un inventario específico",
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
    *         description="Mostrar información de un inventario específico."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function show($id)
    {   
        //
        //Obtenemos el inventario del id que le hemos pasado y a partir de ahí sacamos todos los registros coincidentes para poder sumarlos mas tarde
        //
        $inventario = json_decode(Inventario::find($id));
        $inventarios = json_decode(DB::table('inventarios')
                                     ->where('hotelId', $inventario->hotelId)
                                     ->where('productoId', $inventario->productoId)
                                     ->where('situacion', 'A')
                                     ->get());
        //
        //Metemos en un array la cantidad de cada hotel-producto-fechacaducidad
        //
        foreach($inventarios as $clave => $valor){
            if(isset($datos[$valor->hotelId."-".$valor->productoId."-".$valor->fechaCaducidad]))
                $datos[$valor->hotelId."-".$valor->productoId."-".$valor->fechaCaducidad] = $datos[$valor->hotelId."-".$valor->productoId."-".$valor->fechaCaducidad] + 1;
            else
                $datos[$valor->hotelId."-".$valor->productoId."-".$valor->fechaCaducidad] = 1;
        }
        //
        //Tratamos el array obtenido y lo preparamos para después convertir en json
        //
        foreach($datos as $clave => $valor){
            $registro = explode("-", $clave);
            $json_devuelto[]= array("hotelId" => $registro[0], "productoId"=>$registro[1], "fechaCaducidad"=>$registro[2].'-'.$registro[3].'-'.$registro[4],"cantidad"=>$valor);
        }

        return response()->json($json_devuelto);

    }
    public static function muestrasinid($hotelId, $productoId){
        //
        //Sacamos todos los registros coincidentes para poder sumarlos mas tarde
        //
        $json_devuelto = array();
        if($inventarios = json_decode(DB::table('inventarios')
                                     ->where('hotelId', $hotelId)
                                     ->where('productoId', $productoId)
                                     ->where('situacion', 'A')
                                     ->get())){
            //
            //Metemos en un array la cantidad de cada hotel-producto-fechacaducidad
            //
            foreach($inventarios as $clave => $valor){
                if(isset($datos[$valor->hotelId."-".$valor->productoId."-".$valor->fechaCaducidad]))
                    $datos[$valor->hotelId."-".$valor->productoId."-".$valor->fechaCaducidad] = $datos[$valor->hotelId."-".$valor->productoId."-".$valor->fechaCaducidad] + 1;
                else
                    $datos[$valor->hotelId."-".$valor->productoId."-".$valor->fechaCaducidad] = 1;
            }
            //
            //Tratamos el array obtenido y lo preparamos para después convertir en json
            //
            foreach($datos as $clave => $valor){
                $registro = explode("-", $clave);
                $json_devuelto[]= array("hotelId" => $registro[0], 
                                        "productoId"=>$registro[1], 
                                        "fechaCaducidad"=>$registro[2].'-'.$registro[3].'-'.$registro[4],
                                        "fechaCaducidadMostrar"=>$registro[4].'/'.$registro[3].'/'.$registro[2],
                                        "cantidad"=>$valor);
            }
        }
        return response()->json($json_devuelto);

    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Inventario $inventario
     * @return \Illuminate\Http\Response
     *    
    */
    public function update(Request $request, Inventario $inventario)
    {
        $inventario_registro = json_decode($inventario);
        DB::table('inventarios')->where('hotelId', $inventario_registro->hotelId)
                                ->where('productoId', $inventario_registro->productoId)
                                ->where('situacion', 'A')
                                ->update(['fechaCaducidad' => $request->fechaCaducidad
                            ]);
        return self::show($inventario->id);

    }

    public function actualiza($productoId,$hotelId,$fechaCaducidad,$cantidad)
    {
        //
        //Borramos todo
        //
        $datos = DB::table('inventarios')
                   ->where('hotelId', $hotelId)
                   ->where('productoId', $productoId)
                   ->where('situacion', 'A')
                  ->delete();
        //
        //Insertamos la nueva cantidad
        //
        for($i=0;$i<$cantidad;$i++){
            DB::insert('insert into inventarios (hotelId, 
                                                 productoId, 
                                                 situacion, 
                                                 fechaCaducidad)
                                          values (?, ?, ?, ?)', 
                                                 [$hotelId, 
                                                  $productoId, 
                                                  'A', 
                                                  $fechaCaducidad]);
        }
        //
        //Devuelvo el resultado
        //
        return DB::table('inventarios')
                 ->where('hotelId', $hotelId)
                 ->where('productoId', $productoId)
                 ->where('situacion', 'A')
                   ->get();

    }

    public function actualizaposteo($id, $hotelId, $idReemplazo, $situacion, $usuarioPosteoId, $habitacionId)
    {
        //
        //Insertamos la nueva cantidad
        //
        if ($id > 0){
            //
            //Obtenemos el precio de Venta y el de Coste
            //
            $precios = DB::select("SELECT a.importeVenta,
                                          a.importeCoste 
                                     from productos_defecto a,
                                          inventarios b
                                    where a.hotelId = $hotelId and
                                          b.id = $id and
                                          b.hotelId = a.hotelId and
                                          a.productoId = b.productoId");
            DB::table('inventarios')->where('id', $id)
                                    ->update(['situacion' => $situacion, 
                                              'usuario_posteo_id' => $usuarioPosteoId, 
                                              'fecha_posteo' => date("Y-m-d"),
                                              'importeVenta' => $precios[0]->importeVenta,
                                              'importeCoste' => $precios[0]->importeCoste]);
        }
        if($idReemplazo != "sinReemplazo"){
            DB::table('inventarios')->where('id', $idReemplazo)
                                    ->update(['situacion' => 'H', 
                                              'habitacionId' => $habitacionId]);
        }
        
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     *
     * @OA\Delete(
     *     path="/api/inventarios/{id}",
     *     tags={"Invetario"},
     *     summary="Eliminar un inventario específico",
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
     *         description="Eliminar un inventario específico."
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    public function destroy($datos)
    {
        list($id, $cantidad) = explode("_", $datos);
        //
        //Obtenemos el inventario del id que le hemos pasado y a partir de ahí sacamos todos los registros coincidentes para poder sumarlos mas tarde
        //
        $inventario = json_decode(Inventario::find($id));
        $inventarios = json_decode(DB::table('inventarios')
                                     ->where('hotelId', $inventario->hotelId)
                                     ->where('productoId', $inventario->productoId)
                                     ->where('situacion', 'A')
                                     ->get());
        $i=0;
        foreach($inventarios as $clave => $valor){
            if ($i < $cantidad){
                DB::table('inventarios')->where('id', $valor->id)->delete();
            }
            $i = $i + 1;
        }

    }

    public function muestraproductosenhabitacion($habitacionId){

        $inventarios = json_decode(DB::table('inventarios')
                                     ->where('habitacionId', $habitacionId)
                                     ->where('situacion', 'H')
                                     ->get());
        return $inventarios;

    }

    public function muestrainventarioenhabitacionporhotel($hotelId){

        $inventarios = json_decode(DB::table('inventarios')
                                     ->where('hotelId', $hotelId)
                                     ->where('situacion', 'H')
                                     ->get());
        return $inventarios;

    }

    public function muestrainventarioenalmacenporhotel($hotelId) {
        $datos = json_decode(DB::table('inventarios')
                                ->where('hotelId', $hotelId)
                                ->where('situacion', 'A')
                                ->get());
        $fecha_cargada = array();
        foreach($datos as $clave => $valor){
            if(!in_array($valor->fechaCaducidad, $fecha_cargada)){
                $fecha_cargada[] = $valor->fechaCaducidad;
                $registro = explode("-", $valor->fechaCaducidad);
                $valor->fechaCaducidad = $registro[2].'/'.$registro[1].'/'.$registro[0];
                $json_devuelto[]= $valor;
            }
        }

        return response()->json($json_devuelto);
    }

    public function muestrainventarioporhotel($hotelId)
    {
        $inventarios = DB::table('inventarios')
                         ->where('hotelId', $hotelId)
                         ->where('situacion', 'A')
                         ->get();
        $datos = array();
        $json_devuelto = array();
        //
        //Metemos en un array la cantidad de cada hotel-producto-fechacaducidad
        //
        foreach($inventarios as $clave => $valor){

            $producto = json_decode(DB::table('productos')->where('id', $valor->productoId)->get())[0];
            if (!file_exists($producto->imagen)) 
                $producto->imagen = "imagenes/sinimagen.jpg";

            if(isset($datos[$valor->hotelId."-".$producto->id."-".$valor->fechaCaducidad."-".$producto->imagen."-".$producto->nombre]))
                $datos[$valor->hotelId."-".$producto->id."-".$valor->fechaCaducidad."-".$producto->imagen."-".$producto->nombre] += 1;
            else
                $datos[$valor->hotelId."-".$producto->id."-".$valor->fechaCaducidad."-".$producto->imagen."-".$producto->nombre] = 1;
        }
        //
        //Tratamos el array obtenido y lo preparamos para después convertir en json
        //
        foreach($datos as $clave => $valor){
            $registro = explode("-", $clave);
            $json_devuelto[]= array("hotelId" => $registro[0], 
                                    "productoId"=>$registro[1], 
                                    "fechaCaducidad"=>$registro[2].'-'.$registro[3].'-'.$registro[4],
                                    "fechaCaducidadMostrar"=>$registro[4].'/'.$registro[3].'/'.$registro[2],
                                    "cantidad"=>$valor, 
                                    "imagen" => $registro[5],
                                    "nombreProducto" => $registro[6]);
        }

        return response()->json($json_devuelto);
    }


}
