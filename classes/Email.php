<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email {

    public $email;
    public $nombre;
    public $token;

    public function __construct($email,$nombre,$token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion() {
        //Crea el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();                                          
        $mail->Host       = $_ENV['EMAIL_HOST'];            
        $mail->SMTPAuth   = true;                               
        $mail->Username   = $_ENV['EMAIL_USER'];               
        $mail->Password   = $_ENV['EMAIL_PASS'];                              
        $mail->Port       = $_ENV['EMAIL_PORT'];        

        $mail->setFrom('cuentas@lamborguinipage.com');
        $mail->addAddress($this->email,'lamborguini.com');
        $mail->Subject = 'Confirm your account';

        //Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = '<html>';
        $contenido .= " <p><strong>Hello " . $this->nombre . "</strong> You have created your account in Lamborguini App, you just have to confirm it by clicking the following link</p>";
        $contenido .= "<p>Click here: <a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=" . $this->token . "'>Confirm your Account</a></p>";
        $contenido .= "<p>If you did not request this account, you can ignore the message</p>";
        $contenido .= '</html>';

        $mail->Body = $contenido;

        //Enviar Email
        $mail->send();
    }

    public function enviarInstrucciones() {
        //crear objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();                                          
        $mail->Host       = $_ENV['EMAIL_HOST'];            
        $mail->SMTPAuth   = true;                               
        $mail->Username   = $_ENV['EMAIL_USER'];               
        $mail->Password   = $_ENV['EMAIL_PASS'];                              
        $mail->Port       = $_ENV['EMAIL_PORT'];         

        $mail->setFrom('cuentas@lamborguinipage.com');
        $mail->addAddress($this->email,'lamborguini.com');
        $mail->Subject = 'Reestablece tu password';
    
        //Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = '<html>';
        $contenido .= " <p><strong>Hola " . $this->nombre . "</strong> Has solicitado restablecer tu password , presiona el siguiente enlace para reestablecer</p>";
        $contenido .= "<p>Presiona aquí: <a href='" . $_ENV['APP_URL'] . "/recuperar?token=" . $this->token . "'>Reestablecer password</a></p>";
        $contenido .= "<p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>";
        $contenido .= '</html>';

       

        $mail->Body = $contenido;

        $mail->send();
    }
}

