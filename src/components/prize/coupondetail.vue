<template>
    <div class="coupondetail">
      <el-row>
        <el-col :span="5">
            <div class="grid-content bg-purple-dark writeRight">
                奖品名
        </div></el-col>
        <el-col :span="19">
            <div class="grid-content bg-purple-dark fl">
                <div class="serchId">
                    <el-select class="inputModify" :disabled="this.tableData.id>0?true:false" @change='serchYchange' v-model="serchY" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="redText">{{textOpen}}</span>
                </div>
        </div></el-col>
      </el-row>
        <j-text name='优惠卷名称'>
            <div slot="jtext">
                <el-input :disabled='diabled' v-model="tableData.Business_name" class="w200 inputModify" placeholder='请输入优惠卷名称'>
                </el-input>
            </div>
        </j-text>

        <j-text name='优惠卷地址'>
            <div slot="jtext">
                <el-input :disabled='diabled' v-model="tableData.url" class="w200 inputModify" placeholder='请输入优惠卷地址'></el-input>
                <el-button :disabled="diabled" @click="Updatemsg()">保存</el-button>
            </div>
        </j-text>

        <div class="Yhq" v-if="!(name === '添加优惠券')">
            <div class="fl">
                <el-input size="mini" class="addCdk" v-model="cdks" placeholder="cdk"></el-input>
                <el-button :disabled="diabled" @click="addcdk" size="mini" type="primary">添加单个</el-button>
            </div>
            <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column :disabled='diabled' :selectable="selectable" type="selection" width="55">
                </el-table-column>
                <el-table-column label="优惠券CDK" min-width="120">
                    <template slot-scope="scope">{{ scope.row.cdk }}</template>
                </el-table-column>
                <el-table-column prop="name" label="领取状态" min-width="120">
                    <template slot-scope="scope">{{ scope.row.state===0?"否":"是" }}</template>
                </el-table-column>
            </el-table>
            <div v-if="!diabled" style="margin-top: 20px;overflow:hidden">
                <el-button :disabled='!(multipleSelection.length!=0)' size='mini' class="fl" @click="deleteYhq" type="danger">删除</el-button>
                <span v-if="!diabled" class="upload">导入CDK
                    <input @change="uploadExcel($event)" class="change" type="file" />
                </span>
                <span class="knowS">用户须知:导入Excel,表头必须命名为<span class="redText">cdk</span></span>
            </div>
            <el-pagination class="pagin" size='mini' @current-change="toPagination" background :total="total" :page-size='pagesize'>
            </el-pagination>
        </div>

    </div>
</template>

<script>
import {
    addType,
    setType,
    yhqaddCoupon,
    yhqgetCoupon,
    delCdk,
    addCoupons,
    serchYhq,
    serchfu
} from "./../../util/baseUrl.js";

