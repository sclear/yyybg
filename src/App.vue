<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html,body{
  height:100%;
}
router-view{
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}

.el-table td{
  padding: 4px 0;
}
.contentScorll>.el-scrollbar__wrap,.getTimes>.el-scrollbar>.el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  .is-horizontal {    display: none;
}
.el-table td, .el-table th{
  padding:4px 0 !important;
}
</style>
