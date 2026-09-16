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
    <div class="w-1/3 bg-[#bd887e] text-white p-6 flex flex-col gap-6">
      
      <!-- Foto de Perfil -->
      <div v-if="cv.showPhoto && cv.personalData?.photo" class="flex justify-center">
        <img :src="cv.personalData.photo" class="w-32 h-32 rounded-full border-4 border-[#fceee9] object-cover shadow" />
      </div>

      <!-- Contacto -->
      <div class="space-y-2">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Contacto</div>
        <div class="space-y-1 text-white/90 pl-1 break-words">
          <p v-if="cv.personalData?.phone">📞 {{ cv.personalData.phone }}</p>
          <p v-if="cv.personalData?.email" class="break-all">✉️ {{ cv.personalData.email }}</p>
          <p v-if="cv.personalData?.location">📍 {{ cv.personalData.location }}</p>
        </div>
      </div>

      <!-- Habilidades -->
      <div v-if="cv.skills?.length" class="space-y-2">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Habilidades</div>
        <ul class="list-disc list-inside space-y-1 pl-1 text-white/90 break-words">
          <li v-for="(h, i) in cv.skills" :key="i">{{ h }}</li>
        </ul>
      </div>

      <!-- Idiomas (con soporte seguro) -->
      <div v-if="(cv as any).languages?.length" class="space-y-2">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Idiomas</div>
        <div v-for="(lang, i) in (cv as any).languages" :key="i" class="space-y-1 pl-1 break-words">
          <div class="flex justify-between text-[11px]">
            <span>{{ typeof lang === 'string' ? lang : lang.nombre }}</span>
          </div>
          <div v-if="lang.nivel" class="w-full bg-[#a36f65] h-2 rounded-full overflow-hidden">
            <div class="bg-white h-full" :style="{ width: `${lang.nivel}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Educación -->
      <div v-if="cv.education?.length" class="space-y-2">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Educación</div>
        <div v-for="edu in cv.education" :key="edu.id" class="pl-1 space-y-0.5 break-words">
          <p class="font-bold">{{ edu.degree || 'Carrera / Título' }}</p>
          <p class="text-white/80">{{ edu.institution }}</p>
          <p class="text-white/60 text-[10px]">{{ edu.dates }} <span v-if="edu.status">({{ edu.status }})</span></p>
        </div>
      </div>

    </div>

    <!-- Columna Derecha (Contenido Principal) -->
    <div class="w-2/3 p-8 flex flex-col gap-6">
      
      <!-- Encabezado / Perfil -->
      <div class="bg-[#fceee9] p-6 rounded-sm space-y-2">
        <h1 class="text-3xl font-serif text-[#5c342c] break-words">{{ fullName }}</h1>
        <p class="text-[#8c574c] font-bold uppercase tracking-widest text-[11px] break-words">{{ cv.personalData?.title || 'Título Profesional' }}</p>
        <p v-if="cv.personalData?.summary" class="text-gray-600 leading-relaxed pt-2 border-t border-[#ebcfc7] whitespace-pre-line break-words max-w-full">
          {{ cv.personalData.summary }}
        </p>
      </div>

      <!-- Experiencia Laboral -->
      <div v-if="cv.experiences?.length" class="space-y-4">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Experiencia Laboral</div>
        <div class="relative border-l border-[#bd887e] ml-2 pl-4 space-y-4">
          <div v-for="exp in cv.experiences" :key="exp.id" class="relative">
            <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-[#bd887e] rounded-full"></div>
            <p class="text-[#8c574c] font-bold text-[10px]">{{ exp.dates }}</p>
            <h3 class="font-bold text-gray-800 break-words">
              {{ exp.company }} <span v-if="exp.role">· <span class="font-normal italic">{{ exp.role }}</span></span>
            </h3>
            <p class="text-gray-600 mt-1 leading-relaxed whitespace-pre-line break-words max-w-full">{{ exp.description }}</p>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>