import jText from "./../utils/modelsmall/jtext";
export default {
    data() {
        return {
            tableData3: [
                {
                    id: 1,
                    date: "4654648965",
                    name: 0
                },
                {
                    id: 2,
                    date: "435435",
                    name: 0
                },
                {
                    id: 3,
                    date: "20160504",
                    name: 0
                },
                {
                    id: 4,
                    date: "201601",
                    name: 1
                },
                {
                    id: 5,
                    date: "201608",
                    name: 1
                }
            ],
            multipleSelection: [], //多选删除
            total: 0,
            pagesize: 7,

            cdks: "", //输入的单个cdk
            excelArr: [], //导入的cdk
            options: [],
            serchY: "",
            textOpen:''
        };
    },
    props: {
        tableData: Object,
        diabled: Boolean,
        name: String
    },
    mounted() {
        this.getInfo();
        serchYhq()
        .then(res=>{
            this.options = res.data.data;
            this.serchY = this.tableData.prize_id;
        })

    },
    components: {
        jText
    },
    methods: {
        getInfo(num_page) {
            if (num_page) {
                yhqgetCoupon({
                    page: num_page,
                    pagesize: this.pagesize,
                    id: this.tableData.id
                }).then(res => {
                    this.tableData3 = res.data.data.data;
                    this.total = res.data.data.list;
                });
                return;
            }
            if (this.tableData.id) {
                yhqgetCoupon({
                    pagesize: this.pagesize,
                    id: this.tableData.id
                }).then(res => {
                    this.tableData3 = res.data.data.data;
                    this.total = res.data.data.list;
                });
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        selectable(row, index) {
            if (row.state === 1) {
                return false;
            } else {
                return true;
            }
        },
        toPagination(res) {
            //优惠券分页
            this.getInfo(res);
        },
        //添加优惠券
        Updatemsg(res) {
            if (this.tableData.id) {
                if (
                    this.tableData.Business_name === "" ||
                    this.tableData.url === "") {
                    return;
                }
                let obj = {
                    id: this.serchY,
                    Business_name: this.tableData.Business_name,
                    url: this.tableData.url
                };
                setType({
                    id: this.tableData.id,
                    data: obj
                }).then(res=>{
                    if(res.status === 200){
                        this.$notify({
                            title: '提示',
                            message: '修改成功',
                            type: 'success'
                        })
                        this.$emit('closeallModel')
                    }
                })
            } else {
                if(this.textOpen === '已被绑定' || this.serchY ===undefined){
                    this.$notify.error({
                        title: '提示',
                        message: '请确认填入信息'
                        });
                    return
                }
                let obj = {
                    Business_name:this.tableData.Business_name,
                    url:this.tableData.url,
                    id:this.serchY
                }
                addType({
                    data: obj
                })
                .then(res=>{
                    if(res.status === 200){
                         this.$notify({
                            title: '提示',
                            message: '添加成功',
                            type: 'success'
                            });
                            this.$emit('closeallModel')
                    }
                })
            }
        },
        //多选删除优惠券
        deleteYhq() {
            let arr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                arr.push(this.multipleSelection[i].id);
            }
            delCdk({
                id: arr
            }).then(res => {
                if (res.status === 200) {
                    this.$notify({
                        title: "提示",
                        message: "删除成功",
                        type: "success"
                    });
                }
                this.getInfo();
            });
        },
        //导入excel表格
        uploadExcel(event) {
            this.$notify.info({
                title: "提示",
                message: "正在导入,请稍后..."
            });
            let _this = this;
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.file = event.currentTarget.files[0];
            var rABS = false; //是否将文件读取为二进制字符串
            var f = this.file;
            var reader = new FileReader();
            //if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function(f) {
                var binary = "";
                var rABS = false; //是否将文件读取为二进制字符串
                var pt = this;
                var wb; //读取完成的数据
                var outdata;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    var XLSX = require("xlsx");
                    if (rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), {
                            //手动转化
                            type: "base64"
                        });
                    } else {
                        wb = XLSX.read(binary, {
                            type: "binary"
                        });
                    }
                    outdata = XLSX.utils.sheet_to_json(
                        wb.Sheets[wb.SheetNames[0]]
                    ); //outdata就是你想要的东西
                    for (let i = 0; i < outdata.length; i++) {
                        _this.excelArr.push(outdata[i].cdk);
                    }
                    setTimeout(() => {
                        addCoupons({
                            id: _this.tableData.id,
                            data: _this.excelArr
                        }).then(res => {
                            if (res.status === 200) {
                                _this.$notify({
                                    title: "提示",
                                    message: "导入成功",
                                    type: "success"
                                });
                                _this.getInfo();
                            }
                        });
                    }, 2000);
                };
                reader.readAsArrayBuffer(f);
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        },
        //添加单个cdk
        addcdk() {
            if (this.cdks === "") {
                return;
            }
            yhqaddCoupon({
                id: this.tableData.id,
                data: this.cdks
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
        serchYchange(){
            serchfu({id:this.serchY})
            .then(res=>{
                if(res.status === 200){
                    if(res.data.data === 0){
                        this.textOpen = ''
                    } else{
                        this.textOpen = '已被绑定'
                    }
                    
                }
            })
        }
    }
};
</script>

<style scoped >
.serchId{
    /* float: left; */
    /* overflow: hidden; */
}
.w200 {
    width: 150px;
}
.Yhq {
    width: 82%;
    margin: 0 auto;
    margin-top: 30px;
}
.addCdk {
    width: 150px;
}
.pagin {
    margin-top: 20px;
}
.upload {
    margin-left: 15px;
    font-size: 12px;
}
.knowS {
    font-size: 12px;
    float: left;
    line-height: 28px;
    margin-left: 5px;
}
.redText {
    color: red;
}
/* modify */
.inputModify {
    width: 220px;
}
</style>
