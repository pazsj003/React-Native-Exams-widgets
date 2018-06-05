import React, {Component} from 'react'

import CourseCard from '../components/CourseCard'
import ModuleList from './ModuleList'
import ModuleEditor from './ModuleEditor'
import LessonTabs from './LessonTabs'
import CourseEditor from './CourseEditor'
import CourseList from './CourseList'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Radium from 'radium';

class CourseManger extends Component {

    render() {
        return (
            <Router>
                <div className="container-fluid">

                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>


                </div>

            </Router>
        )

    }
}

export default Radium(CourseManger);