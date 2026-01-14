"use strict"

document.addEventListener('click', documentActions)
window.addEventListener('scroll', scrollHeader)

export function initEffects() {
   scrollHeader()
   initSlideSheet({
      maxWidth: 859
   });
   initFilter()
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
   maxWidth = 1024
} = {}) {

   const sheet = document.querySelector(sheetSelector);
   const overlay = document.querySelector(overlaySelector);
   const cards = document.querySelectorAll(cardSelector);

   if (!sheet || !overlay || !cards.length) return;

   const sheetBody = sheet.querySelector(bodySelector);
   if (!sheetBody) return;

   const body = document.body;
   let scrollTop = 0;

   function isActive() {
      return window.innerWidth <= maxWidth;
   }

   function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
   }

   function lockScroll() {
      scrollTop = window.scrollY;
      body.style.top = `-${scrollTop}px`;
      body.style.paddingRight = getScrollbarWidth() + 'px';
      body.classList.add('lock-sheet');
   }

   function unlockScroll() {
      body.classList.remove('lock-sheet');
      body.style.top = '';
      body.style.paddingRight = '';
      window.scrollTo(0, scrollTop);
   }

   function openSheet(content) {
      if (!isActive()) return;

      sheetBody.innerHTML = content.innerHTML;
      lockScroll();

      sheet.classList.add('active-sheet');
      overlay.classList.add('active-sheet');
   }

   function closeSheet() {
      sheet.classList.remove('active-sheet');
      overlay.classList.remove('active-sheet');

      unlockScroll();
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

   window.addEventListener('resize', () => {
      if (!isActive()) closeSheet();
   });
}


function initFilter() {
   const filter = document.querySelector('.filter');
   if (!filter) return;

   const step = +filter.dataset.step || 4;
   const stepMore = +filter.dataset.stepMore || step;
   const scrollOffset = +filter.dataset.scrollOffset || 100;

   const allItems = [...filter.querySelectorAll('.filter__item')];
   const btnMore = filter.querySelector('[data-load-more]');
   const btnLess = filter.querySelector('[data-show-less]');
   const categoryBtns = filter.querySelectorAll('[data-category]');
   const industrySelect = filter.querySelector('[data-industry]');

   // Визначаємо початкову категорію на основі кнопки з класом is-active в HTML
   const initialActiveBtn = filter.querySelector('.nav-filter__btn.is-active');
   let activeCategory = initialActiveBtn ? initialActiveBtn.dataset.category : 'all';
   let activeIndustry = 'all';
   let visibleCount = step;

   function update(type = 'default') {
      const filtered = allItems.filter(item => {
         const cats = (item.dataset.category || '').split(' ');
         const inds = (item.dataset.industry || '').split(' ');
         return (activeCategory === 'all' || cats.includes(activeCategory)) &&
            (activeIndustry === 'all' || inds.includes(activeIndustry));
      });

      const itemsToShow = filtered.slice(0, visibleCount);
      let firstNewItem = null;

      allItems.forEach((item) => {
         const isShouldBeVisible = itemsToShow.includes(item);
         const isAlreadyVisible = item.classList.contains('is-visible');

         if (isShouldBeVisible) {
            if (!isAlreadyVisible) {
               if (!firstNewItem) firstNewItem = item;
               item.style.display = 'block';

               const newItems = itemsToShow.filter(el => !allItems.some(i => i.classList.contains('is-visible') && itemsToShow.includes(i)));
               const localIndex = newItems.indexOf(item);
               const delayIndex = type === 'more' ? (localIndex !== -1 ? localIndex : 0) : itemsToShow.indexOf(item);

               item.style.transitionDelay = `${delayIndex * 0.1}s`;

               requestAnimationFrame(() => {
                  item.classList.add('is-visible');
               });
            } else {
               item.style.transitionDelay = '0s';
            }
         } else {
            item.style.transitionDelay = '0s';
            item.classList.remove('is-visible');
            setTimeout(() => {
               if (!item.classList.contains('is-visible')) item.style.display = 'none';
            }, 400);
         }
      });

      // Скрол
      if (type === 'more' && firstNewItem) {
         const itemTop = firstNewItem.getBoundingClientRect().top + window.pageYOffset;
         const offset = window.innerWidth < 768 ? scrollOffset : scrollOffset + 50;
         window.scrollTo({ top: itemTop - offset, behavior: 'smooth' });
      } else if (type === 'less') {
         const filterTop = filter.getBoundingClientRect().top + window.pageYOffset;
         window.scrollTo({ top: filterTop - scrollOffset, behavior: 'smooth' });
      }

      if (btnMore) btnMore.hidden = visibleCount >= filtered.length;
      if (btnLess) btnLess.hidden = visibleCount <= step;
   }

   function setActiveCategory(category) {
      categoryBtns.forEach(btn => {
         btn.classList.toggle('is-active', btn.dataset.category === category);
      });
   }

   categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
         const category = btn.dataset.category;
         if (activeCategory === category) return;

         activeCategory = category;
         visibleCount = step;
         setActiveCategory(category);

         allItems.forEach(el => {
            el.classList.remove('is-visible');
            el.style.display = 'none';
         });
         update('filter');
      });
   });

   industrySelect?.addEventListener('change', e => {
      activeIndustry = e.target.value;
      visibleCount = step;
      update('filter');
   });

   btnMore?.addEventListener('click', () => {
      visibleCount += stepMore;
      update('more');
   });

   btnLess?.addEventListener('click', () => {
      setTimeout(() => {
         visibleCount = step;
         update('less');
      }, 50);
   });

   // Ініціалізація
   setActiveCategory(activeCategory);
   update('init');
}

document.addEventListener('DOMContentLoaded', initFilter);





