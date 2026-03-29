// 格式化价格
export const formatPrice = (price) => {
  return `¥${price.toFixed(2)}`
}

// 格式化日期
export const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN')
}

// 生成随机ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// 防抖函数
export const debounce = (func, delay) => {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// 节流函数
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
