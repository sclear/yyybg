<template>
  <el-row>
        <el-col :span="5">
            <div class="grid-content bg-purple-dark writeRight">
                {{name}}
        </div></el-col>
        <el-col :span="5">
            <div class="grid-content bg-purple-dark fl">
                <slot name="jdate"></slot>
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

</style>
