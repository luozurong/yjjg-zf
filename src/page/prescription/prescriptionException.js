import React,{Component} from 'react'
import DocumentTitle from 'react-document-title'
import wx from 'weixin-js-sdk'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Toast} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

import {inLogin} from '../../store/action-creators'
import MoreData from '../commonComponent/moreData/moreData.js'
import {inputBlur} from '../../common/js/common.js'
import {getSicknessWarnList,getContrabandWarnList,getViolationWarnList,updateWarnServlet} from '../../common/js/resource'

import ex from './css/prescriptionException.module.css'

import btn_ic_more from '../../images/btn_ic_more@3x.png'
import sbtn_icon from '../../images/sbtn_icon.png'

import OutLogin from '../login/outLogin'


class PrescriptionException extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchValue: '',
            tabAttr: [
                {name:'疾病预警药店',i: 0, pageNum: 1},
                {name:'特殊预警药店',i: 1, pageNum: 1},
                {name:'疑似异常药店',i: 2, pageNum: 1}
            ],
            currentIndex: sessionStorage.getItem('currentIndex') ? sessionStorage.getItem('currentIndex') : 0,
            searchPageNum: 1,
            searchShow: false,
            isSearchFlag: false,
            sicknessWarnListList: [],
            getContrabandWarnList: [],
            getViolationWarnList: [],
            searchList: [],
            moreDataWord0: '点击加载更多',
            moreDataWord1: '点击加载更多',
            moreDataWord2: '点击加载更多',
            searchHideFlag: false
            
        }

        this.JumpPrescriptionList = this.JumpPrescriptionList.bind(this);
    }

    componentDidMount(){
        this.getSicknessWarnListAjax(this.state.tabAttr[0].pageNum,'',0);
        this.getContrabandWarnListAjax(this.state.tabAttr[1].pageNum,'',0);
        this.getViolationWarnListAjax(this.state.tabAttr[2].pageNum,'',0);
    }

    //选择tab
    chooseTabIndex(index){
        this.setState({
            currentIndex:index
        });
        sessionStorage.setItem('currentIndex',index);
    }

    //跳转到异常列表
    JumpPrescriptionList(drugstoreAccount){
        this.props.history.push('prescriptionList/' + drugstoreAccount)
    }

    //显示搜索
    searchShowFlag(){
        try {
            this.scrollTop = document.scrollingElement.scrollTop;
        } catch(e) {
            this.scrollTop = document.documentElement.scrollTop;
        }
        document.body.style.top = -(this.scrollTop) + "px";
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        this.setState({
            searchShow: true
        });
    }

    //隐藏搜索
    cancelButton(){
        this.setState({
            searchValue: '',
            searchList: [],
            searchShow: false
        });
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
        try {
            document.scrollingElement.scrollTop = this.scrollTop;
        } catch(e) {
            document.documentElement.scrollTop = this.scrollTop;
        }
    }

    //搜索文字输入
    searchChange(e){
        var searchValueString = e.target.value;
        this.setState({
            searchValue: searchValueString
        })
    }

    //点击搜索
    searchBotton(){
        this.setState({
            searchList: [],
            searchPageNum: 1,
            isSearchFlag: true
        });
        if(Number(this.state.currentIndex) === 0){
            this.getSicknessWarnListAjax(1,this.state.searchValue,1);          
        }
        if(Number(this.state.currentIndex) === 1){          
            this.getContrabandWarnListAjax(1,this.state.searchValue,1);        
        }
        if(Number(this.state.currentIndex) === 2){          
            this.getViolationWarnListAjax(1,this.state.searchValue,1);
        }
    }
    //搜索点击加载更多
    searchClickMore(){
        if(this.state.searchShow === false) return false;
        if(Number(this.state.currentIndex) === 0){
            this.getSicknessWarnListAjax(this.state.searchPageNum,this.state.searchValue,1);
        }
        if(Number(this.state.currentIndex) === 1){
            this.getContrabandWarnListAjax(this.state.searchPageNum,this.state.searchValue,1);
        }
        if(Number(this.state.currentIndex) === 2){
            this.getViolationWarnListAjax(this.state.searchPageNum,this.state.searchValue,1);
        }
       
    }
    //ios12搜索兼容
    inputOnBlur(){
        inputBlur();
    }

    //处理异常
    conductClick(index,id,e){
        e.stopPropagation();
        this.updateWarnServletAjax(index,id);
      
    }

    //点击加载更多
    moreReturnFunc(index){
        if(Number(index) === 0 &&  this.state.moreDataWord0 === '点击加载更多'){
            var pageNum0 = this.state.tabAttr[0].pageNum + 1;
            const tabAttrValue = this.state.tabAttr;
            tabAttrValue[0].pageNum = pageNum0;
            this.setState({
                tabAttr: tabAttrValue
            })
            this.getSicknessWarnListAjax(this.state.tabAttr[0].pageNum,'',0);
        }

        if(Number(index) === 1 &&  this.state.moreDataWord1 === '点击加载更多'){
            var pageNum1 = this.state.tabAttr[1].pageNum + 1;
            const tabAttrValue = this.state.tabAttr;
            tabAttrValue[1].pageNum = pageNum1;
            this.setState({
                tabAttr: tabAttrValue
            })
            this.getContrabandWarnListAjax(this.state.tabAttr[1].pageNum,'',0);
        }

        if(Number(index) === 2 &&  this.state.moreDataWord2 === '点击加载更多'){
            var pageNum2 = this.state.tabAttr[2].pageNum + 1;
            const tabAttrValue = this.state.tabAttr;
            tabAttrValue[2].pageNum = pageNum2;
            this.setState({
                tabAttr: tabAttrValue
            })
            this.getViolationWarnListAjax(this.state.tabAttr[2].pageNum,'',0);
        }
     
    }

    //扫一扫
    scanFunc(){
        wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1, 
            scanType: ["qrCode","barCode"],
            success: function (res) {
                console.log(res);
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    
    getSicknessWarnListAjax(pageNum,drugstoreName,search){
        var params = {
            body: {
                drugstoreAccount: this.props.account,
                drugstoreName: drugstoreName,
                search: search,
                pageSize: 10,
                pageNum: pageNum
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        }
        getSicknessWarnList(params).then((res) => {
            if(res.result === '0'){
                if(!this.state.isSearchFlag){
                    var sicknessWarnListListValue = this.state.sicknessWarnListList;
                    sicknessWarnListListValue = sicknessWarnListListValue.concat(res.list)
                    this.setState({
                        sicknessWarnListList: sicknessWarnListListValue
                    });
                    if(res.list.length < 10){
                        this.setState({
                            moreDataWord0: '没有更多了'
                        })
                    }
                }else{
                    this.setState({
                        searchHideFlag: res.list.length === 10 ? true : false
                    })

                    var searchListValue = this.state.searchList;
                    searchListValue = searchListValue.concat(res.list);
                    var searchPageNumValue = this.state.searchPageNum;
                    searchPageNumValue += 1;
                    this.setState({
                        searchList: searchListValue,
                        searchPageNum: searchPageNumValue
                    })

                    if(searchListValue.length === 0){
                        Toast.info("暂无该药店的疾病预警",2);
                    }
                }
            }
        })
    }

    getContrabandWarnListAjax(pageNum,drugstoreName,search){
        var params = {
            body: {
                drugstoreAccount: this.props.account,
                drugstoreName: drugstoreName,
                search: search,
                pageSize: 10,
                pageNum: pageNum
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        }
        getContrabandWarnList(params).then((res) => {
            if(res.result === '0'){
                if(!this.state.isSearchFlag){
                    var getContrabandWarnListValue = this.state.getContrabandWarnList;
                    getContrabandWarnListValue = getContrabandWarnListValue.concat(res.list)
                    this.setState({
                        getContrabandWarnList: getContrabandWarnListValue
                    });
                    if(res.list.length < 10){
                        this.setState({
                            moreDataWord1: '没有更多了'
                        })
                    }
                }else{
                    this.setState({
                        searchHideFlag: res.list.length === 10 ? true : false
                    })

                    var searchListValue = this.state.searchList;
                    searchListValue = searchListValue.concat(res.list);
                    var searchPageNumValue = this.state.searchPageNum;
                    searchPageNumValue += 1;
                    this.setState({
                        searchList: searchListValue,
                        searchPageNum: searchPageNumValue
                    })

                    if(searchListValue.length === 0){
                        Toast.info("暂无该药店的特殊预警",2);
                    }
                }              
            }
        })
    }
    getViolationWarnListAjax(pageNum,drugstoreName,search){
        var params = {
            body: {
                drugstoreAccount: this.props.account,
                drugstoreName: drugstoreName,
                search: search,
                pageSize: 10,
                pageNum: pageNum
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        }
        getViolationWarnList(params).then((res) => {
            if(res.result === '0'){
                if(!this.state.isSearchFlag){
                    var getViolationWarnListValue = this.state.getViolationWarnList;
                    getViolationWarnListValue = getViolationWarnListValue.concat(res.list)
                    this.setState({
                        getViolationWarnList: getViolationWarnListValue
                    });
                    if(res.list.length < 10){
                        this.setState({
                            moreDataWord2: '没有更多了'
                        })
                    }
                }else{
                    this.setState({
                        searchHideFlag: res.list.length === 10 ? true : false
                    })

                    var searchListValue = this.state.searchList;
                    searchListValue = searchListValue.concat(res.list);
                    var searchPageNumValue = this.state.searchPageNum;
                    searchPageNumValue += 1;
                    this.setState({
                        searchList: searchListValue,
                        searchPageNum: searchPageNumValue
                    })
                    if(searchListValue.length === 0){
                        Toast.info("暂无该药店的违规预警",2);
                    }
                }  
            }
        })
    }

    //异常处理
    updateWarnServletAjax(index,id){
        var params = {
            body: {
                id: id,
                type: this.state.currentIndex
            },
            header: {
                token: this.props.token,
                time_stamp: new Date().getTime()
            }
        }

        updateWarnServlet(params).then((res) => {
            if(res.result === '0'){
                var getViolationWarnListValue = this.state.getViolationWarnList;
                var getContrabandWarnListValue = this.state.getContrabandWarnList;
                getViolationWarnListValue[index].status = 1;
                getContrabandWarnListValue[index].status = 1;
               this.setState({
                    getViolationWarnList: getViolationWarnListValue,
                    getContrabandWarnList: getContrabandWarnListValue
               });
            }
        })
    }

    render(){
        if(!this.props.isLogin){
            return <Redirect to="/login"/>
        } 
        return (
            <div>
                <DocumentTitle title="预警药店列表"/>
                <div className={ex.tab}>
                    {this.state.tabAttr.map((item,index) => {
                        var active = '';
                        Number(this.state.currentIndex) === index ? active = 'active' : active = '';
                        return (
                            <div key={index} 
                                className={active === 'active' ? ex.active : ''} 
                                onClick={this.chooseTabIndex.bind(this,index)}>
                                <span>{item.name}</span>
                                <i></i>
                            </div>
                        )
                    })}
                </div>   
                <div className={ex.exceptionTop}></div>             
                <div className={ex.exceptionWrap}>
                    {(()=>{
                        if(Number(this.state.currentIndex) === 0){
                            return (
                                <div>
                                    {
                                    this.state.sicknessWarnListList.map((item,index) => {
                                        return (
                                            <div key={index} className={ex.exceptionContainer}>
                                                <div className={ex.exceptionItem} onClick={this.JumpPrescriptionList.bind(this,item.drugstoreAccount)}>
                                                    <div>
                                                        <div>
                                                            <span>销售日期：</span>
                                                            <span>{item.blTime}</span>
                                                        </div>
                                                        <div>
                                                            <span>药店名称：</span>
                                                            <span>{item.drugstoreName}</span>
                                                        </div>
                                                        <div>
                                                            <span>药店编码：</span>
                                                            <span>{item.storeNo}</span>
                                                        </div>
                                                        <div>
                                                            <span>药店地址：</span>
                                                            <span>{item.storeAddress}</span>
                                                        </div>
                                                        <div>
                                                            <span>药品名称：</span>
                                                            <span>{(()=>{
                                                                var drugName = [];
                                                                for(var i = 0; i < item.prescriptionDrugList.length; i++){
                                                                    drugName.push(item.prescriptionDrugList[i].drugName);
                                                                }
                                                                return <span>{drugName.toString()}</span>;
                                                            })()}</span>
                                                        </div>
                                                        <div>
                                                            <span>疾病名称：</span>
                                                            <span>{item.diagnoseDetail}</span>
                                                        </div>
                                                        <div>
                                                            <span>诊断数量：</span>
                                                            <span className={ex.exceptionItemNum}>{item.orderNum}</span>
                                                        </div>
                                                    </div>
                                                    <img src={btn_ic_more} alt="" />
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                    <MoreData moreReturn={this.moreReturnFunc.bind(this,this.state.currentIndex)} moreDataWord={this.state.moreDataWord0}/>
                                </div>
                            )
                        }else if(Number(this.state.currentIndex) === 1){
                            return (
                                <div>
                                    {this.state.getContrabandWarnList.map((item,index) => {
                                        return (
                                            <div key={index} className={ex.exceptionContainer}>
                                                <div className={ex.exceptionItem}  onClick={this.JumpPrescriptionList.bind(this,item.drugstoreAccount)}>
                                                    <div>
                                                        <div>
                                                            <span>销售日期：</span>
                                                            <span>{item.blTime}</span>
                                                        </div>
                                                        <div>
                                                            <span>药店名称：</span>
                                                            <span>{item.drugstoreName}</span>
                                                        </div>
                                                        <div>
                                                            <span>药店编码：</span>
                                                            <span>{item.storeNo}</span>
                                                        </div>
                                                        <div>
                                                            <span>药店地址：</span>
                                                            <span>{item.storeAddress}</span>
                                                        </div>
                                                        <div>
                                                            <span>药品名称：</span>
                                                            <span>{item.drugName}</span>
                                                        </div>
                                                        <div>
                                                            <span>销售数量：</span>
                                                            <span className={ex.exceptionItemNum}>{item.orderNum}</span>
                                                        </div>
                                                        {
                                                            (()=>{
                                                                if(Number(item.status) === 0){
                                                                    return (
                                                                        <div>
                                                                            <span>异常处理状态：</span>
                                                                            <span className={ex.exceptionItemNum}>未处理</span>
                                                                            <span className={ex.exceptionItemChu}>
                                                                                <span onClick={this.conductClick.bind(this,index,item.id)}>处理</span>
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return (
                                                                        <div>
                                                                            <span>异常处理状态：</span>
                                                                            <span>已处理</span>
                                                                            
                                                                        </div>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                        
                                                    </div>
                                                    <img src={btn_ic_more} alt="" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <MoreData moreReturn={this.moreReturnFunc.bind(this,this.state.currentIndex)} moreDataWord={this.state.moreDataWord1}/>
                                </div>
                            )
                        }else{
                            return (
                                <div>
                                    <div className={ex.exceptionContainer}>
                                    {
                                        this.state.getViolationWarnList.map((item,index) => {
                                            return (
                                                <div  key={index} className={ex.exceptionItem}  onClick={this.JumpPrescriptionList.bind(this,item.drugstoreAccount)}>
                                                    <div>
                                                        <div>
                                                            <span>药店名称：</span>
                                                            <span>{item.drugstoreName}</span>
                                                        </div>
                                                        <div>
                                                            <span>药店编码：</span>
                                                            <span>{item.storeNo}</span>
                                                        </div>
                                                        <div>
                                                            <span>药店地址：</span>
                                                            <span>{item.storeAddress}</span>
                                                        </div>
                                                        <div>
                                                            <span>处方数量统计：</span>
                                                            <span className={ex.exceptionItemNum}>{item.orderNum}</span>
                                                        </div>
                                                        {
                                                            (()=>{
                                                                if(Number(item.status) === 0){
                                                                    return (
                                                                        <div>
                                                                            <span>异常处理状态：</span>
                                                                            <span className={ex.exceptionItemNum}>未处理</span>
                                                                            <span className={ex.exceptionItemChu}>
                                                                                <span onClick={this.conductClick.bind(this,index,item.id)}>处理</span>
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return (
                                                                        <div>
                                                                            <span>异常处理状态：</span>
                                                                            <span>已处理</span>
                                                                            
                                                                        </div>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </div>
                                                    <img src={btn_ic_more} alt="" />
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                    <MoreData moreReturn={this.moreReturnFunc.bind(this,this.state.currentIndex)} moreDataWord={this.state.moreDataWord2}/>
                                </div>
                            )
                        }
                    })()}
                </div>
                <div className={ex.druHeight}></div>
                {(()=>{
                    return (
                        <div className={ex.exceptionWechatFixed}>
                            <div onClick={this.searchShowFlag.bind(this)}>
                                <img src={sbtn_icon} alt=""/>
                                <span>搜索药店</span>
                            </div>
                        </div>
                    )
                })()}
               
                {(()=>{
                    if(this.state.searchShow){
                        return (
                            <div className={ex.exceptionsearchfixedbg}>
                                <div className={ex.exceptionsearchfixed}>
                                    <div className={ex.exceptionsearch}>
                                        <input type="text" 
                                            onBlur={this.inputOnBlur.bind(this)} 
                                            onChange={this.searchChange.bind(this)} 
                                            value={this.state.searchValue} 
                                            placeholder="请输入药店名称"/>
                                        <span onClick={ ()=>this.searchBotton()}>搜索</span>
                                    </div>
                                    <div className={ex.exceptionsearchwrap}>
                                        {
                                            this.state.searchList.map((item,index)=>{
                                                return (
                                                    <div key={index} className={ex.exceptionsearchwrapitem} onClick={this.JumpPrescriptionList.bind(this,item.drugstoreAccount)}>
                                                        <div>
                                                            <div className={ex.exceptionsearchname}>{item.drugstoreName}</div>
                                                            <div className={ex.exceptionsearchaddr}>{item.storeAddress}</div>
                                                        </div>
                                                        <img className={ex.exceptionsearchpic} src={btn_ic_more} alt=""/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {(()=>{
                                        if(this.state.searchHideFlag){
                                            return  <div className={ex.searchMore} onClick={this.searchClickMore.bind(this)}>点击加载更多</div>
                                        }
                                    })()
                                    }
                                    <div className={ex.exceptionsearchcanncel} onClick={() => this.cancelButton()}>取消</div>
                                </div> 
                            </div>
                        )
                    }
                })()}
                <OutLogin/>
            </div>
        )
    }
}
const mapStateToProps = (state)=> {
    return {
        isLogin: state.isLogin,
        account: state.account,
        token: state.token
    }
}
export default connect(mapStateToProps,{
    inLogin
})(PrescriptionException)