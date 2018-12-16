<template>
  <div class="start">
    <!-- <div>
            <j-sit-map :mapArr='mapArr'></j-sit-map>
    </div>-->
    <!-- 开启活动选项卡 -->
    <!-- <div class="swichParent">
            <el-select :disabled='status===1?true:false' class="swichK" v-model="value" placeholder="请选择活动开启方式">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
    </div>-->
    <!-- <div class="flPri">
            <div class="openTitle">抽奖开启时段:</div>
            <el-time-picker :disabled='status===1?true:false' class='w200' value-format='HHmmss' is-range v-model="value4" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
            </el-time-picker>
    </div>-->
    <!-- 当前活动状态 -->
    <div class="swichTile">当前活动状态
      <span class="redtext">{{status===1?'正在进行中...':'已关闭'}}</span>
    </div>
    <!-- <div v-if="status === 1">当前启动方式:{{options[value].label}}</div>
    <div v-if="status === 0">当前启动方式:未启动</div>-->
    <!-- 自动开启 按钮 -->
    <!-- <div class="handParent" v-if="value === '0'"> -->
    <div class="handParent">
      <div class="flPri">
        <!-- <div class="openTitle">抽奖开启时段:</div> -->
        抽奖时间段
        <el-time-picker
          :disabled="status===1?true:false"
          class="w400"
          value-format="HHmmss"
          is-range
          v-model="value4"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
      <div>活动时间段
        <el-date-picker
          class="w400"
          :disabled="status===1?true:false"
          v-model="autoTime"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
        <!-- {{value13}} -->
        <!-- {{autoTime}} -->
        <!-- <el-date-picker
          :disabled="status===1?true:false"
          class="handSwich"
          v-model="autoTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始活动日期"
          end-placeholder="结束活动日期"
          value-format="timestamp"
        ></el-date-picker> -->
      </div>
      <div class="btnSwich" v-if="status==0">
        <el-tooltip content="仅允许一种启动方式" placement="bottom" effect="light">
          <el-button @click="handStart" type="primary">确认启动</el-button>
        </el-tooltip>
      </div>
      <!-- <div class="btnSwich"> -->
      <div class="btnSwich" v-if="status==1">
        <el-tooltip content="仅允许一种启动方式" placement="bottom" effect="light">
          <el-button @click="closeHand" type="danger">强制结束</el-button>
        </el-tooltip>
      </div>
    </div>
    <!-- 手动点击开始 -->
    <!-- <div class="openSwich" v-if="value === '1'">
            <el-switch class="handSwich" v-model="handValue" active-text="启动" inactive-text="关闭">
            </el-switch>
            <div class="btnSwich">
                <el-tooltip content="仅允许一种开启方式" placement="bottom" effect="light">
                    <el-button @click="openHand" type="primary">确认</el-button>
                </el-tooltip>
            </div>
    </div>-->
  </div>
</template>

<script>
import { getTime, setTime, delTime } from "./../../util/baseUrl.js";

import jTablev from "./../utils/tablev";
import jSitMap from "./../utils/sitMap";
export default {
  data() {
    return {
      mapArr: ["活动设置", "活动状态"],
      options: [
        {
          value: "0",
          label: "自动控制"
        },
        {
          value: "1",
          label: "手动控制"
        }
      ],
      value: "0",
      autoTime: [], //自动开启时间
      value4: "",
      isAuto: false, //自动控制按钮
      handValue: false, //手动开关按钮
      status: "", //判断活动是否开启
      id: "", //活动ID
      value13:''
    };
  },
  mounted() {
    //加载页面数据
    getTime().then(res => {
      if (res.data.data === 0) {
        return;
      }
      this.id = res.data.data[0].id;
      this.status = res.data.data[0].status;
      this.handValue = res.data.data[0].status == 0 ? false : true;
      this.autoTime = [
        res.data.data[0].start_time * 1000,
        res.data.data[0].end_time * 1000
      ];
      this.value = res.data.data[0].pattern;
      this.value4 = [
        res.data.data[0].lottery_open,
        res.data.data[0].lottery_end
      ];
    });
  },
  components: {
    jSitMap
  },
  methods: {
    //自动启动 开启按钮
    handStart() {
      let obj = {
        start_time: String(this.autoTime[0] / 1000),
        end_time: String(this.autoTime[1] / 1000),
        pattern: this.options[this.value].value,
        lottery_open: this.value4[0],
        lottery_end: this.value4[1],
        status: 1
      };
      this.sWich(obj);
    },
    //自动启动 关闭按钮
    closeHand() {
      delTime({
        id: this.id
      }).then(res => {
        this.status = res.data.data;
        if (res.status === 200) {
          this.$notify({
            title: "提示",
            message: "活动关闭成功",
            type: "success"
          });
        }
      });
    },
    //手动 开关
    openHand() {
      if (this.handValue === true && this.status === 0) {
        let obj = {
          start_time: "",
          end_time: "",
          pattern: this.options[this.value].value,
          lottery_open: this.value4[0],
          lottery_end: this.value4[1],
          status: 1
        };
        this.sWich(obj);
      }
      if (this.handValue === false && this.status === 1) {
        delTime({
          id: this.id
        }).then(res => {
          if (res.status === 200) {
            this.status = res.data.data;
            this.$notify({
              title: "提示",
              message: "活动关闭成功",
              type: "success"
            });
          }
        });
      }
    },
    //开启方法
    sWich(res) {
      setTime({
        id: this.id,
        data: res
      })
        .then(res => {
          if (res.status === 200) {
            this.$notify({
              title: "提示",
              message: "活动启动成功",
              type: "success"
            });
            this.status = res.data.data;
          }
        })
        .catch(err => {
          this.$notify.info({
            title: "提示",
            message: "活动开启失败"
          });
        });
    }
  }
};
</script>

<style scoped >
.swichParent,
.handParent {
  margin-top: 150px;
  overflow: hidden;
}
.swichK {
  width: 217px;
  float: left;
  margin: 25px 0 0 15px;
}
.swichTile {
  height: 40px;
  font-size: 30px;
  margin-top: 20px;
}
.flPri {
  margin-bottom: 20px;
  /* text-align: left; */
  /* padding-left: 13px; */
}
.openTitle {
  margin-bottom: 10px;
}
.redtext {
  color: #f67e7e;
}
.handSwich {
  margin: 0 0 0 0;
}
.btnSwich {
  margin-top: 50px;
}
.w200 {
  /* margin-top: 15px; */
  width: 217px;
}
.w400 {
  width: 400px;
}
</style>
