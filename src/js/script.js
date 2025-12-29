"use strict"

import { initInputMode } from './initMode'
import { initDropdowns } from './dropdownMenu'
import { initEffects } from './initEffects.js'
import { initUtils } from './initUtils'
import { formUtils } from './formUtils'
import { movingElements } from './movingElement'
import { openModal } from './modal'
import { initAnimations } from './initAnimation'
// import { initLoadPage } from './loader'


// ===========================================================================================
// -----------------------------
// ГОЛОВНИЙ ЗАПУСК
// -----------------------------
function initApp() {
   initInputMode()
   initDropdowns()
   initEffects()
   movingElements()
   // formUtils()
   initUtils()
   openModal()
   initAnimations()
   // initLoadPage()
}

if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', initApp);
} else {
   initApp();
}



