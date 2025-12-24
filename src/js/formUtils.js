"use strict"

export function formUtils() {
   // typeSwitcher();
}
// ===========================================================================================

// ===========================================================================================
// -----------------------------
// typeSwitcher form
// -----------------------------
// function typeSwitcher() {
//    // Знаходимо всі інпути з класом 'type-switcher'
//    const inputs = document.querySelectorAll('.type-switcher');

//    inputs.forEach(input => {
//       const desiredType = input.getAttribute('data-type');
//       // 🔑 Ключова зміна: Зберігаємо початковий текст placeholder
//       const originalPlaceholder = input.getAttribute('data-placeholder');

//       // 1. Обробник події ФОКУС (focus)
//       input.addEventListener('focus', function () {
//          // Змінюємо тип на бажаний ('date' або 'time')
//          this.type = desiredType;
//       });

//       // 2. Обробник події ВТРАТА ФОКУСУ (blur)
//       input.addEventListener('blur', function () {

//          // 1. Перевіряємо, чи поточний тип — це той, який ми хочемо приховати
//          if (this.type === desiredType) {

//             // 2. Ключова перевірка: Якщо поле візуально порожнє
//             if (this.value === "") {

//                // 🔑 КРОК ВИПРАВЛЕННЯ: Примусово скидаємо значення перед зміною типу.
//                // Це обходить проблеми кешування та внутрішніх значень браузера.
//                this.value = "";

//                // Повертаємо тип назад на 'text'
//                this.type = 'text';

//                // Відновлюємо placeholder
//                this.placeholder = originalPlaceholder;
//             }
//          }
//       });

//       // 3. Додатковий крок: Встановлюємо правильний тип, якщо є значення при завантаженні
//       if (input.value) {
//          input.type = desiredType;
//       }

//       // Переконаємось, що інпут починає з 'text' і має коректний placeholder
//       if (!input.value && input.type !== 'text') {
//          input.type = 'text';
//          input.placeholder = originalPlaceholder;
//       }
//    });
// }


// ===========================================================================================
// -----------------------------
// active form
// -----------------------------
document.addEventListener('submit', async function (e) {
   const form = e.target;
   if (!form.action.includes("formspree.io")) return;

   e.preventDefault();

   const submitBtn = form.querySelector('[type="submit"]');
   const statusOverlay = document.getElementById('status-overlay');
   const statusText = document.getElementById('status-text');

   if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";
   }

   try {
      const response = await fetch(form.action, {
         method: 'POST',
         body: new FormData(form),
         headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
         form.reset();
         handleNotification("✅ Success! Message sent.", true, statusOverlay, statusText, submitBtn);
      } else {
         handleNotification("❌ Error sending message.", false, statusOverlay, statusText, submitBtn);
      }
   } catch (err) {
      handleNotification("❌ Connection error.", false, statusOverlay, statusText, submitBtn);
   }
});

function handleNotification(message, isSuccess, overlay, textElem, btn) {
   if (overlay && textElem) {
      textElem.innerText = message;
      overlay.classList.remove('status-success', 'status-error');
      overlay.classList.add('is-visible', isSuccess ? 'status-success' : 'status-error');

      // --- ПОВНЕ ВИПРАВЛЕННЯ СТРИБКІВ (BODY + HEADER) ---

      // 1. Знаходимо ширину скролбару
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // 2. Знаходимо ваш хедер (змініть 'header', якщо у вас інший селектор, наприклад '.site-header')
      const header = document.querySelector('header');

      // 3. Додаємо відступи
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      if (header) {
         header.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.body.style.overflow = 'hidden';

      setTimeout(() => {
         overlay.classList.remove('is-visible');

         // ПОВЕРТАЄМО ВСЕ НАЗАД
         setTimeout(() => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';

            // Прибираємо відступ у хедера
            if (header) {
               header.style.paddingRight = '';
            }

            if (btn) {
               btn.disabled = false;
               btn.innerText = btn.dataset.originalText;
            }
         }, 300); // 300мс — затримка, щоб анімація зникнення модалки завершилась

      }, 4000);
   } else {
      alert(message);
      if (btn) {
         btn.disabled = false;
         btn.innerText = btn.dataset.originalText;
      }
   }
}
