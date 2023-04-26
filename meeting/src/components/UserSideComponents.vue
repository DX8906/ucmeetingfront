<template>
    <el-menu>
        <el-container style="height: 75px;">
            <div class="title"><b>UC Meeting</b></div>
        </el-container>
        <el-menu-item-group>
        <el-menu-item index="1">
            <router-link to="/userMeetingAppoint" class="router">申请会议</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link to="/userMeetingList" class="router">会议列表</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link to="/userConferencePresentation" class="router">本周会议</router-link>
        </el-menu-item>
        </el-menu-item-group>
    </el-menu>
</template>

<style>
    .router {
        text-decoration: none;
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
</style>