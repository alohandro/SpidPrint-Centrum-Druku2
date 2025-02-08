document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('pk_live_51QQ6bVJMFdQsEoomX9Jas8mguqAJh1BFZLJ7REOCYPnn5MldxdoUBNgL4XRL8xBOsr3YW95SyLH8d4SqguCf9cgN00v94n2aF0'); // Ваш публичный ключ Stripe
    const elements = stripe.elements();

    // Создаем Stripe Element для ввода данных карты
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    // Получаем формы и элементы
    const cardDetails = document.getElementById('card-details');
    const cashDetails = document.getElementById('cash-details');

    // Устанавливаем слушатель для выбора метода оплаты
    const paymentMethodRadioButtons = document.querySelectorAll('input[name="payment-method"]');
    paymentMethodRadioButtons.forEach(button => {
        button.addEventListener('change', () => {
            if (button.value === 'card') {
                cardDetails.style.display = 'block';
                cashDetails.style.display = 'none';
            } else if (button.value === 'cash') {
                cardDetails.style.display = 'none';
                cashDetails.style.display = 'block';
            }
        });
    });

    // Обработчик для формы с картой
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Создаем платежное намерение на сервере
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 22500 })  // Цена в копейках (225 PLN = 22500)
        });
        const { clientSecret } = await response.json();

        // Подтверждаем оплату с помощью Stripe
        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'Test User'  // Здесь можно добавить имя пользователя, если нужно
                }
            }
        });

        if (error) {
            alert(error.message);
        } else {
            if (error === null) {
                alert('Płatność została pomyślnie przetworzona!');
                // Здесь можно добавить код для завершения оформления заказа
            }
        }
    });

    // Обработчик для формы наличных
    const cashForm = document.getElementById('delivery-form');
    cashForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Получаем данные из формы
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        // Здесь вы можете обработать данные, например, отправить их на сервер
        alert(`Zamówienie złożone! Adres: ${address}, Telefon: ${phone}`);
        // Здесь добавьте код для завершения оформления заказа с наличными
    });
});
