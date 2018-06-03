import React from 'react';

import {Link,Route} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import ModuleEditor from "../containers/ModuleEditor";
import '../../node_modules/font-awesome/css/font-awesome.min.css';
export default class LessonListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div >



                <Link   className="nav-link active" to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.Lesson.id}`}>
                    <div>
                    <li className="nav-item">
                        {this.props.Lesson.title}
                    </li>
                        </div>
                </Link>


                {/*<span  className="float-right">*/}
                {/*<i className="fa fa-close" onClick={() => {*/}
                    {/*this.props.delete*/}
                    {/*(this.props.module.id)*/}
                {/*}}></i>*/}
                {/*<i className="fa fa-pencil"></i>*/}
                  {/*</span>*/}





            </div>
        );
    }
}
