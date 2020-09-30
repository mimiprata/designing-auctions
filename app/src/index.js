import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from "./App";
import store from "./redux/store";

import './index.css';

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/api/';

axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});


render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root')
);
