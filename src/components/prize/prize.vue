<template>
    <div class="prize">

        <!-- 搜索 + 添加 -->
        <div class="serch">
            <el-select clearable class="prizeName" size='small' v-model="value" placeholder="请选择奖品类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="prizeName" class="prizeName" size='small' placeholder="请输入奖品名称"></el-input>
            <el-button @click="qk" size='small'>重置</el-button>
            <el-button @click="selectSearch" size='small'>查询</el-button>
            <el-button @click='addPrize' type="primary" size='small' class="rightPull">+添加奖品</el-button>
        </div>

        <!-- <j-tablev @addPrize='addPrize' @deleteTable='deleteTable' :list='list' :titleName='titleName' :handle='handle'></j-tablev> -->
      <!--:class="total%7 < 5 ? '':'fl'"-->
        <div class="prizePeople">
            <j-prizedetail v-for="(item,index) in list" :key="index" :index='index' :item='item' @seeInfo='seeInfo'></j-prizedetail>
        </div>
         <!--//分页 -->
        <div class="page">
          <el-pagination @current-change="toPagination" background :total="total" :page-size='pagesize'>
          </el-pagination>
        </div>


        <jmodelv @modelvUp='modelvUp' :name='name' @closeallModel='closeallModel' v-if="model" :disable='disable' :modelInfo='modelInfo'></jmodelv>
    </div>
</template>

<script>
import {
    getPrize,
    deletePrize,
    page,
    search,
    s_input,
    getType,
    upDataprize,
    addprizes
} from "./../../util/baseUrl.js";
import jPrizedetail from "./prizedetail";

// import 
import jModify from "./../utils/modify";
import jModelv from "./../utils/modelv";
import jmodelv from "./../prize/prizemodel";
import jTablev from "./../utils/tablev";
import jSitMap from "./../utils/sitMap";
export default {
    data() {
        return {
            mapArr: ['奖品管理',"奖品详情"], //sitMap
            titleName: {
                prize_name: ["奖品名称", 0],
                type: [
                    "奖品类型",
                    5,
                    [
                        {
                            value: 3,
                            label: "红包"
                        },
                        {
                            value: 4,
                            label: "积分"
                        },
                        {
                            value: 5,
                            label: "实物"
                        }
                    ]
                ],
                cost: ["面值/元,积分/个", 0],
                type_name: [
                    "奖项名称",
                    5,
                    [
                        {
                            value: "一等奖",
                            label: "一等奖"
                        },
                        {
                            value: "二等奖",
                            label: "二等奖"
                        },
                        {
                            value: "三等奖",
                            label: "三等奖"
                        }
                    ]
                ],
                logo: ["奖品图片", 2],
                sum: ["奖品数量", 0],
                probability: ["中奖的概率", 0],
                limit: ["中奖限制", 0],
                plan: ["是否内定中奖", 4],
                telephone: ["内定中奖的手机号", 0]
            },
            list: [],
            options: [
                // {
                //     value: 1,
                //     label: "一等奖"
                // },
                // {
                //     value: 2,
                //     label: "二等奖"
                // },
                // {
                //     value: 3,
                //     label: "三等奖"
                // },
                {
                    value: 1,
                    label: "积分"
                },
                {
                    value: 2,
                    label: "红包"
                },
                {
                    value: 4,
                    label: "实物"
                },{
                    value: 3,
                    label: "优惠券"
                }
            ],
            prizeName: "", //search搜索名称
            value: "", //select下拉
            total: 500, //分页
            pagesize: 12, //x条/页
            model: false, //model状态
            modelInfo: {}, //model 内容
            disable: false, //查看禁用model
            name: "",
            checkList: [],
            add_jx:true,    //添加奖项
        };
    },
    mounted() {
        //加载获取奖品信息
        this.getInfo();
    },
    components: {
        jTablev,
        jSitMap,
        jmodelv,
        jPrizedetail,
        jModelv,
        jModify
    },
    methods: {
        qk() {
            //清空 搜索
            this.prizeName = "";
            this.value = "";
        },
        getInfo(res) {
            //获取信息
            if (res) {
                getPrize(res).then(res => {
                    this.list = res.data.list;
                    this.total = res.data.total_page;
                });
            } else {
                getPrize({pageSize:this.pagesize}).then(res => {
                    this.list = res.data.list;
                    this.total = res.data.total_page;
                });
            }
        },
        toPagination(res) {
            // 执行分页 getInfo
            page({ page: res,pageSize:this.pagesize }).then(ress => {
                this.list = ress.data.list;
            });
        },
        addPrize() {
            this.name = "添加奖品";
            this.model = true;
            this.modelInfo = { logo: "" };
        },
        //改查删
        seeInfo(req, res) {
            /**
             *@param {String}  {write Or see OR del}
             */
            if (res === "write") {
                this.name = "修改奖品信息";
                this.model = true;
                this.disable = false;
                this.modelInfo = JSON.parse(JSON.stringify(this.list[req]));
            } else if (res === "see") {
                this.name = "查看奖品信息";
                this.model = true;
                this.disable = true;
                this.modelInfo = JSON.parse(JSON.stringify(this.list[req]));
            } else {
                var _this = this;
                _this
                    .$confirm("此操作将删除该奖品, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        deletePrize({ id: _this.list[req].id })
                            .then(msg => {
                                if (msg.status === 200) {
                                    _this.$notify({
                                        title: "提示",
                                        message: "删除成功",
                                        type: "success"
                                    });
                                    _this.getInfo();
                                }
                            })
                            .catch(err => {
                                this.$notify.error({
                                    title: "提示",
                                    message: "删除失败"
                                });
                            });
                    });
            }
        },
        selectSearch() {
            if (this.value === "" && this.prizeName == "") {
                this.getInfo();
            } else {
                // 单独的搜索框搜索
                if (this.value == "") {
                    s_input({ getinfo: this.prizeName }).then(res => {
                        this.list = res.data.list;
                        this.total = res.data.total_page;
                    });
                } else if (this.value && this.prizeName) {
                    //搜索框 + select 搜索
                    search({
                        id: this.value,
                        getinfo: this.prizeName
                    }).then(res => {
                        this.list = res.data.list;
                        this.total = res.data.total_page;
                    });
                } else {
                    getType({ id: this.value, page: this.prizeName }).then(
                        res => {
                            this.list = res.data.list;
                            this.total = res.data.total_page;
                        }
                    );
                }
            }
        },
        closeallModel() {
            this.model = false;
            this.modelInfo = {};
        },
        modelvUp(res) {
            if (this.name === "添加奖品") {
                addprizes({ data: this.modelInfo }).then(res => {
                    if (res.status === 200) {
                        this.$notify({
                            title: "提示",
                            message: "添加成功",
                            type: "success"
                        });
                        this.model = false;
                        this.getInfo();
                    }
                });
            } else if (this.name === "修改奖品信息") {
                upDataprize({
                    id: this.modelInfo.id,
                    data: this.modelInfo
                }).then(res => {
                    if (res.status === 200) {
                        this.$notify({
                            title: "提示",
                            message: "修改成功",
                            type: "success"
                        });
                        this.model = false;
                        this.getInfo();
                    }
                });
            }
        }
    }
};
</script>

<style scoped >
/* 搜索 */
.serch {
  text-align: left;
  margin-bottom: 10px;
}
.prizeName {
    width: 150px;
}
.prizePeople {
    width: 100%;
    max-height: calc(100vh - 54px - 30px - 32px - 42px);
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
}
  .page{
    margin-top: 10px;
    height: 32px;
    text-align: right;
  }
</style>
