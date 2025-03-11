import axios from 'axios'
import Cookies from 'js-cookie'

let csrfPromise = null

// 确保CSRF令牌
const ensureCSRFToken = async () => {
  if (!csrfPromise) {
    csrfPromise = axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/csrf-cookie`,
      { withCredentials: true }
    ).then(() => {
      csrfPromise = null
    })
  }
  return csrfPromise
}

const instance = axios.create({
  baseURL: '/',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 请求拦截器
instance.interceptors.request.use(async config => {
  if (['post', 'put', 'delete'].includes(config.method.toLowerCase())) {
    await ensureCSRFToken()
    const csrfToken = Cookies.get('XSRF-TOKEN')
    if (csrfToken && config.headers) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken
    }
  }
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  response => response,
  error => {
    const { status, data } = error.response || {}

    switch (status) {
      case 401:
        window.location.href = '/'
        break
      case 403:
        console.error('CSRF验证失败:', data.message)
        break
      case 422:
        return Promise.reject(data.errors)
      default:
        console.error(`请求错误 ${status}:`, data?.message)
    }
    return Promise.reject(error)
  }
)

export default instance