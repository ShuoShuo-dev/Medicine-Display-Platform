import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 模拟药品数据
const mockMedicines = [
  {
    id: 1,
    name: '布洛芬缓释胶囊',
    brand: '芬必得',
    categoryId: 1,
    price: 29.8,
    spec: '0.3g*10粒',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ibuprofen%20capsules%20medicine%20bottle%20blue%20background&image_size=square',
    approvalNumber: '国药准字H10900089',
    manufacturer: '中美天津史克制药有限公司',
    efficacy: '用于缓解轻至中度疼痛如头痛、关节痛、偏头痛、牙痛、肌肉痛、神经痛、痛经。也用于普通感冒或流行性感冒引起的发热。',
    usage: '口服。成人，一次1粒，一日2次（早晚各一次）。',
    contraindication: '对其他非甾体抗炎药过敏者禁用；孕妇及哺乳期妇女禁用；对阿司匹林过敏的哮喘患者禁用。',
    notice: '1.本品为对症治疗药，不宜长期或大量使用，用于止痛不得超过5天，用于解热不得超过3天，如症状不缓解，请咨询医师或药师。2.肾功能不全、高血压、心功能不全、消化性溃疡、血友病或其他出血性疾病（包括凝血或血小板功能异常）的患者，使用前必须咨询医师或药师。'
  },
  {
    id: 2,
    name: '感冒灵颗粒',
    brand: '999',
    categoryId: 2,
    price: 19.9,
    spec: '10g*9袋',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20medicine%20granules%20package%20brown%20paper%20bag&image_size=square',
    approvalNumber: '国药准字Z44021940',
    manufacturer: '华润三九医药股份有限公司',
    efficacy: '解热镇痛。用于感冒引起的头痛，发热，鼻塞，流涕，咽痛。',
    usage: '开水冲服，一次1袋，一日3次。',
    contraindication: '严重肝肾功能不全者禁用。',
    notice: '1.忌烟、酒及辛辣、生冷、油腻食物。2.不宜在服药期间同时服用滋补性中成药。'
  },
  {
    id: 3,
    name: '维生素C片',
    brand: '养生堂',
    categoryId: 3,
    price: 89.0,
    spec: '500mg*90片',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vitamin%20C%20tablets%20bottle%20orange%20cap&image_size=square',
    approvalNumber: '国食健字G20040645',
    manufacturer: '养生堂药业有限公司',
    efficacy: '补充维生素C。',
    usage: '每日2次，每次1片。',
    contraindication: '对本品过敏者禁用。',
    notice: '本品不能代替药物；不宜超过推荐量或与同类营养素补充剂同时食用。'
  },
  {
    id: 4,
    name: '一次性医用口罩',
    brand: '稳健',
    categoryId: 4,
    price: 29.9,
    spec: '50只/盒',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=disposable%20medical%20masks%20box%20blue%20packaging&image_size=square',
    approvalNumber: '湘械注准20202140068',
    manufacturer: '稳健医疗用品股份有限公司',
    efficacy: '用于普通医疗环境中佩戴，阻隔口腔和鼻腔呼出或喷出污染物。',
    usage: '1.打开包装，取出口罩。2.将口罩的金属条朝上，有颜色的一面朝外。3.将口罩覆盖口鼻，将金属条压紧贴合鼻梁。4.将口罩下方拉至下巴处。',
    contraindication: '对非织造布过敏者禁用。',
    notice: '1.一次性使用，不可重复使用。2.使用后应按医疗废物处理。'
  },
  {
    id: 5,
    name: '避孕套',
    brand: '杜蕾斯',
    categoryId: 5,
    price: 39.9,
    spec: '12只/盒',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=condom%20package%20box%20blue%20and%20white&image_size=square',
    approvalNumber: '国械注进20162665687',
    manufacturer: '利洁时集团',
    efficacy: '用于避孕和预防性传播疾病。',
    usage: '1.打开包装，取出避孕套。2.将避孕套顶端的空气挤出。3.将避孕套套在勃起的阴茎上。4.性交结束后，在阴茎疲软前抽出。',
    contraindication: '对天然乳胶过敏者禁用。',
    notice: '1.单次使用，不可重复使用。2.如避孕套破裂或滑落，应采取紧急避孕措施。'
  }
]

// 模拟API接口
export const medicineApi = {
  // 获取药品列表
  getMedicines: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: mockMedicines })
      }, 300)
    })
  },
  // 获取药品详情
  getMedicineById: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const medicine = mockMedicines.find(m => m.id === parseInt(id))
        resolve({ data: medicine })
      }, 300)
    })
  },
  // 新增药品
  addMedicine: async (medicine) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { success: true } })
      }, 300)
    })
  },
  // 更新药品
  updateMedicine: async (medicine) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { success: true } })
      }, 300)
    })
  },
  // 删除药品
  deleteMedicine: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: { success: true } })
      }, 300)
    })
  },
  // 管理员登录
  login: async (username, password) => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (username === 'admin' && password === '123456') {
          resolve({ data: { token: 'admin-token-123' } })
        } else {
          resolve({ data: { error: '用户名或密码错误' } })
        }
      }, 300)
    })
  }
}

export default api