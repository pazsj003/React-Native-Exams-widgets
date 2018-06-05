import React from 'react';
import CourseServiceClient from "../services/CourseServiceClient"
import CourseRow from "../components/CourseRow";
import CourseEditor from "./CourseEditor";
import ModuleList from "./ModuleList"
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Switch} from 'react-router'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Radium from 'radium';

const Course_API_URL = 'https://course-manager-react-sijiazhu.herokuapp.com/courses';

class CourseList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {tittle: ''},


            courses: [
                {title: 'Couese 1 - jQuery', id: 123},
                {title: 'Couese 2 - React', id: 234},
            ]
        };

        this.courseService = CourseServiceClient.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);


    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {

                this.setState({courses: courses});
            });
    }

    renderCourseRows() {
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map(
                (course) => {
                    return <CourseRow key={course.id}
                                      course={course}
                                      title={course.title}
                                      delete={this.deleteCourse}/>
                });
        }

        return (
            courses
        )
    }

    titleChanged(event) {


        this.setState({
            course: {title: event.target.value}
        });

    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });


    }

    deleteCourse(courseId) {

        this.courseService
            .deleteCourse(courseId)
            .then(() => {
                this.findAllCourses();
            });

    }

    render() {
        return (

            <Switch>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                        <img src="https://cdn3.iconfinder.com/data/icons/education-3-5/48/108-64.png"
                             className="img-rounded"/>
                        <div>
                            <a className="navbar-brand " style={styles.courseTittle} href="#">Course Manager</a>

                        </div>
                        <div className="navbar-brand " id="navbarNav" style={styles.position}>
                            <ul className="navbar-nav">

                                <li className="nav-item ">
                                    <a className="nav-link" href={Course_API_URL}>Courses <span
                                        className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Sources</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Blackboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#">Log In</a>
                                </li>


                            </ul>

                        </div>
                    </nav>
                    <div>
                        <Route exact path="/course/:courseId"
                               component={CourseEditor}>
                        </Route>

                    </div>

                    <table className="table ">


                        <ul className="nav nav-tabs ">
                            <li>
                                <th>Title</th>
                            </li>
                            <li style={{paddingLeft: '447px'}}>

                                <form className="form-inline float-right ">
                                    <th><input onChange={this.titleChanged}
                                               className="form-control "
                                               id="titleFld"
                                               placeholder="cs101"/></th>
                                    <th>
                                        <button onClick={this.createCourse}
                                                className="btn btn-outline-success my-2 my-sm-0">Add

                                        </button>

                                    </th>
                                </form>

                            </li>
                        </ul>


                        <div>

                            <tbody>
                            {this.renderCourseRows()}
                            </tbody>

                        </div>

                    </table>


                </div>


            </Switch>


        )
    }
}

const styles = {
    tab: {
        float: 'left',
        // border: '1px solid #ccc',
        // paddingRight: '100px',
        position: 'relative',
        backgroundColor: '#f1f1f1',
        width: '700px',
        height: '50px',


        /* Style the buttons inside the tab */
        ':button': {
            display: 'block',
            backgroundColor: 'inherit',
            color: 'black',
            padding: '0px 10px',
            // width: '100%',
            // border: 'none',
            // outline: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            transition: ' 0.3s',
            fontSize: '17px',
        },

        /* Change background color of buttons on hover */
        ':hover': {
            backgroundColor: '#ddd',
        },

        /* Create an active/current "tab button" class */
        ':active': {
            backgroundColor: '#ccc',
        },
        ':link': {
            display: 'block',
            backgroundColor: 'inherit',
            color: 'black',
            padding: '0px 10px',
            // width: '100%',
            // border: 'none',
            // outline: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            transition: ' 0.3s',
            fontSize: '17px',
        }

    },
    courseTittle: {
        color: 'black',
        width: '50px',
        height: '50px',
        fontSize: '30px',
        fontFamily: 'Lucida Console',
    },


    position: {

        paddingLeft: '200px',
    },

    naviationText: {

        fontSize: '30px',

    }


}

export default Radium(CourseList);