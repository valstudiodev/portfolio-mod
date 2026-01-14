"use strict"

export function initUtils() {
   slidersInit()
   document.querySelectorAll('[data-filter]').forEach(initFilter);
}

// ===========================================================================================
// -----------------------------
// current-page
// -----------------------------
document.addEventListener("DOMContentLoaded", function () {
   const currentUrl = window.location.href;
   const navLinks = document.querySelectorAll('.menu-header__link');

   navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');

      // 1. Ігноруємо посилання, які є просто заглушками для меню (#)
      if (linkHref === "#" || linkHref === "") {
         return;
      }

      // 2. Ігноруємо головну сторінку (якщо URL закінчується на / або index.html)
      // Видаліть цю умову, якщо на головній все ж таки потрібна підсвітка
      const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");
      if (isHomePage) {
         return;
      }

      // 3. Порівнюємо URL для всіх інших сторінок
      if (link.href === currentUrl) {
         link.classList.add('current-page');
      }
   });
});

// ===========================================================================================
// ===========================================================================================
// -----------------------------
// SLIDER
// -----------------------------
function slidersInit() {
   if (document.querySelector('.swiper--side')) {
      const swiper = new Swiper('.swiper--side', {
         loop: true,
         slidesPerView: 4,
         spaceBetween: 10,
         freeMode: true,
         watchSlidesProgress: true,
         // centteredSlides: false,

         // navigation: {
         //    nextEl: ".button-arrow--next",
         //    prevEl: ".button-arrow--prev",
         // },


      });

      var swiper2 = new Swiper(".swiper--main", {
         loop: true,
         spaceBetween: 10,
         navigation: {
            nextEl: ".button-arrow--next",
            prevEl: ".button-arrow--prev",
         },
         thumbs: {
            swiper: swiper,
         },
      });
   }
}

// ===========================================================================================
// -----------------------------
// accordion-menu
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
   const accordions = document.querySelectorAll("[data-accordion]");

   accordions.forEach((accordion) => {
      const btn = accordion.querySelector("[data-accordion-btn]");
      const body = accordion.querySelector("[data-accordion-body]");

      btn.addEventListener("click", (e) => {
         e.preventDefault();

         const isOpen = accordion.classList.contains("is-open");

         if (!isOpen) {
            // ВІДКРИТТЯ
            accordion.classList.add("is-open");
            // Встановлюємо висоту в px для запуску transition
            body.style.height = `${body.scrollHeight}px`;

            // Після завершення анімації ставимо auto для адаптивності
            body.addEventListener("transitionend", function handler() {
               if (accordion.classList.contains("is-open")) {
                  body.style.height = "auto";
               }
               body.removeEventListener("transitionend", handler);
            }, { once: true });

         } else {
            // ЗАКРИТТЯ
            // Спочатку міняємо auto на фіксовані px
            body.style.height = `${body.scrollHeight}px`;

            // Викликаємо перерахунок (force reflow)
            body.offsetHeight;

            // Запускаємо анімацію до 0
            requestAnimationFrame(() => {
               body.style.height = "0";
               accordion.classList.remove("is-open");
            });
         }
      });
   });
});


// ===========================================================================================
// -----------------------------
// filter
// -----------------------------
/**
 * Плавний скрол до елемента з урахуванням offset
 * @param {HTMLElement} target - елемент, до якого скролимо
 * @param {HTMLElement} root - контейнер з data-налаштуваннями
 * @param {number} [delay=0] - затримка перед скролом
 */
function smoothScrollTo(target, root, delay = 0) {
   if (!target || !root) return;

   const offset = +root.dataset.scrollOffset || 0;

   const startScroll = () => {
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const scrollPosition = targetTop - offset;

      window.scrollTo({
         top: scrollPosition,
         behavior: 'smooth'
      });
   };

   delay ? setTimeout(startScroll, delay) : startScroll();
}

/**
 * Ініціалізація фільтру карток
 * @param {HTMLElement} root - елемент з data-filter
 */
function initFilter(root) {
   if (!root) return;

   const buttons = root.querySelectorAll('[data-filter-btn]');
   const items = Array.from(root.querySelectorAll('[data-filter-item]'));
   const btnMore = root.querySelector('[data-filter-more-btn="more"]');
   const btnLess = root.querySelector('[data-filter-more-btn="less"]');

   const visibleDefault = +root.dataset.visible || items.length;
   const step = +root.dataset.step || visibleDefault;

   let currentCategory = 'all';
   let visibleCount = visibleDefault;

   const matchCategory = (item) => {
      if (currentCategory === 'all') return true;
      return item.dataset.category?.split(' ').includes(currentCategory);
   };

   const updateItems = (isShowMore = false) => {
      // 1. Отримуємо список карток, що підходять під категорію
      const matchedItems = items.filter(matchCategory);
      const totalMatched = matchedItems.length;

      // 2. Визначаємо, які з них мають бути показані
      matchedItems.forEach((item, index) => {
         if (index < visibleCount) {
            // Елемент має бути видимим
            item.hidden = false;
            item.style.transitionDelay = isShowMore && index >= (visibleCount - step)
               ? `${((index - (visibleCount - step)) % step) * 0.15}s`
               : '0s';

            requestAnimationFrame(() => {
               item.classList.add('is-visible');
            });
         } else {
            // Елемент має бути прихований
            item.classList.remove('is-visible');
            item.style.transitionDelay = '0s';

            // Використовуємо перевірку transitionend або фіксований час
            setTimeout(() => {
               if (!item.classList.contains('is-visible')) {
                  item.hidden = true;
               }
            }, 400);
         }
      });

      // 3. Приховуємо ті картки, які взагалі не підпадають під категорію (без затримок)
      items.filter(item => !matchCategory(item)).forEach(item => {
         item.classList.remove('is-visible');
         item.hidden = true;
      });

      // 4. ОНОВЛЕННЯ КНОПОК (рахуємо по логічних масивах)
      // Кнопка More: показуємо, якщо ще є що відкривати в цій категорії
      if (btnMore) {
         btnMore.hidden = visibleCount >= totalMatched;
      }

      // Кнопка Less: показуємо, якщо зараз показано більше, ніж стандартний мінімум
      if (btnLess) {
         btnLess.hidden = visibleCount <= visibleDefault || totalMatched <= visibleDefault;
      }

      // Автоскрол
      if (isShowMore && matchedItems[visibleCount - step]) {
         setTimeout(() => {
            smoothScrollTo(matchedItems[visibleCount - step], root);
         }, 150);
      }
   };

   // Кнопки категорій
   buttons.forEach(btn => {
      btn.addEventListener('click', () => {
         currentCategory = btn.dataset.filterBtn;
         visibleCount = visibleDefault;

         buttons.forEach(b => b.classList.remove('is-active'));
         btn.classList.add('is-active');

         updateItems();

         // Скрол до початку фільтру
         setTimeout(() => smoothScrollTo(root, root), 100);
      });
   });

   // Show more
   btnMore?.addEventListener('click', () => {
      visibleCount += step;
      updateItems(true);
   });

   // Show less
   btnLess?.addEventListener('click', () => {
      visibleCount = visibleDefault;
      updateItems();

      // Плавний скрол до початку фільтру
      setTimeout(() => smoothScrollTo(root, root), 100);
   });

   // Початкове оновлення
   updateItems();
}

// Ініціалізація всіх фільтрів на сторінці
document.querySelectorAll('[data-filter]').forEach(initFilter);
















