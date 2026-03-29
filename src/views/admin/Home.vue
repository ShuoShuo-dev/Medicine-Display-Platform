<template>
  <div class="admin-container">
    <div class="admin-sidebar">
      <div class="sidebar-header">
        <h2 class="text-xl font-bold text-white flex items-center">
          <i class="el-icon-s-home mr-2"></i>
          医药通管理后台
        </h2>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item active">
          <i class="el-icon-s-home mr-3"></i>
          <span>首页</span>
        </router-link>
        <router-link to="/admin/medicine" class="nav-item">
          <i class="el-icon-medkit mr-3"></i>
          <span>药品管理</span>
        </router-link>
        <router-link to="/admin/category" class="nav-item">
          <i class="el-icon-collection-tag mr-3"></i>
          <span>分类管理</span>
        </router-link>
        <a class="nav-item logout" @click="handleLogout">
          <i class="el-icon-switch-button mr-3"></i>
          <span>退出登录</span>
        </a>
      </nav>
    </div>
    <div class="admin-content">
      <div class="content-header flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">后台管理</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">管理员</span>
          <div class="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center text-white">
            <i class="el-icon-user"></i>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <i class="el-icon-medkit text-primary-color text-2xl"></i>
              </div>
              <div>
                <h3 class="text-gray-500 font-medium">药品总数</h3>
                <p class="text-2xl font-bold text-primary-color">{{ medicineCount }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <i class="el-icon-collection-tag text-green-600 text-2xl"></i>
              </div>
              <div>
                <h3 class="text-gray-500 font-medium">分类数量</h3>
                <p class="text-2xl font-bold text-green-600">{{ categoryCount }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div class="flex items-center">
              <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <i class="el-icon-s-data text-yellow-600 text-2xl"></i>
              </div>
              <div>
                <h3 class="text-gray-500 font-medium">数据统计</h3>
                <p class="text-2xl font-bold text-yellow-600">{{ medicineCount }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <h2 class="text-xl font-bold mb-6 flex items-center">
            <i class="el-icon-s-order mr-2 text-primary-color"></i>
            药品管理概览
          </h2>
          <el-table :data="medicines.slice(0, 5)" style="width: 100%" class="custom-table">
            <el-table-column prop="name" label="药品名称" width="200">
              <template #default="scope">
                <span class="font-medium">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="brand" label="品牌"></el-table-column>
            <el-table-column prop="price" label="价格" width="100">
              <template #default="scope">
                <span class="text-danger-color font-medium">¥{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="categoryId" label="分类" width="100">
              <template #default="scope">
                <span class="bg-primary-light text-primary-color px-2 py-1 rounded-full text-xs">
                  {{ getCategoryName(scope.row.categoryId) }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMedicineStore } from '../../store'
import { medicineApi } from '../../api'

const router = useRouter()
const store = useMedicineStore()
const medicines = ref([])

const medicineCount = computed(() => medicines.value.length)
const categoryCount = computed(() => store.categories.length)

const getCategoryName = (categoryId) => {
  const category = store.categories.find(c => c.id === categoryId)
  return category ? category.name : '未知'
}

const handleLogout = () => {
  store.logout()
  router.push('/admin/login')
}

onMounted(async () => {
  const response = await medicineApi.getMedicines()
  medicines.value = response.data
  store.setMedicines(response.data)
})
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.admin-sidebar {
  width: 260px;
  background-color: #1f2937;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid #374151;
}

.sidebar-nav {
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  color: #d1d5db;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: #374151;
  color: white;
  border-left-color: var(--primary-color);
}

.nav-item.active {
  background-color: #3b82f6;
  color: white;
  border-left-color: #3b82f6;
}

.nav-item.logout {
  margin-top: auto;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.admin-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.content-header {
  margin-bottom: 24px;
}

.content-body {
  min-height: 600px;
}

/* 自定义样式 */
.text-primary-color {
  color: var(--primary-color);
}

.bg-primary-color {
  background-color: var(--primary-color);
}

.bg-primary-light {
  background-color: #dbeafe;
}

.text-danger-color {
  color: var(--danger-color);
}

/* 表格样式 */
.custom-table :deep(.el-table__header-wrapper th) {
  font-weight: 600;
  background-color: #f9fafb;
}

.custom-table :deep(.el-table__row:hover) {
  background-color: #f3f4f6;
}
</style>