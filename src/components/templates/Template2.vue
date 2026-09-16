<script setup>
import { useCvStore } from '../../stores/cvStore'
const cv = useCvStore()
</script>

<template>
  <div class="w-[210mm] min-h-[297mm] bg-white flex mx-auto shadow-md print:shadow-none text-xs">
    <div class="w-1/3 bg-[#bd887e] text-white p-6 flex flex-col gap-6">
      <div v-if="cv.fotoUrl" class="flex justify-center">
        <img :src="cv.fotoUrl" class="w-32 h-32 rounded-full border-4 border-[#fceee9] object-cover" />
      </div>
      <div class="space-y-2">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Contacto</div>
        <div class="space-y-1 text-white/90 pl-1">
          <p v-if="cv.telefono">📞 {{ cv.telefono }}</p>
          <p v-if="cv.email" class="break-all">✉️ {{ cv.email }}</p>
          <p v-if="cv.direccion">📍 {{ cv.direccion }}</p>
        </div>
      </div>
      <div v-if="cv.habilidades.length" class="space-y-2">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Habilidades</div>
        <ul class="list-disc list-inside space-y-1 pl-1 text-white/90">
          <li v-for="(h, i) in cv.habilidades" :key="i">{{ h }}</li>
        </ul>
      </div>
      <div v-if="cv.idiomas.length" class="space-y-2">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Idiomas</div>
        <div v-for="(lang, i) in cv.idiomas" :key="i" class="space-y-1 pl-1">
          <div class="flex justify-between text-[11px]">
            <span>{{ lang.nombre }}</span>
          </div>
          <div class="w-full bg-[#a36f65] h-2 rounded-full overflow-hidden">
            <div class="bg-white h-full" :style="{ width: `${lang.nivel}%` }"></div>
          </div>
        </div>
      </div>
      <div v-if="cv.educacion.length" class="space-y-2">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Educación</div>
        <div v-for="(edu, i) in cv.educacion" :key="i" class="pl-1 space-y-0.5">
          <p class="font-bold">{{ edu.carrera }}</p>
          <p class="text-white/80">{{ edu.institucion }}</p>
          <p class="text-white/60 text-[10px]">{{ edu.periodo }}</p>
        </div>
      </div>
    </div>
    <div class="w-2/3 p-8 flex flex-col gap-6">
      <div class="bg-[#fceee9] p-6 rounded-sm space-y-2">
        <h1 class="text-3xl font-serif text-[#5c342c]">{{ cv.nombreCompleto }}</h1>
        <p class="text-[#8c574c] font-bold uppercase tracking-widest text-[11px]">{{ cv.tituloProfesional }}</p>
        <p v-if="cv.resumen" class="text-gray-600 leading-relaxed pt-2 border-t border-[#ebcfc7]">{{ cv.resumen }}</p>
      </div>
      <div v-if="cv.experiencia.length" class="space-y-4">
        <div class="bg-[#fceee9] text-[#8c574c] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Experiencia Laboral</div>
        <div class="relative border-l border-[#bd887e] ml-2 pl-4 space-y-4">
          <div v-for="(exp, i) in cv.experiencia" :key="i" class="relative">
            <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-[#bd887e] rounded-full"></div>
            <p class="text-[#8c574c] font-bold text-[10px]">{{ exp.periodo }}</p>
            <h3 class="font-bold text-gray-800">{{ exp.empresa }} · <span class="font-normal italic">{{ exp.puesto }}</span></h3>
            <p class="text-gray-600 mt-1 leading-relaxed">{{ exp.descripcion }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>