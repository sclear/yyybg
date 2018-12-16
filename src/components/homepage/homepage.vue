<template>
  <div class="homepage">
      <j-leftbar class="leftBar"></j-leftbar>
      <router-view class="routerVs"></router-view>
  </div>
</template>

<script>
import jLeftbar from './../utils/tabbar'
export default {
  data() {
    return {

    }
  },
  components: {
    jLeftbar
  }
}
</script>

<style scoped >
.homepage{
    height:100%;
}
.routerVs{
  position: relative;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    padding:15px;
}
.leftBar{
  width:16%;
  height:100%;
  float: left;
}

</style>
