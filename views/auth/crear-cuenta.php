
<h1 class="nombre-pagina">Create account</h1>
<p class="descripcion-pagina">Fill the next form to create an account</p>

<!-- DIR hace referenia al archivo actual -->
<?php include_once __DIR__ . "/../templates/alertas.php"?>

<form action="/crear-cuenta" class="formulario" method="POST">
   
        <div class="campo">
            <label for="nombre">Name</label>
            <input type="text" id="nombre" placeholder="Name" name="nombre" value="<?php echo s($usuario->nombre); ?>">
        </div>

        <div class="campo">
            <label for="apellido">Last Name</label>
            <input type="text" id="apellido" placeholder="Last Name" name="apellido" value="<?php echo s($usuario->apellido); ?>">
        </div>

        <div class="campo">
            <label for="telefono">Phone number</label>
            <input type="tel" id="telefono" placeholder="Phone number" name="telefono">
        </div>

        <div class="campo">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Email" name="email">
        </div>

        <div class="campo">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password" name="password">
        </div>

        <input type="submit" class="boton" value="Create account">
  
</form>

<div class="acciones">
    <a href="/">Do you already have an account? Log in</a>
    <a href="/olvide">Forgot your password?</a>
</div>