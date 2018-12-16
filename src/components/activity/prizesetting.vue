<template>
    <div class="prizesetting">
        <!-- <div>
            <j-sit-map :mapArr='mapArr'></j-sit-map>
        </div> -->
        <div class="hd-group">
            <div>
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark writeRight linheight">
                            活动名称:
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple-dark">
                            <el-input class="h-titles" v-model="list.activity_name" size='small' placeholder='请输入活动名称'></el-input>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark writeRight linheight">
                            活动主题:
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple-dark fl ylRelative">
                            <el-select class="h-title" @change='changes' size='mini' v-model="list.themes" placeholder="请选择主题">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>

                            <span v-if="list.themes == 7" class="upload ylImg">上传图片
                                <input @change="upload($event)" class="change" name="image" type="file" />
                            </span>
                            <span v-if="list.themes == 7" class="yltext">建议上传270*500的图片</span>

                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark writeRight lh28">
                            参与次数:
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple-dark fl">
                            分享可得次 &nbsp;<el-input-number v-model="list.share" size="mini" :min="0" label="选择次数"></el-input-number> &nbsp;次(例如:用户一天内分享10次,最多获得<span class="redtext">{{list.share}}</span>次)
                        </div>
                    </el-col>
                </el-row>
                <el-row class="mt10">
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark writeRight lh28">
                            &nbsp;
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <div class="grid-content bg-purple-dark fl">
                            <div>
                                <el-radio v-model="list.partake_type" :label="lab0">
                                    每天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input-number v-model="todays" size="mini" :min="0" label="选择次数"></el-input-number>&nbsp;&nbsp;次/人
                                </el-radio>
                            </div>
                            <div class="mt10">
                                <el-radio v-model="list.partake_type" :label="lab1">
                                    一共&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input-number v-model="alls" size="mini" :min="0" label="选择次数"></el-input-number>&nbsp;&nbsp;次/人
                                </el-radio>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark writeRight lh20">
                            &nbsp;
                        </div>
                    </el-col>
                    <el-col :span="15">
                        <div class="grid-content bg-purple-dark fl">
                            <el-row>
                                <el-col :span="9">
                                    <div class="grid-content bg-purple-dark writeRight lh20 tl">
                                        支持购买:
                                    </div>
                                </el-col>
                                <el-col :span="15">
                                    <div class="grid-content bg-purple-dark fl text-buy">
                                        <el-switch class="buy-swich fl" v-model="list.purchase" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否">
                                        </el-switch><span v-if='list.purchase === true' @click="buysetting(1)" class="buyandhuan">购买设置</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row> -->

                <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark writeRight lh20">
                            &nbsp;
                        </div>
                    </el-col>
                    <el-col :span="15">
                        <div class="grid-content bg-purple-dark fl">
                            <el-row>
                                <el-col :span="9">
                                    <div class="grid-content bg-purple-dark writeRight lh20 tl">
                                        积分兑换:
                                    </div>
                                </el-col>
                                <el-col :span="15">
                                    <div class="grid-content bg-purple-dark fl text-buy">
                                        <el-switch class="buy-swich fl" v-model="list.exchange" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否">
                                        </el-switch> <span v-if="list.exchange" @click="buysetting(2)" class="buyandhuan">兑换设置 </span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                <!-- <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark writeRight linheight lh19">
                            短信通知:
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple-dark fl">
                            <el-checkbox v-model="list.notice">是否短信通知</el-checkbox>
                            <span v-if="list.notice" @click="buysetting(3)" class="buyandhuan">设置短信模板</span>
                        </div>
                    </el-col>
                </el-row> -->

                <el-row>
                    <el-col :span="3">
                        <div class="grid-content bg-purple-dark writeRight linheight">
                            活动规则:
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple-dark">
                            <textarea v-model="list.activity_rules" cols="64" rows="5"></textarea>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </div>
        <div class="upBtn">
            <el-button @click="upMsg" class="upbtns" type="primary">确认更改</el-button>
        </div>
        <!-- 主题页面 -->
        <div class="zhuti">
            <img v-if="list.themes === '7'" :src="$url+src" alt="">
            <img v-else :src="src" alt="">
            <div class="page-title">主题预览</div>
        </div>
        <j-model v-if="modelV" :name='name' @closeallModel='closeallModel'>
            <div slot="models">
                <!-- 购买设置 -->
                <div v-if="buyMdel" class="buygroup">
                    <div class="mb10">设置购买价格次/元</div>
                    <el-input v-model="list.Purchase_price" class="by-inputs" size='mini' placeholder="请输入金额/元"></el-input>元/次(可输入小数)

                    <div class="borders">
                        <div style="text-align:left">添加优惠购买方式</div>
                        <div class="buyInput">
                            <el-input v-model="money" class="by-inputsmini" size='mini' placeholder="金额/元"></el-input>
                            <el-input v-model="number" class="by-inputsmini" size='mini' placeholder="抽奖次数"></el-input>
                            <el-input v-model="give" class="by-inputsmini" size='mini' placeholder="赠送次数"></el-input>
                            <el-button @click="addY" class="sureSetting" size='mini' type="success">确认添加</el-button>
                        </div>
                        <div class="yhj">
                            <div class="buyTime" v-for="(item,index) in listbuy" :key="index">
                                <i @click="delbuy(index)" class="el-icon-circle-close-outline delIcon"></i>
                                <div>￥{{item.money}}元</div>
                                <div class="fs12">{{item.number}}次 送 {{item.give}}次</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 积分兑换 -->
                <div v-if="jfMdel" class="buygroup">
                    <div class="mb10">设置积分兑换比例</div>
                    <el-input v-model="list.exchange_rules" class="by-inputs" size='mini' placeholder="N积分/次"></el-input>积分/次
                    <div class="buygroupchild">
                        <el-input v-model="list.exchange_limit" class="by-inputs" size='mini' placeholder="设置最大兑换积分"></el-input>积分后无法使用积分
                    </div>
                    <div>
                    </div>
                </div>
                <!-- 短信模板 -->
                <div v-if="dxModel" class="dxModel">
                    <textarea v-model="list.content" rows="10" cols="100"></textarea>
                    <div>
                    </div>
                </div>
            </div>
        </j-model>
    </div>
