<template>
  <div class="container mx-auto px-4 py-12">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">关于我们</h1>
      <div class="w-20 h-1 bg-primary-color mx-auto"></div>
    </div>
    
    <!-- 平台介绍 -->
    <section class="bg-white rounded-xl shadow-md p-8 mb-12 transform transition-all duration-300 hover:shadow-lg">
      <h2 class="text-2xl font-bold mb-6 flex items-center">
        <i class="el-icon-info mr-3 text-primary-color"></i>
        平台介绍
      </h2>
      <div class="prose max-w-none">
        <p class="text-gray-700 mb-4 leading-relaxed">
          医药通是一个专业的药品展示平台，致力于为用户提供全面、准确的药品信息。我们的平台汇集了各类药品的详细信息，包括西药、中药、保健品、医疗器械和计生用品等。
        </p>
        <p class="text-gray-700 mb-4 leading-relaxed">
          我们的使命是通过提供透明、专业的药品信息，帮助用户更好地了解药品知识，做出明智的健康选择。同时，我们严格遵守医药监管要求，仅做药品信息展示，不涉及处方药销售。
        </p>
        <p class="text-gray-700 leading-relaxed">
          医药通团队由一群热爱医药行业的专业人士组成，我们致力于打造一个安全、可靠、用户友好的药品信息平台，为用户的健康保驾护航。
        </p>
      </div>
    </section>
    
    <!-- 平台特色 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-8 text-center">平台特色</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
            <i class="el-icon-info text-primary-color text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">信息全面</h3>
          <p class="text-gray-600">涵盖各类药品的详细信息，包括功效、用法、禁忌等</p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
            <i class="el-icon-check text-green-600 text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">信息准确</h3>
          <p class="text-gray-600">严格审核药品信息，确保数据的准确性和可靠性</p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
          <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
            <i class="el-icon-s-custom text-yellow-600 text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-3">用户友好</h3>
          <p class="text-gray-600">简洁直观的界面设计，方便用户快速找到所需信息</p>
        </div>
      </div>
    </section>
    
    <!-- 联系我们 -->
    <section class="bg-white rounded-xl shadow-md p-8">
      <h2 class="text-2xl font-bold mb-6 flex items-center">
        <i class="el-icon-phone mr-3 text-primary-color"></i>
        联系我们
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <i class="el-icon-phone text-primary-color text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold mb-1">电话</h3>
              <p class="text-gray-600">400-123-4567</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <i class="el-icon-message text-primary-color text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold mb-1">邮箱</h3>
              <p class="text-gray-600">contact@yiyaotong.com</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <i class="el-icon-position text-primary-color text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold mb-1">地址</h3>
              <p class="text-gray-600">北京市朝阳区医药大厦</p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="font-bold mb-4">留言反馈</h3>
          <el-form class="custom-form">
            <el-form-item label="姓名">
              <el-input placeholder="请输入您的姓名" class="custom-input"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input placeholder="请输入您的邮箱" class="custom-input"></el-input>
            </el-form-item>
            <el-form-item label="留言">
              <el-input type="textarea" placeholder="请输入您的留言" class="custom-textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round class="custom-button">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 关于我们页面
</script>

<style scoped>
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

/* 表单样式 */
.custom-form :deep(.el-form-item__label) {
  font-weight: 500;
}

.custom-input :deep(.el-input__inner) {
  border-radius: 0.5rem;
  border-color: #e5e7eb;
}

.custom-textarea :deep(.el-textarea__inner) {
  border-radius: 0.5rem;
  border-color: #e5e7eb;
}

.custom-button {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  padding: 0.5rem 2rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.custom-button:hover {
  background-color: #2563eb;
  border-color: #2563eb;
  transform: translateY(-1px);
}
</style>