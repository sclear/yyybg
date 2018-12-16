<template>
    <div class="coupon">
        <!-- <div>
            <j-sit-map :mapArr='mapArr'></j-sit-map>
        </div> -->
        <div class="serch">
            <!-- <el-select clearable class="prizeName" size='small' v-model="value" placeholder="请选择奖品类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->
            <el-input v-model="prizeName" class="prizeName" size='small' placeholder="请输入优惠券名称"></el-input>
            <el-button @click="qk" size='small'>重置</el-button>
            <el-button @click="selectSearch" size='small'>查询</el-button>
            <el-button @click='addPrize' type="primary" size='small' class="rightPull">+添加优惠券</el-button>
        </div>
        <!-- table表单 -->
        <j-tablev @modifys='modifys' :pageNo='pageNo' :pagesize='pagesize' :titleName='titleName' :list='list' :handle='handle'></j-tablev>

        <!-- model -->
        <j-modelv v-if="model" :name='name' @closeallModel='closeallModel'>
            <div slot="models">
                <j-coupondetail @closeallModel='closeallModel' :name='name' :tableData='tableData' :diabled='diabled'></j-coupondetail>
            </div>
        </j-modelv>

        <!-- //分页 -->
        <el-pagination class="pagin" @current-change="toPagination" background :total="total" :page-size='pagesize'>
        </el-pagination>
    </div>
</template>

<script>
import { getTypes, yhqgetType,delCoupon } from "./../../util/baseUrl.js";
import jCoupondetail from "./coupondetail";

import jModify from "./../utils/modify";
import jModelv from "./../utils/modelv";
import jTablev from "./../utils/tablev";
import jSitMap from "./../utils/sitMap";
export default {
    data() {
        return {
            mapArr: ['奖品管理',"优惠券"],
            titleName: {
                Business_name: ["优惠券名称"],
                url: ["领取地址"],
                sum: ["数量"]
            },
            handle: 1,
            list: [],
            prizeName: "",

            // model
            model: false,
            name: "添加优惠券",
            menuModel: {
                name: ["优惠券名称", 0],
                adress: ["领取地址", 0],
                cdk: ["兑换码", 0]
            },
            tableData: {
            },
            diabled: false,
            //分页
            total: 0,
            pagesize: 5,
            pageNo: 1
        };
    },
    components: {
        jSitMap,
        jTablev,
        jModelv,
        jModify,
        jCoupondetail
    },
    methods: {
        getInfo() {
            var _this = this;
            getTypes().then(res => {
                this.total = res.data.data.data.total;
                _this.list = res.data.data.data.data;
                for (let i = 0; i < res.data.data.sum.length; i++) {
                    _this.list[i].sum = res.data.data.sum[i].length;
                }
            });
        },
        //清空 搜索
        qk() {
            this.prizeName = "";
        },
        //分页
        toPagination(res) {
            this.pageNo = res;
        },
        //查询
        selectSearch() {
            yhqgetType({
                name: this.prizeName
            }).then(res => {
                this.total = res.data.data.data.total;
                this.list = res.data.data.data.data;
                for (let i = 0; i < res.data.data.sum.length; i++) {
                    this.list[i].sum = (res.data.data.sum[i].length==0?'0':res.data.data.sum[i].length);
                }
            });
        },
        //添加优惠卷
        addPrize() {
            this.model = true;
            this.name = "添加优惠券";
            this.tableData = {};
        },
        //关闭model
        closeallModel() {
            this.diabled = false;
            this.model = !this.model;
            this.getInfo()
        },
        //增删查
        modifys(req, res) {
            if (res === "wirte") {
                this.name = "修改优惠卷";
                this.tableData = JSON.parse(JSON.stringify(this.list[req]));
                this.closeallModel();
            } else if (res === "see") {
                this.name = "查看优惠卷";
                this.model = true;
                this.diabled = true;
                this.tableData = JSON.parse(JSON.stringify(this.list[req]));
            } else {
                //删除
                var _this = this;
                _this
                    .$confirm("此操作将删除该优惠卷, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        delCoupon({id:this.list[req].id})
                        .then(res=>{
                            if(res.status === 200){
                                this.$notify({
                                title: "提示",
                                duration: 1000,
                                message: "删除成功",
                                type: "success"
                            });
                            this.getInfo()
                            }
                        })
                    })
                    .catch(err => {
                    });
            }
        }
    },
    mounted() {
        this.getInfo();
    }
};
</script>

<style scoped >
.serch {
    margin: 10px 0;
    float: left;
}
.prizeName {
    width: 150px;
}
.pagin {
    position: absolute;
    left: 10%;
    bottom: 10%;
}
</style>
