<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UsuarioHotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\UtilsController;
/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      
        $users_aux = json_decode(json_encode(User::all()));
        foreach($users_aux as $clave => $valor){
            //
            //Arreglamos la imagen
            //
            if (!file_exists($valor->avatar)) 
                $valor->avatar = "imagenes/sinimagen.jpg";
            //
            //Devolvemos el nombre del Rol
            //
            $valor->rolesId = json_decode(DB::table('rols')->where('id', $valor->rolesId)->get())[0]->nombre;

        }
        return response()->json($users_aux);
    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate(User::$rules);

        $user = User::create(array ("rolesId" => $request->rolesId,
                                    "empresaId" => $request->empresaId,
                                    "name" => $request->name,
                                    "email" => $request->email,
                                    "email_verified_at" => $request->email_verified_at,
                                    "password" => $request->password,
                                    "remember_token" => $request->remember_token,
                                    "activoSN" => $request->activoSN,
                                    "hash" => $request->hash,
                                    "usuarioInactivo" => $request->usuarioInactivo,
                                    "fechaInactivo" => $request->fechaInactivo,
                                    "enviomailSN" => $request->enviomailSN,
                                    "tmpPassword" => $request->tmpPassword,
                                    "telefono" => $request->telefono,
                                    "avatar" => UtilsController::subeImagen($request->avatar, $request->antigua_ruta)));
        //
        //Ahora creamos el registro en usuarios_hoteles
        //
        $crea_usuarios_hoteles = $request->usuarios_hoteles;
        foreach($crea_usuarios_hoteles as $calve => $valor){
            $usuarios_hoteles[] = json_decode(UsuarioHotel::create(array("userId" => json_decode($user, true)["id"], 
                                                                         "hotelId" => $valor["hotelId"], 
                                                                         "hotel_defecto_sn" => $valor["hotel_defecto_sn"])));
        }
        //
        //Devolvemos un array con los datos
        //
        $valor_devuelto = json_decode($user);
        $valor_devuelto->usuarios_hoteles = $usuarios_hoteles;
        return response()->json($valor_devuelto);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $valor_devuelto = User::find($id);

        $valor_devuelto_aux = json_decode(json_encode($valor_devuelto));
        if (!file_exists($valor_devuelto_aux->avatar)) 
            $valor_devuelto_aux->avatar = "imagenes/sinimagen.jpg";

        $usuarios_hoteles = json_decode(DB::table('usuarios_hoteles')->where('userId', $id)->get());
        if($usuarios_hoteles)
            $valor_devuelto_aux->usuarios_hoteles = $usuarios_hoteles;
        return response()->json($valor_devuelto_aux);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        request()->validate(User::$rules);
        $user->update(array ("rolesId" => $request->rolesId,
                             "empresaId" => $request->empresaId,
                             "name" => $request->name,
                             "email" => $request->email,
                             "email_verified_at" => $request->email_verified_at,
                             "password" => $request->password,
                             "remember_token" => $request->remember_token,
                             "activoSN" => $request->activoSN,
                             "hash" => $request->hash,
                             "usuarioInactivo" => $request->usuarioInactivo,
                             "fechaInactivo" => $request->fechaInactivo,
                             "enviomailSN" => $request->enviomailSN,
                             "tmpPassword" => $request->tmpPassword,
                             "telefono" => $request->telefono,
                             "avatar" => UtilsController::subeImagen($request->avatar, $request->antigua_ruta)));
        //
        //Borramos todos los registros de Usuario_hoteles
        //
        $deleted = DB::table('usuarios_hoteles')->where('userId', $user->id)->delete();
        //
        //Ahora creamos el registro en usuarios_hoteles
        //
        $crea_usuarios_hoteles = $request->usuarios_hoteles;
        foreach($crea_usuarios_hoteles as $calve => $valor){
            $usuarios_hoteles[] = json_decode(UsuarioHotel::create(array("userId" => $user->id, 
                                                                         "hotelId" => $valor["hotelId"], 
                                                                         "hotel_defecto_sn" => $valor["hotel_defecto_sn"])));
        }
        //
        //Devolvemos un array con los datos
        //
        $valor_devuelto = json_decode(User::find($user->id));
        if(isset($usuarios_hoteles))
            $valor_devuelto->usuarios_hoteles = $usuarios_hoteles;
        return response()->json($valor_devuelto);

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        if(User::find($id)){
            User::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
