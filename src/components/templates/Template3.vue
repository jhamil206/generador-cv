<script setup>
import { useCvStore } from '../../stores/cvStore'
const cv = useCvStore()
</script>

<template>
  <div class="w-[210mm] min-h-[297mm] bg-white p-10 mx-auto shadow-md print:shadow-none text-xs flex flex-col gap-6">
    <div class="flex justify-between items-start gap-6 border-b pb-6">
      <div class="space-y-2 flex-1">
        <h1 class="text-4xl font-serif text-gray-900 tracking-tight">{{ cv.nombreCompleto }}</h1>
        <p class="text-xs uppercase tracking-widest text-gray-500 font-semibold">{{ cv.tituloProfesional }}</p>
        <p v-if="cv.resumen" class="text-gray-600 leading-relaxed pt-2">{{ cv.resumen }}</p>
      </div>
      <div v-if="cv.fotoUrl" class="w-32 h-40 rounded-t-full overflow-hidden border flex-shrink-0">
        <img :src="cv.fotoUrl" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-8 flex-1">
      <div class="col-span-2 space-y-6">
        <div v-if="cv.experiencia.length" class="space-y-4">
          <h2 class="font-bold text-gray-900 uppercase tracking-widest border-b pb-1">EXPERIENCIA LABORAL</h2>
          <div v-for="(exp, i) in cv.experiencia" :key="i" class="space-y-1">
            <h3 class="font-bold text-gray-800 text-sm">{{ exp.puesto }}</h3>
            <p class="text-gray-500 font-medium">{{ exp.empresa }} | {{ exp.periodo }}</p>
            <p class="text-gray-600 leading-relaxed">{{ exp.descripcion }}</p>
          </div>
        </div>
      </div>
      <div class="space-y-6 border-l pl-6">
        <div class="space-y-2">
          <h2 class="font-bold text-gray-900 uppercase tracking-widest border-b pb-1">CONTACTO</h2>
          <p v-if="cv.telefono">📞 {{ cv.telefono }}</p>
          <p v-if="cv.email" class="break-all">✉️ {{ cv.email }}</p>
          <p v-if="cv.direccion">📍 {{ cv.direccion }}</p>
        </div>
        <div v-if="cv.habilidades.length" class="space-y-2">
          <h2 class="font-bold text-gray-900 uppercase tracking-widest border-b pb-1">HABILIDADES</h2>
          <ul class="list-disc list-inside space-y-1 text-gray-600">
            <li v-for="(h, i) in cv.habilidades" :key="i">{{ h }}</li>
          </ul>
        </div>
        <div v-if="cv.educacion.length" class="space-y-3">
          <h2 class="font-bold text-gray-900 uppercase tracking-widest border-b pb-1">EDUCACIÓN</h2>
          <div v-for="(edu, i) in cv.educacion" :key="i" class="space-y-0.5">
            <p class="font-bold text-gray-800">{{ edu.carrera }}</p>
            <p class="text-gray-500">{{ edu.institucion }}</p>
            <p class="text-gray-400 text-[10px]">{{ edu.periodo }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>