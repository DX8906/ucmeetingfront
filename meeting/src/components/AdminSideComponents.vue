<template>
    <el-menu>
        <el-container style="height: 75px;">
            <div class="title"><b>UC Meeting</b></div>
        </el-container>
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>会议管理</template>
            <el-menu-item-group>
            <el-menu-item index="1-1">
                <router-link to="/meetingAppoint" class="router">申请会议</router-link>
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
            <el-menu-item index="2-4">
                <router-link to="/conferencePresentationManage" class="router">会屏管理</router-link>
            </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {

}
</script>

<style>
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
    .router {
        text-decoration: none;
    }
</style>