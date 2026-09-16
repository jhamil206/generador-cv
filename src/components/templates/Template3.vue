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
  <div class="w-[210mm] min-h-[297mm] bg-white p-10 mx-auto shadow-md print:shadow-none text-xs flex flex-col gap-6 font-sans overflow-hidden">
    
    <!-- Encabezado -->
    <div class="flex justify-between items-start gap-6 border-b pb-6">
      <div class="space-y-2 flex-1 min-w-0">
        <h1 class="text-4xl font-serif text-gray-900 tracking-tight break-words">{{ fullName }}</h1>
        <p class="text-xs uppercase tracking-widest text-gray-500 font-semibold break-words">{{ cv.personalData?.title || 'Título Profesional' }}</p>
        <p v-if="cv.personalData?.summary" class="text-gray-600 leading-relaxed pt-2 whitespace-pre-line break-words max-w-full">
          {{ cv.personalData.summary }}
        </p>
      </div>

      <!-- Foto de Perfil -->
      <div v-if="cv.showPhoto && cv.personalData?.photo" class="w-32 h-40 rounded-t-full overflow-hidden border flex-shrink-0">
        <img :src="cv.personalData.photo" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Cuerpo a 2 Columnas -->
    <div class="grid grid-cols-3 gap-8 flex-1 min-w-0">
      
      <!-- Columna Izquierda (Experiencia Laboral) -->
      <div class="col-span-2 space-y-6 min-w-0">
        <div v-if="cv.experiences?.length" class="space-y-4">
          <h2 class="font-bold text-gray-900 uppercase tracking-widest border-b pb-1">EXPERIENCIA LABORAL</h2>
          <div v-for="exp in cv.experiences" :key="exp.id" class="space-y-1">
            <h3 class="font-bold text-gray-800 text-sm break-words">{{ exp.role || 'Puesto' }}</h3>
            <p class="text-gray-500 font-medium break-words">
              {{ exp.company }} <span v-if="exp.dates">| {{ exp.dates }}</span>
            </p>
            <p class="text-gray-600 leading-relaxed whitespace-pre-line break-words max-w-full">{{ exp.description }}</p>
          </div>
        </div>
      </div>

      <!-- Columna Derecha (Contacto, Habilidades, Educación) -->
      <div class="space-y-6 border-l pl-6 min-w-0">
        
        <!-- Contacto -->
        <div class="space-y-2 break-words">
          <h2 class="font-bold text-gray-900 uppercase tracking-widest border-b pb-1">CONTACTO</h2>
          <p v-if="cv.personalData?.phone">📞 {{ cv.personalData.phone }}</p>
          <p v-if="cv.personalData?.email" class="break-all">✉️ {{ cv.personalData.email }}</p>
          <p v-if="cv.personalData?.location">📍 {{ cv.personalData.location }}</p>
        </div>

        <!-- Habilidades -->
        <div v-if="cv.skills?.length" class="space-y-2">
          <h2 class="font-bold text-gray-900 uppercase tracking-widest border-b pb-1">HABILIDADES</h2>
          <ul class="list-disc list-inside space-y-1 text-gray-600 break-words">
            <li v-for="(h, i) in cv.skills" :key="i">{{ h }}</li>
          </ul>
        </div>

        <!-- Educación -->
        <div v-if="cv.education?.length" class="space-y-3">
          <h2 class="font-bold text-gray-900 uppercase tracking-widest border-b pb-1">EDUCACIÓN</h2>
          <div v-for="edu in cv.education" :key="edu.id" class="space-y-0.5 break-words">
            <p class="font-bold text-gray-800">{{ edu.degree || 'Carrera / Título' }}</p>
            <p class="text-gray-500">{{ edu.institution }}</p>
            <p class="text-gray-400 text-[10px]">{{ edu.dates }} <span v-if="edu.status">({{ edu.status }})</span></p>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>