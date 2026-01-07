"use strict"


export function initLoader() {
   initPageMaster(600, '#00ADB5');
}

function initPageMaster(delay = 600, barColor = '#00ADB5') {
   const html = document.documentElement;

   html.removeAttribute('page-animate')

   if (html.getAttribute('init-page-loader') === 'ready') return;

   const progressBar = document.createElement('div');
   progressBar.id = 'loader-progress-bar';
   progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    z-index: 100000;
    background-color: ${barColor};
    transition: width 0.4s ease, opacity 0.3s ease;
  `;
   // document.body.prepend(progressBar);
   html.appendChild(progressBar);

   let progress = 0;
   const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 90) progress = 90;
      progressBar.style.width = progress + '%';
   }, 150);

   const activatePage = () => {
      if (html.getAttribute('init-page-loader') === 'ready') return;

      clearInterval(interval);
      progressBar.style.width = '100%';

      setTimeout(() => {
         // 1️⃣ loader finished
         html.setAttribute('init-page-loader', 'ready');

         // 2️⃣ дати браузеру repaint
         requestAnimationFrame(() => {
            requestAnimationFrame(() => {
               html.setAttribute('page-animate', 'on');
            });
         });

         initAnimationObserver();

         setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => progressBar.remove(), 400);
         }, 300);

      }, delay);
   };

   if (document.readyState === 'complete') {
      activatePage();
   } else {
      window.addEventListener('load', activatePage);
      setTimeout(activatePage, 3000);
   }
}

function initAnimationObserver() {
   const elements = document.querySelectorAll('[class*="--anim"]');
   if (!elements.length) return;

   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         const el = entry.target;
         const isOnce = el.getAttribute('data-once') !== "false";

         if (entry.isIntersecting) {
            const children = el.querySelectorAll('.anim-child');
            const delay = parseInt(el.dataset.delay) || 0;
            const step = parseInt(el.dataset.step) || 150;

            if (children.length > 0) {
               children.forEach((child, index) => {
                  setTimeout(() => child.classList.add('animate'), delay + (index * step));
               });
            } else {
               setTimeout(() => el.classList.add('animate'), delay);
            }

            if (isOnce) observer.unobserve(el);
         } else if (!isOnce) {
            // Якщо data-once="false", скидаємо анімацію при виході з кадру
            el.classList.remove('animate');
            el.querySelectorAll('.anim-child').forEach(c => c.classList.remove('animate'));
         }
      });
   }, { threshold: 0.15 });

   elements.forEach(el => observer.observe(el));
}



