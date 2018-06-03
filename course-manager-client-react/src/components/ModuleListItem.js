import React from 'react';

import {Link,Route} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import ModuleEditor from "../containers/ModuleEditor";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

        <div className="row">

            <div >

                <Link  className="navbar-brand"  to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    <li className="nav-item">
                        {this.props.module.title}
                    </li>

                </Link>


                <span  className="float-right">
                <i className="fa fa-close" onClick={() => {
                    this.props.delete
                    (this.props.module.id)
                }}></i>
                <i className="fa fa-pencil"></i>
                  </span>



</div>

            </div>
        );
    }
}
