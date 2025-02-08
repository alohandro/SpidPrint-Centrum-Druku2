// Загрузка корзины из localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновляем счетчик в шапке
document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);

// Контейнеры для товаров и общей цены
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceContainer = document.getElementById('total-price');

// Отображаем товары в корзине
cart.forEach(item => {
    const productElement = document.createElement('div');
    productElement.innerHTML = ` 
        <p>${item.name} (${item.size}) - ${item.quantity} x ${item.price} PLN = ${item.price * item.quantity} PLN</p>
        <button class="remove-item" data-product="${item.name}" data-size="${item.size}">Usuń</button>
    `;
    cartItemsContainer.appendChild(productElement);
});

// Выводим общую цену
const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
totalPriceContainer.textContent = `Łączna cena: ${totalPrice} PLN`;

// Проверка на пустую корзину
if (cart.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Twoja koszyk jest pusty!';
    cartItemsContainer.appendChild(emptyMessage);
}

// Обработчик кнопок удаления товара
document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        const productSize = this.getAttribute('data-size');

        // Удаляем товар из корзины
        cart = cart.filter(item => !(item.name === productName && item.size === productSize));

        // Сохраняем обновленную корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Обновляем корзину на странице
        window.location.reload();
    });
});

// Обработчик кнопки "Przejdź do zamówienia"
document.getElementById('checkout-button').addEventListener('click', function() {
    // Переход на страницу оформления заказа
    window.location.href = 'checkout.html'; 
});

console.log('Текущая корзина:', cart);
