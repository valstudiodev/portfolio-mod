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

document.addEventListener('DOMContentLoaded', () => {
   const contactForm = document.getElementById('contact-form');
   const submitBtn = document.getElementById('submit-button');
   const statusMsg = document.getElementById('status-message');

   if (contactForm && submitBtn) {
      contactForm.addEventListener('submit', async (event) => {
         event.preventDefault();

         // 1. Блокуємо кнопку, щоб уникнути дублікатів
         submitBtn.disabled = true;
         const originalText = submitBtn.innerHTML; // Зберігаємо текст (разом з іконкою)
         submitBtn.innerText = "Sending...";

         const formData = new FormData(contactForm);

         try {
            // 2. Відправка даних на Formspree
            const response = await fetch(contactForm.action, {
               method: 'POST',
               body: formData,
               headers: {
                  'Accept': 'application/json'
               }
            });

            // if (response.ok) {
            //    // 3. Успішна відправка
            //    statusMsg.style.color = "#2ecc71";
            //    statusMsg.innerText = "Message sent successfully!";
            //    contactForm.reset(); // Очищуємо форму
            // } else {
            //    // Обробка помилок від сервера
            //    const data = await response.json();
            //    statusMsg.style.color = "#e74c3c";
            //    statusMsg.innerText = data.errors ? data.errors[0].message : "Error. Please try again.";
            // }

            if (response.ok) {
               // 1. Показуємо повідомлення про успіх
               statusMsg.style.color = "#12F7D6";
               statusMsg.innerText = "Success! I will contact you soon.";

               // 2. Очищуємо форму
               contactForm.reset();

               // 3. Додаємо таймер (ваша нова функція)
               setTimeout(() => {
                  statusMsg.innerText = ""; // Видаляємо текст через 5 секунд
               }, 5000);

            } else {
               // Якщо сталася помилка, повідомлення краще залишити,
               // щоб користувач міг його прочитати і спробувати ще раз.
               const data = await response.json();
               statusMsg.innerText = data.errors ? data.errors[0].message : "Submission failed.";
               statusMsg.style.color = "#e74c3c";
            }

         } catch (error) {
            // Помилка мережі
            statusMsg.style.color = "#e74c3c";
            statusMsg.innerText = "Network error. Check your connection.";
         } finally {
            // 4. Повертаємо кнопку в початковий стан
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
         }
      });
   }
});
