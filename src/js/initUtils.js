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
   if (document.querySelector('.slider-projects')) {
      const swiper = new Swiper('.slider-projects', {
         loop: true,
         slidesPerView: 1,
         spaceBetween: 0,
         centteredSlides: false,

         navigation: {
            nextEl: ".button-arrow--next",
            prevEl: ".button-arrow--prev",
         },

         // breakpoints: {
         //    320: {
         //       slidesPerView: 1.2,
         //       spaceBetween: 10,
         //    },
         //    420: {
         //       slidesPerView: 2.2,
         //       spaceBetween: 20,
         //       centteredSlides: true,
         //    },
         //    // 768: {
         //    //    slidesPerView: 2,
         //    //    spaceBetween: 20,
         //    //    centteredSlides: false,
         //    // },
         //    768: {
         //       slidesPerView: 3,
         //       spaceBetween: 30,
         //    },
         // },
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

