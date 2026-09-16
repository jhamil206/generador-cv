import { defineStore } from 'pinia'

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  dates: string
  description: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  status: string
  location: string
  dates: string
}

export const useCvStore = defineStore('cv', {
  state: () => ({
    selectedTemplate: 'Plantilla 1',
    showPhoto: true,
    personalData: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      photo: ''
    },
    skills: [] as string[],
    experiences: [] as Experience[],
    education: [] as Education[],
    languages: [] as string[], // Evita undefined si la plantilla busca idiomas
    projects: [] as any[]      // Evita undefined si la plantilla busca proyectos
  }),

  getters: {
    // Alias para que la plantilla funcione tanto en singular como en plural
    experience: (state) => state.experiences
  },

  actions: {
    addSkill(skill: string) {
      const cleanSkill = skill.trim()
      if (cleanSkill && !this.skills.includes(cleanSkill)) {
        this.skills.push(cleanSkill)
      }
    },
    removeSkill(index: number) {
      this.skills.splice(index, 1)
    },
    addExperience() {
      this.experiences.push({
        id: Date.now().toString(),
        role: '',
        company: '',
        location: '',
        dates: '',
        description: ''
      })
    },
    removeExperience(index: number) {
      this.experiences.splice(index, 1)
    },
    addEducation() {
      this.education.push({
        id: Date.now().toString(),
        degree: '',
        institution: '',
        status: 'Estudiante / En curso',
        location: '',
        dates: ''
      })
    },
    removeEducation(index: number) {
      this.education.splice(index, 1)
    }
  }
})