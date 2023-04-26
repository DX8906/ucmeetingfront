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
                    <el-form :inline="true" :model="searchForm" class="search-form-inline" style="margin-left:0%;">
                        <el-button type="primary" @click="handleAdd()" style="width: 95px;text-align: center; margin-left: 0%;">+新增会议</el-button>
                        <el-form-item label="会议内容" style="margin-left:3%">
                            <el-input v-model="searchForm.content" placeholder="会议内容" style="width:130px"></el-input>
                        </el-form-item>
                        <el-form-item label="参会人员">
                            <el-input v-model="searchForm.participants" placeholder="参会人员" style="width:130px"></el-input>
                        </el-form-item>
                        <el-form-item label="会议日期">
                            <el-date-picker style="width: 250px;"
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
                        <el-form-item>
                            <el-button type="primary" @click="handleUpload()" style="margin-left: 8px;">导入</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleDownload()" style="margin-left: 8px;" :disabled="exportDisable">
                                导出
                            </el-button>
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

                    <el-dialog title="新增会议" :visible.sync="addDialogFormVisible" style="width: 900px;margin: auto;">
                            <el-form :model="addForm">
                                <el-form-item label="会议日期" style="margin-left: 8%;">
                                    <el-date-picker style="width: 200px;"
                                        v-model="addForm.meetingDay"
                                        type="date"
                                        placeholder="选择会议日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="起始时间" style="margin-left: 8%;">
                                    <el-time-select style="width: 150px;"
                                        placeholder="起始时间"
                                        v-model="addForm.startTime"
                                        :picker-options="{
                                        start: '08:30',
                                        step: '00:30',
                                        end: '21:30'
                                        }">
                                    </el-time-select>
                                </el-form-item>
                                <el-form-item label="结束时间" style="margin-left: 8%;">
                                    <el-time-select style="width: 150px;"
                                        placeholder="结束时间"
                                        v-model="addForm.endTime"
                                        :picker-options="{
                                        start: '08:30',
                                        step: '00:30',
                                        end: '21:30',
                                        minTime: startTime
                                        }">
                                    </el-time-select>
                                </el-form-item>
                                <el-form-item label="会议地点" :label-width="formLabelWidth" style="margin-top: 3%;">
                                <el-input v-model="addForm.meetingRoom" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议内容" :label-width="formLabelWidth">
                                <el-input v-model="addForm.content" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="参会人员" :label-width="formLabelWidth">
                                <el-input v-model="addForm.participants" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="承办单位" :label-width="formLabelWidth">
                                <el-input v-model="addForm.undertakingUnit" auto-complete="off"></el-input>
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
                        <el-dialog title="更改会议信息" :visible.sync="updateDialogFormVisible" style="width: 900px;margin: auto;">
                            <el-form :model="updateForm">
                                <el-form-item label="会议id" :label-width="formLabelWidth">
                                <el-input v-model="updateForm.id" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="会议日期" style="margin-left: 8%;">
                                    <el-date-picker style="width: 200px;"
                                        v-model="updateForm.meetingDay"
                                        type="date"
                                        placeholder="选择会议日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="起始时间" style="margin-left: 8%;">
                                    <el-time-select style="width: 150px;"
                                        placeholder="起始时间"
                                        v-model="updateForm.startTime"
                                        :picker-options="{
                                        start: '08:30',
                                        step: '00:30',
                                        end: '21:30'
                                        }">
                                    </el-time-select>
                                </el-form-item>
                                <el-form-item label="结束时间" style="margin-left: 8%;">
                                    <el-time-select style="width: 150px;"
                                        placeholder="结束时间"
                                        v-model="updateForm.endTime"
                                        :picker-options="{
                                        start: '08:30',
                                        step: '00:30',
                                        end: '21:30',
                                        minTime: startTime
                                        }">
                                    </el-time-select>
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
                    <el-dialog title="导入会议" :visible.sync="uploadDialogFormVisible" style="width: 800px;margin: auto;">
                        <el-upload
                            class="upload-dialog"
                            drag
                            action 
                            :http-request="uploadFile"
                            ref="upload"
                            :limit="fileLimit"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :on-exceed="handleExceed"
                            :before-upload="beforeUpload"
                            :headers="headers"
                            :auto-upload="false"
                            :on-change="handleChange">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过20MB</div>
                        </el-upload>
                        <div slot="footer" class="dialog-footer">
                                <el-button @click="cancelUpload()">取 消</el-button>
                                <el-button type="primary" @click="uploadFile()">确 定</el-button>
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
        exportDisable:false,
        //上传后的文件列表
        fileList: [],
        // 允许的文件类型
        fileType: ["xls","xlsx"],
        // 运行上传文件大小，单位 M
        fileSize: 20,
        // 附件数量限制
        fileLimit: 1,
        //请求头
        headers: { "Content-Type": "multipart/form-data" },
        pageForm:{
            total:10,
            currentPage:1,
            pageSize:10
        },
        tableData: [],
        updateForm: {
            meetingDay:new Date(),
            startTime:"",
            endTime:"",
            meetingRoom:"",
            content:"",
            participants:"",
            undertakingUnit:"",
            meetingNotes:""
        },
        addForm: {
            meetingDay:new Date(),
            startTime:"",
            endTime:"",
            meetingRoom:"",
            content:"",
            participants:"",
            undertakingUnit:"",
            declarerNameId:"",
            meetingNotes:""
        },
        addDialogFormVisible: false,
        updateDialogFormVisible:false,
        uploadDialogFormVisible:false,
        searchForm: {
            content:"",
            participants:"",
            startEndData:[]
        },
        formLabelWidth: '100px'
      }
    },
    methods: {
        handleChange(file, fileList) { //文件数量改变
            this.fileList = fileList;
        },
        handleUpload:function(){
            this.uploadDialogFormVisible=true;
        },
        onSearch:function(){
            this.pageForm.currentPage=1;
            this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData)
        },
        handleCurrentChange:function(val){
            this.pageForm.currentPage=val;
            this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData)
        },
        sendAdd:function(){
            var timeArr;
            var year;
            var month;
            var strDate;
            if(this.addForm.meetingDay!=null){
                year = (this.addForm.meetingDay.getFullYear()).toString();
                month = (this.addForm.meetingDay.getMonth() + 1).toString();
                strDate = (this.addForm.meetingDay.getDate()).toString();
                if(month.length===1){
                    month="0"+month;
                }
                if(strDate.length===1){
                    strDate="0"+strDate;
                }
                if(this.addForm.startTime!=null && this.addForm.startTime!=""){
                timeArr = this.addForm.startTime.split(':');
                var startTime=year+'-'+month+'-'+strDate+' '+timeArr[0]+':'+timeArr[1]+':'+'00'
                }
                if(this.addForm.endTime!=null && this.addForm.endTime!=""){
                    timeArr=this.addForm.endTime.split(':');
                    var endTime=year+'-'+month+'-'+strDate+' '+timeArr[0]+':'+timeArr[1]+':'+'00'
                }
            }
            var addMeeting={
                startTime:startTime,
                endTime:endTime,
                meetingRoom:this.addForm.meetingRoom,
                content:this.addForm.content,
                participants:this.addForm.participants,
                undertakingUnit:this.addForm.undertakingUnit,
                meetingNotes:this.addForm.meetingNotes
            }
            request({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url: '/meetings',
                data: JSON.stringify(addMeeting)
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData);
                    }
                }),
            this.addDialogFormVisible = false;
        },
        handleAdd:function(){
            this.addDialogFormVisible=true;
        },
        sendUpdate:function(){
            var timeArr;
            var year;
            var month;
            var strDate;
            if(this.updateForm.meetingDay!=null){
                year = (this.updateForm.meetingDay.getFullYear()).toString();
                month = (this.updateForm.meetingDay.getMonth() + 1).toString();
                strDate = (this.updateForm.meetingDay.getDate()).toString();
                if(month.length===1){
                    month="0"+month;
                }
                if(strDate.length===1){
                    strDate="0"+strDate;
                }
                if(this.updateForm.startTime!=null && this.updateForm.startTime!=""){
                timeArr = this.updateForm.startTime.split(':');
                var startTime=year+'-'+month+'-'+strDate+' '+timeArr[0]+':'+timeArr[1]+':'+'00'
                }
                if(this.updateForm.endTime!=null && this.updateForm.endTime!=""){
                    timeArr=this.updateForm.endTime.split(':');
                    var endTime=year+'-'+month+'-'+strDate+' '+timeArr[0]+':'+timeArr[1]+':'+'00'
                }
            }
            var updateMeeting={
                id:this.updateForm.id,
                startTime:startTime,
                endTime:endTime,
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
                url: '/meetings',
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
                url:'/meetings',
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
                    url:'/meetings/'+deleteId,
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
        },
        //上传文件之前
        beforeUpload(file){
            if (file.type != "" && file.type != null && file.type != undefined){
                //截取文件的后缀，判断文件类型
                const FileExt = file.name.replace(/.+\./, "").toLowerCase();
                //计算文件的大小
                const isLt5M = file.size / 1024 / 1024 < 20; //这里做文件大小限制
                //如果大于50M
                if (!isLt5M) {
                    this.$showMessage('上传文件大小不能超过 20MB!');
                    return false;
                }
                //如果文件类型不在允许上传的范围内
                if(this.fileType.includes(FileExt)){
                    return true;
                }
                else {
                    this.$message.error("上传文件格式不正确!");
                    return false;
                }
            }
        },
        //上传了的文件给移除的事件，由于我没有用到默认的展示，所以没有用到
        handleRemove(){
            this.fileList=[];
        },
        //超出文件个数的回调
        handleExceed(){
            this.$message({
                type:'warning',
                message:'超出最大上传文件数量的限制！'
            });return
        },
        //上传文件的事件
        uploadFile(){
            let FormDatas = new FormData()
            this.fileList.forEach(
                (val) => {
                    FormDatas.append("file", val.raw);
                }
            );
            request({
                method: 'post',
                url: '/meetings/upload',
                headers:this.headers,
                timeout: 30000,
                data: FormDatas
            }).then(res=>{
                if(res.data.code===0){
                    this.$message({
                        message:"导入出错，请检查格式是否正确，导入格式与导出格式相同",
                        type:'error'
                    })
                }else{
                    this.getTableData(this.searchForm.content,this.searchForm.participants,this.searchForm.startEndData);
                    this.$message({
                        message:"导入成功",
                        type:'success'
                    })
                }
                console.log(res);
            })
            this.fileList=[];
            this.uploadDialogFormVisible=false;
        },
        //上传成功后的回调
        handleSuccess(){
            this.$message({
                message:"导入成功",
                type:'success'
            })
        },
        cancelUpload(){
            this.uploadDialogFormVisible = false;
            this.fileList=[];
        },
        handleDownload(){
            this.sendDownload()
        },
        sendDownload(){
            this.exportDisable=true,
            request({
                url:'/meetings/download',
                method:'get',
                responseType:'blob',
                params:{
                    content:this.searchForm.content,
                    participants:this.searchForm.participants,
                    startData:this.searchForm.startEndData[0],
                    endData:this.searchForm.startEndData[1]
                }
            }).then(res=>{
                const blob = new Blob([res.data], {type: res.data.type})
                const downloadElement = document.createElement('a')
                //  var url=window.URL || window.webkitURL || window.moxURL;
                const href = window.URL.createObjectURL(blob)
                downloadElement.href = href
                // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
                var contentDisposition = decodeURI(res.headers['content-disposition'])
                var result = patt.exec(contentDisposition)
                var fileName = result[1]
                downloadElement.download = fileName;
                downloadElement.click()
            })
            this.exportDisable=false;
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