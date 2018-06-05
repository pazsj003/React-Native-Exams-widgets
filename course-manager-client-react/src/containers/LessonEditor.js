import React from 'react';
import LessonTabs from "./LessonTabs";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleServiceClient from "../services/ModuleServiceClient";
import LessonServiceClient from "../services/LessonServiceClient";
import TopicList from "./TopicList";

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Radium from 'radium';

class LessonEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.setCourseId =
            this.setCourseId.bind(this);
        this.setModuleId =
            this.setModuleId.bind(this);
        this.setLessonId =
            this.setLessonId.bind(this);

        this.lessonService = LessonServiceClient.instance;
        this.state = {
            courseId: '', moduleId: '',
            lessonId: '',
            title: '',
        };

    }


    setCourseId(courseId) {
        this.setState
        ({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState
        ({moduleId: moduleId});
    }

    setLessonId(LessonId) {
        this.setState
        ({lessonId: LessonId});

    }

    findLessonById(moduleId) {
        return this.moduleService
            .findModuleById(moduleId)

    }


    componentDidMount() {
        this.setCourseId(
            this.props.match.params.courseId);

        this.setModuleId(
            this.props.match.params.moduleId);
        this.setLessonId(
            this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps) {

        this.setLessonId(
            newProps.match.params.lessonId);
    }


    render() {
        return (

            <div>


                <div>

                    <TopicList courseId={this.state.courseId}
                               moduleId={this.state.moduleId}
                               lessonId={this.state.lessonId}
                    />

                </div>
            </div>


        )
    }


}

export default Radium(LessonEditor);