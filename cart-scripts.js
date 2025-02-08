// Получаем корзину из localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для отображения корзины
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');
    let totalPrice = 0;

    // Очистить корзину
    cartItemsDiv.innerHTML = '';

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.product}</h3>
            <p>Rozmiar: ${item.size}</p>
            <p>Cena: ${item.price} PLN</p>
        `;
        cartItemsDiv.appendChild(itemDiv);
        totalPrice += parseFloat(item.price);
    });

    totalPriceDiv.textContent = `Całkowita cena: ${totalPrice} PLN`;
}

// Обработчик для оформления заказа
document.getElementById('checkout-button').addEventListener('click', () => {
    alert('Zamówienie zostało złożone!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
});

// Отображаем корзину
displayCart();
