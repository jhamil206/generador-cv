<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
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
          v-for="template in templates" 
          :key="template"
          @click="cvStore.selectedTemplate = template"
          :class="cvStore.selectedTemplate === template ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'"
          class="px-3 py-1 rounded-lg text-xs font-medium transition whitespace-nowrap border border-slate-700/50"
        >
          {{ template }}
        </button>
      </div>

      <!-- Boton Descargar PDF -->
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
      <!-- Sidebar -->
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
          
          <!-- Contenedor Hoja A4 -->
          <div id="cv-preview-container" class="bg-white text-slate-900 shadow-xl rounded sm:rounded-none w-[210mm] min-h-[297mm] p-8 box-border transform scale-[0.85] sm:scale-100 origin-top">
            
            <!-- Encabezado -->
            <div class="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-center gap-4">
              <div>
                <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {{ cvStore.personalData.firstName || 'Nombre' }} {{ cvStore.personalData.lastName || 'Apellido' }}
                </h1>
                <p class="text-lg font-semibold text-indigo-600 mt-1">
                  {{ cvStore.personalData.title || 'Puesto Deseado' }}
                </p>
                <div class="text-xs text-slate-600 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <span v-if="cvStore.personalData.email">📧 {{ cvStore.personalData.email }}</span>
                  <span v-if="cvStore.personalData.phone">📞 {{ cvStore.personalData.phone }}</span>
                  <span v-if="cvStore.personalData.location">📍 {{ cvStore.personalData.location }}</span>
                </div>
              </div>
              <div v-if="cvStore.showPhoto && cvStore.personalData.photo" class="shrink-0">
                <img :src="cvStore.personalData.photo" class="w-24 h-24 rounded-full object-cover border-2 border-indigo-600 shadow" />
              </div>
            </div>

            <!-- Perfil / Resumen -->
            <div v-if="cvStore.personalData.summary" class="mb-6">
              <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Perfil Profesional</h2>
              <p class="text-sm text-slate-700 leading-relaxed">{{ cvStore.personalData.summary }}</p>
            </div>

            <!-- Experiencia -->
            <div v-if="cvStore.experiences.length" class="mb-6">
              <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">Experiencia Laboral</h2>
              <div class="space-y-3">
                <div v-for="exp in cvStore.experiences" :key="exp.id">
                  <div class="flex justify-between items-baseline">
                    <h3 class="text-sm font-bold text-slate-800">{{ exp.role || 'Cargo' }}</h3>
                    <span class="text-xs text-slate-500 font-medium">{{ exp.dates }}</span>
                  </div>
                  <p class="text-xs font-semibold text-indigo-600">{{ exp.company }} <span v-if="exp.location" class="text-slate-400">| {{ exp.location }}</span></p>
                  <p class="text-xs text-slate-600 mt-1">{{ exp.description }}</p>
                </div>
              </div>
            </div>

            <!-- Educación -->
            <div v-if="cvStore.education.length" class="mb-6">
              <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">Educación</h2>
              <div class="space-y-3">
                <div v-for="edu in cvStore.education" :key="edu.id">
                  <div class="flex justify-between items-baseline">
                    <h3 class="text-sm font-bold text-slate-800">
                      {{ edu.degree || 'Grado Academicó' }} 
                      <span v-if="edu.status" class="text-xs font-normal text-indigo-600 ml-1">({{ edu.status }})</span>
                    </h3>
                    <span class="text-xs text-slate-500 font-medium">{{ edu.dates }}</span>
                  </div>
                  <p class="text-xs text-slate-600">{{ edu.institution }} <span v-if="edu.location" class="text-slate-400">| {{ edu.location }}</span></p>
                </div>
              </div>
            </div>

            <!-- Habilidades -->
            <div v-if="cvStore.skills.length">
              <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">Habilidades</h2>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="(skill, i) in cvStore.skills" :key="i" class="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded font-medium">
                  {{ skill }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCvStore } from './stores/cvStore'
import CvForm from './components/forms/CvForm.vue'
import html2pdf from 'html2pdf.js'

const cvStore = useCvStore()
const isSidebarOpen = ref(true)
const mobileTab = ref('form')
const isGeneratingPdf = ref(false)

const templates = ['Plantilla 1', 'Plantilla 2', 'Plantilla 3', 'Plantilla 4', 'Plantilla 5']

const exportToPdf = async () => {
  isGeneratingPdf.value = true
  const element = document.getElementById('cv-preview-container')
  
  const options = {
    margin: 0,
    filename: `CV_${cvStore.personalData.firstName || 'Mi'}_${cvStore.personalData.lastName || 'Curriculum'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  try {
    await html2pdf().set(options).from(element).save()
  } finally {
    isGeneratingPdf.value = false
  }
}
</script>