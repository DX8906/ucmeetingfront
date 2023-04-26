<template>
    <div class="homeWrap">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="16%" style="background-color: rgb(238, 241, 246)">
                <user-side></user-side>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px; height: 75px; background-color: rgb(238, 241, 246); ">
                    <all-head></all-head>
                </el-header>
                
                <el-main>   
                    <el-form :inline="true" :model="searchForm" class="search-form-inline" style="margin-left:0%;">
                        <el-form-item label="会议内容" style="margin-left:3%">
                            <el-input v-model="searchForm.content" placeholder="会议内容" style="width:150px"></el-input>
                        </el-form-item>
                        <el-form-item label="参会人员">
                            <el-input v-model="searchForm.participants" placeholder="参会人员" style="width:150px"></el-input>
                        </el-form-item>
                        <el-form-item label="会议日期">
                            <el-date-picker style="width: 350px;"
                                v-model="searchForm.startEndData"
                                unlink-panels
                                type="daterange"
                                range-separator="至"
                                value-format='yyyy-MM-dd'
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSearch">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableData" border="2px" style="text-align: center; width: 2000pxd;">
                        <el-table-column prop="id" label="序号" width="50">
                        </el-table-column>
                        <el-table-column prop="startTime" label="开始时间" width="145">
                        </el-table-column>
                        <el-table-column prop="endTime" label="结束时间" width="145">
                        </el-table-column>
                        <el-table-column prop="meetingRoom" label="会议地点" width="130">
                        </el-table-column>
                        <el-table-column prop="content" label="会议内容" width="300">
                        </el-table-column>
                        <el-table-column prop="participants" label="参会人员" width="230">
                        </el-table-column>
                        <el-table-column prop="undertakingUnit" label="承办单位" width="190">
                        </el-table-column>
                        <el-table-column prop="name" label="申报人" width="100">
                        </el-table-column>
                        <el-table-column prop="meetingNotes" label="备注" width="170">
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" width="150px">
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
                        <el-dialog title="更改会议信息" :visible.sync="updateDialogFormVisible" style="width: 900px;margin: auto;">
                            <el-form :model="updateForm">
                                <el-form-item label="会议id" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.id" auto-complete="off" disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="会议地点" :label-width="formLabelWidth" style="margin-top: 3%;">
                                <el-input v-model="updateForm.meetingRoom" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议内容" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.content" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="参会人员" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.participants" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="承办单位" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.undertakingUnit" auto-complete="off"></el-input>
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
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {request} from '../network/requst'
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
            meetingRoom:"",
            content:"",
            participants:"",
            undertakingUnit:"",
            meetingNotes:""
        },
        updateDialogFormVisible:false,
        searchForm: {
            content:"",
            participants:"",
            startEndData:[]
        },
        formLabelWidth: '100px'
      }
    },
    methods: {
        onSearch:function(){
            this.pageForm.currentPage=1;
            this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData)
        },
        handleCurrentChange:function(val){
            this.pageForm.currentPage=val;
            this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData)
        },
        sendUpdate:function(){
            var updateMeeting={
                id:this.updateForm.id,
                meetingRoom:this.updateForm.meetingRoom,
                content:this.updateForm.content,
                participants:this.updateForm.participants,
                undertakingUnit:this.updateForm.undertakingUnit,
                meetingNotes:this.updateForm.meetingNotes
            }
            request({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'put',
                url: '/userMeetings',
                data: JSON.stringify(updateMeeting)
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData);
                    }
                }),
            this.updateDialogFormVisible = false;
        },
        getTableData: function(content,participants,startEndData){
            request({
                url:'/userMeetings',
                params:{
                    page:this.pageForm.currentPage,
                    pageSize:9,
                    content:content,
                    participants:participants,
                    startData:startEndData[0],
                    endData:startEndData[1]
                }
            }).then(res => {
                this.tableData=res.data.data.rows;
                this.pageForm.total=res.data.data.total;
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
                    url:'/userMeetings/'+deleteId,
                    method:'delete',
                }).then(res => {
                    if (res.data.code === 1) {
                        this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData);
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
        this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData);
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