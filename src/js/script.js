"use strict"

import { initInputMode } from './initMode'
import { initDropdowns } from './dropdownMenu'
import { initEffects } from './initEffects.js'
import { initUtils } from './initUtils'
import { formUtils } from './formUtils'
import { movingElements } from './movingElement'
import { openModal } from './modal'
import { initLoader } from './initLoader'


// ===========================================================================================
// -----------------------------
// ГОЛОВНИЙ ЗАПУСК
// -----------------------------
function initApp() {
   initLoader()
   initInputMode()
   initDropdowns()
   initEffects()
   movingElements()
   // formUtils()
   initUtils()
   openModal()
   initLoadAnimation()
}

if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initApp);
} else {
   initApp();
}


const PageLock = {
   lock() {
      // Додаємо клас на обидва елементи
      document.documentElement.classList.add('is-locked');
      document.body.classList.add('is-locked');
   },
   unlock() {
      document.documentElement.classList.remove('is-locked');
      document.body.classList.remove('is-locked');
   }
};

// При відкритті бургер-меню:
// PageLock.lock();

// При закритті:
// PageLock.unlock();
