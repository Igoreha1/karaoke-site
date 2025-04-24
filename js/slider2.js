document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.slider-track');
  const items = document.querySelectorAll('.slider-item');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const currentSlideEl = document.querySelector('.current-slide');
  const totalSlidesEl = document.querySelector('.total-slides');

  let currentPosition = 0;
  const itemWidth = items[0].offsetWidth + 20; // Ширина + gap
  let currentSlide = 1;
  const totalSlides = items.length;
  const visibleSlides = 5; // Показываем 5 слайдов

  totalSlidesEl.textContent = totalSlides;

  function updateSlider() {
      // Центрируем текущий слайд
      const centerOffset = (Math.floor(visibleSlides / 2) * itemWidth) - (itemWidth / 2);
      currentPosition = -(currentSlide - 1) * itemWidth + centerOffset;

      // Ограничиваем позицию для крайних слайдов
      const maxPosition = (totalSlides - visibleSlides) * itemWidth;

      // Если текущий слайд находится в последних слайдах, корректируем позицию
      if (currentSlide > totalSlides - Math.floor(visibleSlides / 2)) {
          currentPosition = -maxPosition; // Устанавливаем позицию на максимальное значение
      } else {
          currentPosition = Math.min(Math.max(currentPosition, -maxPosition), 0);
      }

      track.style.transform = `translateX(${currentPosition}px)`;
      currentSlideEl.textContent = currentSlide;

      // Обновляем классы для эффектов
      updateSlideEffects();

      // Отключаем кнопки при достижении границ
      prevBtn.disabled = currentSlide === 1;
      nextBtn.disabled = currentSlide === totalSlides;
  }

  function updateSlideEffects() {
      // Сбрасываем все классы
      items.forEach(item => {
          item.classList.remove('active');
      });

      // Устанавливаем активный слайд
      if (items[currentSlide - 1]) {
          items[currentSlide - 1].classList.add('active');
      }
  }

  nextBtn.addEventListener('click', function() {
      if (currentSlide < totalSlides) {
          currentSlide++;
          updateSlider();
      }
  });

  prevBtn.addEventListener('click', function() {
      if (currentSlide > 1) {
          currentSlide--;
          updateSlider();
      }
  });

  // Инициализация
  updateSlider();

  // Адаптация при изменении размера окна
  window.addEventListener('resize', function() {
      const newItemWidth = items[0].offsetWidth + 20;
      currentPosition = -(currentSlide - 1) * newItemWidth;
      updateSlider();
  });
});
