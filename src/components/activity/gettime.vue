<template>
    <div class="gettime">
        <el-tabs tab-position="top" style="height: 200px;" @tab-click='shareSetting'>
            <el-tab-pane label="数据统计">
                <div class="sum_group">
                    <div class="paret-continaer bg1">
                        <div class="sumNum">{{fic_num}}</div>
                        <div class="sumNums">虚拟人数</div>
                        <el-button @click="change_sum(1)" class="changeSum" size='mini' type="primary">修改</el-button>
                    </div>
                    <div class="paret-continaer bg2">
                        <div class="sumNum">{{fic_add}}</div>
                        <div class="sumNums">虚拟新增</div>
                        <el-button @click="change_sum(2)" class="changeSum" size='mini' type="primary">修改</el-button>
                    </div>
                    <div class="paret-continaer bg3">
                        <div class="sumNum">{{fic_share}}</div>
                        <div class="sumNums">虚拟分享</div>
                        <el-button @click="change_sum(3)" class="changeSum" size='mini' type="primary">修改</el-button>
                    </div>
                    <div class="paret-continaer bg4">
                        <div class="sumNum">{{nums}}</div>
                        <div class="sumNums">实际参与</div>
                    </div>
                    <div class="paret-continaer bg5">
                        <div class="sumNum">{{adds}}</div>
                        <div class="sumNums">实际新增</div>
                    </div>
                    <div class="paret-continaer bg6">
                        <div class="sumNum">{{shares}}</div>
                        <div class="sumNums">实际分享</div>
                    </div>
                </div>
                <div class="change-group">
                    <el-input v-if="hiddens" v-model="change_s" class="changeSums" size='mini' placeholder="请输入内容"></el-input>
                    <el-button v-if="hiddens" @click="sureXg" size='mini' class="mt10" type="success">{{btnName}}</el-button>
                    <el-button v-if="hiddens" @click="sureXgs" size='mini' class="mt10" type="danger">取消</el-button>

                </div>
            </el-tab-pane>

            <el-tab-pane @click="shareSetting" label="分享设置">
                <div>
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple-dark textRight lh30">
                                分享的图标
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-dark">
                                <span class="upload">上传图片
                                    <input @change="upload($event)" class="change" name="image" type="file" />
                                </span>
                                <img class="fxTb" :src="$url+src" alt="">
                            </div>
                        </el-col>
                    </el-row>

                    <el-row class="settingS">
                        <el-col :span="4">
                            <div class="grid-content bg-purple-dark writeRight lh28">
                                分享的标题
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-dark">
                                <el-input v-model="title" size='mini' placeholder="请输入内容"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row class="settingS">
                        <el-col :span="4">
                            <div class="grid-content bg-purple-dark writeRight">
                                分享的正文
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-dark">
                                <textarea v-model="content" rows="6" cols="80" class="fl"></textarea>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <el-button @click="upMsg" class="mt20" type="success">确认设置</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {
    upload,
    getShare,
    setShare,
    getMset,
    setFictitious
} from "./../../util/baseUrl.js";
import jSitMap from "./../utils/sitMap";
export default {
    data() {
        return {
            mapArr: ["活动设置", "更多设置"],
            src: "",
            adds: "",
            nums: "",
            shares: "",
            fic_add: "",
            fic_num: "",
            fic_share: "",
            btnName: "", //按钮名字切换
            change_s: "", //动态绑定=>input赋值
            res: "", //切换修改顺序
            hiddens: false, //显示修改按钮
            //分享设置
            title: "",
            content: "",
            id: "", //分享ID
            Xnid: ""
        };
    },
    mounted() {
        this.getInfo();
    },
    components: {
        jSitMap
    },
    methods: {
        getInfo() {
            getMset().then(res => {
                this.adds = res.data.data[0].adds;
                this.nums = res.data.data[0].nums;
                this.shares = res.data.data[0].shares;
                this.fic_add = Number(res.data.data[0].fic_add);
                this.fic_num = Number(res.data.data[0].fic_num);
                this.fic_share = Number(res.data.data[0].fic_share);
                this.Xnid = res.data.data[0].id;
            });
        },
        upload(res) {
            //图片预览
            var newfile1 = res.target.files[0];
            var formData = new FormData();
            formData.append("file", newfile1);
            upload(formData).then(res => {
                let imgurl = res.data.data.data;
                // this.src = imgurl.replace("/uploads/default/", "");
                this.src = imgurl
            });
        },
        //点击修改模拟数据
        change_sum(res) {
            if (res === 1) {
                this.btnName = "修改虚拟人数";
            } else if (res === 2) {
                this.btnName = "修改虚拟新增";
            } else {
                this.btnName = "修改虚拟分享";
            }
            this.res = res;
            this.hiddens = true;
        },
        //修改虚拟数据
        sureXg() {
            var a = /^[0-9]*$/.test(Number(this.change_s));
            if (!a) {
                return;
            }
            setFictitious({
                id: this.Xnid,
                res: this.res,
                change_s: this.change_s
            }).then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "提示",
                        message: "修改成功",
                        type: "success"
                    });
                    this.getInfo();
                }
            });
            
            this.hiddens = false;
            this.change_s = "";
        },
        //关闭输入
        sureXgs() {
            this.hiddens = false;
        },
        //分享获取信息
        shareSetting(res) {
            if (res.label === "分享设置") {
                getShare().then(res => {
                    if (res.data.data != 0) {
                        this.id = res.data.data[0].id;
                        this.title = res.data.data[0].Title;
                        this.src = res.data.data[0].imgurl;
                        this.content = res.data.data[0].Article;
                    }
                });
            }
        },
        //设置分享信息
        upMsg() {
            setShare({
                id: this.id,
                data: {
                    imgurl: this.src,
                    Title: this.title,
                    Article: this.content
                }
            }).then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "提示",
                        message: "保存成功",
                        type: "success"
                    });
                }
                var obj = {
                    label: "分享设置"
                };
                this.shareSetting(obj);
            });
        }
    }
};
</script>

