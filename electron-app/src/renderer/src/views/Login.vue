<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">三驰订单查询系统</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-select
            v-model="loginForm.username"
            placeholder="请选择用户"
            filterable
            clearable
            prefix-icon="User"
          >
            <el-option
              v-for="item in employeeOptions"
              :key="item.etypeId"
              :label="item.eFullName"
              :value="item.etypeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getEmployees, login } from '../utils/request'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rememberPassword: false,
      employeeOptions: [],
      rules: {
        username: [{ required: true, message: '请选择用户', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  async created() {
    await this.loadEmployees()
    this.loadSavedCredentials()
  },
  methods: {
    async loadSavedCredentials() {
      const saved = window.electronAPI.store.get('credentials')
      if (saved) {
        this.loginForm = {
          username: saved.username,
          password: saved.password
        }
        this.rememberPassword = saved.remember
      }
    },
    async loadEmployees() {
      if (this.employeeOptions.length > 0) return
      try {
        const data = await getEmployees()
        this.employeeOptions = data
      } catch (error) {
        console.error('获取用户列表失败:', error)
        this.$message.error('获取用户列表失败')
      }
    },
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            const response = await login({
              etypeId: this.loginForm.username,
              password: this.loginForm.password
            })
            this.$message.success(`登录成功: ${JSON.stringify(response)}`)
            // 记住密码逻辑
            if (this.rememberPassword) {
              window.electronAPI.store.set('credentials', {
                username: this.loginForm.username,
                password: this.loginForm.password,
                remember: true
              })
            } else {
              window.electronAPI.store.delete('credentials')
            }
            // 调整窗口大小并跳转
            if (window.electronAPI) {
              window.electronAPI.resizeWindow(1200, 800)
            }
            this.$router.push('/main')
          } catch (error) {
            console.error('登录失败:', error)
            this.$message.error('登录失败，请检查用户名和密码')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #409eff;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
