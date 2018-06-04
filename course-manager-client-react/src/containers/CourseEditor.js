import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import ModuleEditor from "./ModuleEditor";
import CourseServiceClient from "../services/CourseServiceClient";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Radium from 'radium';

const Course_API_URL = 'http://localhost:3000/courses';

class CourseEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.courseService = CourseServiceClient.instance;
        this.state = {
            courseId: '',
            title: '',

        }


    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
        this.renderCourse(courseId);
    }

    // selectCourseTitle(course) {
    //     this.setState({tittle: course.tittle});
    // }

    findCourseById(courseId) {
        return this.courseService
            .findCourseById(courseId)

    }

    renderCourse(courseId) {
        this.findCourseById(courseId).then((course) => {
            this.setState({title: course.title});
        });

    }

    componentDidMount() {
        this.selectCourse
        (this.props.match.params.courseId);
        // this.selectCourseTitle(this.props.match.params.course);

    }

    componentWillReceiveProps(newProps) {
        this.selectCourse
        (newProps.match.params.courseId);
        // this.selectCoursetitle(newProps.match.params.course);
    }

    render() {


        return (


            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                    <img src="https://cdn3.iconfinder.com/data/icons/education-3-5/48/108-64.png" className="img-rounded"/>
                    <div>
                        <a className="navbar-brand "  style={styles.courseTittle} href="#">{this.state.title}</a>

                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav" style={styles.position}>
                        <ul className="navbar-nav">

                            <li className="nav-item active">
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
                            {/*<form className="form-inline">*/}
                                {/*<input className="form-control mr-sm-2" type="search" placeholder="Search"*/}
                                       {/*aria-label="Search"/>*/}
                                {/*<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search*/}
                                {/*</button>*/}
                            {/*</form>*/}

                        </ul>

                    </div>
                </nav>




                <ModuleList courseId={this.state.courseId}/>

            </div>

        );
    }
}


const styles = {
    courseTittle: {
        color: 'black',
        width: '50px',
        height: '50px',
        fontSize: '30px',
        fontFamily: 'Lucida Console',
    },


    position: {

        paddingLeft: '100px',
    },

    naviationText: {

        fontSize: '30px',

    }


}

export default Radium(CourseEditor);