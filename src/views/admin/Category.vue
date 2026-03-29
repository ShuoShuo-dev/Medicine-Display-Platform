<template>
  <div class="admin-container">
    <div class="admin-sidebar">
      <div class="sidebar-header">
        <h2 class="text-xl font-bold text-white">医药通管理后台</h2>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item">
          <i class="el-icon-s-home mr-2"></i>
          <span>首页</span>
        </router-link>
        <router-link to="/admin/medicine" class="nav-item">
          <i class="el-icon-medkit mr-2"></i>
          <span>药品管理</span>
        </router-link>
        <router-link to="/admin/category" class="nav-item active">
          <i class="el-icon-collection-tag mr-2"></i>
          <span>分类管理</span>
        </router-link>
        <a class="nav-item" @click="handleLogout">
          <i class="el-icon-switch-button mr-2"></i>
          <span>退出登录</span>
        </a>
      </nav>
    </div>
    <div class="admin-content">
      <div class="content-header flex justify-between items-center">
        <h1 class="text-xl font-bold">分类管理</h1>
        <el-button type="primary" @click="handleAdd">
          <i class="el-icon-plus mr-1"></i>
          新增分类
        </el-button>
      </div>
      <div class="content-body">
        <div class="bg-white rounded-lg shadow-md p-6">
          <el-table :data="categories" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 新增/编辑对话框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="400px"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMedicineStore } from '../../store'

const router = useRouter()
const store = useMedicineStore()
const dialogVisible = ref(false)
const dialogTitle = ref('新增分类')
const formRef = ref(null)
const form = ref({
  id: null,
  name: ''
})

const rules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}

const categories = computed(() => store.categories)

const handleAdd = () => {
  dialogTitle.value = '新增分类'
  form.value = {
    id: null,
    name: ''
  }
  dialogVisible.value = true
}

const handleEdit = (category) => {
  dialogTitle.value = '编辑分类'
  form.value = { ...category }
  dialogVisible.value = true
}

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这个分类吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.deleteCategory(id)
    ElMessage.success('删除成功')
  })
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    if (form.value.id) {
      // 编辑
      store.updateCategory(form.value)
      ElMessage.success('编辑成功')
    } else {
      // 新增
      store.addCategory(form.value)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
  }
}

const handleLogout = () => {
  store.logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.admin-sidebar {
  width: 250px;
  background-color: #1f2937;
  color: white;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #374151;
}

.sidebar-nav {
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #d1d5db;
  text-decoration: none;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: #374151;
  color: white;
}

.nav-item.active {
  background-color: #3b82f6;
  color: white;
}

.admin-content {
  flex: 1;
  padding: 20px;
}

.content-header {
  margin-bottom: 20px;
}

.content-body {
  min-height: 600px;
}
</style>