import axios from 'axios'

var  baseURL = '';

if(window.location.host.indexOf('ywgl.kinglian.cn') !== -1){
    baseURL = 'http://ywgl.kinglian.cn'; //正式平台 
}else{
    baseURL = 'http://yun-test.kinglian.net:9081'; //测试平台
}
//baseURL = 'http://192.168.52.57:8080';     //钟桂国

const service = axios.create({
    baseURL: baseURL,              //api的 base_url
    timeout: 100000                //请求超时时间
});

service.interceptors.request.use(config => {
    return config;
},error => {
    //return Rromise.reject(error)
});

service.interceptors.response.use(response => {
    return response.data;          //返回数据
},error => {
   // return Promise.reject(error)
})

export default service