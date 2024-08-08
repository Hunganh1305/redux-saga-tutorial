import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";
import reducer from "./reducer";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const sagaMiddleware = createSagaMiddleware();

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://rem.dbwebb.se/api';

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
