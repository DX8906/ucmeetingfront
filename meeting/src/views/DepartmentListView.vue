<template>
    <div class="homeWrap">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="16%" style="background-color: rgb(238, 241, 246)">
                <admin-side-components></admin-side-components>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px; height: 55px; background-color: rgb(238, 241, 246); ">
                    <all-head></all-head>
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
import AdminSideComponents from '@/components/AdminSideComponents.vue';
    import {request} from '../network/requst'
    let updateId;

export default {
  components: { AdminSideComponents },
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
            request({
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
            request({
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
            request({
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
                request({
                url:'/depts/'+deleteId,
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