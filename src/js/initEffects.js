"use strict"

document.addEventListener('click', documentActions)
window.addEventListener('scroll', scrollHeader)

export function initEffects() {
   scrollHeader()
   // toggleCardContent()
   initSlideSheet({
      maxWidth: 859
   });
}
// ===========================================================================================

// ===========================================================================================
// -----------------------------
// scroll-header
// -----------------------------
// function scrollHeader() {
//    const header = document.querySelector(`.header`)
//    if (header && window.scrollY > 50) {
//       header.classList.add('scrolled')
//    } else {
//       header.classList.remove('scrolled')
//    }
// }

function scrollHeader() {
   const header = document.querySelector('.header');
   if (!header) return;

   header.classList.toggle('scrolled', window.scrollY > 50);
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
   const btnArrow = document.querySelectorAll(`.arrow-point`)

   cards.forEach(card => {
      card.addEventListener('click', () => {
         if (window.innerWidth <= 859) {
            card.classList.toggle('animCart');
         }
      });
   });

}

// ===========================================================================================
// -----------------------------
// accordions
// -----------------------------
document.addEventListener('click', (e) => {
   const btn = e.target.closest('[data-accordion-btn]');
   if (!btn) return;

   const accordionParent = btn.closest('[data-accordion]');
   if (!accordionParent) return;

   const body = accordionParent.querySelector('[data-accordion-body]');
   const icon = btn.querySelector('[data-accordion-icon]');
   if (!body) return;

   const isOpen = accordionParent.classList.contains('active');

   if (!isOpen) {
      accordionParent.classList.add('active');
      if (icon) icon.classList.add('icon-active');

      body.style.height = body.scrollHeight + 'px';

      body.addEventListener(
         'transitionend',
         () => {
            if (accordionParent.classList.contains('active')) {
               body.style.height = 'auto';
            }
         },
         { once: true }
      );
   } else {
      body.style.height = body.scrollHeight + 'px';
      body.offsetHeight;

      requestAnimationFrame(() => {
         accordionParent.classList.remove('active');
         if (icon) icon.classList.remove('icon-active');
         body.style.height = '0px';
      });
   }
});




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



function initSlideSheet({
   cardSelector = '.card',
   contentSelector = '.card__content',
   sheetSelector = '.sheet',
   bodySelector = '.sheet__body',
   overlaySelector = '.sheet-overlay',
   maxWidth = 1024 // <= активний режим
} = {}) {

   const sheet = document.querySelector(sheetSelector);
   const overlay = document.querySelector(overlaySelector);
   const cards = document.querySelectorAll(cardSelector);

   if (!sheet || !overlay || !cards.length) return;

   const sheetBody = sheet.querySelector(bodySelector);
   if (!sheetBody) return;

   const body = document.body;

   function isActive() {
      return window.innerWidth <= maxWidth;
   }

   function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
   }

   function openSheet(content) {
      if (!isActive()) return;

      sheetBody.innerHTML = content.innerHTML;

      body.style.paddingRight = getScrollbarWidth() + 'px';
      body.classList.add('lock-sheet');

      sheet.classList.add('active-sheet');
      overlay.classList.add('active-sheet');
   }

   function closeSheet() {
      sheet.classList.remove('active-sheet');
      overlay.classList.remove('active-sheet');
      body.classList.remove('lock-sheet');
      body.style.paddingRight = '';
      sheetBody.innerHTML = '';
   }

   cards.forEach(card => {
      card.addEventListener('click', () => {
         if (!isActive()) return;

         const content = card.querySelector(contentSelector);
         if (!content) return;

         openSheet(content);
      });
   });

   overlay.addEventListener('click', closeSheet);

   // auto-close при ресайзі
   window.addEventListener('resize', () => {
      if (!isActive()) closeSheet();
   });
}



