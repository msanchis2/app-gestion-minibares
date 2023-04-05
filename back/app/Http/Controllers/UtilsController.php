<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
/**
 * Class UtilsController
 * @package App\Http\Controllers
 */
class UtilsController extends Controller
{
    /**
     * Sube una imagen y devuelve su url
     *
     * @return \Illuminate\Http\Response
     */
    public static function subeImagen($imagen, $ruta_a_borrar)
    {
        if(strpos($imagen, "imagenes/") !== false)
            return $imagen;
        else{
            if (($imagen) && (strpos($imagen, "sinimagen.jpg") === false)){
                $folderPath = "imagenes/";
                $base64Image = explode(";base64,", $imagen);
                $explodeImage = explode("image/", $base64Image[0]);
                $imageType = $explodeImage[1];
                $image_base64 = base64_decode($base64Image[1]);
                $file = $folderPath . uniqid() .'.'. $imageType;
                file_put_contents($file, $image_base64);
                return $file;
            }
        }
    }

}