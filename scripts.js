document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Обновляем счетчик корзины
    document.getElementById('cart-count').textContent = cart.length;

    // Обработчик для кнопок "Kupić"
    const buyButtons = document.querySelectorAll('.buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Кнопка нажата!'); // Логируем клик по кнопке

            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productSize = this.previousElementSibling.value; // Получаем выбранный размер

            if (!productSize) {
                alert('Proszę wybrać rozmiar!');
                return;
            }

            const product = {
                name: productName,
                price: productPrice,
                size: productSize,
                quantity: 1
            };

            const existingProduct = cart.find(item => item.name === productName && item.size === productSize);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Обновляем счетчик товаров в корзине
            document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);

            alert(`${productName} (${productSize}) został dodany do koszyka.`);
            console.log('Товар добавлен:', product);
            console.log('Текущая корзина:', cart);
        });
    });
});

// Обработчик для формы оплаты
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const paymentMethod = paymentMethodSelect.value;

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const apartment = document.getElementById('apartment').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;

    const orderData = {
        firstName,
        lastName,
        email,
        phone,
        address,
        apartment,
        city,
        postalCode,
        paymentMethod
    };

    if (paymentMethod === 'card') {
        stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        }).then(function(result) {
            if (result.error) {
                cardErrors.textContent = result.error.message;
            } else {
                alert('Płatność kartą została przyjęta!');
                sendOrderEmail(orderData, 'card');
                showOrderConfirmation();
                
                // Очистка корзины только после успешной оплаты
                clearCart();
            }
        });
    } else {
        alert('Zamówienie zostało złożone. Można zapłacić gotówką przy odbiorze.');
        sendOrderEmail(orderData, 'cash');
        showOrderConfirmation();
        
        // Очистка корзины только после успешной оплаты
        clearCart();
    }
});

// Функция для очистки корзины
function clearCart() {
    localStorage.removeItem('cart');  // Очищаем корзину
    document.getElementById('cart-count').textContent = 0;  // Обновляем счетчик на странице
    console.log('Корзина очищена');
}

function showOrderConfirmation() {
    const confirmationMessage = document.createElement('div');
    confirmationMessage.textContent = "Ваш заказ успешно оформлен! Спасибо за покупку!";
    document.body.appendChild(confirmationMessage);
    setTimeout(function() {
        window.location.href = '/'; // Перенаправляем на главную страницу после 3 секунд
    }, 3000);
}

// Функция для валидации формы
function validateForm() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;

    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
        alert("Proszę wypełnić wszystkie pola!");
        return false;
    }

    return true;
}
