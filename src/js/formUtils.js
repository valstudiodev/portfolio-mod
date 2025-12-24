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
// document.addEventListener('DOMContentLoaded', () => {
//    const contactForm = document.getElementById('contact-form');
//    const submitBtn = document.getElementById('submit-button');
//    const statusMsg = document.getElementById('status-message');

//    if (contactForm && submitBtn) {
//       contactForm.addEventListener('submit', async (event) => {
//          event.preventDefault();

//          // 1. Блокуємо кнопку, щоб уникнути дублікатів
//          submitBtn.disabled = true;
//          const originalText = submitBtn.innerHTML; // Зберігаємо текст (разом з іконкою)
//          submitBtn.innerText = "Sending...";

//          const formData = new FormData(contactForm);

//          try {
//             // 2. Відправка даних на Formspree
//             const response = await fetch(contactForm.action, {
//                method: 'POST',
//                body: formData,
//                headers: {
//                   'Accept': 'application/json'
//                }
//             });

//             if (response.ok) {
//                // 1. Встановлюємо текст та додаємо клас
//                statusMsg.innerText = "Success! I will contact you soon!";
//                statusMsg.classList.add('success-active');

//                // 2. Очищуємо форму
//                contactForm.reset();

//                // 3. Таймер: все, що має статися через 5 секунд, кладемо ВСЕРЕДИНУ
//                setTimeout(() => {
//                   statusMsg.classList.remove('success-active'); // Спочатку прибираємо клас (анімація зникнення)

//                   // Можна додати ще один маленький таймер, щоб текст зник після завершення анімації CSS
//                   setTimeout(() => {
//                      statusMsg.innerText = "";
//                   }, 500); // 0.5с — це час вашого transition у CSS
//                }, 5000);

//             } else {
//                // Якщо сталася помилка, повідомлення краще залишити,
//                // щоб користувач міг його прочитати і спробувати ще раз.
//                const data = await response.json();
//                statusMsg.innerText = data.errors ? data.errors[0].message : "Submission failed.";
//                statusMsg.style.color = "#e74c3c";
//             }

//          } catch (error) {
//             // Помилка мережі
//             statusMsg.style.color = "#e74c3c";
//             statusMsg.innerText = "Network error. Check your connection.";
//          } finally {
//             // 4. Повертаємо кнопку в початковий стан
//             submitBtn.disabled = false;
//             submitBtn.innerHTML = originalText;
//          }
//       });
//    }
// });


// Використовуємо window.onload або DOMContentLoaded для впевненості
window.addEventListener('DOMContentLoaded', () => {
   const contactForm = document.getElementById('contact-form');
   const submitBtn = document.getElementById('submit-button');
   const statusOverlay = document.getElementById('status-overlay');
   const statusText = document.getElementById('status-text');

   // Перевірка в консолі: якщо ви бачите це повідомлення, значить елементи знайдені
   if (!contactForm) {
      console.error("Помилка: Форму з id='contact-form' не знайдено!");
      return;
   }

   const triggerStatus = (message, isSuccess) => {
      statusText.innerText = message;
      statusOverlay.classList.remove('status-success', 'status-error'); // скидаємо класи
      statusOverlay.classList.add('is-visible', isSuccess ? 'status-success' : 'status-error');

      setTimeout(() => {
         statusOverlay.classList.remove('is-visible');
      }, 4000);
   };

   // ГОЛОВНА ЧАСТИНА: перехоплення події
   contactForm.addEventListener('submit', async function (e) {
      e.preventDefault(); // ЦЕЙ РЯДОК ЗАБОРОНЯЄ ПЕРЕХІД НА FORMSPREE

      // Блокуємо кнопку відразу
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";

      const formData = new FormData(this);

      try {
         const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
               'Accept': 'application/json'
            }
         });

         if (response.ok) {
            this.reset();
            triggerStatus("✅ Message sent successfully!", true);
         } else {
            const result = await response.json();
            triggerStatus("❌ Error: " + (result.errors ? result.errors[0].message : "Try again"), false);
         }
      } catch (err) {
         triggerStatus("❌ Connection lost. Check your internet.", false);
      } finally {
         submitBtn.disabled = false;
         submitBtn.innerText = originalBtnText;
      }
   });
});

