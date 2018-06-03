import React, {Component} from 'react'

import CourseCard from '../components/CourseCard'
import ModuleList from './ModuleList'
import ModuleEditor from './ModuleEditor'
import LessonTabs from './LessonTabs'
import CourseEditor from './CourseEditor'
import CourseList from './CourseList'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'

class CourseManger extends Component {

    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <Link className="navbar-brand" to={`/courses/`}>
                        Course Manger
                    {/*<h3>Course Manger</h3>*/}
                    </Link>
                        </nav>
                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                    <Route  path="/course/:courseId"
                                    component={CourseEditor}>
                </Route>
                    {/*<Route path="/course/:courseId/module"*/}
                           {/*component={ModuleList}>*/}
                    {/*</Route>*/}

                    {/*<Route path="/course/:courseId/module/:moduleId"*/}
                           {/*component={ModuleEditor}>*/}
                    {/*</Route>*/}
                    {/*<Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"*/}
                           {/*component={LessonTabs}>*/}
                    {/*</Route>*/}

                </div>

            </Router>
        )

    }
}

export default CourseManger;