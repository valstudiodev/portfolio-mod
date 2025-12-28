"use strict"

document.addEventListener('click', documentActions)
window.addEventListener('scroll', scrollHeader)

export function initEffects() {
   scrollHeader()
   toggleCardContent()
}
// ===========================================================================================

// ===========================================================================================
// -----------------------------
// scroll-header
// -----------------------------
function scrollHeader() {
   const header = document.querySelector(`.header`)
   if (header && window.scrollY > 50) {
      header.classList.add('scrolled')
   } else {
      header.classList.remove('scrolled')
   }
}

// function initScrollHeader() {
//    const header = document.querySelector('.header');
//    if (!header) return;

//    let lastScroll = window.scrollY;
//    let downStart = window.scrollY;

//    const OFFSET = 50;
//    const DELTA = 8;
//    const HIDE_AFTER = 40;

//    const onScroll = () => {
//       // 1. ЗАХИСТ: Якщо меню відкрите, повністю ігноруємо логіку скролу
//       // Перевіряємо клас на html або на самому хедері
//       if (document.documentElement.classList.contains('menu-open') ||
//          header.classList.contains('menu-open')) {
//          return;
//       }

//       const current = window.scrollY;
//       const diff = current - lastScroll;

//       if (Math.abs(diff) < DELTA) return;

//       // Верх сторінки
//       if (current <= OFFSET) {
//          header.classList.remove('scrolled', 'visible');
//          // Скидаємо інлайн-стилі, якщо вони додавалися через JS
//          header.style.transform = '';
//          downStart = current;
//          lastScroll = current;
//          return;
//       }

//       // Скрол вниз
//       if (diff > 0) {
//          if (current - downStart > HIDE_AFTER) {
//             header.classList.add('scrolled');
//             header.classList.remove('visible');
//          }
//       }
//       // Скрол вгору
//       else {
//          header.classList.add('scrolled', 'visible');
//          downStart = current;
//       }

//       lastScroll = current;
//    };

//    window.addEventListener('scroll', onScroll, { passive: true });
// }


// ===========================================================================================
// -----------------------------
// MENU-BURGER
// -----------------------------
function documentActions(e) {
   const targetElement = e.target
   if (targetElement.closest('.icon-menu')) {
      document.body.classList.toggle('menu-open')
      document.body.classList.toggle('scroll-lock')
      document.documentElement.classList.toggle('menu-open')
   }
}

// ===========================================================================================
// -----------------------------
// flip-cart
// -----------------------------
function toggleCardContent() {
   const cards = document.querySelectorAll('.cart-work__inner');

   cards.forEach(card => {
      card.addEventListener('click', () => {
         // При кліку додаємо або прибираємо клас активного стану
         if (window.innerWidth <= 859) {
            card.classList.toggle('animCart');
         }

      });
   });
}

// ===========================================================================================
// -----------------------------
// icon-show
// -----------------------------
// function showList() {
//    const iconShows = document.querySelectorAll(`.row-menu__icon`)

//    iconShows.forEach(iconShow => {
//       iconShow.addEventListener('click', () => {
//          if (iconShow) {
//             iconShow.classList.toggle('icon-active')
//          }
//       })
//    })
// }


// function showList() {
//    const items = document.querySelectorAll('.row-menu');

//    items.forEach(item => {
//       const icon = item.querySelector('.row-menu__icon');
//       const wrap = item.querySelector('.row-menu__wrap');

//       icon.addEventListener('click', () => {
//          icon.classList.toggle('icon-active');
//          wrap.classList.toggle('open');
//       });
//    });
// }


const menuItems = document.querySelectorAll('.menu-header__item--submenu');

menuItems.forEach(item => {
   const link = item.querySelector('.menu-header__link');
   const submenu = item.querySelector('.menu-dropdown__submenu');

   // hover на link або submenu
   const enterHandler = () => item.classList.add('is-hovered');
   const leaveHandler = () => item.classList.remove('is-hovered');

   link.addEventListener('mouseenter', enterHandler);
   submenu.addEventListener('mouseenter', enterHandler);

   link.addEventListener('mouseleave', leaveHandler);
   submenu.addEventListener('mouseleave', leaveHandler);

   // Touch / click
   link.addEventListener('click', e => {
      const html = document.documentElement;
      if (html.dataset.input === 'touch' || html.dataset.input === 'pen') {
         e.preventDefault();
         // Закриваємо інші меню
         menuItems.forEach(other => {
            if (other !== item) other.classList.remove('is-active');
         });
         item.classList.toggle('is-active');
      }
   });

   // Keyboard: Enter / Space
   link.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && html.dataset.input === 'keyboard') {
         e.preventDefault();
         menuItems.forEach(other => {
            if (other !== item) other.classList.remove('is-active');
         });
         item.classList.toggle('is-active');
      }
   });

   // Закриття при кліку поза меню
   document.addEventListener('click', e => {
      if (!e.target.closest('.menu-header__item--submenu')) {
         item.classList.remove('is-active');
      }
   });
});





// const openBtn = document.querySelector('#open-btn-modal');
// const modal = document.querySelector('#modal-overlay');
// const modalContent = document.querySelector('#modal-content');

// let isLoaded = false;

// async function openModal() {
//    try {
//       if (!isLoaded) {
//          const response = await fetch('modal.html');
//          if (!response.ok) throw new Error('Load error');

//          const html = await response.text();
//          modalContent.innerHTML = html;

//          isLoaded = true;
//       }

//       modal.classList.add('is-open');
//       document.body.classList.add('no-scroll');

//    } catch (error) {
//       console.error(error);
//    }
// }

// function closeModal() {
//    modal.classList.remove('is-open');
//    document.body.classList.remove('no-scroll');
// }

// openBtn.addEventListener('click', openModal);

// // закриття по overlay
// modal.addEventListener('click', (e) => {
//    if (e.target === modal) {
//       closeModal();
//    }
// });

// // закриття по Escape
// document.addEventListener('keydown', (e) => {
//    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
//       closeModal();
//    }
// });








