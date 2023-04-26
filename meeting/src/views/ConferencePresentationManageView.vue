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
    <el-main style="margin-top: 1%;">
      <el-form :inline="true" :model="attribute">
        <el-form-item label="会表标题" >
          <el-input v-model="attribute.title" placeholder="会表标题" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="单页会议条数">
          <el-input-number v-model="attribute.quantityPerPage" controls-position="right" @change="handleChange" :min="5" :max="15" style="width:130px">
          </el-input-number>
        </el-form-item>
        <el-form-item label="数据刷新间隔\分钟">
          <el-input-number v-model="attribute.refreshInterval" controls-position="right" @change="handleChange" :min="1" :max="30" style="width:130px">
          </el-input-number>
        </el-form-item>
        <el-form-item label="页面滚动间隔\秒">
          <el-input-number v-model="attribute.rollingInterval" controls-position="right" @change="handleChange" :min="5" :max="25" style="width:130px">
          </el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendUpdate">确定</el-button>
        </el-form-item>
      </el-form>
      <el-carousel :height="tableHeight+'px'" style="margin-top: 1.5%;">
        <el-carousel-item v-for="item in allData" :key="item">
          <el-table :data="item" border :row-style="{height: '0px'}"
            style="width: 100%;border:3px solid #C0C0C0; margin: auto;" 
              :height="tableHeight*1.2"
              ref="table"
              :cell-style="{borderColor:'#FFFFFF',border:5,padding: '0px'}"
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
  </el-main>
</el-container>
</el-container>
</div>
</template>
  <script>
    import {request} from '../network/requst'
    export default {
      data() {
        return {
          attribute: {
            title:"",
            quantityPerPage:"",
            refreshInterval:"",
            rollingInterval:""
          },
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
              this.attribute.title=this.title;
              this.attribute.quantityPerPage=this.quantityPerPage;
              this.attribute.refreshInterval=this.refreshInterval;
              this.attribute.rollingInterval=this.rollingInterval;
            }else{
              this.$message({
                message:"加载失败",
                type:'error'
              })
            }
          })
        },
        sendUpdate:function(){
            request({
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'put',
                url: '/conferencePresentationAttribute',
                data: JSON.stringify(this.attribute)
            }).then(
                (result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      });
                      this.getAttribute();
                      this.getTableData();
                    }
                }).catch((err) =>{
                    alert(err);
                }),
            this.updateDialogFormVisible = false;
        },
      },
      mounted(){
        this.getAttribute();
        this.getTableData();
        this.tableHeight =window.innerHeight*0.75;
      },
    }
  </script>

<style>
  .el-table .cell{
    white-space: pre-line;
    text-align: center;
    color: #3c4254;
  }
  .el-table .one-row {
    background: #bdd7ee;
  }
  .el-table .two-row {
    background: #deeaf6;
  }
  .homeWrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  .el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  }
  .el-aside {
      color: #333;
  }
  .router {
      text-decoration: none;
  }
</style>

