<template>
  <el-row>
        <el-col :span="5">
            <div class="grid-content bg-purple-dark textRight lh30">
                {{name}}
        </div></el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple-dark">
                <slot name="jphoto"></slot>
        </div></el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
      name:''
  },
  components: {

  }
}
</script>

<style scoped >
.lh30{
  line-height: 30px;
}
</style>
