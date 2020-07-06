import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from "./store.js";

import App from './App'
import TokenRefresher from './components/TokenRefresher/index.js';


import './styles/main.scss';

ReactDOM.render(
    <Provider store={store}>
        <TokenRefresher />
        <App />
    </Provider>,
    document.getElementById('root')
)