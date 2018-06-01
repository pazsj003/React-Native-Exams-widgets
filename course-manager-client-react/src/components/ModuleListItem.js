import React from 'react';

import { Link } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
export default class ModuleListItem
    extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                    {this.props.module.title}
                </Link>

                <span className="float-right">
                <i className="fa fa-trash" onClick={() =>
                {this.props.delete
                (this.props.module.id)}}></i>
                <i className="fa fa-pencil"></i>
                  </span>
                <button onClick={() =>
                {this.props.delete
                (this.props.module.id)}}>
                    DELETE</button>

            </li>
        );
    }
}
