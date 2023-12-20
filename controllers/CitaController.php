<?php
namespace Controllers;

use MVC\Router;

class CitaController {

    public static function index(Router $router) {

        //AQUI SE PUEDE CREAR UN MODELO LLAMDO SERVICIOS Y TRAERLOS CON EL METODO ALL PERO MEJOR HAY USAR API
        session_start();

        isAuth();
        
        $router->render('cita/index', [
           'nombre' => $_SESSION['nombre'],
           'id' => $_SESSION['id']
        ]);
    }
}