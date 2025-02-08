<?php
// Получаем данные, отправленные через POST
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
    exit;
}

// Данные из формы
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$email = $data['email'];
$phone = $data['phone'];
$address = $data['address'];
$apartment = $data['apartment'];
$city = $data['city'];
$postalCode = $data['postalCode'];
$paymentMethod = $data['paymentMethod'];
$cartItems = $data['cartItems'];

// Строим сообщение
$subject = 'Nowe zamówienie w SpidPrint';
$message = "
    <h1>Nowe zamówienie</h1>
    <p><strong>Imię:</strong> $firstName</p>
    <p><strong>Nazwisko:</strong> $lastName</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Telefon:</strong> $phone</p>
    <p><strong>Adres:</strong> $address</p>
    <p><strong>Apartament:</strong> $apartment</p>
    <p><strong>Miasto:</strong> $city</p>
    <p><strong>Kod pocztowy:</strong> $postalCode</p>
    <p><strong>Metoda płatności:</strong> $paymentMethod</p>
    <h2>Produkty w zamówieniu:</h2>";

foreach ($cartItems as $item) {
    $message .= "
        <p>{$item['name']} ({$item['size']}) - {$item['quantity']} x {$item['price']} PLN = " . ($item['price'] * $item['quantity']) . " PLN</p>";
}

$totalPrice = 0;
foreach ($cartItems as $item) {
    $totalPrice += $item['price'] * $item['quantity'];
}

$message .= "<p><strong>Łączna cena:</strong> $totalPrice PLN</p>";

// Заголовки письма
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: SpidPrint <no-reply@spidprint.pl>" . "\r\n";

// Отправляем email
$to = 'spidprintpl@gmail.com'; // Ваш email
$mailSent = mail($to, $subject, $message, $headers);

// Ответ о статусе
if ($mailSent) {
    echo json_encode(['status' => 'success', 'message' => 'Order sent to email']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to send email']);
}
?>
