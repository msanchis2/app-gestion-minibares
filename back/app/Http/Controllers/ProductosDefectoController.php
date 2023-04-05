<?php

namespace App\Http\Controllers;

use App\Models\ProductosDefecto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\InventarioController;

/**
 * Class ProductosDefectoController
 * @package App\Http\Controllers
 */
class ProductosDefectoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productosDefectos = ProductosDefecto::all();
        return response()->json($productosDefectos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate(ProductosDefecto::$rules);

        $productosDefecto = ProductosDefecto::create($request->all());
        return response()->json($productosDefecto);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $productosDefecto = ProductosDefecto::find($id);
        return response()->json($productosDefecto);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  ProductosDefecto $productosDefecto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductosDefecto $productosDefecto)
    {
        request()->validate(ProductosDefecto::$rules);

        $productosDefecto->update($request->all());
        return response()->json($productosDefecto);

    }

    public function actualiza($idHotel, $idProducto, $importeVenta, $importeCoste, $situacion){

        DB::table("productos_defecto")->where("hotelId", $idHotel)
                                      ->where("productoId", $idProducto)
                                      ->update(["importeVenta" => $importeVenta,
                                                "importeCoste" => $importeCoste,
                                                "situacion" => $situacion]);

        $productos_defecto = DB::table("productos_defecto")
                               ->where("hotelId", $idHotel)
                               ->where("productoId", $idProducto);

        return response()->json($productos_defecto);
    }

    public function porhotel($id)
    {
        $productosDefecto = DB::select('SELECT a.id productoDefectoId,
                                               a.hotelId,
                                               a.productoId,
                                               a.importeVenta,
                                               a.importeCoste,
                                               b.id,
                                               b.nombre,
                                               b.descripcion,
                                               b.imagen,
                                               a.situacion
                                          FROM productos_defecto a,
                                               productos b
                                         where a.productoId = b.id and
                                               a.hotelId = ?', [$id]);

        foreach($productosDefecto as $clave => $valor){
            if (!file_exists($valor->imagen)) 
                $valor->imagen = "imagenes/sinimagen.jpg";
            $productosDefecto[$clave]->fechas = InventarioController::muestrasinid($valor->hotelId, $valor->productoId)->getData();
        }

        return response()->json($productosDefecto);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        if(ProductosDefecto::find($id)){
            ProductosDefecto::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
