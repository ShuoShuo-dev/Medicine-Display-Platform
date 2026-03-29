<template>
  <div class="swiper-container relative overflow-hidden h-64 md:h-96 rounded-lg shadow-lg">
    <div 
      class="swiper-wrapper flex transition-transform duration-800 ease-out" 
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="swiper-slide flex-shrink-0 w-full h-full"
      >
        <img 
          :src="slide.image" 
          :alt="slide.title" 
          class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div class="container mx-auto px-4 py-8 text-white transform transition-transform duration-500 hover:translate-y-[-10px]">
            <h3 class="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up">{{ slide.title }}</h3>
            <p class="text-gray-200 animate-fade-in-up animation-delay-200">{{ slide.description }}</p>
            <button class="mt-4 px-6 py-2 bg-primary-color text-white rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 animate-fade-in-up animation-delay-400">
              立即查看
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 左右箭头 -->
    <button 
      class="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all"
      @click="prevSlide"
    >
      <i class="el-icon-arrow-left text-xl"></i>
    </button>
    <button 
      class="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition-all"
      @click="nextSlide"
    >
      <i class="el-icon-arrow-right text-xl"></i>
    </button>
    <!-- 分页指示器 -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
      <button 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="w-3 h-3 rounded-full transition-all duration-300" 
        :class="index === currentIndex ? 'bg-white w-8' : 'bg-white/50'"
        @click="currentIndex = index"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    default: () => [
      {
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=medicine%20promotion%20banner%20blue%20background%20pharmacy&image_size=landscape_16_9',
        title: '春季健康特惠',
        description: '全场药品满100减20，更有惊喜好礼等你拿'
      },
      {
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=medicine%20sale%20banner%20red%20background%20healthcare&image_size=landscape_16_9',
        title: '家庭药箱必备',
        description: '精选常用药品，为您的家庭健康保驾护航'
      },
      {
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=medicine%20advertisement%20green%20background%20natural%20herbs&image_size=landscape_16_9',
        title: '中药养生',
        description: '传统中药，现代工艺，为您带来健康生活'
      }
    ]
  }
})

const currentIndex = ref(0)
let intervalId

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
/* 自定义样式 */
.bg-primary-color {
  background-color: var(--primary-color);
}

.bg-primary-dark {
  background-color: #2563eb;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .swiper-container {
    height: 12rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
}
</style>