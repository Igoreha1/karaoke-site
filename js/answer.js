document.addEventListener('DOMContentLoaded', function() {
    const faqButtons = document.querySelectorAll('.faq-button');
  
    faqButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Закрываем все открытые ответы
        document.querySelectorAll('.faq-button').forEach(btn => {
          if (btn !== this) {
            btn.classList.remove('active');
            btn.nextElementSibling.classList.remove('active');
          }
        });
  
        // Открываем/закрываем текущий ответ
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('active');
      });
    });
  });