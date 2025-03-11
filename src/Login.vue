<script setup>
import { ref, reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'


const router = useRouter()
const { authState, login } = useAuth()
const form = ref({
  email: 'test@example.com',
  password: 'password'
})
const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }
  ]
})
const fetchLogin = async () => {
  await login(form.value)
  if (!authState.errors) {
    // 登录成功
    router.push('./user')
  }
}
</script>

<template>
  <div class="login-container">
    <el-form
      :model="form"
      :rules="rules"
      label-width="auto"
      style="max-width: 600px;"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="authState.isLoading" @click="fetchLogin">{{ authState.isLoading ? '登录中...' : '登录' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>