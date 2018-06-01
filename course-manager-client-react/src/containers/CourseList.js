import React from 'react';
import CourseServiceClient from "../services/CourseServiceClient"
import CourseRow from "../components/CourseRow";
import CourseEditor from "./CourseEditor";

class CourseList extends React.Component {
    constructor() {
        super();
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
                console.log(courses);
                this.setState({courses: courses});
            });
    }

    renderCourseRows() {
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id} course={course}
                                      delete={this.deleteCourse}/>
                }
            )
        }

        return (
            courses
        )
    }

    titleChanged(event) {

        console.log("titleChanged")
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
    deleteCourse(courseId){
        console.log('delete ' + courseId);
        this.courseService
            .deleteCourse(courseId);

    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                    <tr>
                        <th><input onChange={this.titleChanged}
                                   className="form-control"
                                   id="titleFld"
                                   placeholder="cs101"/></th>
                        <th>
                            <button onClick={this.createCourse}
                                    className="btn btn-primary">Add

                            </button>
                        </th>
                    </tr>
                    <tr>
                        <td>{this.props.course.title}</td>
                        <td><button
                            onClick={() =>
                            {this.props.delete(this.props.course.id)}}>
                            Delete
                        </button>
                        </td>
                    </tr>


                    </thead>
                    <tbody>
                    {this.renderCourseRows()}


                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;