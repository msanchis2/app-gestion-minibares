<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class RolController
 * @package App\Http\Controllers
 */
class InformeController extends Controller
{
    
    public function general(Request $request)
    {
        //
        //Obtenemos la fecha de inicio y Fin
        //
        if($request->periodo){
            switch($request->periodo){
                case("H"):
                    $fechaIni = date("Y-m-d")." 00:00:00";
                    $fechaFin = date("Y-m-d")." 23:59:59";
                    break;
                case("S"):
                    $fechaIni = date("Y-m-").((date("j")-date("N"))+1)." 00:00:00";
                    $fechaFin = date("Y-m-").(date("j")+(7-date("N")))." 23:59:59";
                    break;
                case("M"):
                    $fechaIni = date("Y-m-")."01 00:00:00";
                    $fechaFin = date("Y-m-").date("t")." 23:59:59";
                    break;
                case("MA"):
                    $fechaIniAux = date('Y-m', strtotime('-1 month', strtotime(date("Y-m-d"))));
                    $fechaIni = $fechaIniAux."-01 00:00:00";
                    $fechaFin = date('Y-m-t', strtotime('-1 month', strtotime(date("Y-m-d"))))." 23:59:59";
                    break;
                    case("A"):
                    $fechaIni = date("Y-")."01-01 00:00:00";
                    $fechaFin = date("Y-")."12-31 23:59:59";
                    break;
            }
        }
        else{
            $fechaIni = ($request->fecha_ini) ? $request->fecha_ini : date("Y-m-d")." 00:00:00";
            $fechaFin = ($request->fecha_fin) ? $request->fecha_fin : date("Y-m-d")." 23:59:59";
        }

        //Falta filtrado por fecha -> WHERE a.situacion = ".$request->tipo." AND ((a.fecha_posteo >= ".$fechaIni.") AND (a.fecha_posteo <= ".$fechaFin."))
        $consulta = DB::select("SELECT 
                                    d.nombre nombreEmpresa, 
                                    c.nombre nombreHotel, 
                                    f.nombre nombreHabitacion, 
                                    e.productoId idProducto, 
                                    sum(a.importeVenta) importeVenta,
                                    sum(a.importeCoste) importeCoste
                                FROM 
                                    inventarios a,
                                    hoteles c,
                                    empresas d,
                                    productos_defecto e,
                                    habitaciones f
                              where a.situacion = '".$request->tipo."' and
                                    a.fecha_posteo between '".$fechaIni."' and '".$fechaFin."' and
                                    c.empresaId = ".$request->empresa." and
                                    c.id = a.hotelId and
                                    c.empresaId = d.id and
                                    e.hotelId = a.hotelId and
                                    e.productoId = a.productoId and
                                    f.hotelId = a.hotelId and 
                                    f.id = a.habitacionId
                                group by d.nombre, c.nombre, f.nombre, e.productoId");
        /*
        if($request->empresa){
            $consulta = DB::select("SELECT c.id, c.nombre nombreHotel, sum(e.importeVenta) importe
                                      FROM inventarios a,
                                           hoteles c,
                                           productos_defecto e
                                     where a.situacion = '".$request->tipo."' and
                                           c.empresaId = ".$request->empresa."  and
                                           a.fecha_posteo between '".$fechaIni."' and '".$fechaFin."' and
                                           a.hotelId = c.id and
                                           a.hotelId = e.hotelId and
                                           a.productoId = e.productoId 
                                  group by c.id, c.nombre");
        }
        if($request->hotel){
            $consulta = DB::select("SELECT b.id, b.nombre nombreHabitacion, sum(e.importeVenta) importe 
                                      FROM inventarios a,
                                           habitaciones b,
                                           productos_defecto e
                                     where a.situacion = '".$request->tipo."' and
                                           a.habitacionId = b.id and
                                           a.hotelId = ".$request->hotel." and
                                           a.productoId = e.productoId and
                                           a.fecha_posteo between '".$fechaIni."' and '".$fechaFin."'
                                  group by b.id, b.nombre");
        }
        if($request->habitacion){
            $consulta = DB::select("SELECT f.id, f.nombre, f.imagen, sum(e.importeVenta) importe
                                      FROM inventarios a,
                                           productos_defecto e,
                                           productos f
                                     where a.situacion = '".$request->tipo."' and
                                           a.habitacionId = ".$request->habitacion." and
                                           a.hotelId = e.hotelId and
                                           a.productoId = e.productoId and
                                           e.productoId = f.id and
                                           a.fecha_posteo between '".$fechaIni."' and '".$fechaFin."'
                                  group by f.id, f.nombre, f.imagen");
            
            foreach($consulta as $clave => $valor){
                //
                //Arreglamos la imagen
                //
                if (!file_exists($valor->imagen)) 
                    $valor->imagen = "imagenes/sinimagen.jpg";
            }
        }*/

        return $consulta;

    }

    public function resumenventas($empresa, $tipoImporte){
        //
        //Controlamos todas las posibilidades
        //
        $tipos = array("Acumulado", "mesAnterior", "mesActual", "hoy");
        $fecha_ini = array(date("Y")."-01-01",
                           date('Y-m-d', mktime(0, 0, 0, date('m')-1, 1, date('Y'))),
                           date("Y-m")."-01",
                           date("Y-m-d"));
        $fecha_fin = array(date("Y-m-d"), 
                           date('Y-m-t', mktime(0, 0, 0, date('m')-1, 1, date('Y'))),
                           date("Y-m-d"),
                           date("Y-m-d"));
        //
        //Guardamos 
        //
        for($i=0;$i<count($fecha_ini);$i++){

            $consulta[$tipos[$i]] = DB::select("SELECT d.nombre nombreEmpresa, 
                                        '".$tipos[$i]."' as tipo,
                                        c.nombre nombreHotel, 
                                        sum(e.".$tipoImporte.") importe
                                    FROM inventarios a,
                                        hoteles c,
                                        empresas d,
                                        productos_defecto e
                                    where a.situacion = 'V' and 
                                        d.id = '".$empresa."' and 
                                        c.empresaId = d.id and
                                        a.hotelId = c.id and
                                        a.productoId = e.productoId and
                                        e.hotelId = a.hotelId and
                                        a.fecha_posteo between '".$fecha_ini[$i]."' and '".$fecha_fin[$i]."'
                                group by d.nombre, c.nombre");

        }
        foreach($consulta as $clave => $valor){
            if(isset($valor[0])){
                if(!isset($datos[$valor[0]->nombreHotel])){
                    $datos[$valor[0]->nombreHotel] = array("Hotel" => $valor[0]->nombreHotel,
                                                            "Acumulado" => 0,
                                                            "MesAnterior" => 0,
                                                            "MesActual" => 0,
                                                            "Hoy" => 0);
                }

                $datos[$valor[0]->nombreHotel] = array("Hotel" => $valor[0]->nombreHotel,
                                                       "Acumulado" => ($valor[0]->tipo == "Acumulado") ? $valor[0]->importe : $datos[$valor[0]->nombreHotel]["Acumulado"],
                                                       "MesAnterior" => ($valor[0]->tipo == "mesAnterior") ? $valor[0]->importe : $datos[$valor[0]->nombreHotel]["MesAnterior"],
                                                       "MesActual" => ($valor[0]->tipo == "mesActual") ? $valor[0]->importe : $datos[$valor[0]->nombreHotel]["MesActual"],
                                                       "Hoy" => ($valor[0]->tipo == "hoy") ? $valor[0]->importe : $datos[$valor[0]->nombreHotel]["Hoy"]);
            }
        }
        
        $sumaAcumulado = 0;
        $sumaMesAnterior = 0;
        $sumaMesActual = 0;
        $sumaHoy = 0;

        foreach($datos as $clave => $valor){
            $valorDevuelo[] = $valor;
            $sumaAcumulado += $valor["Acumulado"];
            $sumaMesAnterior += $valor["MesAnterior"];
            $sumaMesActual += $valor["MesActual"];
            $sumaHoy += $valor["Hoy"];
        }
        $valorDevuelo[] = array("Hotel" => "Total",
                                "Acumulado" => $sumaAcumulado,
                                "MesAnterior" => $sumaMesAnterior,
                                "MesActual" => $sumaMesActual,
                                "Hoy" => $sumaHoy);
        return $valorDevuelo;
    }
}