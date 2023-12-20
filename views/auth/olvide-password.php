<h1 class="nombre-pagina">Forgot Password?</h1>
<p class="descripcion-pagina">Reset your password by entering your email</p>

<!-- DIR hace referenia al archivo actual -->
<?php include_once __DIR__ . "/../templates/alertas.php"?>

<form action="/olvide" class="formulario" method="POST">

        <div class="campo">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Email" name="email">
        </div>

        <input type="submit" class="boton" value="Send Instructions">
  
</form>

<div class="acciones">
    <a href="/">Do you already have an account? Log in</a>
    <a href="/crear-cuenta">Still dont have an account? Create one</a>
</div>