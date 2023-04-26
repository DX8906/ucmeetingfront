<template>
    <div>
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown" style="width: 120px;">
            <el-dropdown-item >
                <el-button @click="handleLogOff()" style="border: none;margin-left: center;">注销</el-button> 
            </el-dropdown-item>
            <el-dropdown-item >
                <el-button @click="handleChangePassword()" style="border: none;">修改密码</el-button>
            </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>欢迎使用</span>
        <el-dialog title="更改密码" :visible.sync="changeDialogFormVisible" style="width: 800px;margin: auto;">
            <el-form :model="changeForm" :rules="rules">
                <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
                    <el-input v-model="changeForm.oldPassword" auto-complete="off" placeholder="请输入原密码" show-password type="password"></el-input>
                </el-form-item>
                <el-form-item label="更改密码" :label-width="formLabelWidth" prop="newPassword">
                    <el-input v-model="changeForm.newPassword" auto-complete="off" placeholder="请输入新密码" show-password type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="rePassword">
                    <el-input v-model="changeForm.rePassword" auto-complete="off" placeholder="确认密码" show-password type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendChangePassword()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {request} from '../network/requst'
export default {
    data() {
        var equalToPassword = (rule, value, callback) => {
            if (this.changeForm.newPassword !== value) {
                callback(new Error("两次输入的密码不一致"));
                this.isSame=false;
            } else {
                this.isSame=true;
                callback();
            }
        };
      return {
        isSame:false,
        changeForm:{
            oldPassword:"",
            newPassword:"",
            rePassword:""
        },
        changeDialogFormVisible:false,
        rules: {
            oldPassword: [
            { required: true, message: "原密码不能为空", trigger: "blur" },
            { min: 6, max: 12, message: "长度在 6 到 12个字符", trigger: "blur" }
            ],
            newPassword: [
            { required: true, message: "新密码不能为空", trigger: "blur" },
            { min: 6, max: 12, message: "长度在 6 到 12个字符", trigger: "blur" }
            ],
            rePassword: [
            { required: true, message: "确认密码不能为空", trigger: "blur" },
            { required: true, validator: equalToPassword, trigger: "blur" }
            ]
        }
      }
    },
    methods: {
        handleLogOff:function(){
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                window.localStorage.removeItem('token')
                this.$router.push('/login');
            }).catch(() => {
                this.$message.info('已取消退出登录');          
            });
        },
        handleChangePassword:function(){
            this.changeDialogFormVisible=true;
        },
        sendChangePassword:function(){
            if(this.isSame){
                request({
                method: 'put',
                url: '/changePassword',
                params:{
                    oldPassword:this.changeForm.oldPassword,
                    newPassword:this.changeForm.newPassword
                }
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.$message({
                            message:'密码更改成功',
                            type:'success'
                        });
                    }else{
                        this.$message({
                            message:'密码更改失败',
                            type:'error'
                        });
                    }
                    this.changeDialogFormVisible = false;
                })
            }else{
                this.$message({
                    message:'确认密码与新密码不一致',
                    type:'error'
                })
            }
        }
    },
}
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
</style>