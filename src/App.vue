<template>
  <!-- Pantalla de Error si algo falla al renderizar -->
  <div v-if="renderError" class="p-6 bg-red-950 text-red-100 min-h-screen font-mono text-sm flex flex-col items-center justify-center">
    <div class="max-w-2xl w-full bg-red-900/40 border border-red-700/60 p-6 rounded-xl shadow-2xl">
      <h1 class="text-xl font-bold mb-2 text-red-400 flex items-center gap-2">
        <span>⚠️</span> Error de ejecución detectado
      </h1>
      <p class="text-xs text-red-300 mb-4">La aplicación no pudo cargar debido al siguiente error:</p>
      <pre class="bg-black/60 p-4 rounded-lg text-red-200 text-xs overflow-x-auto whitespace-pre-wrap border border-red-800/50">{{ renderError }}</pre>
      <button 
        @click="renderError = null" 
        class="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition"
      >
        Reintentar Carga
      </button>
    </div>
  </div>

  <!-- Aplicación Principal -->
  <div v-else class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
    <!-- Navbar -->
    <header class="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <button 
          @click="isSidebarOpen = !isSidebarOpen"
          class="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold transition"
        >
          <span>{{ isSidebarOpen ? '◀ Ocultar Menú' : '▶ Editar Datos' }}</span>
        </button>
        <h1 class="text-base font-bold text-white tracking-wide">CV Builder</h1>
      </div>

      <!-- Selector Plantillas -->
      <div class="flex items-center gap-1.5 overflow-x-auto py-1">
        <button 
          v-for="templateName in templatesList" 
          :key="templateName"
          @click="cvStore.selectedTemplate = templateName"
          :class="cvStore.selectedTemplate === templateName ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
          class="px-3 py-1 rounded-lg text-xs transition whitespace-nowrap border border-slate-700/50"
        >
          {{ templateName }}
        </button>
      </div>

      <!-- Botón Descargar PDF Directo -->
      <button 
        @click="exportToPdf" 
        :disabled="isGeneratingPdf"
        class="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg transition"
      >
        <span>📥</span>
        <span>{{ isGeneratingPdf ? 'Generando...' : 'Descargar PDF' }}</span>
      </button>
    </header>

    <!-- Tabs Móvil -->
    <div class="flex md:hidden border-b border-slate-800 bg-slate-900">
      <button 
        @click="mobileTab = 'form'" 
        :class="mobileTab === 'form' ? 'border-b-2 border-indigo-500 text-indigo-400 font-bold' : 'text-slate-400'"
        class="flex-1 py-2.5 text-xs text-center"
      >
        ✏️ Editar Datos
      </button>
      <button 
        @click="mobileTab = 'preview'" 
        :class="mobileTab === 'preview' ? 'border-b-2 border-indigo-500 text-indigo-400 font-bold' : 'text-slate-400'"
        class="flex-1 py-2.5 text-xs text-center"
      >
        📄 Vista Previa
      </button>
    </div>

    <!-- Layout Principal -->
    <div class="flex-1 flex overflow-hidden relative">
      <!-- Sidebar de Edición -->
      <aside 
        :class="[
          isSidebarOpen ? 'w-full md:w-[420px]' : 'w-0 hidden',
          mobileTab === 'form' ? 'block' : 'hidden md:block'
        ]"
        class="bg-slate-900 border-r border-slate-800 overflow-y-auto transition-all duration-300 shrink-0"
      >
        <CvForm />
      </aside>

      <!-- Lienzo Previsualización -->
      <main 
        :class="mobileTab === 'preview' ? 'block' : 'hidden md:block'"
        class="flex-1 overflow-y-auto bg-slate-950 p-2 sm:p-6 flex justify-center items-start"
      >
        <div class="w-full max-w-[850px] bg-slate-900/40 p-2 sm:p-4 rounded-2xl border border-slate-800/80 shadow-2xl flex justify-center overflow-x-auto">
          
          <!-- Contenedor Hoja A4 Exportable -->
          <div id="cv-preview-container" class="bg-white text-slate-900 shadow-xl rounded sm:rounded-none w-[210mm] min-h-[297mm] box-border transform scale-[0.85] sm:scale-100 origin-top overflow-hidden">
            <component :is="activeComponent" />
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onErrorCaptured } from 'vue'
import { useCvStore } from './stores/cvStore'
import CvForm from './components/forms/CvForm.vue'

import Template1 from './components/templates/Template1.vue'
import Template2 from './components/templates/Template2.vue'
import Template3 from './components/templates/Template3.vue'
import Template4 from './components/templates/Template4.vue'
import Template5 from './components/templates/Template5.vue'

const renderError = ref<string | null>(null)

// Captura errores durante la fase de renderizado
onErrorCaptured((err: any) => {
  console.error('Error capturado en App.vue:', err)
  renderError.value = err?.stack || err?.message || String(err)
  return false
})

const cvStore = useCvStore()
const isSidebarOpen = ref(true)
const mobileTab = ref('form')
const isGeneratingPdf = ref(false)

const templateComponents: Record<string, any> = {
  'Plantilla 1': Template1,
  'Plantilla 2': Template2,
  'Plantilla 3': Template3,
  'Plantilla 4': Template4,
  'Plantilla 5': Template5,
}

const templatesList = Object.keys(templateComponents)

const activeComponent = computed(() => {
  return templateComponents[cvStore.selectedTemplate] || Template1
})

const exportToPdf = async () => {
  isGeneratingPdf.value = true
  const element = document.getElementById('cv-preview-container')
  if (!element) return

  try {
    const html2pdfModule = await import('html2pdf.js')
    const html2pdf = html2pdfModule.default || html2pdfModule

    const options = {
      margin: 0,
      filename: `CV_${cvStore.personalData?.firstName || 'Mi'}_${cvStore.personalData?.lastName || 'Curriculum'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    const pdfGenerator = typeof html2pdf === 'function' ? html2pdf : (html2pdf as any).default
    await pdfGenerator().from(element).set(options).save()
  } catch (error: any) {
    console.error('Error generando PDF:', error)
    alert('Error al generar PDF: ' + (error?.message || error))
  } finally {
    isGeneratingPdf.value = false
  }
}
</script>