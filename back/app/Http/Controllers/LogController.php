<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;
use JWTAuth;

/**
 * Class LogController
 * @package App\Http\Controllers
 *
 * @OA\Info(
 *      version="1.0.0", 
 *      title="OpenApi documentación de Minibares",
 * )
 */
class LogController extends Controller
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
        $logs = Log::all();
        return response()->json($logs);
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
        request()->validate(Log::$rules);

        $log = Log::create($request->all());
        return response()->json($log);
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
        $log = Log::find($id);
        return response()->json($log);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Log $log
     * @return \Illuminate\Http\Response
     *
    */
    public function update(Request $request, Log $log)
    {
        request()->validate(Log::$rules);

        $log->update($request->all());
        return response()->json($log);

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     * 
    */
    public function destroy($id)
    {
        if(Log::find($id)){
            Log::find($id)->delete();
            return "true";
        }
        else
            return "false";
        
    }
}
