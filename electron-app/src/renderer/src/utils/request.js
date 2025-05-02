import axios from 'axios'
import { API } from './api'
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: '/api',  // 改为使用代理路径
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 可以在这里添加token等全局请求头
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  // 可以在这里处理全局错误提示等
  const res = response.data
  if (res.code !== 200) {
    ElMessage.error(res.msg || '请求失败')
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res.data
}, error => {
  ElMessage.error(error.msg || '请求失败')
  return Promise.reject(error)
})


// 统一处理响应
const handleResponse = (response) => {
  return response
}

// GET请求
export const get = (url, params) => {
  return request.get(url, { params }).then(handleResponse)
}

// POST请求
export const post = (url, data) => {
  return request.post(url, data).then(handleResponse)
}

// 特定API方法
export const getEmployees = () => get(API.GET_EMPLOYEES)
export const login = (data) => post(API.LOGIN, data)

export default request