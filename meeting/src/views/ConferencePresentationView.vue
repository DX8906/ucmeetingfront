<template>
  <div>
    <el-carousel :height="tableHeight+'px'" autoplay="true" :interval="rollingInterval*1000">
      <el-carousel-item v-for="item in allData" :key="item">
        <el-table :data="item" border
          style="width: 100%;border:3px solid #C0C0C0; margin: auto;height: 100%;"
            ref="table"
            :cell-style="{borderColor:'#FFFFFF',border:5}"
            :header-cell-style="{borderColor:'#C0C0C0',backgroundColor:'#599bd5'}"
            :row-class-name="tableRowClassName">
          <el-table-column :label="title">
          <el-table-column
            prop="fullDate"
            label="日期"
            min-width="14%">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            min-width="12%">
          </el-table-column>
          <el-table-column
            prop="location"
            label="地点"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop="content"
            label="会议主题"
            min-width="25%">
          </el-table-column>
          <el-table-column
            prop="participants"
            label="与会人"
            min-width="20%">
          </el-table-column>
        </el-table-column>
        </el-table>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>
  <script>
    import {request} from '../network/requst'
    export default {
      data() {
        return {
          timer1:"",
          timer2:"",
          title:"",
          quantityPerPage:9,
          refreshInterval:5,
          rollingInterval:10,
          tableHeight:"",
          allData:[],
        }
      },
      methods: {
        getTableData: function(){
            request({
                url:'/meetings/presentation',
            }).then(res => {
              this.allData=this.split_array(res.data.data,this.quantityPerPage);
            }).catch((err) => {
                alert(err);
            })
        },
        split_array(arr, len){    //arr需要拆分的原数组，len小数组包含多少个元素
          var a_len = arr.length;    
          var result = [];   //结果数组 
          for(var i=0;i<a_len;i+=len){        
              result.push(arr.slice(i,i+len));    //循环取原数组N个元素,每次取从上次取的下一个开始取。
            }
          return result;      //结果是一个数组，里面的元素就是已拆分的小数组
        },
        watch: {
          tableHeight() {
            window.onresize = () =>
              (this.tableHeight =
                window.innerHeight*0.95);
          },
        },
        tableRowClassName({row, rowIndex}) {
          console.log(row);
        if (rowIndex%2 === 1)  //=>这里可以改成 rowIndex%2=== 1，后面直接else即可达到隔行变色效果。
          { 
            return 'one-row';
          } else{
            return 'two-row';
          }
        },
        getAttribute:function(){
          request({
            url:'/conferencePresentationAttribute'
          }).then(res =>{
            if(res.data.code===1){
              this.quantityPerPage=res.data.data.quantityPerPage;
              this.refreshInterval=res.data.data.refreshInterval;
              this.rollingInterval=res.data.data.rollingInterval;
              this.title=res.data.data.title;
            }else{
              this.$message({
                message:"加载失败",
                type:'error'
              })
            }
          })
        }
      },
      mounted(){
        this.getAttribute();
        this.getTableData();
        this.tableHeight =window.innerHeight*0.97;
        this.timer1=setInterval(this.getTableData, this.refreshInterval*60*1000);
        this.timer2=setInterval(this.getAttribute,this.refreshInterval*60*1000);
      },
    }
  </script>

<style>
    .el-table .cell{
      white-space: pre-line;
      text-align: center;
      font-size:calc(100vw * 28 / 1920);
      font-family: "微软雅黑";
      color: #3c4254;
      font-weight:1000;
    }
  .el-table .one-row {
    background: #bdd7ee;
  }

  .el-table .two-row {
    background: #deeaf6;
  }
</style>

