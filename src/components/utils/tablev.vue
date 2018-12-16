<template>
    <div class="tablev">
        <el-table :data="list" border style="width: 100%" max-height="500">
            <el-table-column align="center" label="序号" type="index" width="60">
                <template slot-scope="scope">
                    {{scope.$index+(pageNo - 1) * pagesize + 1}}
                </template>
            </el-table-column>

            <el-table-column v-for="(item,key,index) in titleName" :key="index" align="center" :prop="key" :label="item[0]" min-width="100">
                <template slot-scope="scope">
                    <button v-if="item[1] === 0" class="layui-btn layui-btn-xs">查看图片</button>
                    <div v-else-if="item[1] === 1">
                        <span>{{scope.row[key]=='0'?'否':'是'}}</span>
                    </div>
                    <div v-else-if="item[1] === 2">
                        <img @mouseover="seeImg($urls+scope.row[key])" class="smalImg" :src="$urls+scope.row[key]" alt="">
                    </div>

                    <div v-else-if="item[1] === 3">
                        <el-button @click="parentE(scope.$index)" size="mini" type="primary">{{scope.row[key]===0?'否':'是'}}</el-button>
                    </div>

                    <div v-else-if="item[1] === 4">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row[key] }}</p>
                            <p>住址:  {{list[scope.$index].adr}}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </div>

                    <span v-else>{{scope.row[key]}}</span>
                </template>
            </el-table-column>

            <el-table-column v-if="!(handle === 0)" align="center" label="操作" min-width='180'>
                <template slot-scope="scope">
                    <div v-if="handle === 1">
                        <i @click="modifys(scope.$index,'wirte')" class="el-icon-edit bianji icons"></i>
                        <i @click="modifys(scope.$index,'see')" class="el-icon-info seeInfo icons"></i>
                        <i @click="modifys(scope.$index,'del')" class="el-icon-delete delec icons"></i>
                    </div>
                    <div v-if="handle === 2">
                        <i @click="modifys(scope.$index,'see')" class="el-icon-info seeInfo icons"></i>
                        <i @click="modifys(scope.$index,'del')" class="el-icon-delete delec icons"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="src != ''" :class="src ===''?'':'modelImg'">
            <img :src="src" alt="">
        </div>
    </div>
</template>
//内部选项
// 0 => 查看图片
// 1 => 启用 禁用 
//操作选项
// 0 => 无按钮
// 1 => 编辑 删除

//控制展开  =>  model
//img          查看图片
//write        编辑
//add          添加
//detail       查看详情

/**

 */
<script>
export default {
    name: "tablev",
    data() {
        return {
            src: "",
            value3: true
        };
    },
    props: {
        list: Array,
        titleName: Object,
        handle: Number,
        pageNo: Number,
        pagesize: Number
    },
    mounted(){
    },
    components: {},
    methods: {
        deleteTable(res) {
            this.$emit("deleteTable", res);
        },
        redack(res) {
            this.$emit("addPrize", res);
        },
        modifys(req, res) {
            this.$emit("modifys", req, res);
        },
        seeImg(res) {
            // this.src = res;
            // setTimeout(() => {
            //     this.src = "";
            // }, 5000);
        },
        parentE(res) {
            this.$emit("changePrize", res);
        }
    }
};
</script>

<style scoped >
.row-style {
    height: 20px;
}
.bianji {
    font-size: 16px;
}
.delec {
    color: red;
    font-size: 16px;
}
.seeInfo {
    font-size: 14px;
    color: rgb(124, 121, 121);
}
.icons {
    font-size: 17px;
    margin-left: 15px;
    cursor: pointer;
}
.smalImg {
    height: 30px;
    max-width: 30px;
}
.modelImg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100px;
    width: 100px;
    z-index: 9999999;
    background-color: black;
}
.modelImg > img {
    width: 100%;
    height: 100%;
}

.noneimg {
    position: absolute;
    background-color: black;
    top: 0;
    left: 0;
    height: 300px;
    width: 300px;
}


.el-table td, .el-table th{
  padding:4px 0;
}
</style>
