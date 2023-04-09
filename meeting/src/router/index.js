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
  
]

const router = new VueRouter({
  routes
})

export default router
