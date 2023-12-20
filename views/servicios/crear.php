<h1 class="nombre-pagina">Nuevo servicio</h1>
<p class="descripcion-pagina">Administracion de servicios</p>

<!-- DIR hace referenia al archivo actual -->
<?php include_once __DIR__ . "/../templates/alertas.php"?>

<form action="/servicios/crear" method="POST" class="formulario">
    <?php include_once __DIR__ . "/formulario.php"?>
    <input type="submit" class="boton" value="Guardar Servicio">
</form>