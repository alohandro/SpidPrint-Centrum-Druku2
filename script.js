document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const shirtImage = document.getElementById('shirt');
            shirtImage.src = e.target.result; // Устанавливаем загруженное изображение
            shirtImage.style.display = "block"; // Показываем загруженное изображение
        };
        reader.readAsDataURL(file);
    }
});
