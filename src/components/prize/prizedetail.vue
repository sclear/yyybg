<template>
  <div class="prizedetail">
      <div class="imgBox">
          <img class="img-detail" :src="$url+item.logo" alt="">
      </div>
      <div class="typeR">{{p_name}}</div>
      <div class="fs12">限量{{item.sum}}</div>
      <div class="fs12">
          <span>中奖概率{{item.probability}}/10万</span>
          <i @click="seeInfo(index,'write')" class="el-icon-edit bianji"></i>
          <i @click="seeInfo(index,'del')" class="el-icon-delete delec"></i>
          <i @click="seeInfo(index,'see')" class="el-icon-info seeInfo"></i>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        name:''

    }
  },
  props: {
      item:Object,
      index:Number
  },
  components: {

  },
  computed: {
      p_name() {
          if(this.item.name.length > 5) return this.item.name.slice(0,5)+'...'
          return this.item.name
      }
  },
  mounted(){
      
  },
  methods: {
      seeInfo(req,res){
          this.$emit('seeInfo',req,res)
      },
  },
}
</script>

<style scoped >
.prizedetail{
    width:150px;
    height:220px;
    text-align: left;
    position: relative;
    margin-left: 10px;
    color:#535354;
    margin-top: 10px;
}
.prizedetail:hover{
    box-shadow: 0.0625rem 0.0625rem 0.625rem #888; 
}
.imgBox{
    height:150px;
    width:100%;
}
.img-detail{
    height:97%;
    width:94%;
    margin-top: 3%;
    margin-left: 3%;
}
.typeR{
    /* color:white; */
    margin:10px 0 0 5px;
}
.fs12{
    font-size: 12px;
    margin:2px 0 0 5px;
}
.bianji{
    position: absolute;
    bottom:50px;
    right:7px;
    font-size: 16px;cursor: pointer;
}
.delec{
    position: absolute;
    bottom: 5px;
    right:9px;
    /* color:rgb(235, 227, 227); */
    font-size: 16px;
    cursor: pointer;
}
.seeInfo{
    position: absolute;
    bottom: 28px;
    right:10px;
    font-size: 14px;
    /* color:rgb(235, 227, 227); */
    cursor: pointer;
}
</style>
