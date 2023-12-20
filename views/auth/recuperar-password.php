<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo Password</p>

<!-- DIR hace referenia al archivo actual -->
<?php include_once __DIR__ . "/../templates/alertas.php"?>
<?php if($error) return 0 ?>
<form class="formulario" method="POST">

        <div class="campo">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" name="password">
        </div>

        <input type="submit" class="boton" value="Resetear contraseña">
  
</form>

<div class="acciones">
    <a href="/">Do you already have an account? Log in</a>
    <a href="/crear-cuenta">Still dont have an account? Create one</a>
</div>