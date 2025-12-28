"use strict"

document.addEventListener('DOMContentLoaded', initAnimations);

export function initAnimations() {
   initAnimationObserver();
}


// ===========================================================================================
// -----------------------------
// initAnimationObserver
// -----------------------------
function initAnimationObserver(selector = '[class*="--anim"]') {
   // Налаштування за замовчуванням
   const defaultOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
   };

   const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
         const el = entry.target;
         const once = el.dataset.once !== 'false';
         const baseDelay = +el.dataset.delay || 0;
         const step = +el.dataset.step || 200;

         if (entry.isIntersecting) {
            if (el._animated) return;
            el._animated = true;

            const children = el.querySelectorAll('.anim-child');

            if (children.length) {
               children.forEach((child, i) => {
                  setTimeout(() => child.classList.add('animate'),
                     baseDelay + i * step
                  );
               });
            } else {
               setTimeout(() => el.classList.add('animate'), baseDelay);
            }

            if (once) observer.unobserve(el);
         } else if (!once) {
            // Логіка скидання, якщо потрібно програвати анімацію знову
            el._animated = false;
            el.classList.remove('animate');
            el.querySelectorAll('.anim-child').forEach(child => {
               child.classList.remove('animate');
            });
         }
      });
   };

   document.querySelectorAll(selector).forEach(el => {
      el._animated = false;

      // Можна задати індивідуальний threshold через data-threshold
      const customThreshold = el.dataset.threshold ? +el.dataset.threshold : defaultOptions.threshold;

      const observer = new IntersectionObserver(handleIntersect, {
         ...defaultOptions,
         threshold: customThreshold
      });

      observer.observe(el);
   });
}
