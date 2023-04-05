<?php

namespace App\Http\Controllers;

use App\Models\UsuarioHotel;
use Illuminate\Http\Request;

/**
 * Class UsuarioHotelController
 * @package App\Http\Controllers
 */
class UsuarioHotelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuarioHotel = UsuarioHotel::all();
        return response()->json($usuarioHotel);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate(UsuarioHotel::$rules);

        $usuarioHotel = Rol::create($request->all());
        return response()->json($usuarioHotel);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $usuarioHotel = UsuarioHotel::find($id);
        return response()->json($usuarioHotel);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  UsuarioHotel $usuarioHotel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UsuarioHotel $usuarioHotel)
    {
        request()->validate(UsuarioHotel::$rules);

        $usuarioHotel->update($request->all());
        return response()->json($usuarioHotel);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        if(UsuarioHotel::find($id)){
            UsuarioHotel::find($id)->delete();
            return "true";
        }
        else
            return "false";
    }
}
