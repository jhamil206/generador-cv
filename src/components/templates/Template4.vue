<script setup>
import { useCvStore } from '../../stores/cvStore'
const cv = useCvStore()
</script>

<template>
  <div class="w-[210mm] min-h-[297mm] bg-white p-8 mx-auto shadow-md print:shadow-none text-xs space-y-6">
    <div class="flex items-center gap-6 border-b pb-6">
      <img v-if="cv.fotoUrl" :src="cv.fotoUrl" class="w-28 h-32 object-cover rounded border border-gray-300" />
      <div class="flex-1 space-y-1">
        <h1 class="text-2xl font-bold tracking-wider text-gray-800 uppercase">{{ cv.nombreCompleto }}</h1>
        <p class="text-sky-700 font-semibold uppercase tracking-wide">{{ cv.tituloProfesional }}</p>
        <div class="grid grid-cols-2 gap-1 text-gray-600 pt-2 text-[11px]">
          <p v-if="cv.telefono">📞 {{ cv.telefono }}</p>
          <p v-if="cv.email">✉️ {{ cv.email }}</p>
          <p v-if="cv.direccion" class="col-span-2">📍 {{ cv.direccion }}</p>
        </div>
      </div>
    </div>
    <div v-if="cv.resumen" class="space-y-1">
      <h2 class="font-bold text-gray-800 uppercase tracking-wider border-l-4 border-sky-600 pl-2">Resumen Profesional</h2>
      <p class="text-gray-600 leading-relaxed pt-1">{{ cv.resumen }}</p>
    </div>
    <div v-if="cv.experiencia.length" class="space-y-3">
      <h2 class="font-bold text-gray-800 uppercase tracking-wider border-l-4 border-sky-600 pl-2">Experiencia Laboral</h2>
      <div class="relative border-l-2 border-sky-200 ml-3 pl-4 space-y-4">
        <div v-for="(exp, i) in cv.experiencia" :key="i" class="relative">
          <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-sky-600 rounded-full"></div>
          <span class="text-sky-700 font-bold text-[10px]">{{ exp.periodo }}</span>
          <h3 class="font-bold text-gray-800">{{ exp.empresa }} · {{ exp.puesto }}</h3>
          <p class="text-gray-600 mt-1 leading-relaxed">{{ exp.descripcion }}</p>
        </div>
      </div>
    </div>
    <div v-if="cv.educacion.length" class="space-y-3">
      <h2 class="font-bold text-gray-800 uppercase tracking-wider border-l-4 border-sky-600 pl-2">Formación</h2>
      <div class="relative border-l-2 border-sky-200 ml-3 pl-4 space-y-3">
        <div v-for="(edu, i) in cv.educacion" :key="i" class="relative">
          <div class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-sky-600 rounded-full"></div>
          <span class="text-sky-700 font-bold text-[10px]">{{ edu.periodo }}</span>
          <h3 class="font-bold text-gray-800">{{ edu.institucion }}</h3>
          <p class="text-gray-600">{{ edu.carrera }}</p>
        </div>
      </div>
    </div>
  </div>
</template>