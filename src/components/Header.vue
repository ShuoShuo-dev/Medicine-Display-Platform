<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
      <div class="flex items-center mb-4 md:mb-0">
        <h1 class="text-2xl font-bold text-primary-color flex items-center">
          <i class="el-icon-medkit mr-2"></i>
          医药通
        </h1>
        <nav class="ml-8 hidden md:flex space-x-6">
          <router-link to="/" class="text-gray-700 hover:text-primary-color font-medium transition-colors">首页</router-link>
          <router-link to="/list" class="text-gray-700 hover:text-primary-color font-medium transition-colors">全部药品</router-link>
          <router-link to="/about" class="text-gray-700 hover:text-primary-color font-medium transition-colors">关于我们</router-link>
        </nav>
      </div>
      <div class="flex items-center space-x-4 w-full md:w-auto">
        <div class="relative flex-grow md:flex-grow-0">
          <input 
            v-model="searchKeyword" 
            @input="handleSearch" 
            type="text" 
            placeholder="搜索药品..." 
            class="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color w-full md:w-64 transition-all"
          >
          <i class="el-icon-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <router-link to="/admin/login" class="text-gray-700 hover:text-primary-color transition-colors">
          <i class="el-icon-user-circle text-xl"></i>
        </router-link>
      </div>
    </div>
    <div class="bg-primary-color text-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex overflow-x-auto py-3 space-x-8">
          <router-link 
            v-for="category in categories" 
            :key="category.id" 
            :to="`/category/${category.id}`" 
            class="whitespace-nowrap hover:text-accent-color font-medium transition-colors relative group"
          >
            {{ category.name }}
            <span class="absolute bottom-0 left-0 w-0 h-1 bg-accent-color transition-all group-hover:w-full"></span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMedicineStore } from '../store'

const router = useRouter()
const store = useMedicineStore()
const searchKeyword = ref('')
const categories = store.categories

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    store.setSearchKeyword(searchKeyword.value)
    router.push('/list')
  }
}
</script>

<style scoped>
/* 自定义样式 */
.text-primary-color {
  color: var(--primary-color);
}

.text-accent-color {
  color: var(--accent-color);
}

.bg-primary-color {
  background-color: var(--primary-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

/* 滚动条样式 */
.flex.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.flex.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.flex.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.flex.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
}
</style>