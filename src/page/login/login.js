import React,{Component} from 'react'
import DocumentTitle from 'react-document-title'
import {connect} from 'react-redux'
import {Toast} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

import logo from '../../images/logo.png'
import user_icon from '../../images/user_icon.png'
import password_icon from '../../images/password_icon.png'

import login from './css/login.module.css'

import {inLogin,setAccount,setToken} from '../../store/action-creators'
import {userLogin} from '../../common/js/resource'
import {setCookie} from '../../common/js/common.js'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            account:'',
            password: ''
        }
    }
    render(){
        return (
            <div className={login.containner}>
                <DocumentTitle title="登录"/>
                <div className={login.logoPic}>
                    <img src={logo} alt=""/>
                </div>
                <div className={login.loginItem}>
                    <img src={user_icon} alt=""/>
                    <input type="text" onChange={this.accountChange.bind(this)}  placeholder="请输入登录账号"/>
                </div>
                <div  className={login.loginItem}>
                    <img src={password_icon} alt=""/>
                    <input type="password" onChange={this.passwordChange.bind(this)}  placeholder="请输入登录密码"/>
                </div>
                <div onClick={this.loginSubmit.bind(this)}  className={login.loginSubmit}>登录</div>
            </div>
        )
    }

    accountChange(e){
        var accountValue = e.target.value;
        this.setState({
            account: accountValue
        })
    }

    passwordChange(e){
        var passwordValue = e.target.value;
        this.setState({
            password: passwordValue
        })
    }

    loginSubmit(){
        if(this.state.username === '') {
            Toast.info('请输入用户名', 1);
            return false;
        }
        if(this.state.password === '') {
            Toast.info('请输入用户密码', 1);
            return false;
        }
        this.userLoginAjax();   
    }

    userLoginAjax(){
        var params = {
            body: {
                account: this.state.account,
                password: this.state.password,
                loginType: '1'

            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        }
        userLogin(params).then((res)=>{
            console.log(res);
            if(res.code === '0'){
                this.props.inLogin(true);
                this.props.setAccount(res.account);
                this.props.setToken(res.token);
                setCookie('isLogin',true,1);
                setCookie('account',res.account,1);
                setCookie('token',res.token,1);
                this.props.history.push('/')
            }else{
                Toast.info(res.reason,1)
            }
        })
    }
}
const mapStateToProps = (state)=>{
    return {
        isLogin: state.isLogin,
        token: state.token
    }
}
export default connect(mapStateToProps,{
    inLogin,setAccount,setToken 
})(Login)