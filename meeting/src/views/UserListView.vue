<template>
    <div class="homeWrap">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="16%" style="background-color: rgb(238, 241, 246)">
                <el-menu>
                <el-container style="height: 75px;">
                    <div class="title"><b>UC Meeting</b></div>
                </el-container>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>会议管理</template>
                    <el-menu-item-group>
                    <el-menu-item index="1-1">
                        <router-link to="/meetingAppoint" class="router">会议预约</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="/meetingList" class="router">会议列表</router-link>
                    </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
                    <el-menu-item-group>
                    <el-menu-item index="2-1">
                        <router-link to="/userList" class="router">用户管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <router-link to="/meetingRoomList" class="router">会议室管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <router-link to="/departmentList" class="router">部门管理</router-link>
                    </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px; height: 75px; background-color: rgb(238, 241, 246); ">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>注销</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>欢迎使用</span>
                </el-header>
                
                <el-main>
                    <el-form :inline="true" :model="userSearchForm" class="search-form-inline" style="margin-left: 0%;">
                        <el-button type="primary" @click="handleAdd()" style="margin-left: 0%;">+新增用户</el-button>

                        <el-form-item label="姓名" style="margin-left: 4%;">
                            <el-input v-model="userSearchForm.name" placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="部门">
                            <el-input v-model="userSearchForm.dept" placeholder="部门"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSearch">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData" border="2px" style="width: 1300px;margin-left: 0%;">
                        <el-table-column prop="id" label="序号" width="50px">
                        </el-table-column>
                        <el-table-column prop="username" label="用户名" width="150px">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120px">
                        </el-table-column>
                        <el-table-column prop="deptName" label="所在部门" width="130px">
                        </el-table-column>
                        <el-table-column prop="permission" label="用户权限" width="130px">
                        </el-table-column>
                        <el-table-column prop="telephone" label="联系方式" width="150px">
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" width="180px">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleResetPassword(scope.$index, scope.row)">重置密码</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageform.currentPage"
                        :page-size="9"
                        layout="total, prev, pager, next, jumper"
                        :total=pageform.total>
                    </el-pagination>
                    <el-dialog title="更改用户信息" :visible.sync="updateDialogFormVisible" style="width: 800px;margin: auto;">
                            <el-form :model="updateForm">
                                <el-form-item label="用户id" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.id" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.username" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="用户权限" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.permission" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.telephone" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="所在部门" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.deptName" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="updateDialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="sendUpdate()">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog title="新增用户" :visible.sync="addDialogFormVisible" style="width: 800px;margin: auto;">
                        <el-form :model="addForm">
                            <el-form-item label="用户名" :label-width="formLabelWidth">
                            <el-input v-model="addForm.username" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth">
                            <el-input v-model="addForm.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="用户权限" :label-width="formLabelWidth">
                            <el-input v-model="addForm.permission" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" :label-width="formLabelWidth">
                            <el-input v-model="addForm.telephone" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="所在部门" :label-width="formLabelWidth">
                            <el-input v-model="addForm.deptName" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addDialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sendAdd()">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import axios from 'axios'
    const instance = axios.create({
        //这里可以抽取公有配置 
        baseURL:'http://localhost:8080'
    })
    let updateId;
// import axios from 'axios';
  export default {
    data() {
      return {
        pageform:{
            total:10,
            currentPage:1,
            pageSize:10
        },
        tableData: [],
        userSearchForm: {
            name:"",
            dept:"",
        },
        updateForm: {
            id:"",
            username: "",
            name:"",
            permission:"",
            telephone:"",
            deptName:""
        },
        addForm: {
            username: '',
            password:'',
            name:'',
            permission:'',
            telephone:'',
            deptName:'',
        },
        addDialogFormVisible: false,
        updateDialogFormVisible:false,
        formLabelWidth: '100px'
      }
    },
    methods: {
        onSearch:function(){
            this.pageform.currentPage=1;
            this.getTableData(this.userSearchForm.name,this.userSearchForm.dept)
        },
        handleCurrentChange:function(val){
            this.pageform.currentPage=val;
            this.getTableData(this.userSearchForm.name,this.userSearchForm.dept)
        },
        handleResetPassword:function(index,row){
            this.$confirm('此操作将重置用户密码, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let resetId = this.tableData[index].id;
            instance.put('/users/' + `${resetId}`).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.$message.info('重置成功，新密码为123456');   
                    }
                }
            );
            console.log(index, row);
            }).catch(() => {
                this.$message.info('已取消重置');          
            });
        },
        sendAdd:function(){
            instance({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url: '/users',
                data: JSON.stringify(this.addForm)
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.getTableData();
                    }
                }),
            this.addDialogFormVisible = false;
        },
        handleAdd:function(){
            this.addDialogFormVisible=true;
        },
        sendUpdate:function(){
            instance({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'put',
                url: '/users',
                data: JSON.stringify(this.updateForm)
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.getTableData();
                    }
                }),
            this.updateDialogFormVisible = false;
        },
        getTableData: function(name,deptName){
            instance({
                url:'/users',
                params:{
                    page:this.pageform.currentPage,
                    pageSize:9,
                    name:name,
                    deptName:deptName
                }
            }).then(res => {
                this.tableData=res.data.data.rows;
                this.pageform.total=res.data.data.total;
            }).catch((err) => {
                alert(err);
            })
        },
        handleEdit(index, row) {
            updateId=this.tableData[index].id;
            this.updateForm.id=updateId;
            this.updateDialogFormVisible=true;
            console.log(index, row);
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let deleteId = this.tableData[index].id;
            instance.delete('/users/' + `${deleteId}`).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.getTableData();
                    }
                }
            );
            console.log(index, row);
            }).catch(() => {
                this.$message.info('已取消删除');          
            });
        }
    },
    mounted() {
        this.getTableData();
    }
  };
</script>
<style>
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    }
    .el-aside {
        color: #333;
    }
    .el-pagination{
        text-align: center;
        position: fixed;
        bottom: 7%;
    }
    .title {
        font-family: 微软雅黑;
        font-size: 20px !important;
        font-weight: 550 !important;
        margin-left: 13% !important;
        color: #5FB878 !important;
        display: inline-block !important;
        height: 60px !important;
        line-height: 60px !important;
        margin-top: 10px !important;
        position: absolute !important;
    }
    .homeWrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .router {
        text-decoration: none;
    }
</style>