<template>
  <div class="home-page">
    <Swiper />
    <div class="container mx-auto px-4 py-12">
      <!-- 药品分类 -->
      <section class="mb-16">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold mb-3">药品分类</h2>
          <p class="text-gray-600">选择您需要的药品类别</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <router-link 
            v-for="category in categories" 
            :key="category.id" 
            :to="`/category/${category.id}`" 
            class="category-card bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
          >
            <div class="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:bg-primary-color group-hover:scale-110">
              <i class="el-icon-medkit text-primary-color group-hover:text-white text-2xl transition-colors"></i>
            </div>
            <h3 class="font-medium text-lg transition-colors group-hover:text-primary-color">{{ category.name }}</h3>
          </router-link>
        </div>
      </section>
      
      <!-- 热门药品 -->
      <section>
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-3xl font-bold mb-2">热门药品</h2>
            <p class="text-gray-600">为您推荐的优质药品</p>
          </div>
          <router-link to="/list" class="text-primary-color hover:text-primary-dark transition-colors flex items-center">
            查看全部
            <i class="el-icon-arrow-right ml-2"></i>
          </router-link>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <MedicineCard 
            v-for="medicine in medicines" 
            :key="medicine.id" 
            :medicine="medicine"
          />
        </div>
      </section>
      
      <!-- 平台特色 -->
      <section class="mt-20">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold mb-3">平台特色</h2>
          <p class="text-gray-600">为什么选择医药通</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="el-icon-info text-primary-color text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">信息全面</h3>
            <p class="text-gray-600">涵盖各类药品的详细信息，包括功效、用法、禁忌等</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="el-icon-check text-green-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">信息准确</h3>
            <p class="text-gray-600">严格审核药品信息，确保数据的准确性和可靠性</p>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="el-icon-s-custom text-yellow-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-3">用户友好</h3>
            <p class="text-gray-600">简洁直观的界面设计，方便用户快速找到所需信息</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from '../../components/Swiper.vue'
import MedicineCard from '../../components/MedicineCard.vue'
import { useMedicineStore } from '../../store'
import { medicineApi } from '../../api'

const store = useMedicineStore()
const medicines = ref([])
const categories = store.categories

onMounted(async () => {
  const response = await medicineApi.getMedicines()
  store.setMedicines(response.data)
  medicines.value = response.data
})
</script>

<style scoped>
/* 自定义样式 */
.bg-primary-light {
  background-color: #dbeafe;
}

.text-primary-color {
  color: var(--primary-color);
}

.text-primary-dark {
  color: #2563eb;
}

.bg-primary-color {
  background-color: var(--primary-color);
}
</style>