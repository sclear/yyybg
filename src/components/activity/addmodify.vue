<template>
    <div class="addModify">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="活动状态" name="first"></el-tab-pane>
            <el-tab-pane label="抽奖配置" name="second"></el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName:'first'
        };
    },
    methods: {
      handleClick(res) {
          if(this.activeName === 'first'){
              this.$router.push({path:'/homepage/addmodify/start'})
          }
          if(this.activeName === 'second'){
              this.$router.push({path:'/homepage/addmodify/prizesetting'})
          }

      }
    },
    components: {}
};
</script>

<style scoped >
</style>