</template>

<script>
import {
    upload,
    LuckdrawSetting,
    addLuckdraw,
    addSetting,
    getDiscount,
    addDiscount,
    delDiscount
} from "./../../util/baseUrl.js";

import jModel from "./../utils/modelv";
import jSitMap from "./../utils/sitMap";
export default {
    data() {
        return {
            mapArr: ["活动设置", "抽奖配置"],
            modelV: false, //主模态控制按钮
            name: "",   //模态标题
            lab0: 0,
            lab1: 1,
            todays: 0,  //判断每天 Or  一共
            alls: 0,    //++++
            list: {
            },
            options: [
                //主题类型 &&
                {
                    value: "0",
                    label: "圣诞节"
                },
                {
                    value: "1",
                    label: "元旦节"
                },
                {
                    value: "2",
                    label: "春节"
                },
                {
                    value: "3",
                    label: "劳动节"
                },
                {
                    value: "4",
                    label: "端午节"
                },
                {
                    value: "5",
                    label: "中秋节"
                },
                {
                    value: "6",
                    label: "国庆节"
                },
                {
                    value: "7",
                    label: "自定义"
                }
            ],

            // 购买方式
            buyMdel: false,
            money: "",
            number: "",
            give: "",
            //优惠方式
            listbuy: [],
            // 积分兑换
            jfMdel: false,
            //短信模板
            dxModel: false,
            // 设置预览图片
            src: "",
            id: ""
        };
    },
    created() {
        LuckdrawSetting().then(res => {
            if(res.status === 200 && JSON.stringify(res.data.data) === '{}'){
                // let obj;
                // obj.purchase = false;
                // obj.exchange = false;
                return
            }
            this.id = res.data.data[0].id;
            let obj = res.data.data[0];
            obj.purchase = obj.purchase === 0 ? false : true;
            obj.exchange = obj.exchange === 0 ? false : true;
            obj.notice = obj.notice === 0 ? false : true;
            if (obj.partake_type == 0) {
                this.todays = obj.second;
            } else {
                this.alls = obj.second;
            }
            this.src = obj.imgurl;
            this.list = obj;

            if(!(res.data.data[0].themes) || res.data.data[0].themes === ''){
                this.list.themes = '2'
            }
            this.changes();
        });
    },
    components: {
        jSitMap,
        jModel
    },
    methods: {
        buysetting(res) {
            this.modelV = true;
            if (res === 1) {
                this.buyMdel = true;
                this.name = "购买设置";
                this.jfMdel = this.dxModel = false;
                //加载购买优惠方式
                getDiscount().then(res => {
                    this.listbuy = res.data.data;
                });
            } else if (res === 2) {
                this.jfMdel = true;
                this.name = "积分兑换设置";
                this.buyMdel = this.dxModel = false;
            } else {
                this.dxModel = true;
                this.name = "短信模板设置";
                this.buyMdel = this.jfMdel = false;
            }
        },
        closeallModel() {
            this.modelV = false;
        },
        delbuy(res) {
            // delDiscount
            delDiscount({id:this.listbuy[res].id})
            .then(msg=>{
                if(msg.status === 200){
                    this.listbuy = msg.data.data;
                    this.$notify({
                        title: "提示",
                        duration: 1000,
                        message: "删除成功",
                        type: "success"
                    });
                }
            })
        },
        //添加优惠方式
        addY() {
            if (this.money === "" || this.number === "" || this.give === "") {
                this.$notify.error({
                    title: "提示",
                    message: "请填写完整的信息"
                });
                return
            }
            let obj = {
                money: Number(this.money),
                number: Number(this.number),
                give: Number(this.give)
            };
            addDiscount({
                data: obj
            }).then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "提示",
                        duration: 1000,
                        message: "修改成功",
                        type: "success"
                    });
                    this.listbuy = res.data.data;
                }
            });
        },
        //主题预览
        changes() {
            switch (this.list.themes) {
                case "0":
                    this.src = require("./../../assets/img/sd.jpg");
                    break;
                case "1":
                    this.src = require("./../../assets/img/yd.png");
                    break;
                case "2":
                    this.src = require("./../../assets/img/3.png");
                    break;
                case "3":
                    this.src = require("./../../assets/img/5.png");
                    break;
                case "4":
                    this.src = require("./../../assets/img/4.png");
                    break;
                case "5":
                    this.src = require("./../../assets/img/6.png");
                    break;
                case "6":
                    this.src = require("./../../assets/img/gq.png");
                    break;
            }
        },
        upload(res) {
            var newfile1 = res.target.files[0];
            var formData = new FormData();
            formData.append("file", newfile1);
            upload(formData).then(res => {
                let imgurl = res.data.data.data;
                // this.src = imgurl.replace("/uploads/default/", "");
                this.src = imgurl
            });
        },
        //提交信息
        upMsg() {
           
            let obj = JSON.parse(JSON.stringify(this.list));
            obj.purchase = obj.purchase == true ? 1 : 0;
            obj.exchange = obj.exchange == true ? 1 : 0;
            obj.notice = 0;
            obj.content = '0';
            obj.second = obj.partake_type === 0 ? this.todays : this.alls;
            obj.imgurl = obj.themes === "7" ? this.src : ""
            if(obj.purchase === 0){
                obj.Purchase_price = ''
            } 
            if(obj.purchase === 1){
                // if(obj.Purchase_price <= 0){
                //     this.$notify({
                //     title: '提示',
                //     message: '请完善信息',
                //     type: 'warning'
                // });
                //     // return
                // }
            } 
            if(obj.exchange === 0){
                obj.exchange_rules = '',
                obj.exchange_limit = ''
            }
            if(obj.exchange === 1){
                if( !obj.exchange_rules || !obj.exchange_limit){
                    this.$notify({
                        title: '提示',
                        message: '请完善信息',
                        type: 'warning'
                    });
                    return
                }
            } 
            if(!obj.activity_name || !obj.themes || !obj.share ||!obj.activity_rules || obj.partake_type === undefined){
                this.$notify({
                    title: '提示',
                    message: '请完善信息',
                    type: 'warning'
                });
                return
            }
            obj.purchase = '';
            obj.content = '';
            addSetting({
                id: this.id,
                data: obj
            }).then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "提示",
                        duration: 1000,
                        message: "修改成功",
                        type: "success"
                    });
                }
            });
        }
    }
};
</script>

