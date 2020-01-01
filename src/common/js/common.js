import wx from 'weixin-js-sdk'

import {wxGzhAuth} from './resource'

export const setCookie = function(name, value, Days){
    if(Days <= 0) Days = 7;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ encodeURI (value) + ";expires=" + exp.toGMTString()+";path=/";
}

export const getCookie = function(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++){
      var c = ca[i].trim();
      if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "";
}
//微信环境
export const isWechat = function(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) === 'micromessenger'){
        console.log(ua.match(/MicroMessenger/i));
        return true;
    }
    return false;
}

//判断是否是ios
export const isIos = function(){
    const u = navigator.userAgent;
    return u.indexOf("iPhone") > -1 || u.indexOf("Mac OS") > -1;
}

//input焦点失效（ios12）
export const inputBlur = function() {
    var scrollTop = 0;
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        setTimeout(function() {
            try {
                scrollTop = document.scrollingElement.scrollTop;
            } catch(e) {
                scrollTop = document.documentElement.scrollTop;
            }
            scrollTop = Number(scrollTop) + 1;
            window.scrollTo(0, scrollTop)
        }, 10)
    }
}

var wxUrl = '';
var entryTemp = window.entryUrl;
if (typeof (entryTemp) === 'undefined' || entryTemp === '') {
    entryTemp = window.location.href.split('#')[0]
    wxUrl = entryTemp;
}
export const wxConfig = function(){
    var signatureUrl = ''
    if(isIos()){
        signatureUrl = wxUrl;
    }else{
        signatureUrl = window.location.href
    }
    var params = {
        body: {
            signatureUrl: signatureUrl
        },
        header: {
            token: '_test',
            time_stamp: new Date().getTime()
        }
    }
    wxGzhAuth(params).then((res)=>{
        if(res.result === '0'){
            wx.config({
                debug: false, 
                appId: res.appid, 
                timestamp: res.timestamp,
                nonceStr: res.noncestr,
                signature: res.signature,
                jsApiList: ['scanQRCode'] 
            });
            wx.ready(function(){
                
            });
        }
    })
}