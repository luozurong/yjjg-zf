import React, {Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
const MyLoadingComponent = ({ isLoading, error }) => {
  if(isLoading) {
    return <div></div>;
  }
};

const AsyncLogin = Loadable({
  loader: () => import('./page/login/login.js'),
  loading: MyLoadingComponent
});
const AsyncPrescriptionException = Loadable({
  loader: () => import('./page/prescription/prescriptionException.js'),
  loading: MyLoadingComponent
});
const AsyncPrescriptionList = Loadable({
  loader: () => import('./page/prescription/prescriptionList.js'),
  loading: MyLoadingComponent
});
const AsyncPrescriptionDetail = Loadable({
  loader: () => import('./page/prescription/prescriptionDetail.js'),
  loading: MyLoadingComponent
});

class App extends Component {
  render(){
    return (
      <div className="App">
        <BrowserRouter basename="dsasH5">
          <Switch>
            <Route path='/' exact component={AsyncPrescriptionException}></Route>
            <Route path='/login' exact component={AsyncLogin}></Route>
            <Route path='/prescriptionList/:drugstoreAccount' exact component={AsyncPrescriptionList}></Route>
            <Route path='/prescriptionDetail/:orderNo' exact component={AsyncPrescriptionDetail}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
