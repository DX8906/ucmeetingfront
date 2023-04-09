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
                    <el-form :inline="true" :model="meetingRoomSearchForm" class="search-form-inline" style="margin-left:0%">
                        <el-form-item label="会议室名称" style="margin-left: 5%;">
                            <el-input v-model="meetingRoomSearchForm.name" placeholder="会议名称"></el-input>
                        </el-form-item>
                        <el-form-item label="参会人数" style="margin-left: 5%;">
                            <el-input v-model="meetingRoomSearchForm.minCapacity" placeholder="参会人数"></el-input>
                        </el-form-item>
                        <br>
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
                                v-model="startTime"
                                :picker-options="{
                                start: '08:30',
                                step: '00:30',
                                end: '21:30'
                                }">
                            </el-time-select>
                            <el-time-select style="width: 150px; margin-left: 3%;"
                                placeholder="结束时间"
                                v-model="endTime"
                                :picker-options="{
                                start: '08:30',
                                step: '00:30',
                                end: '21:30',
                                minTime: startTime
                                }">
                            </el-time-select>
                        </el-from-item>
                        <el-form-item style="margin-left: 3%;">
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="box">
                        <div class="wrapper-content" v-for="(resultListitem,index) in blocks" :key="index">
                            <img :src="resultListitem" alt="" height="20px" width="20px">
                            <div class="desc">花花草草</div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// import axios from 'axios';
  export default {
    data() {
      return {
        tableData: [],
        meetingRoomSearchForm: {
            name:"",
            minCapacity:"",
            meetingDay:""
        },
        blocks: [
            "../assets/logo.png",
            "../assets/room.jpg",
            "../assets/room.jpg",
            "../assets/room.jpg",
            "../assets/room.jpg",
      ]
      }
    },
    methods: {
        onSubmit:function(){

        },
        handleCurrentChange:function(){

        },
        handleSizeChange:function(){

        },
        handleEdit(index, row) {
        console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
    // mounted() {
    //     axios.get().then((result)=>{
    //         this.tableData=result.data.data;
    //     }

    //     )
    // }
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
    .box{
        display: flex;
        display: inline-flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .wrapper-content{
        width: 33%;
        margin:20px 0
    }
</style>