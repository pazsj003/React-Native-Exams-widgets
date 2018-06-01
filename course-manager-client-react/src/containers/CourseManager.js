import React, {Component} from 'react'

import CourseCard from '../components/CourseCard'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import CourseEditor from './CourseEditor'
import CourseList from './CourseList'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class CourseManger extends Component {

    render() {
        return (
            <Router>
                <div className="container-fluid">

                    <h1>Course Manger</h1>
                    {/*<CourseList/>*/}

                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>

                </div>

                {/*<Route path="/examples"*/}
                {/*component={CourseList}>*/}

                {/*<div>*/}
                {/*<div className="card-deck">*/}
                {/*<CourseCard/>*/}
                {/*<CourseCard/>*/}
                {/*<CourseCard/>*/}
                {/*<CourseCard/>*/}
                {/*</div>*/}
                {/*<CourseEditor/>*/}
                {/*<br/>*/}
                {/*<LessonTabs/>*/}
                {/*<ModuleList/>*/}

                {/*</div>*/}
                {/*</Route>*/}
                {/*</div>*/}
            </Router>
        )

    }
}

export default CourseManger;