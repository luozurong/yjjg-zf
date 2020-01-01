import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import './common/css/reset.css'
import './common/js/fontSize'

import store from './store'

import App from './App'; 

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));