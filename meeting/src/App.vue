<template>
  <div>
    <!-- <login-view></login-view> -->
    <!-- <meeting-list-view></meeting-list-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import MeetingListView from './views/MeetingListView.vue'
// import LoginView from './views/login/LoginView.vue'
export default {
  // components: { MeetingListView },
  // components: { LoginView },
  data(){
    return{
      
    }
  },
  methods: {
    
  }
}

</script>
<style>
  .el-dialog {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0px !important;
  }
</style>
