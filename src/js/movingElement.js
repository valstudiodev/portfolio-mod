"use strict"

export function movingElements() {
   buttonsMovement()
}
// ===========================================================================================
function buttonsMovement() {
   const buttonArrow = document.querySelectorAll(`.button-arrow`);

   // 1. ЗАПОБІЖНИК: Якщо кнопок немає — виходимо з функції
   if (buttonArrow.length < 2) return;

   const btnOne = buttonArrow[0];
   const btnTwo = buttonArrow[1];

   const oldParent = btnOne.parentElement;
   const targetElement = document.querySelector(`.projects__buttons-inner`);

   // 2. Якорі (тепер ми впевнені, що кнопки існують)
   const anchorOne = btnOne.nextSibling;
   const anchorTwo = btnTwo.nextSibling;

   const mediaQuery = window.matchMedia('(max-width: 768px)');

   function toggleButtons(mq) {
      if (mq.matches) {
         if (targetElement) {
            // Вставляємо першу в кінець цільового контейнера
            targetElement.insertAdjacentElement('beforeend', btnOne);
            // Вставляємо другу відразу ПІСЛЯ першої
            btnOne.insertAdjacentElement('afterend', btnTwo);
         }
      } else {
         // Повертаємо точно на свої місця
         oldParent.insertBefore(btnOne, anchorOne);
         oldParent.insertBefore(btnTwo, anchorTwo);
      }
   }

   mediaQuery.addEventListener('change', toggleButtons);
   toggleButtons(mediaQuery);
}

