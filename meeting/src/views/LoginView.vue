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
            username:[{required:true,message:"请输入用户名",trigger:"blur"},{ min: 5, max: 14, message: '长度在 5 到 14 个字符', trigger: 'blur' }
            ],
            password:[{required:true,message:"请输入密码",trigger:"blur"},{ min: 6,  message: '密码长度要大于6', trigger: 'blur' }],
        }
    }
},
  methods:{
    submitLogin(){
        this.$refs.loginForm.validate((valid) => {
            if (valid) {
                alert('提交成功');
            } else {
                this.$message.error('登录出错请重新输入');
                return false;
            }
        });
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


