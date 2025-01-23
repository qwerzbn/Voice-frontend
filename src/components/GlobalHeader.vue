<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo" />
            <div class="title">AI 教学语音合成软件</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <a-button type="primary" style="margin-left: 10px">登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const current = ref<string[]>([])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(MailOutlined),
    label: '声音样本库',
  },
  {
    key: '/about',
    icon: () => h(AppstoreOutlined),
    label: '文本转语音',
  },
  {
    key: '/setting',
    icon: () => h(SettingOutlined),
    label: '设置',
  },
])
const router = useRouter()

/**
 * 菜单点击事件
 * @param key
 */
const doMenuClick = ({ key }) => {
  router.push({
    path: key,
  })
}

/**
 * 路由切换后更新当前选中菜单
 */
router.afterEach(() => {
  current.value = [router.currentRoute.value.path]
})
</script>

<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

#globalHeader .title-bar .title {
  margin-left: 10px;
}

#globalHeader .title-bar .logo {
  height: 48px;
}
</style>
