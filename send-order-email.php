<?php
// Устанавливаем получателя и заголовки письма
$to = 'spidprintpl@gmail.com';
$subject = 'Nowe zamówienie na SpidPrint';

// Получаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

// Формируем тело письма
$message = "Nowe zamówienie:\n\n";
$message .= "Imię: " . $data['orderData']['firstName'] . "\n";
$message .= "Nazwisko: " . $data['orderData']['lastName'] . "\n";
$message .= "E-mail: " . $data['orderData']['email'] . "\n";
$message .= "Telefon: " . $data['orderData']['phone'] . "\n";
$message .= "Adres: " . $data['orderData']['address'] . "\n";
$message .= "Mieszkanie: " . $data['orderData']['apartment'] . "\n";
$message .= "Miasto: " . $data['orderData']['city'] . "\n";
$message .= "Kod pocztowy: " . $data['orderData']['postalCode'] . "\n";
$message .= "Metoda płatności: " . ($data['paymentMethod'] === 'card' ? 'Płatność kartą' : 'Gotówka przy odbiorze') . "\n";

// Заголовки для отправки письма
$headers = 'From: no-reply@spidprint.com' . "\r\n" .
    'Reply-To: ' . $data['orderData']['email'] . "\r\n" .
    'Content-Type: text/plain; charset=UTF-8' . "\r\n";

// Отправляем письмо
if(mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "success", "message" => "Zamówienie zostało wysłane."]);
} else {
    echo json_encode(["status" => "error", "message" => "Błąd podczas wysyłania zamówienia."]);
}
?>
