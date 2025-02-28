<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo" />
            <div class="title">智言教合</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto" style="margin-left: 80px">
        <a-menu
          v-model:selectedKeys="current"
          style="font-size: 20px; background-color: #f6f3f3"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <!-- 用户信息展示栏 -->
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <a-space>
                <a-avatar :src="loginUserStore.loginUser.userAvatar" />
                {{ loginUserStore.loginUser.userName ?? '无名' }}
              </a-space>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import {
  BarsOutlined,
  FilePptOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue'
import { type MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import { userLogoutUsingPost } from '@/api/userController.ts'

const loginUserStore = useLoginUserStore()
const current = ref<string[]>([])
const items = ref<MenuProps['items']>([
  {
    key: '/home',
    icon: () => h(HomeOutlined, { style: { fontSize: '24px' } }),
    label: '声音样本库',
  },
  {
    key: '/text-to-audio',
    icon: () => h(MailOutlined, { style: { fontSize: '24px' } }),
    label: '文本转语音',
  },
  {
    key: '/video-reset',
    icon: () => h(VideoCameraOutlined, { style: { fontSize: '24px' } }),
    label: '视频置换',
  },
  {
    key: '/ppt-to-audio',
    icon: () => h(FilePptOutlined, { style: { fontSize: '24px' } }),
    label: '有声PPT',
  },
  {
    key: '/person/center',
    icon: () => h(UserOutlined, { style: { fontSize: '24px' } }),
    label: '个人中心',
  },
  {
    key: 'admin',
    icon: () => h(BarsOutlined, { style: { fontSize: '24px' } }),
    label: '管理',
    children: [
      {
        key: '/admin/ppt',
        label: '有声PPT管理',
      },
      {
        key: '/admin/video',
        label: '视频管理',
      },
      {
        key: '/admin/audio',
        label: '音频管理',
      },
    ],
  },
])
const router = useRouter()

/**
 * 菜单点击事件
 * @param key
 */
const doMenuClick = ({ key }: { key: string }) => {
  if (key !== 'admin') {
    router.push({
      path: key,
    })
  }
}

/**
 * 路由切换后更新当前选中菜单
 */
router.afterEach(() => {
  current.value = [router.currentRoute.value.path]
})
// 用户注销
const doLogout = async () => {
  const res = await userLogoutUsingPost()
  if (res.data.code === 0) {
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    await router.push('/user/login')
  } else {
    message.error('退出登录失败，' + res.data.message)
  }
}
</script>

<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

#globalHeader .title-bar .title {
  font-size: 25px;
  margin-left: 10px;
}

#globalHeader .title-bar .logo {
  height: 48px;
}
</style>
