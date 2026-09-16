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
  <div class="w-[210mm] min-h-[297mm] bg-white p-8 mx-auto shadow-md print:shadow-none text-xs space-y-6 font-sans overflow-hidden">
    
    <!-- Encabezado con Foto y Contacto -->
    <div class="flex items-center gap-6 border-b pb-6">
      <img 
        v-if="cv.showPhoto && cv.personalData?.photo" 
        :src="cv.personalData.photo" 
        class="w-28 h-32 object-cover rounded border border-gray-300 flex-shrink-0" 
      />
      <div class="flex-1 min-w-0 space-y-1">
        <h1 class="text-2xl font-bold tracking-wider text-gray-800 uppercase break-words">{{ fullName }}</h1>
        <p class="text-sky-700 font-semibold uppercase tracking-wide break-words">{{ cv.personalData?.title || 'Título Profesional' }}</p>
        <div class="grid grid-cols-2 gap-1 text-gray-600 pt-2 text-[11px]">
          <p v-if="cv.personalData?.phone" class="break-words">📞 {{ cv.personalData.phone }}</p>
          <p v-if="cv.personalData?.email" class="break-all">✉️ {{ cv.personalData.email }}</p>
          <p v-if="cv.personalData?.location" class="col-span-2 break-words">📍 {{ cv.personalData.location }}</p>
        </div>
      </div>
    </div>

    <!-- Resumen Profesional -->
    <div v-if="cv.personalData?.summary" class="space-y-1">
      <h2 class="font-bold text-gray-800 uppercase tracking-wider border-l-4 border-sky-600 pl-2">Resumen Profesional</h2>
      <p class="text-gray-600 leading-relaxed pt-1 whitespace-pre-line break-words max-w-full">{{ cv.personalData.summary }}</p>
    </div>

    <!-- Experiencia Laboral -->
    <div v-if="cv.experiences?.length" class="space-y-3">
      <h2 class="font-bold text-gray-800 uppercase tracking-wider border-l-4 border-sky-600 pl-2">Experiencia Laboral</h2>
      <div class="relative border-l-2 border-sky-200 ml-3 pl-4 space-y-4">
        <div v-for="exp in cv.experiences" :key="exp.id" class="relative">
          <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-sky-600 rounded-full"></div>
          <span class="text-sky-700 font-bold text-[10px]">{{ exp.dates }}</span>
          <h3 class="font-bold text-gray-800 break-words">{{ exp.company }} <span v-if="exp.role">· {{ exp.role }}</span></h3>
          <p class="text-gray-600 mt-1 leading-relaxed whitespace-pre-line break-words max-w-full">{{ exp.description }}</p>
        </div>
      </div>
    </div>

    <!-- Formación / Educación -->
    <div v-if="cv.education?.length" class="space-y-3">
      <h2 class="font-bold text-gray-800 uppercase tracking-wider border-l-4 border-sky-600 pl-2">Formación</h2>
      <div class="relative border-l-2 border-sky-200 ml-3 pl-4 space-y-3">
        <div v-for="edu in cv.education" :key="edu.id" class="relative">
          <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-sky-600 rounded-full"></div>
          <span class="text-sky-700 font-bold text-[10px]">{{ edu.dates }} <span v-if="edu.status">({{ edu.status }})</span></span>
          <h3 class="font-bold text-gray-800 break-words">{{ edu.institution }}</h3>
          <p class="text-gray-600 break-words">{{ edu.degree }}</p>
        </div>
      </div>
    </div>

    <!-- Habilidades -->
    <div v-if="cv.skills?.length" class="space-y-2">
      <h2 class="font-bold text-gray-800 uppercase tracking-wider border-l-4 border-sky-600 pl-2">Habilidades</h2>
      <div class="flex flex-wrap gap-2 pt-1 pl-3">
        <span v-for="(skill, i) in cv.skills" :key="i" class="bg-sky-50 text-sky-800 px-2.5 py-1 rounded border border-sky-200 text-[11px] font-medium break-words">
          {{ skill }}
        </span>
      </div>
    </div>

  </div>
</template>