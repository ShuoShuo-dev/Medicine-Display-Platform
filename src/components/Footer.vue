<template>
  <footer class="bg-dark-color text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="transform transition-transform hover:-translate-y-2">
          <h3 class="text-lg font-bold mb-4 flex items-center">
            <i class="el-icon-medkit mr-2 text-primary-color"></i>
            医药通
          </h3>
          <p class="text-gray-400">专业的药品展示平台，为您提供全面的药品信息。</p>
          <div class="mt-4 flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-primary-color transition-colors">
              <i class="el-icon-chat-line-round text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary-color transition-colors">
              <i class="el-icon-mobile-phone text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-primary-color transition-colors">
              <i class="el-icon-message text-xl"></i>
            </a>
          </div>
        </div>
        <div class="transform transition-transform hover:-translate-y-2">
          <h3 class="text-lg font-bold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-primary-color transition-colors">首页</router-link></li>
            <li><router-link to="/list" class="text-gray-400 hover:text-primary-color transition-colors">全部药品</router-link></li>
            <li><router-link to="/about" class="text-gray-400 hover:text-primary-color transition-colors">关于我们</router-link></li>
          </ul>
        </div>
        <div class="transform transition-transform hover:-translate-y-2">
          <h3 class="text-lg font-bold mb-4">分类导航</h3>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id">
              <router-link :to="`/category/${category.id}`" class="text-gray-400 hover:text-primary-color transition-colors">
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="transform transition-transform hover:-translate-y-2">
          <h3 class="text-lg font-bold mb-4">联系我们</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <i class="el-icon-phone mr-3 text-primary-color mt-1"></i>
              <span class="text-gray-400">400-123-4567</span>
            </li>
            <li class="flex items-start">
              <i class="el-icon-message mr-3 text-primary-color mt-1"></i>
              <span class="text-gray-400">contact@yiyaotong.com</span>
            </li>
            <li class="flex items-start">
              <i class="el-icon-position mr-3 text-primary-color mt-1"></i>
              <span class="text-gray-400">北京市朝阳区医药大厦</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p class="transform transition-transform hover:text-primary-color">© 2024 医药通 - 药品展示平台. 保留所有权利.</p>
        <p class="mt-2">仅做药品信息展示，不涉及处方药销售</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useMedicineStore } from '../store'

const store = useMedicineStore()
const categories = store.categories
</script>

<style scoped>
/* 自定义样式 */
.bg-dark-color {
  background-color: var(--dark-color);
}

.text-primary-color {
  color: var(--primary-color);
}
</style>