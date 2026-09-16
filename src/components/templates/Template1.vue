<script setup>
import { useCvStore } from '../../stores/cvStore'
const cv = useCvStore()
</script>

<template>
  <div class="w-[210mm] min-h-[297mm] bg-white flex mx-auto shadow-md print:shadow-none text-xs">
    <div class="w-1/3 bg-[#3269b3] text-white p-6 flex flex-col gap-6">
      <div v-if="cv.fotoUrl" class="flex justify-center">
        <img :src="cv.fotoUrl" class="w-32 h-32 rounded-full border-4 border-white object-cover shadow" />
      </div>
      <div class="space-y-2">
        <h3 class="font-bold border-b border-blue-400 pb-1 text-sm tracking-wider">CONTACTO</h3>
        <p v-if="cv.telefono">📞 {{ cv.telefono }}</p>
        <p v-if="cv.email" class="break-all">✉️ {{ cv.email }}</p>
        <p v-if="cv.direccion">📍 {{ cv.direccion }}</p>
      </div>
      <div v-if="cv.habilidades.length" class="space-y-2">
        <h3 class="font-bold border-b border-blue-400 pb-1 text-sm tracking-wider">HABILIDADES</h3>
        <ul class="list-disc list-inside space-y-1">
          <li v-for="(h, i) in cv.habilidades" :key="i">{{ h }}</li>
        </ul>
      </div>
      <div v-if="cv.educacion.length" class="space-y-3">
        <h3 class="font-bold border-b border-blue-400 pb-1 text-sm tracking-wider">EDUCACIÓN</h3>
        <div v-for="(edu, i) in cv.educacion" :key="i">
          <p class="font-bold">{{ edu.carrera }}</p>
          <p class="text-blue-100">{{ edu.institucion }}</p>
          <p class="text-blue-200 text-[10px]">{{ edu.periodo }}</p>
        </div>
      </div>
    </div>
    <div class="w-2/3 flex flex-col">
      <div class="bg-[#1a365d] text-white p-8 min-h-[120px] flex flex-col justify-center">
        <h1 class="text-2xl font-bold uppercase tracking-wider">{{ cv.nombreCompleto }}</h1>
        <p class="text-blue-200 uppercase mt-1 tracking-widest text-[11px]">{{ cv.tituloProfesional }}</p>
      </div>
      <div class="p-8 space-y-6 flex-1">
        <div v-if="cv.resumen" class="space-y-2">
          <h2 class="font-bold text-[#1a365d] tracking-wider uppercase border-b pb-1">ACERCA DE MÍ</h2>
          <p class="text-gray-600 leading-relaxed">{{ cv.resumen }}</p>
        </div>
        <div v-if="cv.experiencia.length" class="space-y-4">
          <h2 class="font-bold text-[#1a365d] tracking-wider uppercase border-b pb-1">EXPERIENCIA LABORAL</h2>
          <div class="relative border-l-2 border-[#1a365d] ml-2 pl-4 space-y-4">
            <div v-for="(exp, i) in cv.experiencia" :key="i" class="relative">
              <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-[#1a365d] rounded-full"></div>
              <h3 class="font-bold text-gray-800">{{ exp.puesto }}</h3>
              <p class="text-gray-500 font-medium text-[11px]">{{ exp.empresa }} {{ exp.ubicacion ? `· ${exp.ubicacion}` : '' }} | {{ exp.periodo }}</p>
              <p class="text-gray-600 mt-1 leading-relaxed">{{ exp.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>