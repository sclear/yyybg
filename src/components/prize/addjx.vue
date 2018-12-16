<template>
    <div class="add_jx">
        <div class="overh">
            <el-input class="addname" v-model="name" placeholder="请输入奖项名称">
            </el-input>
            <el-button @click="addnames" class="fl" type="primary">确认添加</el-button>
        </div>
        <!-- <div class="group">
            <div class="topS">
                <div v-for="(item,index) in list" :key='index' class="prize_namegroup">{{item.prize_name}}
                    <i @click="delName(index)" class="el-icon-error iconfont"></i>
                </div>
            </div>

        </div> -->
        <div class="group">
            <el-tag class="mr10" v-for="tag in list" :key="tag.prize_name" @close="handleClose(tag)" closable>
                {{tag.prize_name}}
            </el-tag>
        </div>
    </div>
</template>

<script>
import { getPN, addPN, delPN } from "./../../util/baseUrl.js";
export default {
    data() {
        return {
            name: "",
            list: []
        };
    },
    components: {},
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            getPN().then(res => {
                this.list = res.data.data;
            });
        },
        delName(res) {
            delPN({
                id: this.list[res].id
            }).then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "提示",
                        message: "删除成功",
                        type: "success"
                    });
                    this.getInfo();
                }
            });
        },
        addnames() {
            if (this.name === "") return;
            for (let i = 0; i < this.list.length; i++) {
                if (this.name === this.list[i].prize_name) {
                    this.$notify.error({
                        title: "提示",
                        message: "已存在该奖项"
                    });
                    return;
                }
            }
            addPN({
                name: this.name
            }).then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "提示",
                        message: "添加成功",
                        type: "success"
                    });
                    this.getInfo();
                }
            });
        },
        handleClose(tag) {
              delPN({
                id:tag.id
            }).then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "提示",
                        message: "删除成功",
                        type: "success"
                    });
                    this.getInfo();
                }
            });
        }
    }
};
</script>

<style scoped >
.overh {
    overflow: hidden;
}
.topS {
    margin-top: 50px;
}
.addname {
    width: 200px;
    float: left;
}
.fl {
    float: left;
    margin-left: 15px;
}
.prize_namegroup {
    height: 40px;
    width: 200px;
    border-radius: 5px;
    border: 1px solid #c0c4cc;
    line-height: 40px;
    color: #535354;
    text-align: right;
    float: left;
    margin: 15px 0 0 15px;
    text-align: center;
    position: relative;
}
.iconfont {
    cursor: pointer;
    color: #f56c6c;
    position: absolute;
    right: 5px;
    top: 12px;
}
.group{
    float: left;
    margin-top: 30px;;
}
.mr10{
    margin-right: 10px;
}
</style>
