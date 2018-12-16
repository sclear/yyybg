<template>
    <div class="addModify">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="奖品" name="first"></el-tab-pane>
            <el-tab-pane label="优惠券" name="second"></el-tab-pane>
            <el-tab-pane label="添加奖项" name="three"></el-tab-pane>
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
    mounted() {
        if(this.$route.path === '/homepage/addprize/addjx'){
            this.activeName = 'first'
        }
        if(this.$route.path === '/homepage/addprize/coupon'){
            this.activeName = 'second'
        }
        if(this.$route.path === '/homepage/addprize/prize'){
            this.activeName = 'three'
        }
    },
    methods: {
      handleClick(res) {
          if(res.label === '奖品'){
              this.$router.push({path:'/homepage/addprize/prize'})
          }
          if(res.label === '优惠券'){
              this.$router.push({path:'/homepage/addprize/coupon'})
          }
          if(res.label === '添加奖项'){
              this.$router.push({path:'/homepage/addprize/addjx'})
          }

      }
    },
    components: {}
};
</script>

<style scoped >
</style>
