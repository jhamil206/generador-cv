<script setup lang="ts">
import { computed } from 'vue'
import { useCvStore } from '../../stores/cvStore'

const cv = useCvStore()

// Nombre completo derivado de personalData
const fullName = computed(() => {
  const first = cv.personalData?.firstName || ''
  const last = cv.personalData?.lastName || ''
  return `${first} ${last}`.trim() || 'Nombre Completo'
})
</script>

<template>
  
  <div class="w-[210mm] min-h-[297mm] bg-white flex mx-auto shadow-md print:shadow-none text-xs font-sans overflow-hidden">
    
    <!-- Columna Izquierda (Barra Lateral) -->
    <div class="w-1/3 bg-[#3269b3] text-white p-6 flex flex-col gap-6">
      
      <!-- Foto de Perfil -->
      <div v-if="cv.showPhoto && cv.personalData?.photo" class="flex justify-center">
        <img :src="cv.personalData.photo" class="w-32 h-32 rounded-full border-4 border-white object-cover shadow" />
      </div>

      <!-- Contacto -->
      <div class="space-y-2">
        <h3 class="font-bold border-b border-blue-400 pb-1 text-sm tracking-wider uppercase">CONTACTO</h3>
        <p v-if="cv.personalData?.phone">📞 {{ cv.personalData.phone }}</p>
        <p v-if="cv.personalData?.email" class="break-all">✉️ {{ cv.personalData.email }}</p>
        <p v-if="cv.personalData?.location">📍 {{ cv.personalData.location }}</p>
      </div>

      <!-- Habilidades -->
      <div v-if="cv.skills?.length" class="space-y-2">
        <h3 class="font-bold border-b border-blue-400 pb-1 text-sm tracking-wider uppercase">HABILIDADES</h3>
        <ul class="list-disc list-inside space-y-1">
          <li v-for="(skill, i) in cv.skills" :key="i">{{ skill }}</li>
        </ul>
      </div>

      <!-- Educación -->
      <div v-if="cv.education?.length" class="space-y-3">
        <h3 class="font-bold border-b border-blue-400 pb-1 text-sm tracking-wider uppercase">EDUCACIÓN</h3>
        <div v-for="edu in cv.education" :key="edu.id">
          <p class="font-bold">{{ edu.degree || 'Título / Carrera' }}</p>
          <p class="text-blue-100">{{ edu.institution }}</p>
          <p class="text-blue-200 text-[10px]">{{ edu.dates }} <span v-if="edu.status">({{ edu.status }})</span></p>
        </div>
      </div>

    </div>

    <!-- Columna Derecha (Contenido Principal) -->
    <div class="w-2/3 flex flex-col">
      
      <!-- Encabezado -->
      <div class="bg-[#1a365d] text-white p-8 min-h-[120px] flex flex-col justify-center">
        <h1 class="text-2xl font-bold uppercase tracking-wider">{{ fullName }}</h1>
        <p class="text-blue-200 uppercase mt-1 tracking-widest text-[11px]">{{ cv.personalData?.title || 'Título Profesional' }}</p>
      </div>

      <div class="p-8 space-y-6 flex-1">
        
        <!-- Perfil / Resumen -->
        <div v-if="cv.personalData?.summary" class="space-y-2">
          <h2 class="font-bold text-[#1a365d] tracking-wider uppercase border-b pb-1">ACERCA DE MÍ</h2>
         <p class="text-gray-600 leading-relaxed whitespace-pre-line break-words max-w-full">{{ cv.personalData.summary }}</p>
        </div>

        <!-- Experiencia Laboral -->
        <div v-if="cv.experiences?.length" class="space-y-4">
          <h2 class="font-bold text-[#1a365d] tracking-wider uppercase border-b pb-1">EXPERIENCIA LABORAL</h2>
          <div class="relative border-l-2 border-[#1a365d] ml-2 pl-4 space-y-4">
            <div v-for="exp in cv.experiences" :key="exp.id" class="relative">
              <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-[#1a365d] rounded-full"></div>
              <h3 class="font-bold text-gray-800">{{ exp.role || 'Puesto' }}</h3>
              <p class="text-gray-500 font-medium text-[11px]">
                {{ exp.company }} {{ exp.location ? `· ${exp.location}` : '' }} <span v-if="exp.dates">| {{ exp.dates }}</span>
              </p>
              <p class="text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{{ exp.description }}</p>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>z