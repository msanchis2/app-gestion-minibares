<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;
use App\Http\Controllers\UtilsController;
use JWTAuth;

/**
 * Class EmpresaController
 * @package App\Http\Controllers
 */
class EmpresaController extends Controller
{
    protected $user;
   
    public function __construct(Request $request)
    {
        $token = $request->header('Authorization');
        if($token != '')
            //En caso de que requiera autentifiación la ruta obtenemos el usuario y lo almacenamos en una variable, nosotros no lo utilizaremos.
            $this->user = JWTAuth::parseToken()->authenticate();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     */
    
    public function index()
    {
        $empresas = json_decode(json_encode(Empresa::all()));
        foreach($empresas as $clave => $valor){
            //
            //Arreglamos la imagen
            //
            if (!file_exists($valor->imagen)) 
                $valor->imagen = "imagenes/sinimagen.jpg";
        }
        return response()->json($empresas);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     *
    */
    public function store(Request $request)
    {
        request()->validate(Empresa::$rules);
        $empresa = json_decode(Empresa::create(array("nombre" => $request->nombre,
                               "descripcion" => $request->descripcion,
                               "telefono" => $request->telefono,
                               "nombreContacto" => $request->nombreContacto,
                               "razonSocial" => $request->razonSocial,
                               "cifnif" => $request->cifNif,
                               "imagen" => UtilsController::subeImagen($request->imagen, ""),
                               "tipoCifNif" => $request->tipoCifNif
                        )));
        return response()->json($empresa);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     *
     */
    public function show($id)
    {
        $valor_devuelto = Empresa::find($id);

        $valor_devuelto_aux = json_decode(json_encode($valor_devuelto));
        if (!file_exists($valor_devuelto_aux->imagen)) 
            $valor_devuelto_aux->imagen = "imagenes/sinimagen.jpg";


        return response()->json($valor_devuelto_aux);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Empresa $empresa
     * @return \Illuminate\Http\Response
     *    
    */
    public function update(Request $request, Empresa $empresa)
    {
        request()->validate(Empresa::$rules);
        $empresa->update(array("nombre" => $request->nombre,
                               "descripcion" => $request->descripcion,
                               "telefono" => $request->telefono,
                               "nombreContacto" => $request->nombreContacto,
                               "razonSocial" => $request->razonSocial,
                               "cifnif" => $request->cifNif,
                               "imagen" => UtilsController::subeImagen($request->imagen, ""),
                               "tipoCifNif" => $request->tipoCifNif
                        ));
        return response()->json($empresa);

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     *
    */
    public function destroy($id)
    {
        if(Empresa::find($id)){
            Empresa::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
