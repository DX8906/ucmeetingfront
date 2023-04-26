<template>
    <div class="homeWrap">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="16%" style="background-color: rgb(238, 241, 246)">
                <admin-side></admin-side>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px; height: 55px; background-color: rgb(238, 241, 246); ">
                    <all-head></all-head>
                </el-header>
                
                <el-main>
                    
                    <el-form :inline="true" :model="meetingRoomSearchForm" class="search-form-inline" style="margin-top: 1%;margin-left: 0%;">
                        <el-button type="primary" @click="handleAdd()" style="width: 120px;margin-left: 0%;">+新增会议室</el-button>
                    </el-form>


                    <el-table :data="tableData" border="2px" style="margin-left: 0%;width: 1721px;margin-top: 2%;">
                        <el-table-column prop="id" label="序号" width="100px">
                        </el-table-column>
                        <el-table-column prop="name" label="会议室名称" width="170px">
                        </el-table-column>
                        <el-table-column prop="capacity" label="会议室容纳人数" width="150px">
                        </el-table-column>
                        <el-table-column prop="description" label="会议室备注" width="300px">
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" width="250px">
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
                                            
                    <el-dialog title="新增会议室" :visible.sync="addDialogFormVisible" style="width: 800px;margin: auto;">
                            <el-form :model="addForm">
                                <el-form-item label="会议室名称" :label-width="formLabelWidth">
                                <el-input v-model="addForm.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="容纳人数" :label-width="formLabelWidth">
                                <el-input v-model="addForm.capacity" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="备注" :label-width="formLabelWidth">
                                <el-input v-model="addForm.description" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                            <el-button @click="addDialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sendAdd()">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog title="更改会议室信息" :visible.sync="updateDialogFormVisible" style="width: 800px;margin: auto;">
                        <el-form :model="updateForm">
                            <el-form-item label="会议室id" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.id" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="会议室名称" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="容纳人数" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.capacity" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.description" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="updateDialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sendUpdate()">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {request} from '../network/requst'
    let updateId;

// import axios from 'axios';
  export default {
    data() {
      return {
        tableData: [],
        updateForm: {
            name: "",
            capacity:"",
            description:""
        },
        addForm: {
            name: '',
            capacity:'',
            description:''
        },
        addDialogFormVisible: false,
        updateDialogFormVisible:false,
        formLabelWidth: '100px'
      }
    },
    methods: {
        sendAdd:function(){
            request({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url: '/meetingRooms',
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
            request({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'put',
                url: '/meetingRooms',
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
        getTableData: function(){
            request({
                url:'/meetingRooms'
            }).then(res => {
                this.tableData=res.data.data;
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
                request({
                url:'/meetingRooms/'+deleteId,
                method:'delete',
                }).then(res => {
                    if (res.data.code === 1) {
                        this.getTableData();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    }
                }).catch((err) => {
                    alert(err);
                })
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