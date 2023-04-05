<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\HabitacionController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\LogNotFoundController;
use App\Http\Controllers\PosteoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\RolesPermisoController;
use App\Http\Controllers\SuccessLoginController;
use App\Http\Controllers\TiposPosteoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UsuarioHotelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductosDefectoController;
use App\Http\Controllers\InformeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::prefix('v1')->group(function () {
    //Prefijo V1, todo lo que este dentro de este grupo se accedera escribiendo v1 en el navegador, es decir /api/v1/*
    Route::post('login', [AuthController::class, 'authenticate']);
    Route::post('register', [AuthController::class, 'register']);
    Route::group(['middleware' => ['jwt.verify']], function() {
        //Todo lo que este dentro de este grupo requiere verificación de usuario.
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('get-user', [AuthController::class, 'getUser']);
        // Ruta de Logs
        Route::resource('logs', LogController::class);
        Route::resource('empresas', EmpresaController::class);
        Route::resource('habitaciones', HabitacionController::class);
        Route::post('habitacionesupdate', [HabitacionController::class, 'actualiza']);
        Route::get('devuelvehabitacionesporhotel/{id}', [HabitacionController::class, 'devuelvehabitacionesporhotel']);
        Route::post('habitaciones/generahabitaciones',  [HabitacionController::class, 'generahabitaciones']);
        Route::resource('hoteles', HotelController::class);
        Route::post('hotelesupdate', [HotelController::class, 'actualiza']);
        Route::get('hotelesporempresa/{id}', [HotelController::class, 'hotelesporempresa']);
        Route::resource('inventarios', InventarioController::class);
        Route::get('muestrasinid/{hotelId}/{productoId}', [InventarioController::class, 'muestrasinid']);
        Route::get('muestraproductosenhabitacion/{habitacionId}', [InventarioController::class, 'muestraproductosenhabitacion']);
        Route::get('muestrainventarioenhabitacionporhotel/{hotelId}', [InventarioController::class, 'muestrainventarioenhabitacionporhotel']);
        Route::get('muestrainventarioenalmacenporhotel/{hotelId}', [InventarioController::class, 'muestrainventarioenalmacenporhotel']);
        Route::get('muestrainventarioporhotel/{hotelId}', [InventarioController::class, 'muestrainventarioporhotel']);
        Route::get('inventarioupdate/{productoId}/{hotelId}/{fechaCaducidad}/{cantidad}', [InventarioController::class, 'actualiza']);
        Route::get('actualizaposteo/{id}/{hotelId}/{idReemplazo}/{situacion}/{usuarioPosteoId}/{habitacionId}', [InventarioController::class, 'actualizaposteo']);
        Route::resource('log_not_founds', LogNotFoundController::class);
        Route::resource('posteos', PosteoController::class);
        Route::resource('productos', ProductoController::class);
        Route::resource('reset_passwords', ResetPasswordController::class);
        Route::resource('roles', RolController::class);
        Route::get('rolesupdate/{id}/{nombre}/{activo}', [RolController::class, 'actualiza']);
        Route::resource('roles_permisos', RolesPermisoController::class);
        Route::resource('success_logins', SuccessLoginController::class);
        Route::resource('tipos_posteos', TiposPosteoController::class);
        Route::resource('users', UserController::class);
        Route::resource('usuarios_hoteles', UsuarioHotelController::class);
        Route::resource('productos_defecto', ProductosDefectoController::class);
        Route::get('productos_defecto/porhotel/{id}', [ProductosDefectoController::class, 'porhotel']);
        Route::get('productos_defectoupdate/{idHotel}/{idProducto}/{importeVenta}/{importeCoste}/{situacion}', [ProductosDefectoController::class, 'actualiza']);
        Route::post('informes/general', [InformeController::class, 'general']);
        Route::get('informes/resumenventas/{empresaId}/{tipoImporte}', [InformeController::class, 'resumenventas']);
    });
});