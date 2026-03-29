<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-bold mb-6 text-center text-blue-600">管理员登录</h1>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-full" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMedicineStore } from '../../store'
import { medicineApi } from '../../api'

const router = useRouter()
const store = useMedicineStore()
const loginFormRef = ref(null)
const loginForm = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  const valid = await loginFormRef.value.validate()
  if (valid) {
    const response = await medicineApi.login(loginForm.value.username, loginForm.value.password)
    if (response.data.token) {
      store.login(response.data.token)
      router.push('/admin')
    } else {
      ElMessage.error(response.data.error || '登录失败')
    }
  }
}
</script>

<style scoped>
/* 自定义样式 */
</style>