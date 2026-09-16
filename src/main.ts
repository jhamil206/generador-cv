import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(createPinia()) // ← Si falta esto, la pantalla se queda completamente blanca
app.mount('#app')