import { reactive } from 'vue'
import axios from '../utils/axios'

const authState = reactive({
  user: null,
  isLoading: false,
  errors: null
})

export const useAuth = () => {
  // 登录
  const login = async (params) => {
    authState.isLoading = true
    try {
      await axios.post('/login', params)
    } catch (errors) {
      authState.errors = errors
    } finally {
      authState.isLoading = false
    }
  }

  // 登出
  const logout = async () => {
    try {
      await axios.post('/logout')
      authState.user = null
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get('/api/user')
      authState.user = data
    } catch (error) {
      authState.user = null
    }
  }

  return {
    authState,
    login,
    logout,
    getUserInfo
  }
}