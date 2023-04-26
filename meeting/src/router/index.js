import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"/",
    component: () => import('../views/LoginView')
  },
  {
    path: '/departmentList',
    name: 'departmentList',
    component: () => import('../views/DepartmentListView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginView.vue')
  },
  {
    path: '/meetingList',
    name: 'meetingList',
    component: () => import('../views/MeetingListView.vue')
  },
  {
    path: '/userList',
    name: 'userList',
    component: () => import('../views/UserListView.vue')
  },

  {
    path: '/meetingAppoint',
    name: 'meetingAppoint',
    component: () => import('../views/MeetingAppointView.vue')
  },
  {
    path: '/meetingRoomList',
    name: 'meetingRoomList',
    component: () => import('../views/MeetingRoomListView.vue')
  },
  {
    path: '/conferencePresentation',
    name: 'conferencePresentation',
    component: () => import('../views/ConferencePresentationView.vue')
  },
  {
    path: '/userMeetingAppoint',
    name: 'userMeetingAppoint',
    component: () => import('../views/UserMeetingAppointView.vue')
  },
  {
    path: '/userMeetingList',
    name: 'uerMeetingList',
    component: () => import('../views/UserMeetingListView.vue')
  },  
  {
    path: '/conferencePresentationManage',
    name: 'conferencePresentationManage',
    component: () => import('../views/ConferencePresentationManageView')
  },
  {
    path: '/userConferencePresentation',
    name: 'userConferencePresentation',
    component: () => import('../views/UserConferencePresentationView')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果跳转的目的路径是 login 界面, 不做操作
  if (to.path === '/login') {
    next()
  } else {
    /**
     * 如果是其他界面, 判断本地是否存在 Token
     * 如果存在, 则正常跳转
     * 否则重定向到 login 界面
     */
    let token = localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
