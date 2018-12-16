import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//存数据
const state = {
  navList : [
    ['数据统计','/homepage/gettime','el-icon-document'],

    ['中奖名单','/homepage/rolllist','el-icon-tickets'],

    ['奖品管理','/homepage/addprize','el-icon-goods'],

    ['活动设置','/homepage/addmodify','el-icon-setting'],

    // [['奖品管理','el-icon-goods'],['奖品','/homepage/prize'],['优惠券','/homepage/coupon']],

    // [['活动设置','el-icon-setting'],['活动状态','/homepage/start'],['抽奖配置','/homepage/prizesetting']],

  ]
}
//mutation修改数据
const mutations = {


}

const actions = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
