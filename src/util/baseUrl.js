import { fetch } from './http'
import { ipurl } from './ipurl'

//==============================上传图片==========================
const upload = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Uploader/add',data,1);
}


//==============================奖品列表==========================
//获取奖品列表
const getPrize = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/prize/getPrize',data)
}
//添加奖品
const addprizes = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Prize/addPraize',data)
}
//奖品分页
const page = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/prize/getPrize',data)
}
//123等奖 + 搜索框
const search = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/prize/getItem',data)
}
//搜索框 + 搜索
const s_input = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/prize/vague',data)
}
//红包+积分+等类型查询
const getType = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/prize/getType',data)
}
//删除奖品列表
const deletePrize = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/prize/delPrize',data)
}
//修改奖品列表
const upDataprize = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/prize/upData',data)
}
//添加奖品
const addPrize = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/prize/add',data)
}
//upload
const uploadImg = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/upload/upload',data)
}

const add = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/upload/add',data)
}


//添加奖项
const addPN = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Prize/addPN',data)
}
//获取奖项
const getPN = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Prize/getPN',data)
}
//
//删除奖项
const delPN = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Prize/delPN',data)
}



//============================优惠券================================
//获取优惠券列表
const getTypes = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/getType',data)
}
//添加优惠券
const addType = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/addType',data)
}
//修改优惠券信息
const setType = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/setType',data)
}
//搜索优惠券getType
const yhqgetType = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/getType',data)
}
//添加单个CDK
const yhqaddCoupon = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/addCoupon',data)
}
//加载CDK
const yhqgetCoupon = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/getCoupon',data)
}
//删除CDK
const delCdk = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/delCdk',data)
}
//导入CDK
const addCoupons = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/addCoupons',data)
}
//查询优惠券名称  
const serchYhq = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/getPrize',data)
}
//查询是否 重复绑定 /getCouponPrize
const serchfu = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/getCouponPrize',data)
}
//删除优惠券
const delCoupon = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/delCoupon',data)
}




//==============================中奖名单===============================/Winning/delList
const getList = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Winning/getList',data)
}
//导出全部中奖人
const getall = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Winning/allList',data)
}
//删除中奖人
const delWin = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Winning/delList',data)
}
//修改发奖人 是否发奖
const setAward = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Winning/setAward',data)
}
const setAwards = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Winning/setAwards',data)
}


//============================活动设置======================================
//===========>活动状态
//获取红的状态
const getTime = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/getTime',data)
}
//开启活动  /Luckdraw/setTime
const setTime = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/setTime',data)
}
//关闭活动
const delTime = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/delTime',data)
}


//======>抽奖配置
const LuckdrawSetting = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/getActivity',data)
}
//添加 修改 抽奖配置
const addLuckdraw = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/Activity',data)
}

const addSetting = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/Activity',data)
}
//获取优惠方式
const getDiscount = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/getDiscount',data)
}
//添加优惠方式
const addDiscount = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/addDiscount',data)
}
//删除优惠方式
const delDiscount = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/delDiscount',data)
}



//=======>更多设置
//获取分享信息
const getShare = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/getShare',data)
}
//修改分享信息
const setShare = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/setShare',data)
}
//虚拟人数
const getMset = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/getMset',data)
}
//修改 虚拟人数
const setFictitious = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/setFictitious',data)
}





export {
    upload,
    getPrize,
    addprizes,
    deletePrize,
    uploadImg,
    addPN,
    delPN,
    getPN,
    addPrize,
    page,
    search,
    s_input,
    getType,
    upDataprize,
    add,
    getTypes,
    getList,
    delWin,
    getTime,
    setTime,
    delTime,
    getall,
    LuckdrawSetting,
    addLuckdraw,
    addSetting,
    getDiscount,
    addDiscount,
    delDiscount,
    addType,
    setType,
    yhqgetType,
    yhqaddCoupon,
    yhqgetCoupon,
    delCdk,
    addCoupons,
    serchYhq,
    serchfu,
    delCoupon,
    getShare,
    setShare,
    getMset,
    setFictitious,
    setAwards,
    setAward
}