<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- 筛选侧边栏 -->
      <div class="w-full md:w-1/4">
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-bold mb-4 flex items-center">
            <i class="el-icon-collection-tag mr-2 text-primary-color"></i>
            分类筛选
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link 
                to="/list" 
                class="block py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors" 
                :class="{ 'bg-primary-light text-primary-color font-medium': !currentCategory }"
                @click="handleCategory(null)"
              >
                全部药品
              </router-link>
            </li>
            <li v-for="category in categories" :key="category.id">
              <router-link 
                :to="`/category/${category.id}`" 
                class="block py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors" 
                :class="{ 'bg-primary-light text-primary-color font-medium': currentCategory === category.id.toString() }"
                @click="handleCategory(category.id)"
              >
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold mb-4 flex items-center">
            <i class="el-icon-s-finance mr-2 text-primary-color"></i>
            价格区间
          </h3>
          <div class="space-y-4">
            <el-slider 
              v-model="priceRange" 
              range 
              :min="0" 
              :max="500" 
              @change="handlePriceFilter"
              class="custom-slider"
            />
            <div class="flex justify-between text-sm text-gray-600 font-medium">
              <span>¥{{ priceRange[0] }}</span>
              <span>¥{{ priceRange[1] }}</span>
            </div>
            <button class="w-full py-2 bg-primary-color text-white rounded-lg hover:bg-primary-dark transition-colors" @click="handlePriceFilter">
              应用筛选
            </button>
          </div>
        </div>
      </div>
      
      <!-- 药品列表 -->
      <div class="w-full md:w-3/4">
        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 class="text-2xl font-bold">{{ currentCategoryName }}药品列表</h2>
              <p class="text-gray-600 mt-1">{{ filteredMedicines.length }} 个药品</p>
            </div>
            <div class="flex space-x-3">
              <el-select v-model="sortBy" @change="handleSort" placeholder="排序方式" class="w-40">
                <el-option label="默认" value="default"></el-option>
                <el-option label="价格从低到高" value="price_asc"></el-option>
                <el-option label="价格从高到低" value="price_desc"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        
        <!-- 药品卡片网格 -->
        <div v-if="filteredMedicines.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <MedicineCard 
            v-for="medicine in filteredMedicines" 
            :key="medicine.id" 
            :medicine="medicine"
          />
        </div>
        
        <!-- 空状态 -->
        <div v-else class="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md">
          <i class="el-icon-s-goods text-6xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-medium text-gray-600 mb-2">暂无药品</h3>
          <p class="text-gray-500">请尝试调整筛选条件</p>
        </div>
        
        <!-- 分页 -->
        <div v-if="filteredMedicines.length > 0" class="mt-8 flex justify-center">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[12, 24, 36]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="filteredMedicines.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="custom-pagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MedicineCard from '../../components/MedicineCard.vue'
import { useMedicineStore } from '../../store'
import { medicineApi } from '../../api'

const route = useRoute()
const store = useMedicineStore()
const currentCategory = ref(route.params.id)
const priceRange = ref([0, 500])
const sortBy = ref('default')
const currentPage = ref(1)
const pageSize = ref(12)

const categories = store.categories
const medicines = ref([])

const currentCategoryName = computed(() => {
  if (!currentCategory.value) return '全部'
  const category = categories.find(c => c.id === parseInt(currentCategory.value))
  return category ? category.name : '全部'
})

const filteredMedicines = computed(() => {
  let result = store.filteredMedicines
  
  // 价格筛选
  result = result.filter(medicine => 
    medicine.price >= priceRange.value[0] && medicine.price <= priceRange.value[1]
  )
  
  // 排序
  switch (sortBy.value) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    default:
      break
  }
  
  return result
})

const handleCategory = (categoryId) => {
  currentCategory.value = categoryId
  store.setCurrentCategory(categoryId)
  currentPage.value = 1
}

const handlePriceFilter = () => {
  currentPage.value = 1
}

const handleSort = () => {
  currentPage.value = 1
}

const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page) => {
  currentPage.value = page
}

onMounted(async () => {
  const response = await medicineApi.getMedicines()
  store.setMedicines(response.data)
  medicines.value = response.data
  store.setCurrentCategory(currentCategory.value)
})

watch(() => route.params.id, (newId) => {
  currentCategory.value = newId
  store.setCurrentCategory(newId)
  currentPage.value = 1
})
</script>

<style scoped>
/* 自定义样式 */
.text-primary-color {
  color: var(--primary-color);
}

.bg-primary-light {
  background-color: #dbeafe;
}

.bg-primary-color {
  background-color: var(--primary-color);
}

.bg-primary-dark {
  background-color: #2563eb;
}

/* 滑块样式 */
.custom-slider :deep(.el-slider__runway) {
  height: 6px;
  border-radius: 3px;
}

.custom-slider :deep(.el-slider__bar) {
  background-color: var(--primary-color);
  height: 6px;
  border-radius: 3px;
}

.custom-slider :deep(.el-slider__button) {
  width: 16px;
  height: 16px;
  border: 2px solid var(--primary-color);
}

/* 分页样式 */
.custom-pagination :deep(.el-pagination__item:hover) {
  color: var(--primary-color);
}

.custom-pagination :deep(.el-pagination__item.active) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
</style>