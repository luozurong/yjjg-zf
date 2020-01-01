/**
 * 包含多个reducer函数的模块
 */
import {INLOGIN,ACCOUNT,TOKEN} from './action-type'
import {getCookie} from '../common/js/common'

const defaultState = {
    isLogin: getCookie('isLogin') ? Boolean(getCookie('isLogin')) : false,
    account: getCookie('account') ? getCookie('account') : '',
    token: getCookie('token') ? getCookie('token') : '_test',
}
 export default function counter(state = defaultState,action){
    switch(action.type){
        case INLOGIN: 
            return {...Object.assign(state,{
                isLogin: action.data
            })};
        case ACCOUNT: 
            return {...Object.assign(state,{
                account: action.data
            })};
        case TOKEN: 
            return {...Object.assign(state,{
                token: action.data
            })};
        default:
            return state
    }
 }