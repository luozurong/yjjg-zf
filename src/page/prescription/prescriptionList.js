import React, {Component} from 'react'
import DocumentTitle from 'react-document-title'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import NavBar from '../commonComponent/navbar/NavBar.js'
import {getPrescriptionOrderList} from '../../common/js/resource'
import MoreData from '../commonComponent/moreData/moreData.js'

import btn_ic_more from '../../images/btn_ic_more@3x.png'

import list from './css/prescriptionList.module.css'
class PrescriptionList extends Component{
    constructor(props){
        super(props);
        this.jumpPrescriptionDetail = this.jumpPrescriptionDetail.bind(this);
        this.state = {
            drugStore: {},
            drugStoreList: [],
            moreDataWord: '点击加载更多',
            pageNum: 1
        }
    }
    componentDidMount(){
        this.getPrescriptionOrderListAjax();
    }

    jumpPrescriptionDetail(){
        this.props.history.push('/prescriptionDetail/1')
    }

    moreReturnFunc(){
        if(this.state.moreDataWord === '点击加载更多'){
            var pageNum = this.state.pageNum;
            this.setState({
                pageNum: pageNum + 1
            });

            this.getPrescriptionOrderListAjax();
        }
    }

    getPrescriptionOrderListAjax(){
        var param = {
            body: {
                drugstoreAccount: this.props.match.params.drugstoreAccount,
                pageSize: 10,
                pageNum: this.state.pageNum,
                start: '',
                end: ''
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        }
        getPrescriptionOrderList(param).then((res)=>{
            if(res.result === '0'){
                var drugStoreListValue = this.state.drugStoreList;
                drugStoreListValue = drugStoreListValue.concat(res.list);
                this.setState({
                    drugStore: res.drugStore,
                    drugStoreList:drugStoreListValue
                });

                if(res.list.length < 10){
                    this.setState({
                        moreDataWord: '没有更多了',
                    });
                }
            }
        })
    }
    render(){
        if(!this.props.isLogin){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <DocumentTitle title="药店处方列表"/>
                <NavBar navbarword="药店信息"/>
                <div className={list.container}>
                    <div>
                        <span>药店名称：</span>
                        <span>{this.state.drugStore.drugStoreName}</span>
                    </div>
                    <div>
                        <span>药店编码：</span>
                        <span>{this.state.drugStore.storeNo}</span>
                    </div>
                    <div>
                        <span>药店地址：</span>
                        <span>{this.state.drugStore.drugStoreAddress}</span>
                    </div>
                </div>
                <NavBar navbarword="处方列表"/>
                <div className={list.itemBg}>
                    <div>
                        {
                            this.state.drugStoreList.map((item,index) => {
                                return (
                                    <div key={index} className={list.item} onClick={this.jumpPrescriptionDetail}>
                                        <div className={list.messageItem}>
                                            <div className={list.messageLine}>
                                                <span>销售时间：</span>
                                                <div>{item.blTime}</div>
                                            </div>
                                            <div className={list.messageLine}>
                                                <span>医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师：</span>
                                                <div>{item.userName}</div>
                                            </div>
                                            <div className={list.messageLine}>
                                                <span>药&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师：</span>
                                                <div>{item.userName}</div>
                                            </div>
                                            <div className={list.messageLine}>
                                                <span>就 &nbsp;诊&nbsp;人：</span>
                                                <div>{item.userName}</div>
                                            </div>
                                            <div className={list.messageLine}>
                                                <span>诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                                                <div>2019022702369</div>
                                            </div>
                                            <div className={list.messageLine}>
                                                <span>药品信息：</span>
                                                <div>
                                                    { 
                                                        item.prescriptionDrugList.map((aa,i)=>{
                                                            return (
                                                                <div key={i}>
                                                                    <span>{aa.drugName}</span>
                                                                    <span className={list.messageLineNum}>{aa.count}{aa.countUnit}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <img className={list.pic} src={btn_ic_more} alt=""/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                 <MoreData moreReturn={this.moreReturnFunc.bind(this,this.state.currentIndex)} moreDataWord={this.state.moreDataWord}/>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        isLogin: state.isLogin,
        token: state.token,
    }
}
export default connect(mapStateToProps,{})(PrescriptionList);