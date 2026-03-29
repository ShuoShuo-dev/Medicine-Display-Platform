import { defineStore } from 'pinia'

export const useMedicineStore = defineStore('medicine', {
  state: () => ({
    medicines: [],
    categories: [
      { id: 1, name: '西药' },
      { id: 2, name: '中药' },
      { id: 3, name: '保健品' },
      { id: 4, name: '医疗器械' },
      { id: 5, name: '计生用品' }
    ],
    currentCategory: null,
    searchKeyword: '',
    filteredMedicines: [],
    adminToken: localStorage.getItem('adminToken')
  }),
  getters: {
    getMedicineById: (state) => (id) => {
      return state.medicines.find(medicine => medicine.id === parseInt(id))
    },
    getMedicinesByCategory: (state) => (categoryId) => {
      if (!categoryId) return state.medicines
      return state.medicines.filter(medicine => medicine.categoryId === parseInt(categoryId))
    }
  },
  actions: {
    setMedicines(medicines) {
      this.medicines = medicines
      this.filteredMedicines = medicines
    },
    setSearchKeyword(keyword) {
      this.searchKeyword = keyword
      this.filterMedicines()
    },
    setCurrentCategory(categoryId) {
      this.currentCategory = categoryId
      this.filterMedicines()
    },
    filterMedicines() {
      let filtered = this.medicines
      
      if (this.currentCategory) {
        filtered = filtered.filter(medicine => medicine.categoryId === parseInt(this.currentCategory))
      }
      
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        filtered = filtered.filter(medicine => 
          medicine.name.toLowerCase().includes(keyword) ||
          medicine.brand.toLowerCase().includes(keyword) ||
          medicine.efficacy.toLowerCase().includes(keyword)
        )
      }
      
      this.filteredMedicines = filtered
    },
    addMedicine(medicine) {
      const newId = Math.max(...this.medicines.map(m => m.id), 0) + 1
      this.medicines.push({ ...medicine, id: newId })
      this.filterMedicines()
    },
    updateMedicine(updatedMedicine) {
      const index = this.medicines.findIndex(m => m.id === updatedMedicine.id)
      if (index !== -1) {
        this.medicines[index] = updatedMedicine
        this.filterMedicines()
      }
    },
    deleteMedicine(id) {
      this.medicines = this.medicines.filter(m => m.id !== id)
      this.filterMedicines()
    },
    login(token) {
      this.adminToken = token
      localStorage.setItem('adminToken', token)
    },
    logout() {
      this.adminToken = null
      localStorage.removeItem('adminToken')
    },
    addCategory(category) {
      const newId = Math.max(...this.categories.map(c => c.id), 0) + 1
      this.categories.push({ ...category, id: newId })
    },
    updateCategory(updatedCategory) {
      const index = this.categories.findIndex(c => c.id === updatedCategory.id)
      if (index !== -1) {
        this.categories[index] = updatedCategory
      }
    },
    deleteCategory(id) {
      this.categories = this.categories.filter(c => c.id !== id)
    }
  }
})
