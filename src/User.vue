<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { getUserInfo, logout } = useAuth()
const userInfo = ref(null)
const router = useRouter()

const handleLogout = async () => {
  try {
    await logout()
    console.log('Logout success')
    // 登出后跳转到登录页面
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

onMounted(async () => {
  try {
    const response = await getUserInfo()
    userInfo.value = response.data
  } catch (error) {
    console.error('Failed to get user info:', error);
  }
})
</script>

<template>
  <div>
    <h1>用户资料：</h1>
    <pre>{{ userInfo }}</pre>
    <button @click="handleLogout">Logout</button>
  </div>
</template>