<style scoped >
.hei100 {
    height: 400px;
    width: 1px;
    background-color: black;
}
.leftS {
    width: 100%;
}
.mb10 {
    margin-bottom: 10px;
}
.borders {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
}

.buyTime {
    box-sizing: border-box;
    height: 50px;
    width: 120px;
    background-color: #f01a2556;
    border-radius: 5px;
    color: white;
    padding-top: 10px;
    position: relative;
    float: left;
    margin-left: 3px;
    margin-top: 3px;
}
.fs12 {
    font-size: 12px;
}
.delIcon {
    position: absolute;
    right: 3px;
    top: 3px;
    color: rgb(230, 109, 109);
    cursor: pointer;
}
.by-input {
    width: 150px;
    height: 40px;
}
.buyInput {
    /* margin-top: 200px; */
}
.mt10 {
    margin-top: 20px;
}
/* //其他设置 */
.settingS {
    margin-top: 30px;
}
/* 分享 */
.fl {
    float: left;
}
.mt20 {
    margin-top: 20px;
}
.fxTb {
    height: 100px;
    width: 100px;
    background-color: antiquewhite;
}
.redtext {
    color: red;
}
/* 虚拟人数 */
.wartual {
    text-align: left;
    padding-left: 35px;
}
.paret-continaer {
    color: white;
    height: 60px;
    width: 120px;
    padding-top: 25px;
    position: relative;
}
.sumNum {
    font-size: 24px;
}
.sumNums {
    font-size: 12px;
}
.bg1 {
    background-color: #ff4a42;
}
.bg2 {
    background-color: #a3d300;
}
.bg3 {
    background-color: #8f44ad;
}
.bg4 {
    background-color: #edcf1c;
}
.bg5 {
    background-color: #f59242;
}
.bg6 {
    background-color: #f9aab0;
}
.sum_group {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
}
.change-group {
    margin-top: 150px;
}
.changeSum {
    position: absolute;
    bottom: -30px;
    left: 30px;
}
.changeSums {
    width: 150px;
}
.lh28 {
    line-height: 28px;
}
.lh30 {
    line-height: 30px;
}
</style>
