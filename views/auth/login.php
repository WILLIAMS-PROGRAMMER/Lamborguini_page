<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Complete all the fields</p>

<!-- DIR hace referenia al archivo actual -->
<?php include_once __DIR__ . "/../templates/alertas.php"?>

<form action="" class="formulario" method="POST">
   
        <div class="campo">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Email" name="email">
        </div>

        <div class="campo">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" name="password">
        </div>

        <input type="submit" class="boton" value="Log in">
  
</form>

<div class="acciones">
    <a href="/crear-cuenta">Still don't have an account? Create one</a>
    <a href="/olvide">Forgot your password?</a>
</div>