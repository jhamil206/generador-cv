<script setup>
import { useCvStore } from '../../stores/cvStore'
const cv = useCvStore()
</script>

<template>
  <div class="w-[210mm] min-h-[297mm] bg-white p-8 mx-auto shadow-md print:shadow-none text-xs flex flex-col gap-6 font-sans">
    <div class="border-b-2 border-gray-800 pb-4">
      <h1 class="text-3xl font-bold uppercase tracking-wider text-gray-900">{{ cv.nombreCompleto }}</h1>
      <p class="text-sm font-semibold text-gray-700 uppercase mt-1">{{ cv.tituloProfesional }}</p>
      <div class="flex flex-wrap gap-4 text-gray-600 mt-3 text-[11px]">
        <p v-if="cv.email">✉️ {{ cv.email }}</p>
        <p v-if="cv.telefono">📞 {{ cv.telefono }}</p>
        <p v-if="cv.direccion">📍 {{ cv.direccion }}</p>
      </div>
    </div>
    <div v-if="cv.resumen" class="space-y-1">
      <h2 class="font-bold text-gray-900 uppercase border-b pb-0.5 tracking-wider">RESUMEN</h2>
      <p class="text-gray-700 leading-relaxed pt-1">{{ cv.resumen }}</p>
    </div>
    <div v-if="cv.educacion.length" class="space-y-2">
      <h2 class="font-bold text-gray-900 uppercase border-b pb-0.5 tracking-wider">EDUCACIÓN</h2>
      <div v-for="(edu, i) in cv.educacion" :key="i" class="flex justify-between items-start pt-1">
        <div>
          <p class="font-bold text-gray-800">{{ edu.institucion }}</p>
          <p class="text-gray-600">{{ edu.carrera }}</p>
        </div>
        <div class="text-right text-gray-500 text-[11px]">
          <p>{{ edu.ubicacion }}</p>
          <p>{{ edu.periodo }}</p>
        </div>
      </div>
    </div>
    <div v-if="cv.habilidades.length" class="space-y-1">
      <h2 class="font-bold text-gray-900 uppercase border-b pb-0.5 tracking-wider">HABILIDADES</h2>
      <ul class="grid grid-cols-2 gap-x-4 gap-y-1 list-disc list-inside text-gray-700 pt-1">
        <li v-for="(h, i) in cv.habilidades" :key="i">{{ h }}</li>
      </ul>
    </div>
    <div v-if="cv.experiencia.length" class="space-y-3">
      <h2 class="font-bold text-gray-900 uppercase border-b pb-0.5 tracking-wider">EXPERIENCIA</h2>
      <div v-for="(exp, i) in cv.experiencia" :key="i" class="space-y-1">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-bold text-gray-800">{{ exp.puesto }}</p>
            <p class="text-gray-600 font-medium">{{ exp.empresa }} {{ exp.ubicacion ? `- ${exp.ubicacion}` : '' }}</p>
          </div>
          <p class="text-gray-500 text-[11px]">{{ exp.periodo }}</p>
        </div>
        <p class="text-gray-700 leading-relaxed">{{ exp.descripcion }}</p>
      </div>
    </div>
  </div>
</template>