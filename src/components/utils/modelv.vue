<template>
    <div class="modelv">
        <div class="jmodel-shade">
            <div class="jmodel">
                <div class="closeModel">
                    <span>{{name}}</span>
                    <i @click="closeallModel" class="el-icon-error"></i>
                </div>
                <el-scrollbar class="contentScorll">
                    <div>
                        <slot name="models"></slot>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        name:''
    },
    methods: {
      closeallModel() {
          this.$emit('closeallModel')
      }  
    },
    components: {}
};
</script>

<style scoped >
/* 模态 */
.jmodel-shade {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.329);
    z-index: 20;
    top: 0;
    left: 0;
}
.jmodel {
    position: absolute;
    height: 80%;
    width: 80%;
    background-color: white;
    z-index: 60;
    top: 10%;
    left: 10%;
    border-radius: 10px;
    overflow: hidden;
}
.closeModel > span {
    float: left;
}
.el-icon-error {
    font-size: 20px;
    color: #f56c6c;
    cursor: pointer;
}
.closeModel {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding-right: 10px;
    padding-left: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.171);
    cursor: pointer;
}
.contentScorll {
    height: 90%;
    width: 98%;
    padding-bottom: 20px;
    cursor: pointer;
}


.writeRight{
  text-align: right;
  line-height: 40px;
  margin-right:25px;
  cursor: pointer;
}
</style>
