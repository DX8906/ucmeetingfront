<template>
    <div class="homeWrap">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="16%" style="background-color: rgb(238, 241, 246)">
                <user-side></user-side>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px; height: 55px; background-color: rgb(238, 241, 246); ">
                    <all-head></all-head>
                </el-header>
                
                <el-main>
                    <el-form :inline="true" :model="meetingRoomSearchForm" class="search-form-inline" style="margin-left:0%">
                        <el-form-item label="空闲时间" style="margin-left: 5%;">
                            <el-date-picker style="width: 150px;"
                                v-model="meetingRoomSearchForm.meetingDay"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-from-item style="margin-left: 3%;">
                            <el-time-select style="width: 150px;"
                                placeholder="起始时间"
                                v-model="meetingRoomSearchForm.startTime"
                                :picker-options="{
                                start: '08:30',
                                step: '00:30',
                                end: '21:30'
                                }">
                            </el-time-select>
                            <el-time-select style="width: 150px; margin-left: 3%;"
                                placeholder="结束时间"
                                v-model="meetingRoomSearchForm.endTime"
                                :picker-options="{
                                start: '08:30',
                                step: '00:30',
                                end: '21:30',
                                minTime: startTime
                                }">
                            </el-time-select>
                        </el-from-item>
                        <el-form-item style="margin-left: 3%;">
                            <el-button type="primary" @click="onSearch">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="box">
                        <div class="wrapper-content" v-for="(resultListitem,index) in blocks" :key="index" style="margin-left: 3%;">
                            <img  src="../assets/meeting-room (2).png" alt="" width="90px" height="70px" style="margin: center;" v-on:click="handleAppoint(resultListitem)">
                            <el-input v-model="resultListitem.nameCapacity" auto-complete="off" class="roomNameInput">
                            </el-input>
                            <el-button type="primary" size="mini" style="margin-right: 0%;" plain @click="handleCheck(resultListitem)">
                                占用情况</el-button>
                        </div>
                    </div>
                    <el-dialog title="预约会议" :visible.sync="appointDialogFormVisible" style="width: 900px;margin: auto;">
                            <el-form :model="appointForm">
                                <el-form-item label="会议日期" style="margin-left: 8%;">
                                    <el-date-picker style="width: 200px;"
                                        v-model="appointForm.meetingDay"
                                        type="date"
                                        placeholder="选择会议日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="起始时间" style="margin-left: 8%;">
                                    <el-time-select style="width: 150px;" 
                                        placeholder="起始时间"
                                        v-model="appointForm.startTime"
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
                                        v-model="appointForm.endTime"
                                        :picker-options="{
                                        start: '08:30',
                                        step: '00:30',
                                        end: '21:30',
                                        minTime: startTime
                                        }">
                                    </el-time-select>
                                </el-form-item>

                                <el-form-item label="会议地点" :label-width="formLabelWidth" style="margin-top: 3%;">
                                <el-input v-model="appointForm.meetingRoom" auto-complete="off" disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="会议内容" :label-width="formLabelWidth">
                                <el-input v-model="appointForm.content" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="参会人员" :label-width="formLabelWidth">
                                <el-input v-model="appointForm.participants" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="承办单位" :label-width="formLabelWidth">
                                <el-input v-model="appointForm.undertakingUnit" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="备注" :label-width="formLabelWidth">
                                <el-input v-model="appointForm.meetingNotes" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="appointDialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="sendAppoint()">确 定</el-button>
                            </div>
                    </el-dialog>
                    <el-dialog :title="occupancyDialogTitle" :visible.sync="occupancyDialogTableVisible" style="width: 1400px;"
                    >
                    <div slot="title" class="dialog-title">
                        <el-row>
                            <el-button type="primary" @click="preWeek()" icon="el-icon-d-arrow-left" size="mini" plain>
                                上一周
                            </el-button>
                            <span class="occupancy-dialog-title" style="padding-right: 23%;padding-left: 23%;">{{occupancyDialogTitle}}</span>
                            <el-button type="primary" @click="nextWeek()" icon="el-icon-d-arrow-right" size="mini" plain>
                                下一周
                            </el-button>
                        </el-row>
                    </div>
                        <el-table
                        :data="tableData"
                        :cell-style="TableCellStyle"
                        :row-style="{height: '0px'}"
                        border
                        style="width: 100%;font-size: 15px">
                        <el-table-column v-for="(item,index) in tableHead" :key="index" :label="item" :prop="item" width="80px">
                        </el-table-column>
                        </el-table>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {request} from '../network/requst'
    // let appointId;
  export default {
    data() {
      return {
        offset:"",
        roomId:"",
        occupancyDialogTitle:"",
        tableHead:["time","星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
        occupancyDialogTableVisible:false,
        roomOccupancy:[],
        tableData: [
          {time: '08:00'}, 
          {time: '08:30'}, 
          {time: '09:00'}, 
          {time: '09:30'}, 
          {time: '10:00'}, 
          {time: '10:30'}, 
          {time: '11:00'}, 
          {time: '11:30'}, 
          {time: '12:00'}, 
          {time: '12:30'}, 
          {time: '13:00'}, 
          {time: '13:30'}, 
          {time: '14:00'}, 
          {time: '14:30'}, 
          {time: '15:00'}, 
          {time: '15:30'}, 
          {time: '16:00'}, 
          {time: '16:30'}, 
          {time: '17:00'}, 
          {time: '17:30'}, 
          {time: '18:00'}, 
          {time: '18:30'}, 
          {time: '19:00'}, 
          {time: '19:30'}, 
          {time: '20:00'}, 
          {time: '20:30'}, 
          {time: '21:00'}, 
        ],
        meetingRoomSearchForm: {
            meetingDay:new Date(),
            startTime:"",
            endTime:""
        },
        blocks: [],
        appointForm: {
            meetingDay:new Date(),
            startTime:"",
            endTime:"",
            meetingRoom:"",
            meetingRoomId:"",
            content:"",
            participants:"",
            undertakingUnit:"",
            meetingNotes:""
        },
        formLabelWidth: '100px',
        appointDialogFormVisible: false
      }
    },
    methods: {
        preWeek:function(){
            this.offset-=1;
            this.getOccupancyList(this.roomId,this.offset);
        },
        nextWeek:function(){
            this.offset+=1;
            this.getOccupancyList(this.roomId,this.offset);
        },
        getOccupancyList:function(id,offset){
            request({
                url:'/meetingRooms/getOccupancyTable',
                params:{
                  id:id,
                  offset:offset
                }
            }).then(res => {
                // res.data.data.weekDayAndDate.forEach(element => {
                //     element.replace(/\\n/g, '<br>');
                // });
                this.roomOccupancy=res.data.data.occupancyList;
                this.tableHead=res.data.data.weekDayAndDate;
            }).catch((err) => {
                alert(err);
            })
        },
        TableCellStyle({row, column, rowIndex, columnIndex}) {
            console.log(row,column,rowIndex,columnIndex);
            if (this.roomOccupancy.includes(27*(columnIndex-1)+rowIndex+1)) {
                return 'background-color: rgb(238,44,44);padding:0';
            //第二种	50 205 50
            }else{
                return 'background-color: rgb(50,205,50);padding:0'
            }
        },
        handleCheck:function(resultListitem){
            this.roomId=resultListitem.id;
            this.offset=0;
            this.getOccupancyList(this.roomId,this.offset);
            this.occupancyDialogTitle=resultListitem.name+"占用情况";
            this.occupancyDialogTableVisible=true;
        },
        sendAppoint:function(){
            var timeArr;
            var year;
            var month;
            var strDate;
            if(this.appointForm.meetingDay!=null){
                year = (this.appointForm.meetingDay.getFullYear()).toString();
                month = (this.appointForm.meetingDay.getMonth() + 1).toString();
                strDate = (this.appointForm.meetingDay.getDate()).toString();
                if(month.length===1){
                    month="0"+month;
                }
                if(strDate.length===1){
                    strDate="0"+strDate;
                }
                if(this.appointForm.startTime!=null && this.appointForm.startTime!=""){
                    timeArr = this.appointForm.startTime.split(':');
                    var startTime=year+'-'+month+'-'+strDate+' '+timeArr[0]+':'+timeArr[1]+':'+'00'
                }
                if(this.appointForm.endTime!=null && this.appointForm.endTime!=""){
                    timeArr=this.appointForm.endTime.split(':');
                    var endTime=year+'-'+month+'-'+strDate+' '+timeArr[0]+':'+timeArr[1]+':'+'00'
                }
            }
            var appointMeeting={
                startTime:startTime,
                endTime:endTime,
                meetingRoom:this.appointForm.meetingRoom,
                meetingRoomId:this.appointForm.meetingRoomId,
                content:this.appointForm.content,
                participants:this.appointForm.participants,
                undertakingUnit:this.appointForm.undertakingUnit,
                meetingNotes:this.appointForm.meetingNotes
            }
            request({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'post',
                url: '/meetingAppoint',
                data: JSON.stringify(appointMeeting)
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        this.$message({
                            message:'会议预约成功',
                            type:'success'
                        });
                    }else{
                        this.$message({
                            message:'预约失败',
                            type:'error'
                        })
                    }
                }),
            this.appointDialogFormVisible = false;
        },
        handleAppoint:function(item){
            if(this.meetingRoomSearchForm.meetingDay!=null){
                this.appointForm.meetingDay=this.meetingRoomSearchForm.meetingDay;
            }
            if(this.meetingRoomSearchForm.startTime!=null){
                this.appointForm.startTime=this.meetingRoomSearchForm.startTime;
            }
            if(this.meetingRoomSearchForm.endTime!=null){
                this.appointForm.endTime=this.meetingRoomSearchForm.endTime;
            }
            this.appointForm.meetingRoom=item.name;
            this.appointForm.meetingRoomId=item.id;
            this.appointDialogFormVisible=true;
        },
        onSearch:function(){
            var timeArr;
            var year;
            var month;
            var strDate;
            if(this.meetingRoomSearchForm.meetingDay!=null){
                year = (this.meetingRoomSearchForm.meetingDay.getFullYear()).toString();
                month = (this.meetingRoomSearchForm.meetingDay.getMonth() + 1).toString();
                strDate = (this.meetingRoomSearchForm.meetingDay.getDate()).toString();
                if(month.length===1){
                    month="0"+month;
                }
                if(strDate.length===1){
                    strDate="0"+strDate;
                }
                if(this.meetingRoomSearchForm.startTime!=null && this.meetingRoomSearchForm.startTime!=""){
                    timeArr = this.meetingRoomSearchForm.startTime.split(':');
                var startTime=year+'-'+month+'-'+strDate+' '+timeArr[0]+':'+timeArr[1]+':'+'00'
                }
                if(this.meetingRoomSearchForm.endTime!=null && this.meetingRoomSearchForm.endTime!=""){
                    timeArr=this.meetingRoomSearchForm.endTime.split(':');
                    var endTime=year+'-'+month+'-'+strDate+' '+timeArr[0]+':'+timeArr[1]+':'+'00'
                }
            }
            request({
                url:'/meetingRooms/listFree',
                params:{
                    startTime:startTime,
                    endTime:endTime
                }
            }).then(res => {
                this.blocks=res.data.data;
            }).catch((err) => {
                alert(err);
            })
        },
        getTableData:function(){
            request({
                url:'/meetingRooms/listFree',
            }).then(res => {
                this.blocks=res.data.data;
            }).catch((err) => {
                alert(err);
            })
        }
    },
    mounted() {
        this.getTableData();
    }
  };
</script>

<style lang="less" scoped>
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
    .box{
        display: flex;
        display: inline-flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .wrapper-content{
        width: 10%;
        margin:20px 0
    }
    .roomNameInput /deep/ .el-input__inner{
        border: none;
        text-align: left;
    }
    .el-dialog__title {
        display: none;
        font-size: 25px;
    }

  .el-table{
    margin-top: -25px;
    margin-bottom: -20px;
  }
</style>