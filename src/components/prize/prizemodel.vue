<template>
    <div class="prizemodel">
        <j-model @closeallModel='closeallModel' :name='name'>
            <div slot="models">
                <j-text name='奖品名称'>
                    <div slot="jtext">
                        <el-input :disabled="disable" v-model="modelInfo.name" class="w200" placeholder='请输入奖品名称'></el-input>
                    </div>
                </j-text>

                <j-text name='奖品类型'>
                    <div slot="jtext">
                        <el-select clearable :disabled="disable" class="w200" v-model="modelInfo.type_id" placeholder="请选择奖品名称">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </j-text>

                <j-text v-if="modelInfo.type_id == 2" name='红包面值'>
                    <div slot="jtext">
                        <el-input :disabled="disable" v-model="modelInfo.cost" class="w200" placeholder='请输入红包面值'></el-input>
                    </div>
                </j-text>

                <j-text v-if="modelInfo.type_id == 1" name='积分个数'>
                    <div slot="jtext">
                        <el-input :disabled="disable" class="w200" v-model="modelInfo.cost" placeholder='请输入积分个数'></el-input>
                    </div>
                </j-text>

                <!-- <j-text name='奖项'>
                    <div slot="jtext">
                        <el-select clearable :disabled="disable" class="w200" v-model="modelInfo.prize" placeholder="请选择奖项名称">
                            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </j-text> -->

                <j-text name='奖项'>
                    <div slot="jtext">
                        <el-select clearable :disabled="disable" class="w200" v-model="modelInfo.prize" placeholder="请选择奖项名称">
                            <el-option v-for="item in option" :key="item.id" :label="item.prize_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </j-text>

                <j-photo name='奖品图片'>
                    <div slot="jphoto">
                        <span v-if="!disable" class="upload">选择图片
                            <input id="upchange" @change="uploads($event)" class="change" name="image" type="file" />
                        </span>
                        <img class="previewImg" :src="$url+(modelInfo.logo)" alt="">
                        <div v-if="!(modelInfo.logo)" class="prizeImgs">建议尺寸 150*150</div>
                    </div>

                </j-photo>

                <j-text name='奖品数量'>
                    <div slot="jtext">
                        <el-input type="number" :disabled="disable" class="w200" v-model="modelInfo.sum" placeholder='请输入奖品数量'></el-input>
                    </div>
                </j-text>

                <j-text name='中奖概率'>
                    <div slot="jtext">
                        <el-input type="number" :disabled="disable" class="w200" v-model="modelInfo.probability" placeholder='请输入分子'></el-input>
                        <span>/100000<i class="color_red">(分子越大概率越高)</i></span>
                    </div>
                </j-text>

                <j-text name='抽奖规则'>
                    <div slot="jtext">
                        <div class="modifyRadius">
                            <el-radio :disabled="disable" v-model="modelInfo.limit" label="每人整次活动最多获得N件"><span class="mr10">每人整次活动可获得</span><el-input-number class="m10" :disabled="disable" v-model="modifyNum1" size="mini" :min="minx" label="描述文字"></el-input-number><span class="ml10">次</span></el-radio>
                        </div>
                        <div class="modifyRadius">
                            <el-radio :disabled="disable" v-model="modelInfo.limit" label="每人每天最多获得N件"><span class="mr10">每人每天最多可获得</span><el-input-number class='m10' :disabled="disable" v-model="modifyNum2" size="mini" :min="minx" label="描述文字"></el-input-number><span class="ml10">次</span></el-radio>
                        </div>
                    </div>
                </j-text>

                <j-radio name='是否内定中奖'>
                    <div slot="jradio">
                        <el-radio :disabled="disable" v-model='modelInfo.plan' :label='lab1'>否</el-radio>
                        <el-radio :disabled="disable" v-model='modelInfo.plan' :label='lab2'>是</el-radio>
                    </div>
                </j-radio>

                <j-text name='内定中奖手机号' v-if="modelInfo.plan == 1">
                    <div slot="jtext">
                        <el-input :disabled="disable" class="w200" v-model="modelInfo.telephone" placeholder='请输入中奖手机号'></el-input>
                    </div>
                </j-text>

                <div class="mt30" v-if="!disable">
                    <el-button @click="setInfo" type="success">提交</el-button>
                    <!-- <el-button>取消</el-button> -->
                </div>
            </div>
        </j-model>
    </div>
</template>

<script>
import { upload,getPN } from "./../../util/baseUrl.js";

