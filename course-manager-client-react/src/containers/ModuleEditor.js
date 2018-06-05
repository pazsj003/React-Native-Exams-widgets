import React from 'react';
import LessonTabs from "./LessonTabs";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleServiceClient from "../services/ModuleServiceClient";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Radium from 'radium';

class ModuleEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.setCourseId =
            this.setCourseId.bind(this);
        this.setModuleId =
            this.setModuleId.bind(this);
        this.moduleService = ModuleServiceClient.instance;
        this.state = {
            courseId: '', moduleId: '',
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
        this.renderModule(moduleId);
    }

    findModuleById(moduleId) {
        return this.moduleService
            .findModuleById(moduleId)

    }

    renderModule(moduleId) {
        this.findModuleById(moduleId).then((module) => {
            this.setState({title: module.title});
        });

    }


    componentDidMount() {
        this.setCourseId(
            this.props.match.params.courseId);

        this.setModuleId(
            this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps) {

        this.setModuleId(
            newProps.match.params.moduleId);
        // }
    }


    render() {
        return (

            <div>


                <nav style={{fontSize: '20px', backgroundColor: '#f1f1f1'}}> {this.state.title}</nav>
                <LessonTabs courseId={this.state.courseId}
                            moduleId={this.state.moduleId}
                />


            </div>


        )
    }


}

export default Radium(ModuleEditor);