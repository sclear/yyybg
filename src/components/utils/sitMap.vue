<template>
    <div id="sitmap">
      <div class="headTop">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in mapArr" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <hr>
      </div>
    </div>
</template>
<!--站点地图-->
<!--*传 位置名称-->
<script>
    export default {
        name: "sitmap",
        props:{
          mapArr:Array
        }
    }
</script>

<style scoped>
hr{
  margin-top: 5px;
}
</style>
