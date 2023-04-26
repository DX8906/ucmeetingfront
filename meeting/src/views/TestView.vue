<template>
  <el-dialog title="会议室占用情况" :visible.sync="dialogTableVisible" style="width: 1600px;">
    <el-table
      :data="tableData"
      :cell-style="TableCellStyle"
      :row-style="{height: '0px'}"
      border
      style="width: 100%;font-size: 15px">
      <el-table-column v-for="(item,index) in tableHead" :key="index" :label="item" :prop="item">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import {request} from '../network/requst'
  export default {
    data() {
      return {
        tableHead:["time","星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
        dialogTableVisible:true,
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
        ]
      }
    },
    methods: {
      TableCellStyle({row, column, rowIndex, columnIndex}) {
        console.log(row,column,rowIndex,columnIndex);
        if (this.roomOccupancy.includes(27*(columnIndex-1)+rowIndex+1)) {
          return 'background-color: rgb(238,44,44);padding:0';
          //第二种	50 205 50
        }else{
          return 'background-color: rgb(50,205,50);padding:0'
        }
      },
      getTableData: function(){
            request({
                url:'/meetingRooms/getOccupancyTable',
                params:{
                  id:1,
                  offset:0
                }
            }).then(res => {
              this.roomOccupancy=res.data.data;
            }).catch((err) => {
                alert(err);
            })
        },
    },
    mounted(){
     this.getTableData();
    }
  }
</script>
<style>
  /* 全局设置 element ui dialog水平垂直居中 */
  .el-dialog {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0px !important;
  }
  
  .el-dialog__title {
    font-size: 25px;
  }

  .el-table{
    margin-top: -25px;
    margin-bottom: -20px;
  }

  /* .el-dialog__header {
    display: none;
  } */
</style>
