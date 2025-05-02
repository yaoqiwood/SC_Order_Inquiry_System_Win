<template>
  <div class="main-container">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="user-info">
        <el-avatar :size="40" :src="user.avatar" />
        <span class="username">{{ user.name }}</span>
        <el-dropdown>
          <el-icon><arrow-down /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 主体区域 -->
    <div class="main-content">
      <!-- 左侧菜单 -->
      <div class="sidebar">
        <el-menu
          router
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/dashboard">
            <el-icon><pie-chart /></el-icon>
            <span>数据看板</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><document /></el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/orders/list">订单列表</el-menu-item>
            <el-menu-item index="/orders/create">新建订单</el-menu-item>
          </el-sub-menu>
          <!-- 更多菜单项... -->
        </el-menu>
      </div>

      <!-- 右侧内容区 -->
      <div class="content-area">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 页面内容 -->
        <div class="page-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const user = ref({
  name: '管理员',
  avatar: ''
})

const route = useRoute()
const breadcrumbs = computed(() => {
  return route.matched.filter(item => item.meta?.title)
})
</script>

<style scoped>
.main-container {
  height: 100vh;
  width: 100vw; /* 添加视窗宽度限制 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止内容溢出 */
}

.header {
  height: 60px;
  width: 100%; /* 确保宽度填满 */
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  position: fixed; /* 固定顶部 */
  z-index: 1000;
}

.main-content {
  display: flex;
  flex: 1;
  margin-top: 60px; /* 为header留出空间 */
  width: 100%;
}

.sidebar {
  width: 220px;
  background: #545c64;
  position: fixed;
  height: calc(100vh - 60px); /* 减去header高度 */
  overflow-y: auto;
}

.content-area {
  flex: 1;
  padding: 20px;
  margin-left: 220px; /* 为sidebar留出空间 */
  width: calc(100% - 220px); /* 计算剩余宽度 */
  overflow-y: auto;
}

.breadcrumb {
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.page-content {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  min-height: calc(100vh - 180px);
}
</style>