import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import leftbar from '@/components/utils/tabbar'

//首页
import homepage from '@/components/homepage/homepage'

//奖品管理
import prize from '@/components/prize/prize'    //奖品
import coupon from '@/components/prize/coupon'  //优惠券

//活动控制
import start from '@/components/activity/start'

//奖品配置
import prizesetting from '@/components/activity/prizesetting'

//购买 积分 其他 设置
import gettime from '@/components/activity/gettime'

//中奖人名单
import rolllist from '@/components/rolllist/roll'
import cs from '@/components/jc'

//add改动  奖品管理
import addprize from '@/components/prize/addprize'

//addg改动抽奖配置
import addmodify from '@/components/activity/addmodify'

//add 奖项
import addjx from '@/components/prize/addjx'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homepage,
      children:[
        {
          path:'/',
          component: gettime
        }
      ]
    },
    {
      path: '/homepage',
      component: homepage,
      children:[
        // 奖品管理
        {
          path:'/',
          component: gettime
        },
        {
          path:'prize',
          component: prize
        },
        {
          path:'coupon',
          component: coupon
        },

        // 活动控制
        {
          path:'start',
          component: start
        },
        // 奖品配置
        {
          path:'prizesetting',
          component: prizesetting
        },
        //购买 积分 其他 设置
        {
          path:'gettime',
          component: gettime
        },
        //中将人名单
        {
          path:'rolllist',
          component: rolllist
        },


        //改动抽奖配置
        {
          path:'addprize',
          component:addprize,
          children:[
            {
              path:'/',
              component:prize
            },{
              path:'prize',
              component:prize
            },{
              path:'coupon',
              component:coupon
            },{
              path:'addjx',
              component:addjx
            }
          ]
        },
        {
          path:'addmodify',
          component:addmodify,
          children:[
            {
              path:'/',
              component:start
            },{
              path:'start',
              component:start
            },{
              path:'prizesetting',
              component:prizesetting
            }
          ]
        }
      ]
    },
    
  ]
})
