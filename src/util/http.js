import axios from 'axios'

import qs from 'qs'

import { Message,Loading,MessageBox,Notification  } from 'element-ui'
let loading
// function startLoading() {
//  loading = Loading.service({
//   lock: true,
//   text: '加载中……',
//   background: 'rgba(0, 0, 0, 0.7)'
//  })
// }
// function endLoading() {
//     loading.close()
// }
// function notify(){
//     Notification.error({
//         title: '提示',
//         message: '请求超时...'
//       });
// }

axios.defaults.timeout = 5000;
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
  });

  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
  
    return response;
  }, function (error) {
    // 对响应错误做点什么
    // endLoading()
    Message({
        showClose: true,
        message: '请求超时',
        type: 'error'
    })
    return Promise.reject(error);
  });



const fetch = (method,url,data,sum)=>{
    let obj;
    if(sum){
        obj = {
            method: method,
            url: url,
            data: data,
            params: data
        }
    } else{
        obj = {
                method: method,
                url: url,
                data: qs.stringify(data),
                params: qs.stringify(data)
            }
    }

   

    if(!data){
        delete obj.data;
        delete obj.params;
    } else if(method === 'get'){
        delete obj.data
    } else {
        delete obj.params
    }
    
    return new Promise( (resolve,reject)=>{
        axios(obj)
        .then( res =>{
            if(res.status === 200 && res.statusText === "OK"){
                resolve(res)
            }
        })
        .catch( err =>{
            reject(err)
            console.log(err)
        })
    })
}

export {
    fetch
}