document.addEventListener('submit', async function (e) {
   // Перевіряємо, чи форма має атрибут action з посиланням на formspree
   const form = e.target;
   if (!form.action.includes("formspree.io")) return;

   // 1. ЗАБОРОНЯЄМО ПЕРЕХІД (це зупинить викидання на сайт formspree)
   e.preventDefault();

   const submitBtn = form.querySelector('[type="submit"]');
   const statusOverlay = document.getElementById('status-overlay');
   const statusText = document.getElementById('status-text');

   // Блокуємо кнопку
   if (submitBtn) {
      submitBtn.disabled = true;
      var originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";
   }

   const formData = new FormData(form);

   try {
      const response = await fetch(form.action, {
         method: 'POST',
         body: formData,
         headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
         form.reset();
         // Якщо на сторінці є ваше вікно статусу — показуємо його
         if (statusOverlay && statusText) {
            showStatusModal("✅ Message sent successfully!", true, statusOverlay, statusText);
         } else {
            alert("Success! Your message has been sent.");
         }
      } else {
         const result = await response.json();
         const errorMsg = result.errors ? result.errors[0].message : "Try again";
         showStatusModal("❌ Error: " + errorMsg, false, statusOverlay, statusText);
      }
   } catch (err) {
      showStatusModal("❌ Connection lost.", false, statusOverlay, statusText);
   } finally {
      if (submitBtn) {
         submitBtn.disabled = false;
         submitBtn.innerText = originalBtnText;
      }
   }
});

// Допоміжна функція для модалки статусу
function showStatusModal(message, isSuccess, overlay, textElem) {
   if (!overlay || !textElem) return;

   textElem.innerText = message;
   overlay.classList.add('is-visible');
   overlay.classList.add(isSuccess ? 'status-success' : 'status-error');

   setTimeout(() => {
      overlay.classList.remove('is-visible', 'status-success', 'status-error');
   }, 4000);
}


// document.addEventListener('submit', async function (e) {
//    const form = e.target;
//    if (!form.action.includes("formspree.io")) return;

//    e.preventDefault();

//    const submitBtn = form.querySelector('[type="submit"]');
//    const statusOverlay = document.getElementById('status-overlay');
//    const statusText = document.getElementById('status-text');

//    if (submitBtn) {
//       submitBtn.disabled = true;
//       submitBtn.dataset.originalText = submitBtn.innerText;
//       submitBtn.innerText = "Sending...";
//    }

//    try {
//       const response = await fetch(form.action, {
//          method: 'POST',
//          body: new FormData(form),
//          headers: { 'Accept': 'application/json' }
//       });

//       if (response.ok) {
//          form.reset();
//          handleNotification("✅ Message sent successfully!", true, statusOverlay, statusText);
//       } else {
//          handleNotification("❌ Error sending message.", false, statusOverlay, statusText);
//       }
//    } catch (err) {
//       handleNotification("❌ Connection error.", false, statusOverlay, statusText);
//    } finally {
//       if (submitBtn) {
//          submitBtn.disabled = false;
//          submitBtn.innerText = submitBtn.dataset.originalText;
//       }
//    }
// });

// function handleNotification(message, isSuccess, overlay, textElem) {
//    if (overlay && textElem) {
//       textElem.innerText = message;
//       overlay.classList.remove('status-success', 'status-error');
//       overlay.classList.add('is-visible', isSuccess ? 'status-success' : 'status-error');

//       // Фікс скролу
//       document.body.classList.add('no-scroll');

//       setTimeout(() => {
//          overlay.classList.remove('is-visible');
//          document.body.classList.remove('no-scroll');
//       }, 4000);
//    } else {
//       // Якщо модалки немає в HTML, вискочить це вікно
//       alert(message);
//    }
// }
