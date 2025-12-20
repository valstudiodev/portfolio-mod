"use strict"

export function initUtils() {
   slidersInit();
}
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
         spaceBetween: 30,
         centteredSlides: false,

         navigation: {
            nextEl: ".button-arrow--next",
            prevEl: ".button-arrow--prev",
         },

         // breakpoints: {
         //    320: {
         //       slidesPerView: 1.1,
         //       spaceBetween: 10,
         //    },
         //    420: {
         //       slidesPerView: 1.2,
         //       spaceBetween: 15,
         //       centteredSlides: true,
         //    },
         //    // 768: {
         //    //    slidesPerView: 2,
         //    //    spaceBetween: 20,
         //    //    centteredSlides: false,
         //    // },
         //    768: {
         //       slidesPerView: 1,
         //       spaceBetween: 0,
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
