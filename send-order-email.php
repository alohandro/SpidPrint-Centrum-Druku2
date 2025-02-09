<?php
require 'vendor/autoload.php'; // Подключаем Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Загружаем данные из POST
$data = json_decode(file_get_contents('php://input'), true);

$orderData = $data['orderData'];
$paymentMethod = $data['paymentMethod'];

// Создаем объект PHPMailer
$mail = new PHPMailer(true);

try {
    // Настройка почтового сервера
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';  // Используем SMTP сервер Gmail
    $mail->SMTPAuth = true;
    $mail->Username = 'xclusivestoreofficial@gmail.com';  // Твой email
    $mail->Password = 'alfatron';  // Твой пароль или App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // От кого и кому отправляем
    $mail->setFrom('xclusivestoreofficial@gmail.com', 'Xclusive Store');
    $mail->addAddress('xclusivestoreofficial@gmail.com', 'Xclusive Store');  // Отправляем на тот же email

    // Тема письма
    $mail->Subject = 'Nowe zamówienie - ' . ($paymentMethod === 'card' ? 'Płatność kartą' : 'Gotówka przy odbiorze');

    // Тело письма
    $bodyContent = "<h3>Nowe zamówienie z Xclusive Store:</h3>";
    $bodyContent .= "<p><strong>Imię:</strong> {$orderData['firstName']}</p>";
    $bodyContent .= "<p><strong>Nazwisko:</strong> {$orderData['lastName']}</p>";
    $bodyContent .= "<p><strong>Email:</strong> {$orderData['email']}</p>";
    $bodyContent .= "<p><strong>Telefon:</strong> {$orderData['phone']}</p>";
    $bodyContent .= "<p><strong>Adres:</strong> {$orderData['address']} {$orderData['apartment']}</p>";
    $bodyContent .= "<p><strong>Miasto:</strong> {$orderData['city']}</p>";
    $bodyContent .= "<p><strong>Kod pocztowy:</strong> {$orderData['postalCode']}</p>";
    $bodyContent .= "<p><strong>Metoda płatności:</strong> " . ($paymentMethod === 'card' ? 'Płatność kartą' : 'Gotówka przy odbiorze') . "</p>";

    $mail->isHTML(true);
    $mail->Body = $bodyContent;

    // Отправка письма
    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Order email sent successfully!']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
}
?>
