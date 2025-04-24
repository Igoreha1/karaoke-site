document.addEventListener('DOMContentLoaded', function() {
    // Данные для залов (основные изображения и миниатюры)
    const hallsData = {
        1: {
            main: 'images/hall1/main.png',
            images: [
                'images/hall1/1.jpg',
                'images/hall1/2.jpg',
                'images/hall1/3.jpg',
                'images/hall1/4.jpg',
                'images/hall1/5.jpg',
                'images/hall1/6.jpg',
                'images/hall1/7.jpg',
                'images/hall1/8.jpg',
                'images/hall1/9.jpg',
                'images/hall1/10.jpg',
                'images/hall1/11.jpg',
                'images/hall1/12.jpg',
                'images/hall1/13.jpg',
                'images/hall1/14.jpg'
            ],
            info: {
                number: "№1",
                area: "40 м²",
                capacity: "до 20-ти человек",
            }
        },
        2: {
            main: 'images/hall2/main.jpg',
            images: [
                'images/hall2/1.jpg',
                'images/hall2/2.jpg',
                'images/hall2/3.jpg',
                'images/hall2/4.jpg',
                'images/hall2/5.jpg',
                'images/hall2/6.jpg',
                'images/hall2/7.jpg'
            ],
            info: {
                number: "№2",
                area: "20 м²",
                capacity: "до 30-ти человек",
            }
        },
        3: {
            main: 'images/hall3/main.png',
            images: [
                'images/hall3/1.jpg',
                'images/hall3/2.jpg',
                'images/hall3/3.jpg',
                'images/hall3/4.jpg',
                'images/hall3/5.jpg',
                'images/hall3/6.jpg',
                'images/hall3/7.jpg',
                'images/hall3/8.jpg',
                'images/hall3/9.jpg',
                'images/hall3/10.jpg',
                'images/hall3/11.jpg',
                'images/hall3/12.jpg',
                'images/hall3/13.jpg',
                'images/hall3/14.jpg'
            ],
            info: {
                number: "№3",
                area: "45 м²",
                capacity: "до 50-ти человек",
            }
        },
        4: {
            main: 'images/hall4/main.png',
            images: [
                'images/hall4/1.jpg',
                'images/hall4/2.jpg',
                'images/hall4/3.jpg',
                'images/hall4/4.jpg',
                'images/hall4/5.jpg',
                'images/hall4/6.jpg',
                'images/hall4/7.jpg',
                'images/hall4/8.jpg',
                'images/hall4/9.jpg',
                'images/hall4/10.jpg',
                'images/hall4/11.jpg',
                'images/hall4/12.jpg',
                'images/hall4/13.jpg',
                'images/hall4/14.jpg'
            ],
            info: {
                number: "№4",
                area: "100 м²",
                capacity: "до 500-сот человек",
            }
        }
    };

    // Элементы DOM
    const mainImg = document.getElementById('main-hall-img');
    const thumbnailsContainer = document.querySelector('.secondary-hall-images');
    const currentSlide = document.getElementById('current-slide');
    const totalSlides = document.getElementById('total-slides');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const hallButtons = document.querySelectorAll('.hall-selector-btn');
    let currentHall = 1;
    let currentIndex = 0;
    let currentThumbPage = 0;
    const itemsPerPage = 5;

    // Элементы информации о зале
    const hallNumberElement = document.querySelector('.hall-info-number');
    const hallAreaElement = document.querySelector('.hall-info-area');
    const hallCapacityElement = document.querySelector('.hall-info-capacity');

    // Инициализация
    function init() {
        loadHallImages(currentHall);
        updateHallInfo(currentHall);
        hallButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                currentHall = parseInt(this.getAttribute('data-hall'));
                currentIndex = 0;
                currentThumbPage = 0;
                loadHallImages(currentHall);
                updateActiveHallButton();
                updateHallInfo(currentHall);
            });
        });
    }

    function updateHallInfo(hallNumber) {
        const hall = hallsData[hallNumber];
        if (hallNumberElement) hallNumberElement.textContent = hall.info.number;
        if (hallAreaElement) hallAreaElement.textContent = hall.info.area;
        if (hallCapacityElement) hallCapacityElement.textContent = hall.info.capacity;
    }

    // Загрузка изображений для выбранного зала
    function loadHallImages(hallNumber) {
        const hall = hallsData[hallNumber];
        mainImg.src = hall.main;
        mainImg.alt = `Зал ${hallNumber}`;
        
        // Обновляем миниатюры
        createThumbnails(hall.images);
        totalSlides.textContent = hall.images.length;
        currentSlide.textContent = currentIndex + 1;
        updateVisibleThumbnails();
    }

    // Создание миниатюр
    function createThumbnails(images) {
        thumbnailsContainer.innerHTML = '';
        
        images.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'hall-thumbnail';
            thumbnail.dataset.index = index;
            if (index === currentIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.innerHTML = `
                <img src="${img}" alt="Зал ${currentHall} - фото ${index + 1}">
                <div class="thumbnail-overlay"></div>
            `;
            
            thumbnail.addEventListener('click', () => {
                const clickedIndex = parseInt(thumbnail.dataset.index);
                updateMainImage(clickedIndex, images);
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // Обновление видимых миниатюр (только 5)
    function updateVisibleThumbnails() {
        const images = hallsData[currentHall].images;
        const startIndex = currentThumbPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        document.querySelectorAll('.hall-thumbnail').forEach(thumb => {
            const thumbIndex = parseInt(thumb.dataset.index);
            if (thumbIndex >= startIndex && thumbIndex < endIndex) {
                thumb.style.display = 'block';
            } else {
                thumb.style.display = 'none';
            }
        });
    }

    // Обновление главного изображения
    function updateMainImage(index, images) {
        currentIndex = index;
        mainImg.src = images[index];
        mainImg.alt = `Зал ${currentHall} - фото ${index + 1}`;
        currentSlide.textContent = index + 1;
        
        // Обновляем активную миниатюру
        document.querySelectorAll('.hall-thumbnail').forEach(thumb => {
            const thumbIndex = parseInt(thumb.dataset.index);
            thumb.classList.toggle('active', thumbIndex === index);
        });
        
        // Обновляем текущую страницу миниатюр
        const newThumbPage = Math.floor(index / itemsPerPage);
        if (newThumbPage !== currentThumbPage) {
            currentThumbPage = newThumbPage;
            updateVisibleThumbnails();
        }
    }

    // Навигация по слайдам
    prevButton.addEventListener('click', () => {
        const images = hallsData[currentHall].images;
        if (currentIndex > 0) {
            currentIndex--;
            updateMainImage(currentIndex, images);
        }
    });

    nextButton.addEventListener('click', () => {
        const images = hallsData[currentHall].images;
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateMainImage(currentIndex, images);
        }
    });

    // Обновление активной кнопки зала
    function updateActiveHallButton() {
        hallButtons.forEach(btn => {
            btn.classList.toggle('active', 
                parseInt(btn.getAttribute('data-hall')) === currentHall);
        });
    }

    init();
});