import jRadio from "./../utils/modelsmall/jradio";
import jTitle from "./../utils/modelsmall/jtitle";
import jDate from "./../utils/modelsmall/jdate";
import jText from "./../utils/modelsmall/jtext";
import jPhoto from "./../utils/modelsmall/jphoto";
import jModel from "./../utils/modelv";
import ElementUI from "element-ui";
export default {
    data() {
        return {
            options: [
                {
                    value: 2,
                    label: "现金红包"
                },
                {
                    value: 4,
                    label: "实物"
                },
                {
                    value: 1,
                    label: "积分"
                },{
                    value: 3,
                    label: "优惠券"
                }
            ],
            option: [
                {
                    value: 1,
                    label: "一等奖"
                },
                {
                    value: 2,
                    label: "二等奖"
                },
                {
                    value: 3,
                    label: "三等奖"
                }
            ],
            value: "", //奖品名称
            values: "",
            src: "",
            // radio: "0",
            rule: [
                {
                    value: "每人整次活动最多获得N件",
                    label: "每人整次活动最多获得N件"
                },
                {
                    value: "每人每天最多获得N件",
                    label: "每人每天最多获得N件"
                }
            ],
            lab1: "0",
            lab2: "1",
            mylogo: "",
            radio: "1",

            modifyNum1: 0,
            modifyNum2: 0,
            minx: 1
        };
    },
    props: {
        modelInfo: Object,
        disable: Boolean,
        name: String
    },
    components: {
        jModel,
        jText,
        jPhoto,
        jDate,
        jTitle,
        jRadio
    },
    mounted() {
        if (this.modelInfo.sums) {
            if (this.modelInfo.limit === "每人整次活动最多获得N件") {
                this.modifyNum1 = this.modelInfo.sums;
            } else {
                this.modifyNum2 = this.modelInfo.sums;
            }
        }else{
            // this.modelInfo.limit = "每人整次活动最多获得N件";
            // this.modelInfo.plan = "0";
            // console.log(this.modelInfo)
        }

        getPN()
        .then(res=>{
            this.option = res.data.data;
        })

    },
    methods: {
        uploads(res) {
            var filen = res.target.files[0];
            var formData = new FormData();
            formData.append("file", filen);
            var _this = this;
            upload(formData).then(res => {
                // console.log(res)
                let imgurl = res.data.data.data;
                // _this.modelInfo.logo = imgurl.replace("/uploads/default/", "");
                _this.modelInfo.logo = imgurl
            });
        },
        setInfo() {
            if (
                !this.modelInfo.limit ||
                !this.modelInfo.logo ||
                !this.modelInfo.name ||
                !this.modelInfo.plan ||
                !this.modelInfo.prize ||
                !this.modelInfo.probability ||
                !this.modelInfo.sum ||
                !this.modelInfo.type_id
            ) {
                this.$notify({
                    title: "提示",
                    message: "请填写完整的奖品信息",
                    type: "warning"
                });
                return;
            }
            if (this.modelInfo.plan == "1") {
                if (!this.modelInfo.telephone) {
                    this.$notify({
                        title: "提示",
                        message: "请填写内定中奖手机号",
                        type: "warning"
                    });
                    return;
                }
            } else {
                this.modelInfo.telephone = "";
            }
            if (this.modelInfo.type_id === 1 || this.modelInfo.type_id === 2) {
                if (!this.modelInfo.cost) {
                    this.$notify({
                        title: "提示",
                        message: "请填写积分或者金额数值",
                        type: "warning"
                    });
                    return;
                }
            } else {
                this.modelInfo.cost = "";
            }
            if (this.modelInfo.limit === "每人整次活动最多获得N件") {
                this.modelInfo.sums = this.modifyNum1;
            } else {
                this.modelInfo.sums = this.modifyNum2;
            }

            //提交表单
            this.modelInfo.probability = Number(this.modelInfo.probability);
            this.modelInfo.sum = Number(this.modelInfo.sum);
            this.modelInfo.sums = Number(this.modelInfo.sums);
            this.$emit("modelvUp", this.modelInfo);
        },
        closeallModel() {
            //关闭model
            this.$emit("closeallModel");
        }
    }
};
</script>

<style scoped >
.container {
    padding-bottom: 200px;
}
.w200 {
    width: 220px;
}
.previewImg {
    max-width: 100px;
    max-height: 100px;
    margin-left: 10px;
    float: left;
}
.modifyRadius {
    margin-top: 8px;
}
.color_red {
    color: red;
    margin-left: 5px;
}
.prizeImgs {
    line-height: 30px;
    text-align: left;
    padding-left: 10px;
    color: red;
}
.mr10{
   margin-right: 10px;
}
.ml10{
    margin-left: 10px;
}
</style>
