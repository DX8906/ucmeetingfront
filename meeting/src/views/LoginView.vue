<template>
    <div class="body">
      <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
		<img class="logo" src="../assets/logo.png" />
		<div class="title">UC Meeting</div>
		<div class="desc">本科生院会议信息平台</div>
        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" >
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" >
            </el-input>
        </el-form-item>
        <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
      </el-form>
    </div>
</template>

<script>
import {
  Loading
} from 'element-ui'
import {request} from '../network/requst'
export default {
// eslint-disable-next-line
name: "Login",
  data(){
    return{
        loginForm:{
            username:"",
            password:"",
        },
        rules:{
            username:[{required:true,message:"请输入用户名",trigger:"blur"},{ min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
            ],
            password:[{required:true,message:"请输入密码",trigger:"blur"},{ min: 6, max:14,  message: '长度在 6 到 14 个字符', trigger: 'blur' }],
        }
    }
},
  methods:{
    submitLogin() {
      const loading = Loading.service({ fullscreen: true })
      request({
        method: 'post',
        url: '/users/login',
        data: {
          'username': this.loginForm.username,
          'password': this.loginForm.password,
        }
      }).then(res => {
        if(res.data.code===1){
          loading.close()
          // 登录成功将用户 uid 存入 localStorage
          localStorage.setItem('token', res.data.data)
          //data.data.normal_login_token为发送Ajax获取到的token信息
          var strings = res.data.data.split(".");//通过split()方法将token转为字符串数组
          //取strings[1]数组中的第二个字符进行解析
          var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/"))))); 
          //然后可以拿到解析后的数据，可以console.log()打印下，
          // alert(userinfo.permission);
          // alert(userinfo.permission!="管理员"&&userinfo.permission!="超级管理员");
          if(userinfo.permission!="管理员"&&userinfo.permission!="超级管理员"){
            this.$router.push('/userMeetingAppoint')
          }else{
            this.$router.push('/meetingAppoint')
          }
          // var accountId = userinfo.accountId;
          this.$message({
              message:'登录成功',
              type:'success'
          });
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

<style lang="less" scoped>
    .loginContainer{
      background-clip: padding-box;
      text-align: left;
      margin: auto;
      margin-top: 180px;
      width: 350px;
      padding: 15px 35px 15px 35px;
      background: aliceblue;
    }
    .body{
      background-image: url("../assets/loginbackground.svg") ;
      background-size:100%;
      overflow: hidden;
      position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .logo {
        width: 60px !important;
        margin-top: 10px !important;
        margin-bottom: 10px !important;
        margin-left: 20px !important;
    }
    .title {
        font-size: 30px !important;
        font-weight: 550 !important;
        margin-left: 30px !important;
        color: #5FB878 !important;
        display: inline-block !important;
        height: 60px !important;
        line-height: 60px !important;
        margin-top: 10px !important;
        position: absolute !important;
    }
    .desc {
        width: 100% !important;
        text-align: center !important;
        color: gray !important;
        height: 60px !important;
        line-height: 60px !important;
        margin-bottom: 10px;
    }
    .router {
        text-decoration: none;
    }
</style>


