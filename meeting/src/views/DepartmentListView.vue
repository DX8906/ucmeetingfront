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
                    <el-button type="primary" @click="handleAdd()">+新增部门</el-button>

                    <el-dialog title="新增部门" :visible.sync="updateDialogFormVisible" style="width: 800px;margin: auto;">
                    <el-form :model="addForm">
                        <el-form-item label="部门名称" :label-width="formLabelWidth">
                        <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sendAdd()">确 定</el-button>
                    </div>
                    </el-dialog>

                    <el-table :data="tableData" border="2px" style="width:1501px;margin-top: 1%;" >
                        <el-table-column prop="id" label="序号" width="150px">
                        </el-table-column>
                        <el-table-column prop="name" label="部门名称" width="200px">
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" width="300px">
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" width="300px">
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
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
                    <el-dialog title="部门信息更改" :visible.sync="dialogFormVisible" style="width: 800px;margin: auto;">
                    <el-form :model="updateForm">
                        <el-form-item label="部门id" :label-width="formLabelWidth">
                        <el-input v-model="updateForm.id" auto-complete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="部门名称" :label-width="formLabelWidth">
                        <el-input v-model="updateForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handleUpdate()">确 定</el-button>
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

export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        updateDialogFormVisible:false,
        updateForm: {
            name: ''
        },
        addForm: {
            id:'',
            name: ''
        },
        formLabelWidth: '80px'
      }
    },
    methods: {
        sendAdd:function(){
            instance({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url: '/depts',
                data: JSON.stringify(this.addForm)
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.getTableData();
                    }
                }),
            this.updateDialogFormVisible = false;
        },
        handleAdd:function(){
            this.updateDialogFormVisible=true;
        },
        handleUpdate:function(){
            instance({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'put',
                url: '/depts',
                data: JSON.stringify(this.updateForm)
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.getTableData();
                    }
                }),
            this.dialogFormVisible = false;
        },
        getTableData: function(){
            instance({
                url:'/depts'
            }).then(res => {
                this.tableData=res.data.data;
            }).catch((err) => {
                alert(err);
            })
        },
        handleEdit(index, row) {
            updateId=this.tableData[index].id;
            this.updateForm.id=updateId;
            this.dialogFormVisible=true;
            console.log(index, row);
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let deleteId = this.tableData[index].id;
            instance.delete('/depts/' + `${deleteId}`).then(
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
    },

  }
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
    .search-form-inline{
        margin-left: 10%;
    }
    .router {
        text-decoration: none;
    }
</style>