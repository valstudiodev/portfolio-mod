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


