"use strict"


export function openModal() {
   initModal()
}
// ===========================================================================================
async function initModal() {
   const openButtons = document.querySelectorAll('.open-btn-modal');
   const modalOverlay = document.querySelector('#modal-overlay');
   const modalContent = document.querySelector('#modal-content');
   const fixedElements = document.querySelectorAll('.header, .fixed-element');

   if (!openButtons.length || !modalOverlay || !modalContent) return;

   // ПРИМУСОВИЙ метод обчислення ширини скролбару
   function getScrollbarWidth() {
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll';
      document.body.appendChild(outer);
      const inner = document.createElement('div');
      outer.appendChild(inner);
      const width = outer.offsetWidth - inner.offsetWidth;
      outer.parentNode.removeChild(outer);
      return width;
   }

   function openModal() {
      const scrollWidth = getScrollbarWidth();

      // Встановлюємо CSS-змінну для всього документа
      document.documentElement.style.setProperty('--lock-padding', `${scrollWidth}px`);

      document.body.classList.add('no-scroll');
      modalOverlay.classList.add('is-open');
      modalOverlay.setAttribute('aria-hidden', 'false');
   }

   function closeModal() {
      modalOverlay.classList.remove('is-open');
      modalOverlay.setAttribute('aria-hidden', 'true');
      // Клас no-scroll і змінну видаляємо ПІСЛЯ завершення анімації (transitionend вже є нижче)
   }

   modalOverlay.addEventListener('transitionend', (e) => {
      // Перевіряємо, що анімувався саме оверлей (opacity), а не внутрішні елементи
      if (e.target === modalOverlay && !modalOverlay.classList.contains('is-open')) {
         document.body.classList.remove('no-scroll');
         document.documentElement.style.removeProperty('--lock-padding');
      }
   });

   openButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
         e.preventDefault();

         // 1. Якщо контент ще не завантажений
         if (modalContent.innerHTML.trim() === '') {
            try {
               // Показуємо лоадер прямо у вікні перед тим, як відкрити його
               modalContent.innerHTML = '<div class="modal-loader">Loading...</div>';

               // Відкриваємо "порожнє" вікно з лоадером (користувач бачить, що щось відбувається)
               openModal();

               const response = await fetch('modal.html');
               if (!response.ok) throw new Error('Помилка завантаження');
               const html = await response.text();

               // 2. Коли дані прийшли — замінюємо лоадер на форму
               // Робимо це з невеликою затримкою для плавності
               setTimeout(() => {
                  modalContent.innerHTML = html;
               }, 100);

            } catch (err) {
               modalContent.innerHTML = '<p>Помилка завантаження форми.</p>';
            }
         } else {
            // Якщо контент вже завантажений раніше — просто відкриваємо
            openModal();
         }
      });
   });

   modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.closest('[data-modal-close]')) {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
         closeModal();
      }
   });
}




const setVh = () => {
   document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
   );
};

setVh();
window.addEventListener('resize', setVh);
