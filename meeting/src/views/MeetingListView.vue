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
                    <el-form :inline="true" :model="meetingSearchForm" class="search-form-inline" style="margin-left:0%">
                        <el-form-item label="开始时间">
                            <el-input v-model="meetingSearchForm.name" placeholder="会议名称"></el-input>
                        </el-form-item>
                        <el-form-item label="参会人员">
                            <el-input v-model="meetingSearchForm.participants" placeholder="参会人员"></el-input>
                        </el-form-item>
                        <el-form-item label="会议日期">
                            <el-date-picker
                                v-model="meetingSearchForm.startEndData"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSearch">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData" border="2px" style="text-align: center;">
                        <el-table-column prop="id" label="序号" width="70">
                        </el-table-column>
                        <el-table-column prop="startTime" label="开始时间" width="150">
                        </el-table-column>
                        <el-table-column prop="endTime" label="结束时间" width="150">
                        </el-table-column>
                        <el-table-column prop="meetingRoom" label="会议地点" width="150">
                        </el-table-column>
                        <el-table-column prop="content" label="会议内容" width="160">
                        </el-table-column>
                        <el-table-column prop="attendingLeaders" label="参会领导" width="170">
                        </el-table-column>
                        <el-table-column prop="undertakingUnit" label="承办单位" width="190">
                        </el-table-column>
                        <el-table-column prop="declarerName" label="申报人" width="100">
                        </el-table-column>
                        <el-table-column prop="meetingMaterials" label="会议材料" width="100">
                        </el-table-column>
                        <el-table-column prop="meetingNotes" label="备注" width="100">
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
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page=pageForm.currentPage
                        :page-size="9"
                        layout="total,  prev, pager, next, jumper"
                        :total=pageForm.total>
                    </el-pagination>
                    <el-dialog title="更改会议信息" :visible.sync="updateDialogFormVisible" style="width: 800px;margin: auto;">
                            <el-form :model="updateForm">
                                <el-form-item label="会议id" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.id" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.startTime" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="结束时间" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.endTime" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议地点" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.meetingRoom" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议内容" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.content" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="承办单位" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.undertakingUnit" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议材料" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.meetingMaterials" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="备注" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.meetingNotes" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="updateDialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="sendUpdate()">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog title="新增会议" :visible.sync="addDialogFormVisible" style="width: 800px;margin: auto;">
                        <el-form :model="addForm">
                                <el-form-item label="开始时间" :label-width="formLabelWidth">
                                <el-input v-model="addForm.startTime" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="结束时间" :label-width="formLabelWidth">
                                <el-input v-model="addForm.endTime" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议地点" :label-width="formLabelWidth">
                                <el-input v-model="addForm.meetingRoom" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议内容" :label-width="formLabelWidth">
                                <el-input v-model="addForm.content" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="承办单位" :label-width="formLabelWidth">
                                <el-input v-model="addForm.undertakingUnit" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议材料" :label-width="formLabelWidth">
                                <el-input v-model="addForm.meetingMaterials" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="备注" :label-width="formLabelWidth">
                                <el-input v-model="addForm.meetingNotes" auto-complete="off"></el-input>
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
  export default {
    data() {
      return {
        pageForm:{
            total:10,
            currentPage:1,
            pageSize:10
        },
        tableData: [],
        updateForm: {
            id:"",
            startTime:"",
            endTime:"",
            meetingRoom:"",
            content:"",
            attendingLeaders:"",
            undertakingUnit:"",
            declarerName:"",
            meetingMaterials:"",
            meetingNotes:""
        },
        addForm: {
            startTime:"",
            endTime:"",
            meetingRoom:"",
            content:"",
            attendingLeaders:"",
            undertakingUnit:"",
            declarerName:"",
            meetingMaterials:"",
            meetingNotes:""
        },
        addDialogFormVisible: false,
        updateDialogFormVisible:false,
        meetingSearchForm: {
            name:"",
            participants:"",
            startEndData:[]
        },
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