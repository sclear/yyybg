<template>
    <div class="roll">
        <el-tabs v-model="activeName">
            <el-tab-pane label="中奖名单" name="first"></el-tab-pane>
        </el-tabs>

        <div class="serch">
            <el-input v-model="prizeName" class="prizeName" size='small' placeholder="请输入用户名/手机号/奖品名称"></el-input>
            <el-button @click="qk" size='small'>重置</el-button>
            <el-button @click="selectSearch" size='small'>查询</el-button>
            <el-button @click="exportExcel" size='small'>导出</el-button>
        </div>
        <!-- table -->
        <!--<j-tablev @changePrize='changePrize' @modifys='modifys' :pageNo='pageNo' :pagesize='pagesize' :titleName='titleName' :list='list' :handle='handle'></j-tablev>-->


        <el-table
          :data="list"
          border
          style="width: 100%">
          <el-table-column prop="date" label="序号" width="60" align="center">
            <template slot-scope="scope">
              {{scope.$index+(nowSize - 1) * pagesize + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="user" label="用户" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods" label="奖品名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type_id" label="奖品类型" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.type_id | prizeType(filterObj1)}}
            </template>
          </el-table-column>

          <el-table-column label="兑奖信息" align="center" show-overflow-tooltip>
            <el-table-column prop="name" label="姓名" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="telephone" label="手机号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="wxh" label="微信" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="adr" label="地址" align="center" show-overflow-tooltip></el-table-column>
          </el-table-column>


          <el-table-column prop="isexchange" label="是否兑奖" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.isexchange | capitalize(filterObj)}}
            </template>
          </el-table-column>
          <el-table-column prop="isset" label="是否发放奖品" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button v-if="!(list[scope.$index].type_id==3 || list[scope.$index].type_id==1) " @click="changePrize(scope.$index)" size="mini" type="primary">{{scope.row.isset===0?'否':'是'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column v-if="!(handle === 0)" align="center" label="操作">
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


        <!-- 分页 -->
        <el-pagination :current-page='nowSize' class="pagin" @current-change="toPagination" background :total="total" :page-size='pagesize'>
        </el-pagination>
        <!-- model -->
        <j-modelv v-if="model" @closeallModel='closeallModel' :name='name'>
            <div slot="models">
                <j-modify :menuModel='menuModel' :tableData='tableData' :diabled='diabled'></j-modify>
            </div>
        </j-modelv>
    </div>
</template>

<script>
import {
    getList,
    delWin,
    getall,
    setAward,
    setAwards
} from "./../../util/baseUrl.js";
import expex from "./../../util/expexcel.js";

import jModify from "./../utils/modify";
import jModelv from "./../utils/modelv";
import jTablev from "./../utils/tablev";
import jSitMap from "./../utils/sitMap";
export default {
    data() {
        return {
            activeName:'first',
            prizeName: "",
            titleName: {
                name: ["姓名",4],
                telephone:["手机号"],
                goods: ["奖品名称"],
                isexchange: ["是否兑奖", 1],
                isset: ["是否发放奖品", 3, [0, 1]]
            },
            menuModel: {
                user_id: ["用户ID", 0],
                name: ["姓名", 0],
                // img: ["用户头像", 2],
                goods: ["奖品名称", 0],
                logo: ["奖品图片", 2],
                type_name: [
                    "奖品类型",
                    5,
                    [
                        {
                            value: 1,
                            label: "积分"
                        },
                        {
                            value: 2,
                            label: "红包"
                        },
                        {
                            value: 3,
                            label: "优惠券"
                        },
                        {
                            value: 4,
                            label: "实物"
                        }
                    ]
                ],
                isexchange: [
                    "是否兑奖",
                    5,
                    [
                        {
                            value: "0",
                            label: "否"
                        },
                        {
                            value: "1",
                            label: "是"
                        }
                    ]
                ],
                isset: [
                    "是否发放奖品",
                    5,
                    [
                        {
                            value: 0,
                            label: "否"
                        },
                        {
                            value: 1,
                            label: "是"
                        }
                    ]
                ],
                telephone: ["兑奖人手机号", 0],
                adr: ["兑奖人地址", 0],
                time: ["申请兑奖时间", 1]
            },
            handle: 2,
            list: [],
            total: 0, //分页
            pagesize: 7, //x条/页
            pageNo: 1,
            nowSize:1,

            // model
            model: false,
            name: "查看中奖名单",
            diabled: true,
            tableData: {},
            filterObj:['否','是'],
            filterObj1:['积分','红包','优惠券','实物'],
        };
    },
    components: {
        jSitMap,
        jTablev,
        jModelv,
        jModify
    },
    mounted() {
        this.getInfo(1);
    },
    methods: {
        getInfo(res) {
            getList({
                page: this.nowSize,
                strip: this.pagesize
            }).then(res => {
                this.list = res.data.data.data;
                this.total = res.data.data.total;
            });
        },
        //导出
        exportExcel() {
            let exclist;
            getall().then(res => {
                exclist = res.data.data;
                for (let i = 0; i < exclist.length; i++) {
                    if (exclist[i].isexchange === "0") {
                        exclist[i].isexchange = "否";
                    } else {
                        exclist[i].isexchange = "是";
                    }
                    if (exclist[i].isset === 0) {
                        exclist[i].isset = "否";
                    } else {
                        exclist[i].isset = "是";
                    }
                    if (exclist[i].time) {
                        let date = new Date(exclist[i].time * 1000);
                        let Y = date.getFullYear();
                        let M =
                            date.getMonth() + 1 < 10
                                ? "0" + (date.getMonth() + 1)
                                : date.getMonth() + 1;
                        let D = date.getDate();
                        let h = date.getHours();
                        let m = date.getMinutes();
                        let s = date.getSeconds();
                        exclist[i].time =
                            Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
                    } else {
                        exclist[i].time = "";
                    }
                }

                let obj = {
                    thad: [
                        "用户ID",
                        "姓名",
                        "奖品名称",
                        "奖品类型",
                        "是否兑奖",
                        "是否发放",
                        "兑奖人地址",
                        "申请兑奖时间"
                    ],
                    tbody: [
                        "user_id",
                        "name",
                        "goods",
                        "type_name",
                        "isexchange",
                        "isset",
                        "adr",
                        "time"
                    ],
                    tlist: exclist,
                    title: "中奖人名单"
                };
                expex.exportExcel(obj);
            });

            // let obj = {
            // thad : ["用户id", "姓名", "奖品名称"],
            // tbody : ["user_id", "name", "goods"],
            // tlist : this.list,
            // title : '中奖人名单'
            // }
            // expex.exportExcel(obj)
        },
        //清空 搜索
        qk() {
            this.prizeName = "";
            this.value = "";
        },
        //查询
        selectSearch() {
            this.nowSize = 1;
            getList({ lookup: this.prizeName, strip: this.pagesize }).then(res => {
                this.list = res.data.data.data;
                this.total = res.data.data.total;
                // console.log(res)
            });
        },
        //分页
        toPagination(res) {
            this.nowSize = res;
            // this.pageNo = res;
            this.getInfo(res)
        },
        closeallModel() {
            this.model = !this.model;
            this.modelInfo = {};
        },
        modifys(req, res) {
            if (res === "wirte") {
                this.name = "修改中奖人信息";
                this.model = true;
                this.diabled = false;
                // let tab = this.list[req];
                this.tableData = JSON.parse(JSON.stringify(this.list[req]));
            } else if (res === "see") {
                this.name = "查看中奖人信息";
                this.tableData = JSON.parse(JSON.stringify(this.list[req]));

                if(this.tableData.time){
                    this.$set(this.tableData,'time',this.tableData.time+'000')
                }

                this.model = true;
                this.diabled = true;
                // console.log(this.tableData.time)
                // console.log(this.tableData)
            } else {
                var _this = this;
                _this
                    .$confirm("此操作将删除该优惠卷, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        delWin({
                            id: _this.list[req].id
                        }).then(del => {
                            if (del.data.msg === "删除成功") {
                                _this.$notify({
                                    title: "提示",
                                    duration: 1000,
                                    message: "删除成功",
                                    type: "success"
                                });
                                _this.getInfo(1);
                            }
                        });
                    })
                    .catch(err => {
                    });
            }
        },
        //修改发放奖品
        changePrize(res) {
            if (this.list[res].isset === 0) {
                setAward({
                    id: this.list[res].id
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
            } else {
                setAwards({
                    id: this.list[res].id
                })
                .then(res=>{
                    if(res.status === 200){
                        this.$notify({
                            title: "提示",
                            message: "修改成功",
                            type: "success"
                        });
                        this.getInfo();
                    }
                })
            }
            
        }
    },
    filters:{
      capitalize(val,arr){
        return arr[val];
      },
      prizeType(val,arr){
        return arr[val - 1];
      }
    }
};
</script>

<style scoped >
.serch {
    margin: 10px 0;
    float: left;
}
.prizeName {
    width: 220px;
}
.pagin {
    position: absolute;
    left: 10%;
    bottom: 10%;
}
i{
    cursor: pointer;
    margin:5px;
}
</style>
