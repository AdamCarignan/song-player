import '@/assets/main.css'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VeeValidatePlugin from '@/includes/validation'
import App from '@/App.vue'
import router from '@/router'
import { auth } from '@/includes/firebase'

import icon from '@/directives/icon'
import i18n from '@/includes/i18n'
import { registerSW } from 'virtual:pwa-register'
import GlobalComponents from '@/includes/global_components'
import progressBar from '@/includes/progress_bar'

registerSW({ immediate: true })

// progressBar(router)

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)
    app.use(i18n)
    app.use(GlobalComponents)

    app.directive('icon', icon)

    app.mount('#app')
  }
})
