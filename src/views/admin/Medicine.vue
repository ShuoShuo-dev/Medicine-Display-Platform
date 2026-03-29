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
        <router-link to="/admin/medicine" class="nav-item active">
          <i class="el-icon-medkit mr-2"></i>
          <span>药品管理</span>
        </router-link>
        <router-link to="/admin/category" class="nav-item">
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
        <h1 class="text-xl font-bold">药品管理</h1>
        <el-button type="primary" @click="handleAdd">
          <i class="el-icon-plus mr-1"></i>
          新增药品
        </el-button>
      </div>
      <div class="content-body">
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <el-input v-model="searchKeyword" placeholder="搜索药品名称或品牌" class="mb-4" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
          <el-table :data="filteredMedicines" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="药品名称" width="200"></el-table-column>
            <el-table-column prop="brand" label="品牌"></el-table-column>
            <el-table-column prop="spec" label="规格" width="150"></el-table-column>
            <el-table-column prop="price" label="价格" width="100">
              <template #default="scope">
                ¥{{ scope.row.price }}
              </template>
            </el-table-column>
            <el-table-column prop="categoryId" label="分类" width="120">
              <template #default="scope">
                {{ getCategoryName(scope.row.categoryId) }}
              </template>
            </el-table-column>
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
      width="600px"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="药品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入药品名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" placeholder="请输入品牌"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择分类">
            <el-option 
              v-for="category in categories" 
              :key="category.id" 
              :label="category.name" 
              :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <el-input v-model="form.spec" placeholder="请输入规格"></el-input>
        </el-form-item>
        <el-form-item label="图片URL" prop="image">
          <el-input v-model="form.image" placeholder="请输入图片URL"></el-input>
        </el-form-item>
        <el-form-item label="批准文号" prop="approvalNumber">
          <el-input v-model="form.approvalNumber" placeholder="请输入批准文号"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="form.manufacturer" placeholder="请输入生产厂家"></el-input>
        </el-form-item>
        <el-form-item label="功效主治" prop="efficacy">
          <el-input type="textarea" v-model="form.efficacy" placeholder="请输入功效主治"></el-input>
        </el-form-item>
        <el-form-item label="用法用量" prop="usage">
          <el-input type="textarea" v-model="form.usage" placeholder="请输入用法用量"></el-input>
        </el-form-item>
        <el-form-item label="禁忌" prop="contraindication">
          <el-input type="textarea" v-model="form.contraindication" placeholder="请输入禁忌"></el-input>
        </el-form-item>
        <el-form-item label="注意事项" prop="notice">
          <el-input type="textarea" v-model="form.notice" placeholder="请输入注意事项"></el-input>
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
import { medicineApi } from '../../api'

const router = useRouter()
const store = useMedicineStore()
const medicines = ref([])
const searchKeyword = ref('')
const dialogVisible = ref(false)
const dialogTitle = ref('新增药品')
const formRef = ref(null)
const form = ref({
  id: null,
  name: '',
  brand: '',
  categoryId: null,
  price: 0,
  spec: '',
  image: '',
  approvalNumber: '',
  manufacturer: '',
  efficacy: '',
  usage: '',
  contraindication: '',
  notice: ''
})

const rules = {
  name: [{ required: true, message: '请输入药品名称', trigger: 'blur' }],
  brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  spec: [{ required: true, message: '请输入规格', trigger: 'blur' }],
  image: [{ required: true, message: '请输入图片URL', trigger: 'blur' }],
  approvalNumber: [{ required: true, message: '请输入批准文号', trigger: 'blur' }],
  manufacturer: [{ required: true, message: '请输入生产厂家', trigger: 'blur' }],
  efficacy: [{ required: true, message: '请输入功效主治', trigger: 'blur' }],
  usage: [{ required: true, message: '请输入用法用量', trigger: 'blur' }],
  contraindication: [{ required: true, message: '请输入禁忌', trigger: 'blur' }],
  notice: [{ required: true, message: '请输入注意事项', trigger: 'blur' }]
}

const categories = store.categories

const filteredMedicines = computed(() => {
  if (!searchKeyword.value) return medicines.value
  const keyword = searchKeyword.value.toLowerCase()
  return medicines.value.filter(medicine => 
    medicine.name.toLowerCase().includes(keyword) ||
    medicine.brand.toLowerCase().includes(keyword)
  )
})

const getCategoryName = (categoryId) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : '未知'
}

const handleAdd = () => {
  dialogTitle.value = '新增药品'
  form.value = {
    id: null,
    name: '',
    brand: '',
    categoryId: null,
    price: 0,
    spec: '',
    image: '',
    approvalNumber: '',
    manufacturer: '',
    efficacy: '',
    usage: '',
    contraindication: '',
    notice: ''
  }
  dialogVisible.value = true
}

const handleEdit = (medicine) => {
  dialogTitle.value = '编辑药品'
  form.value = { ...medicine }
  dialogVisible.value = true
}

const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这个药品吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await medicineApi.deleteMedicine(id)
    store.deleteMedicine(id)
    medicines.value = store.medicines
    ElMessage.success('删除成功')
  })
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    if (form.value.id) {
      // 编辑
      await medicineApi.updateMedicine(form.value)
      store.updateMedicine(form.value)
      ElMessage.success('编辑成功')
    } else {
      // 新增
      await medicineApi.addMedicine(form.value)
      store.addMedicine(form.value)
      ElMessage.success('新增成功')
    }
    medicines.value = store.medicines
    dialogVisible.value = false
  }
}

const handleLogout = () => {
  store.logout()
  router.push('/admin/login')
}

onMounted(async () => {
  const response = await medicineApi.getMedicines()
  store.setMedicines(response.data)
  medicines.value = response.data
})
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