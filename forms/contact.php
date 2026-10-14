<?php
/**
* Esto reemplaza el archivo contact.php para Rossomix
* Recibirá los datos del formulario y los enviará a ventas@rossomix.com.ar
*/

// Evita que se acceda al script directamente
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    die("Acceso no permitido");
}

// ****** CONFIGURACIÓN ******
// Aquí es donde se define el correo que recibirá los mensajes.
$receiving_email_address = 'ventas@rossomix.com.ar';
// ***************************

// Limpia y recoge los datos del formulario
$name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$subject = filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING);
$message = trim($_POST['message']);

// Validación simple: asegúrate de que los campos no estén vacíos
if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($subject) || empty($message)) {
    // Si algún campo falla la validación, envía un mensaje de error.
    // El script de tu web (validate.js) NO mostrará este mensaje, pero es una buena práctica tenerlo.
    http_response_code(400);
    die('Por favor, completa todos los campos correctamente.');
}

// Construye el cuerpo del correo
$email_content = "Nombre: $name\n";
$email_content .= "Email: $email\n\n";
$email_content .= "Asunto: $subject\n";
$email_content .= "Mensaje:\n$message\n";

// Construye las cabeceras del correo
// Es importante establecer un 'From' del mismo dominio para evitar que se marque como spam.
$email_headers = "From: Formulario Web Rossomix <no-reply@rossomix.com.ar>\r\n";
$email_headers .= "Reply-To: $email\r\n";
$email_headers .= "X-Mailer: PHP/" . phpversion();

// Envía el correo
// La función mail() depende de la configuración del servidor de hosting.
if (mail($receiving_email_address, "Nuevo mensaje de contacto: $subject", $email_content, $email_headers)) {
    // Si el envío es exitoso, devuelve un código 200 (OK).
    // El script validate.js necesita una respuesta vacía o un texto simple para mostrar el mensaje de éxito.
    http_response_code(200);
    // No es necesario devolver un mensaje aquí. El front-end lo gestiona.
} else {
    // Si la función mail() falla, devuelve un error de servidor.
    http_response_code(500);
    die('Hubo un error al enviar el mensaje.');
}

?>