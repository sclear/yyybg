<template>
    <div class="bar">
        <div class="nav">
            <div v-for="(item,index) in navList" :key="index">
              <router-link @click.native.stop="changeNav(index)" v-if="!Array.isArray(item[1])" class="navchild animated zoomIn" :to="item[1]" active-class="activeClass" tag="div" :key="index"><i :class="item[2]" class="geticons"></i>{{item[0]}}</router-link>

              <div v-else class="navparent" :class="choseheit === index?'parentHeigth':''" @click.stop="openparentNav(index)">

                <div class="navchild animated zoomIn">
                  <i :class="item[0][1]" class="geticon"></i>
                  {{item[0][0]}}
                  <i class="el-icon-arrow-right iconRotate" :class="choseheit === index?'iconrota':''"  ref="rotate"></i>
                </div>

                <div v-for="(items,indexs) in item" :key="indexs">
                  <div v-if="indexs > 0">
                    <router-link @click.native.stop="changeNav(index,indexs)" :key="indexs" :to="items[1]" active-class="activeClass" tag="div"><i class="ml50 geticon"></i>{{items[0]}}</router-link>
                  </div>
                </div>

              </div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: "leftbar",
        data() {
          return {
            choseheit: 999,
            choseActivenum:'',
            navList:[],
          }
        },
        mounted() {
          this.navList = this.$store.state.navList
        },
        methods: {
          changeNav(req,res) {
            if(res){
              this.$emit('choseActiveclass',[req,res])
            }else {
              this.$emit('choseActiveclass',[req])
            }

          },
          openparentNav(res){
            if(this.choseheit === res){
              this.choseheit = 999;
            } else {
              this.choseheit = res;
            }
          },
        }
    }
</script>

<style scoped>
  .leftbar{
    font-size: 0;
    float: left;
    width: 100%;
    /* height:100vh; */
    /* height: 88vh; */
    background-color: #33495d;
    overflow: hidden;
  }
  .nav{
    float: left;
    height: 100%;
    width: 100%;
    background-color: #eeeeee;
  }
  .geticon{
    text-align: center;
    width:90px;
    /* min-width: 70px; */
 
  }
  .geticons{
    text-align: center;
    width:95px;
    /* min-width: 70px; */
 
  }
  .iconRotate{
    float: right;
    margin-right: 10px;
    line-height: 40px;
    transition: all linear 0.1s;
  }
  .iconrota{
    transform: rotate(90deg);
  }
  .navchild{
    height: 40px;
    width: 100%;
    color: #333333;
    font-size: 14px;
    text-align: left;
    background-color: #eeeeee;
    border-bottom: 1px solid #e5e5e5;
    line-height: 40px;
    cursor: pointer;
  }
  /*hover菜单状态  */
  .navchild:hover{
    background-color: #e5e5e5;
  }
  /*激活菜单状态*/
  .activeClass{
    background-color: #e5e5e5;
  }
  .navparent{
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    text-align: left;
    color: #333333;
    font-size: 14px;
    overflow: hidden;
    background-color: #eeeeee;
    transition: all linear 0.3s;
    line-height: 40px;
    cursor: pointer;
  }
  .parentHeigth{
    height:auto;
    max-height: 205px;
  }
  .ml50{
    margin-left: 100px;
  }
</style>
