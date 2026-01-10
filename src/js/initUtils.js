"use strict"

export function initUtils() {
   slidersInit();
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
// filter
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
   const menuButtons = document.querySelectorAll('[data-filter]');
   const galleryItems = document.querySelectorAll('[data-group]');

   function filterItems(category) {
      galleryItems.forEach(item => {
         item.style.display = item.dataset.group === category ? 'grid' : 'none';
      });
   }

   menuButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
         menuButtons.forEach(b => b.classList.remove('active'));
         btn.classList.add('active');
         filterItems(btn.dataset.filter);
      });

      if (index === 0) {
         btn.classList.add('active');
         filterItems(btn.dataset.filter);
      }
   });
});

// ===========================================================================================
// -----------------------------
// accordion-menu
// -----------------------------
// document.addEventListener('DOMContentLoaded', () => {
//    const accordions = document.querySelectorAll('[data-accordion]');

//    accordions.forEach(item => {
//       const btn = item.querySelector('[data-accordion-btn]');
//       const body = item.querySelector('[data-accordion-body]');

//       if (!btn || !body) return;

//       // Початкова ініціалізація: якщо вже є клас active-btn, ставимо auto
//       if (item.classList.contains('active-btn')) {
//          body.style.height = 'auto';
//       } else {
//          body.style.height = '0px';
//       }

//       btn.onclick = (e) => {
//          e.preventDefault(); // Захист від переходу по посиланню, якщо заголовок - посилання
//          const isOpen = item.classList.contains('active-btn');

//          if (isOpen) {
//             // ЗАКРИТТЯ
//             // 1. Спочатку фіксуємо поточну висоту в px замість auto
//             body.style.height = body.scrollHeight + 'px';

//             // 2. На наступному кадрі запускаємо анімацію до 0
//             requestAnimationFrame(() => {
//                body.style.height = '0px';
//             });

//             item.classList.remove('active-btn');
//          } else {
//             // ВІДКРИТТЯ
//             item.classList.add('active-btn');
//             // Встановлюємо висоту контенту
//             body.style.height = body.scrollHeight + 'px';

//             // Після завершення анімації переводимо в auto, щоб контент був гнучким
//             body.addEventListener('transitionend', function handler() {
//                if (item.classList.contains('active-btn')) {
//                   body.style.height = 'auto';
//                }
//                body.removeEventListener('transitionend', handler);
//             }, { once: true });
//          }
//       };
//    });
// });

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
