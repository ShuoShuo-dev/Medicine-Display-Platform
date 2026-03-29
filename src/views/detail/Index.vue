<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="mb-6">
      <el-breadcrumb-item><router-link to="/">首页</router-link></el-breadcrumb-item>
      <el-breadcrumb-item><router-link to="/list">全部药品</router-link></el-breadcrumb-item>
      <el-breadcrumb-item>{{ medicine?.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    
    <!-- 药品详情 -->
    <div v-if="medicine" class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- 药品基本信息 -->
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/3 p-6">
          <div class="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img :src="medicine.image" :alt="medicine.name" class="w-full h-auto">
            <div class="absolute top-4 right-4 bg-accent-color text-white text-xs font-bold px-3 py-1 rounded-full">
              正品保障
            </div>
          </div>
        </div>
        <div class="w-full md:w-2/3 p-6">
          <h1 class="text-3xl font-bold mb-3 text-gray-800">{{ medicine.name }}</h1>
          <p class="text-gray-600 mb-4 flex items-center">
            <i class="el-icon-s-shop mr-2 text-primary-color"></i>
            {{ medicine.brand }}
          </p>
          <div class="flex flex-col sm:flex-row items-start sm:items-center mb-6 space-y-3 sm:space-y-0 sm:space-x-6">
            <div class="flex items-center">
              <span class="text-danger-color font-bold text-3xl">{{ formatPrice(medicine.price) }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <i class="el-icon-s-order mr-2"></i>
              {{ medicine.spec }}
            </div>
          </div>
          
          <!-- 核心信息 -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-medium mb-4 flex items-center">
              <i class="el-icon-info mr-2 text-primary-color"></i>
              核心信息
            </h3>
            <ul class="space-y-3">
              <li class="flex justify-between">
                <span class="text-gray-500">批准文号：</span>
                <span class="font-medium">{{ medicine.approvalNumber }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-500">生产厂家：</span>
                <span class="font-medium">{{ medicine.manufacturer }}</span>
              </li>
            </ul>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex space-x-4">
            <button class="flex-1 py-3 bg-primary-color text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center">
              <i class="el-icon-shopping-cart mr-2"></i>
              加入购物车
            </button>
            <button class="flex-1 py-3 bg-secondary-color text-white rounded-lg hover:bg-secondary-dark transition-colors flex items-center justify-center">
              <i class="el-icon-phone mr-2"></i>
              咨询客服
            </button>
          </div>
        </div>
      </div>
      
      <!-- 详情标签页 -->
      <div class="border-t border-gray-200">
        <el-tabs v-model="activeTab" class="custom-tabs">
          <el-tab-pane label="功效主治">
            <div class="p-6">
              <div class="prose max-w-none">
                <h3 class="text-xl font-bold mb-4 text-gray-800">功效主治</h3>
                <p class="text-gray-700 leading-relaxed">{{ medicine.efficacy }}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="用法用量">
            <div class="p-6">
              <div class="prose max-w-none">
                <h3 class="text-xl font-bold mb-4 text-gray-800">用法用量</h3>
                <p class="text-gray-700 leading-relaxed">{{ medicine.usage }}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="禁忌">
            <div class="p-6">
              <div class="prose max-w-none">
                <h3 class="text-xl font-bold mb-4 text-gray-800">禁忌</h3>
                <p class="text-gray-700 leading-relaxed">{{ medicine.contraindication }}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注意事项">
            <div class="p-6">
              <div class="prose max-w-none">
                <h3 class="text-xl font-bold mb-4 text-gray-800">注意事项</h3>
                <p class="text-gray-700 leading-relaxed">{{ medicine.notice }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-else class="flex justify-center items-center h-96">
      <el-skeleton :rows="12" animated />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { formatPrice } from '../../utils'
import { medicineApi } from '../../api'

const route = useRoute()
const medicine = ref(null)
const activeTab = ref('0')

onMounted(async () => {
  const id = route.params.id
  const response = await medicineApi.getMedicineById(id)
  medicine.value = response.data
})
</script>

<style scoped>
/* 自定义样式 */
.text-primary-color {
  color: var(--primary-color);
}

.text-danger-color {
  color: var(--danger-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.bg-primary-color {
  background-color: var(--primary-color);
}

.bg-primary-dark {
  background-color: #2563eb;
}

.bg-secondary-color {
  background-color: var(--secondary-color);
}

.bg-secondary-dark {
  background-color: #059669;
}

/* 标签页样式 */
.custom-tabs :deep(.el-tabs__header) {
  border-bottom: 1px solid #e5e7eb;
}

.custom-tabs :deep(.el-tabs__item) {
  font-size: 1rem;
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
}

.custom-tabs :deep(.el-tabs__item:hover) {
  color: var(--primary-color);
}

.custom-tabs :deep(.el-tabs__active-bar) {
  background-color: var(--primary-color);
}

.custom-tabs :deep(.el-tabs__item.is-active) {
  color: var(--primary-color);
  font-weight: 500;
}
</style>