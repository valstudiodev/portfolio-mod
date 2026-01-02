"use strict"

export function initLoadPage() {
   initPageLoader()
}

function initPageLoader(delay = 600, bgColor = '#292F36', barColor = '#0C73B8') {
   // 1. Фарбуємо корінь документа миттєво
   document.documentElement.style.backgroundColor = bgColor;

   // 2. Створюємо стилі для body та прогрес-бару
   const style = document.createElement('style');
   style.innerHTML = `
        body {
            opacity: 0 !important;
            visibility: hidden !important;
            background-color: ${bgColor} !important;
        }
        body.is-loaded {
            opacity: 1 !important;
            visibility: visible !important;
            transition: opacity 0.6s ease-in-out !important;
        }
        #loader-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background-color: ${barColor};
            z-index: 99999;
            width: 0%;
            transition: width 0.4s ease;
        }
    `;
   document.head.appendChild(style);

   // 3. Створюємо елемент прогрес-бару
   const progressBar = document.createElement('div');
   progressBar.id = 'loader-progress-bar';
   document.documentElement.appendChild(progressBar);

   // Імітація руху прогресу
   let progress = 0;
   const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 90) progress = 90; // тримаємо на 90%, поки не завантажиться повністю
      progressBar.style.width = progress + '%';
   }, 150);

   window.addEventListener('load', function () {
      // Довантажуємо до 100%
      clearInterval(interval);
      progressBar.style.width = '100%';

      setTimeout(function () {
         document.body.classList.add('is-loaded');

         // Видаляємо смужку після появи контенту
         setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => progressBar.remove(), 400);
         }, 300);
      }, delay);
   });
}

// // Виклик: (затримка, колір фону, колір смужки)
// initPageLoader(600, '#1a1a1a', '#ff4500');


// function initPageLoader(delay = 600, barColor = '#0C73B8') {
//    // 1. Створюємо прогрес-бар
//    const progressBar = document.createElement('div');
//    progressBar.id = 'loader-progress-bar';

//    // Стилізація бару (тільки те, що стосується самої смужки)
//    const barStyle = document.createElement('style');
//    barStyle.innerHTML = `
//         #loader-progress-bar {
//             position: fixed;
//             top: 0; left: 0; height: 3px;
//             background-color: ${barColor};
//             z-index: 100000;
//             width: 0%;
//             transition: width 0.4s ease, opacity 0.3s ease;
//             box-shadow: 0 0 10px ${barColor};
//         }
//     `;
//    document.head.appendChild(barStyle);
//    document.documentElement.appendChild(progressBar);

//    // 2. Імітація прогресу
//    let progress = 0;
//    const interval = setInterval(() => {
//       progress += Math.random() * 25;
//       if (progress > 90) progress = 90;
//       progressBar.style.width = progress + '%';
//    }, 150);

//    // 3. Функція відкриття сторінки
//    const showPage = () => {
//       if (document.body.classList.contains('is-loaded')) return;

//       clearInterval(interval);
//       progressBar.style.width = '100%';

//       setTimeout(() => {
//          document.body.classList.add('is-loaded');

//          setTimeout(() => {
//             progressBar.style.opacity = '0';
//             setTimeout(() => progressBar.remove(), 400);
//          }, 300);
//       }, delay);
//    };

//    // Чекаємо завантаження
//    window.addEventListener('load', showPage);

//    // Запобіжник (якщо щось зависло на мобільному)
//    setTimeout(showPage, 4000);
// }

// // Виклик (затримка, колір смужки)
// initPageLoader(600, '#0C73B8');
