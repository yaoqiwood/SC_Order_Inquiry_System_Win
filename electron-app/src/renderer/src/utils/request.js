import axios from 'axios'
import { API } from './api'

const request = axios.create({
  baseURL: '/api',  // 改为使用代理路径
  timeout: 5000
})

// 统一处理响应
const handleResponse = (response) => {
  if (response.status === 200 && response.data.code === 200) {
    return response.data.data
  } else {
    const error = new Error(response.data.msg || '请求失败')
    error.response = response
    throw error
  }
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

export default request