<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "spidprintpl@gmail.com"; // Ваш адрес электронной почты
    $subject = "Nowe zamówienie od $name";
    $body = "Imię i nazwisko: $name\nAdres email: $email\nWiadomość:\n$message";

    // Заголовки
    $headers = "Od: $name <$email>" . "\r\n" . "Odpowiedź na: $email" . "\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Zamówienie zostało wysłane!";
    } else {
        echo "Wystąpił problem z wysłaniem zamówienia.";
    }
} else {
    echo "Niepoprawna metoda żądania.";
}
?>
