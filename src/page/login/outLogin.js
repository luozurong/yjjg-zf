import React, { Component } from 'react';
import {connect} from 'react-redux'


import {inLogin,setAccount,setToken} from '../../store/action-creators.js'
import {setCookie} from '../../common/js/common.js'

import login from './css/login.module.css'
import logout from '../../images/logout.png'

class OutLogin extends Component {
  render() {
    return (
      <div className={login.outLoginClass}>
        <img src={logout} alt="" onClick={this.outLogin.bind(this)}/> 
      </div>
    );
  }
  outLogin(){
    this.props.inLogin(false);
    this.props.setAccount('');
    this.props.setToken('');
    setCookie('isLogin','',false)
    setCookie('account','',null)
    setCookie('token','',null)
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    account: state.account,
    token: state.token
  }
}

export default connect(mapStateToProps, {
  inLogin,setAccount,setToken
})(OutLogin);
