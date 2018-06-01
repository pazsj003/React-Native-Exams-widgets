import React from 'react'
import ReactDOM from 'react-dom'

import CourseManger from './containers/CourseManger'
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import  ModuleList2 from "./containers/ModuleList2.js";
import App from "./example/App";

ReactDOM.render(


    <div className="container-fluid">
        <CourseManger/>
        {/*<ModuleList2/>*/}
        {/*<App/>*/}

    </div>,
    document.getElementById('root')
);
