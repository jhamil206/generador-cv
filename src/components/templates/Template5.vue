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
  <div class="w-[210mm] min-h-[297mm] bg-white p-8 mx-auto shadow-md print:shadow-none text-xs flex flex-col gap-6 font-sans overflow-hidden">
    
    <!-- Encabezado / Datos Personales -->
    <div class="border-b-2 border-gray-800 pb-4 min-w-0">
      <h1 class="text-3xl font-bold uppercase tracking-wider text-gray-900 break-words">{{ fullName }}</h1>
      <p class="text-sm font-semibold text-gray-700 uppercase mt-1 break-words">{{ cv.personalData?.title || 'Título Profesional' }}</p>
      <div class="flex flex-wrap gap-4 text-gray-600 mt-3 text-[11px]">
        <p v-if="cv.personalData?.email" class="break-all">✉️ {{ cv.personalData.email }}</p>
        <p v-if="cv.personalData?.phone" class="break-words">📞 {{ cv.personalData.phone }}</p>
        <p v-if="cv.personalData?.location" class="break-words">📍 {{ cv.personalData.location }}</p>
      </div>
    </div>

    <!-- Resumen -->
    <div v-if="cv.personalData?.summary" class="space-y-1">
      <h2 class="font-bold text-gray-900 uppercase border-b pb-0.5 tracking-wider">RESUMEN</h2>
      <p class="text-gray-700 leading-relaxed pt-1 whitespace-pre-line break-words max-w-full">{{ cv.personalData.summary }}</p>
    </div>

    <!-- Educación -->
    <div v-if="cv.education?.length" class="space-y-2">
      <h2 class="font-bold text-gray-900 uppercase border-b pb-0.5 tracking-wider">EDUCACIÓN</h2>
      <div v-for="edu in cv.education" :key="edu.id" class="flex justify-between items-start pt-1 gap-4">
        <div class="min-w-0 flex-1 break-words">
          <p class="font-bold text-gray-800">{{ edu.institution }}</p>
          <p class="text-gray-600">{{ edu.degree }} <span v-if="edu.status">({{ edu.status }})</span></p>
        </div>
        <div class="text-right text-gray-500 text-[11px] flex-shrink-0">
          <p v-if="edu.location">{{ edu.location }}</p>
          <p>{{ edu.dates }}</p>
        </div>
      </div>
    </div>

    <!-- Habilidades -->
    <div v-if="cv.skills?.length" class="space-y-1">
      <h2 class="font-bold text-gray-900 uppercase border-b pb-0.5 tracking-wider">HABILIDADES</h2>
      <ul class="grid grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside text-gray-700 pt-1 break-words">
        <li v-for="(h, i) in cv.skills" :key="i">{{ h }}</li>
      </ul>
    </div>

    <!-- Experiencia Laboral -->
    <div v-if="cv.experiences?.length" class="space-y-3">
      <h2 class="font-bold text-gray-900 uppercase border-b pb-0.5 tracking-wider">EXPERIENCIA</h2>
      <div v-for="exp in cv.experiences" :key="exp.id" class="space-y-1">
        <div class="flex justify-between items-start gap-4">
          <div class="min-w-0 flex-1 break-words">
            <p class="font-bold text-gray-800">{{ exp.role || 'Puesto' }}</p>
            <p class="text-gray-600 font-medium">{{ exp.company }} {{ exp.location ? `- ${exp.location}` : '' }}</p>
          </div>
          <p class="text-gray-500 text-[11px] flex-shrink-0">{{ exp.dates }}</p>
        </div>
        <p class="text-gray-700 leading-relaxed whitespace-pre-line break-words max-w-full">{{ exp.description }}</p>
      </div>
    </div>

  </div>
</template>