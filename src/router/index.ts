import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import PPTView from '../pages/PPT-To-Video.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/text-to-audio',
      name: 'text-to-audio',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is
      component: () => import('../pages/Gradio.vue'),
    },
    {
      path: '/video-reset',
      name: 'video-reset',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is
      component: () => import('../pages/Video-Reset.vue'),
    },
    {
      path: '/ppt-to-audio',
      name: 'ppt-to-audio',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is
      component: PPTView,
    },
    {
      path: '/person/center',
      name: '个人中心',
      component: () => import('../pages/PersonCenter.vue'),

    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginPage,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage,
    },
  ],
})

export default router
