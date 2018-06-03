import React from 'react'
import LessonServiceClient from "../services/LessonServiceClient";
import LessonListItem from '../components/LessonListItem';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleEditor from "./ModuleEditor";

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Lesson: {tittle: '', id: ''},
            moduleId: '',
            courseId: '',

            Lessons: [
                {title: 'Lesson 1', id: 123},
                {title: 'Lesson 2 ', id: 234},
                {title: 'Lesson 3', id: 345},
                {title: 'Lesson 4 ', id: 456},
                {title: 'Lesson 5', id: 567},
                {title: 'Lesson 6 ', id: 678},]
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.CreateLesson = this.CreateLesson.bind(this);

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);

        this.lessonService = LessonServiceClient.instance;

    }

    setLessons(lessons) {
        this.setState({Lessons: lessons})
    }

    CreateLesson() {
        this.lessonService
            .createLesson(
                this.state.moduleId,
                this.state.Lesson)
            .then(() => {
                this.findAllLessonForModule
                (this.state.moduleId);
            });

    }

    deleteLesson(LessonId) {


        this.lessonService
            .deleteLesson(LessonId)
            .then(() => {
                this.findAllLessonForModule
                (this.state.moduleId)
            });


    }

    componentDidMount() {

        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);


    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(ModuleId) {
        this.setState({moduleId: ModuleId});
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({Lesson: {title: event.target.value}});


    }

    findAllLessonForModule(moduleId) {
        this.lessonService
            .findAllLessonssForModule(moduleId)
            .then((Lessons) => {
                this.setLessons(Lessons)
            });
    }

    renderListOfLessons() {
        let Lessons = this.state.Lessons
            .map((Lesson) => {
                return <LessonListItem
                    moduleId={this.state.moduleId}
                    title={Lesson.title}
                    key={Lesson.id}
                    courseId={this.props.courseId}
                    delete={this.deleteModule}
                    Lesson={Lesson}

                />
            });

        return <ul className="nav nav-tabs">{Lessons}</ul>;
    }

    render() {
        return (
            <div>
                <div>
                    <input onChange={this.titleChanged}
                               className="form-control"
                               id="titleFld"
                               placeholder="Lesson one"/>

                        <button onClick={this.CreateLesson}
                                className="btn btn-primary">Add

                        </button>



                </div>

                <ul className="nav nav-tabs">
                    {this.renderListOfLessons()}



                </ul>
            </div>

        );
    }
}
