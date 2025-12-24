"use strict"

// Запуск при завантаженні сторінки
document.addEventListener('DOMContentLoaded', initModal);

export function openModal() {
   initModal()
}
// ===========================================================================================
async function initModal() {
   const openButtons = document.querySelectorAll('.open-btn-modal')
   const modalOverlay = document.querySelector('#modal-overlay')
   const modalContent = document.querySelector('#modal-content')
   const fixedElements = document.querySelectorAll('.header, .fixed-element')

   if (!openButtons.length || !modalOverlay || !modalContent) return

   function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth
   }

   function openModal() {
      const scrollbarWidth = getScrollbarWidth()
      if (scrollbarWidth > 0) {
         document.body.style.paddingRight = `${scrollbarWidth}px`
         fixedElements.forEach(el => el.style.paddingRight = `${scrollbarWidth}px`)
      }

      document.body.classList.add('no-scroll')
      modalOverlay.classList.add('is-open')
      modalOverlay.setAttribute('aria-hidden', 'false')
   }

   function closeModal() {
      modalOverlay.classList.remove('is-open')
      modalOverlay.setAttribute('aria-hidden', 'true')
   }

   // Повернення scroll після закриття через transitionend
   modalOverlay.addEventListener('transitionend', () => {
      if (!modalOverlay.classList.contains('is-open')) {
         document.body.classList.remove('no-scroll')
         document.body.style.paddingRight = ''
         fixedElements.forEach(el => el.style.paddingRight = '')
      }
   });

   // Відкриття на всі кнопки
   openButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
         e.preventDefault()

         if (!modalContent.innerHTML.trim()) {
            try {
               const response = await fetch('modal.html')
               if (!response.ok) throw new Error('Network response was not ok')
               modalContent.innerHTML = await response.text()
            } catch (err) {
               console.error('Modal Load Error:', err)
               modalContent.innerHTML = '<div style="padding:20px; text-align:center;">Помилка завантаження форми.</div>'
            }
         }

         openModal()
      })
   })

   // Закриття overlay або кнопки
   modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.closest('[data-modal-close]')) {
         closeModal()
      }
   });

   // Закриття на Escape
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
         closeModal()
      }
   });

   // Accessibility
   modalOverlay.setAttribute('role', 'dialog')
   modalOverlay.setAttribute('aria-modal', 'true')
   modalOverlay.setAttribute('aria-hidden', 'true')
}








