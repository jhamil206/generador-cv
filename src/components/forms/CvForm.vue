<template>
  <div class="p-4 space-y-6 text-slate-200">
    <!-- Header Sidebar -->
    <div class="border-b border-slate-700 pb-3 flex justify-between items-center">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span>✏️</span> Datos del CV
      </h2>
    </div>

    <!-- 1. Fotografia -->
    <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-sm space-y-3">
      <div class="flex items-center justify-between">
        <label class="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <span>📷</span> Fotografía de Perfil
        </label>
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400">{{ cvStore.showPhoto ? 'Visible' : 'Oculta' }}</span>
          <button 
            type="button"
            @click="cvStore.showPhoto = !cvStore.showPhoto"
            :class="cvStore.showPhoto ? 'bg-indigo-600' : 'bg-slate-600'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          >
            <span 
              :class="cvStore.showPhoto ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </button>
        </div>
      </div>

      <!-- Boton de Foto 100% Personalizado en Español -->
      <div v-if="cvStore.showPhoto" class="pt-2">
        <input 
          ref="fileInput"
          type="file" 
          accept="image/*" 
          @change="handlePhotoUpload"
          class="hidden"
        />
        <div class="flex items-center gap-3">
          <button 
            type="button"
            @click="$refs.fileInput.click()"
            class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition shadow flex items-center gap-2"
          >
            <span>📁</span> {{ cvStore.personalData.photo ? 'Cambiar Imagen' : 'Seleccionar Foto' }}
          </button>
          <span class="text-xs text-slate-400 truncate max-w-[180px]">
            {{ cvStore.personalData.photo ? 'Imagen cargada' : 'Sin foto seleccionada' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 2. Datos Personales -->
    <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-sm space-y-3">
      <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
        <span>👤</span> Datos Personales
      </h3>
      
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1">Nombres</label>
          <input 
            v-model="cvStore.personalData.firstName" 
            type="text" 
            placeholder="Ej. Carlos"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1">Apellidos</label>
          <input 
            v-model="cvStore.personalData.lastName" 
            type="text" 
            placeholder="Ej. Morales Ruiz"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-400 mb-1">Puesto Deseado / Objetivo Profesional</label>
        <input 
          v-model="cvStore.personalData.title" 
          type="text" 
          placeholder="Ej. Auxiliar de Soporte Técnico / Sistemas"
          class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1">Correo Electrónico</label>
          <input 
            v-model="cvStore.personalData.email" 
            type="email" 
            placeholder="Ej. carlos@ejemplo.com"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-400 mb-1">Teléfono</label>
          <input 
            v-model="cvStore.personalData.phone" 
            type="text" 
            placeholder="Ej. +591 70000000"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-400 mb-1">Ubicación (Ciudad, País)</label>
        <input 
          v-model="cvStore.personalData.location" 
          type="text" 
          placeholder="Ej. La Paz, Bolivia"
          class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-400 mb-1">Perfil / Resumen Profesional</label>
        <textarea 
          v-model="cvStore.personalData.summary" 
          rows="3"
          placeholder="Ej. Estudiante de Sistemas con interés en soporte de redes, mantenimiento de equipos y atención a usuarios..."
          class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
        ></textarea>
      </div>
    </div>

    <!-- 3. Habilidades (Corregido) -->
    <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-sm space-y-3">
      <div class="flex justify-between items-center">
        <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <span>🛠️</span> Habilidades
        </h3>
      </div>
      
      <div class="flex gap-2">
        <input 
          v-model="newSkill" 
          @keydown.enter.prevent="handleAddSkill"
          type="text" 
          placeholder="Ej. Redes Informáticas"
          class="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
        />
        <button 
          type="button"
          @click="handleAddSkill"
          class="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow"
        >
          + Agregar
        </button>
      </div>

      <div v-if="cvStore.skills.length" class="flex flex-wrap gap-2 pt-2">
        <span 
          v-for="(skill, index) in cvStore.skills" 
          :key="index"
          class="bg-slate-900 border border-slate-700 text-slate-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"
        >
          {{ skill }}
          <button type="button" @click="cvStore.removeSkill(index)" class="text-red-400 hover:text-red-300 font-bold">×</button>
        </span>
      </div>
    </div>

    <!-- 4. Experiencia Laboral -->
    <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-sm space-y-3">
      <div class="flex justify-between items-center">
        <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <span>💼</span> Experiencia
        </h3>
        <button 
          type="button"
          @click="cvStore.addExperience"
          class="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold"
        >
          + Agregar
        </button>
      </div>

      <div v-for="(exp, index) in cvStore.experiences" :key="exp.id" class="p-3 bg-slate-900/90 rounded-lg border border-slate-700/80 space-y-2">
        <div class="flex justify-end">
          <button type="button" @click="cvStore.removeExperience(index)" class="text-red-400 text-xs hover:underline">Eliminar</button>
        </div>
        <input v-model="exp.role" placeholder="Cargo (Ej. Auxiliar de Sistemas)" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white" />
        <input v-model="exp.company" placeholder="Empresa o Institución (Ej. Empresa XYZ)" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white" />
        <div class="grid grid-cols-2 gap-2">
          <input v-model="exp.location" placeholder="Ubicación (Ej. La Paz)" class="bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white" />
          <input v-model="exp.dates" placeholder="Fechas (Ej. Ene 2026 - Presente)" class="bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white" />
        </div>
        <textarea v-model="exp.description" placeholder="Descripción de tareas y logros..." rows="2" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white resize-none"></textarea>
      </div>
    </div>

    <!-- 5. Educación (Con Selector de Estado Académico) -->
    <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700 shadow-sm space-y-3">
      <div class="flex justify-between items-center">
        <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <span>🎓</span> Educación
        </h3>
        <button 
          type="button"
          @click="cvStore.addEducation"
          class="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold"
        >
          + Agregar
        </button>
      </div>

      <div v-for="(edu, index) in cvStore.education" :key="edu.id" class="p-3 bg-slate-900/90 rounded-lg border border-slate-700/80 space-y-2">
        <div class="flex justify-end">
          <button type="button" @click="cvStore.removeEducation(index)" class="text-red-400 text-xs hover:underline">Eliminar</button>
        </div>
        <input v-model="edu.degree" placeholder="Carrera / Título (Ej. Técnico Superior en Sistemas)" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white" />
        <input v-model="edu.institution" placeholder="Institución Educativa (Ej. Instituto Tecnológico)" class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white" />
        
        <div>
          <label class="block text-[10px] font-medium text-slate-400 mb-1">Estado Académico</label>
          <select 
            v-model="edu.status" 
            class="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none"
          >
            <option value="Estudiante / En curso">🎓 Estudiante / En curso</option>
            <option value="Egresado">📜 Egresado</option>
            <option value="Titulado">🎖️ Titulado</option>
            <option value="En trámite de titulación">⏳ En trámite de titulación</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <input v-model="edu.location" placeholder="Ubicación (Ej. El Alto)" class="bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white" />
          <input v-model="edu.dates" placeholder="Fechas (Ej. 2024 - 2026)" class="bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCvStore } from '../../stores/cvStore'

const cvStore = useCvStore()
const newSkill = ref('')

const handleAddSkill = () => {
  if (newSkill.value.trim()) {
    cvStore.addSkill(newSkill.value)
    newSkill.value = ''
  }
}

const handlePhotoUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      cvStore.personalData.photo = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>