<style scoped >
/* 活动名称 */
.h-title {
    width: 208px;
    float: left;
}
.h-titles {
    width: 467px;
    float: left;
}
/* 购买 / 积分比例 */
.text-buy {
    width: 220px;
    margin-left: -30px;
}
.buyandhuan {
    margin-left: 10px;
    color: #63b0ff;
    cursor: pointer;
    line-height: 20px;
}
.tl {
    text-align: left;
}
.hd-group {
    font-size: 14px;
}
.fl {
    float: left;
}
.ml0 {
    margin-left: 0;
}
.el-row {
    margin-top: 10px;
}
.lh20 {
    line-height: 20px;
}
.lh28 {
    line-height: 28px;
}
.redtext {
    color: red;
    font-size: 16px;
}
.upBtn {
    margin-top: 30px;
}
.upbtns {
    float: left;
    margin-left: 50px;
}
.mt10 {
    margin-top: 10px;
}
.lh19 {
    line-height: 19px;
}
/* 主题 */
.zhuti {
    position: absolute;
    top: 14%;
    right: 10%;
    height: 400px;
    width: 216px;
    /* background-color: antiquewhite; */
}
.zhuti > img {
    height: 100%;
    width: 100%;
}
.page-title {
    font-size: 18px;
    position: absolute;
    bottom: -35px;
    left: 50%;
    margin-left: -30px;
    color: orangered;
}

