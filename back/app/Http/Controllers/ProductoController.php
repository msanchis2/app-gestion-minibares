<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

/**
 * Class ProductoController
 * @package App\Http\Controllers
 */
class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
    * @OA\Get(
    *     path="/api/productos",
    *     tags={"Productos"},
    *     description="Obtiene la lista de productos",
    *     @OA\Response(
    *         response=200,
    *         description="Lista de productos."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */

    public function index()
    {
        $productos = json_decode(json_encode(Producto::all()));
        foreach($productos as $clave => $valor){
            //
            //Arreglamos la imagen
            //
            if (!file_exists($valor->imagen)) 
                $valor->imagen = "imagenes/sinimagen.jpg";
        }
        return response()->json($productos);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    * @OA\Post(
    *     path="/api/productos",
    *     tags={"Productos"},
    *     description="Crea un producto",
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(
    *             required={"nombre", "descripcion", "imagen"},
    *             @OA\Property(property="nombre", type="string"),
    *             @OA\Property(property="descripcion", type="string"),
    *             @OA\Property(property="imagen", type="string")
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Producto creado."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function store(Request $request)
    {
        request()->validate(Producto::$rules);

        $producto = json_decode(Producto::create(array("nombre" => $request->nombre,
                                                       "descripcion" => $request->descripcion,
                                                       "imagen" => UtilsController::subeImagen($request->imagen, ""))));
        return response()->json($producto);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
    * @OA\Get(
    *     path="/api/productos/{id}",
    *     tags={"Productos"},
    *     description="Obtiene un producto por su id",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="Id del producto a obtener",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Producto obtenido."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function show($id)
    {
        $producto = Producto::find($id);
        
        $valor_devuelto_aux = json_decode(json_encode($producto));
        if (!file_exists($valor_devuelto_aux->imagen)) 
            $valor_devuelto_aux->imagen = "imagenes/sinimagen.jpg";


        return response()->json($valor_devuelto_aux);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Producto $producto
     * @return \Illuminate\Http\Response
     *
    * @OA\Put(
    *     path="/api/productos/{id}",
    *     tags={"Productos"},
    *     description="Actualiza un producto",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="Id del producto a actualizar",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(
    *             required={"nombre", "descripcion", "imagen"},
    *             @OA\Property(property="nombre", type="string"),
    *             @OA\Property(property="descripcion", type="string"),
    *             @OA\Property(property="imagen", type="string")
    *         )
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Producto actualizado."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */

    public function update(Request $request, Producto $producto)
    {
        request()->validate(Producto::$rules);

        $producto->update(array("nombre" => $request->nombre,
                                "descripcion" => $request->descripcion,
                                "imagen" => UtilsController::subeImagen($request->imagen, "")));
        return response()->json($producto);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     *
    * @OA\Delete(
    *     path="/api/productos/{id}",
    *     tags={"Productos"},
    *     description="Elimina un producto por su id",
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="Id del producto a eliminar",
    *         required=true,
    *         @OA\Schema(type="integer")
    *     ),
    *     @OA\Response(
    *         response=200,
    *         description="Producto eliminado."
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function destroy($id)
    {
        if(Producto::find($id)){
            Producto::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
