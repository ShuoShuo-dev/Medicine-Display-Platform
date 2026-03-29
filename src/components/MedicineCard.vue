<template>
  <div class="medicine-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group">
    <div class="h-48 overflow-hidden relative">
      <img 
        :src="medicine.image" 
        :alt="medicine.name" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      >
      <div class="absolute top-2 right-2 bg-accent-color text-white text-xs font-bold px-2 py-1 rounded-full">
        热销
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-bold mb-2 text-gray-800 line-clamp-2 transition-colors group-hover:text-primary-color">
        {{ medicine.name }}
      </h3>
      <p class="text-gray-500 text-sm mb-2 flex items-center">
        <i class="el-icon-s-shop mr-1"></i>
        {{ medicine.brand }}
      </p>
      <p class="text-gray-600 text-sm mb-3 flex items-center">
        <i class="el-icon-s-order mr-1"></i>
        {{ medicine.spec }}
      </p>
      <div class="flex justify-between items-center">
        <span class="text-danger-color font-bold text-lg">
          {{ formatPrice(medicine.price) }}
        </span>
        <router-link 
          :to="`/detail/${medicine.id}`" 
          class="text-primary-color hover:text-primary-dark transition-colors flex items-center"
        >
          查看详情
          <i class="el-icon-arrow-right ml-1 transition-transform group-hover:translate-x-1"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '../utils'

const props = defineProps({
  medicine: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* 自定义样式 */
.text-primary-color {
  color: var(--primary-color);
}

.text-primary-dark {
  color: #2563eb;
}

.text-danger-color {
  color: var(--danger-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>