/* model 购买 */
.buygroup {
    float: left;
    padding-left: 15px;
    margin-top: 15px;
    width: 100%;
    text-align: left;
}
.buygroupchild {
    float: left;
    width: 100%;
    text-align: left;
}
.by-input {
    float: left;
    display: inline-block;
    width: 60px;
}
.by-inputsmini {
    width: 80px;
    height: 40px;
    float: left;
    margin-right: 10px;
}
.by-inputs {
    width: 130px;
    height: 40px;
    float: left;
    margin-right: 10px;
}
.buy-size {
    width: 80px;
}
.mb10 {
    margin-bottom: 10px;
    line-height: 16px;
    text-align: left;
}
.sureSetting {
    margin-left: 20px;
}
.borders {
    width: 100%;
    margin-top: 15px;
    padding-top: 15px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-top: 1px solid #e4e7ed;
}
.buyInput {
    margin-top: 15px;
}
.yhj {
    width: 100%;
    height: auto;
    float: left;
}
.buyTime {
    box-sizing: border-box;
    height: 50px;
    width: 110px;
    background-color: #f01a2556;
    border-radius: 5px;
    color: white;
    padding-top: 10px;
    position: relative;
    float: left;
    margin-left: 3px;
    margin-top: 3px;
}
.delIcon {
    position: absolute;
    right: 3px;
    top: 3px;
    color: rgb(230, 109, 109);
    cursor: pointer;
}
.fs12 {
    font-size: 12px;
}
/* 短信模板 */
.dxModel {
    margin-top: 40px;
}
/* 预览图片 */
.ylRelative {
    position: relative;
}
.ylImg {
    width: 80px;
    height: 19px;
    position: absolute;
    top: 0;
    margin-left: 15px;
    overflow: hidden;
}
.ylImg > input {
    height: 100%;
    width: 100%;
}
.yltext {
    position: absolute;
    top: 4px;
    left: 330px;
    width: 160px;
}
</style>
