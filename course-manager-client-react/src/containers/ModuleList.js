import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import LessonTabs from './LessonTabs';
import ModuleServiceClient from '../services/ModuleServiceClient';
import ModuleEditor from './ModuleEditor';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',


            module: {title: '',id:''},
            modules: [
                {title: 'Module 1 - jQuery', id: 123},
                {title: 'Module 2 - React', id: 234},
                {title: 'Module 3 - Redux', id: 345},
                {title: 'Module 4 - Angular', id: 456},
                {title: 'Module 5 - Node.js', id: 567},
                {title: 'Module 6 - MongoDB', id: 678},]
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);


        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);

        this.moduleService = ModuleServiceClient.instance;

    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);

    }

    setModules(modules) {
        this.setState({modules: modules})
    }


    titleChanged(event) {

        this.setState({module: {title: event.target.value}});

    }

    createModule() {
        this.moduleService
            .createModule(
                this.state.courseId,
                this.state.module)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId);
            })
        ;

    }

    deleteModule(moduleId) {


        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });


    }

    renderListOfModules() {
        let modules = this.state.modules
            .map((module) => {
                return <ModuleListItem
                    courseId={this.props.courseId}
                    title={module.title}
                    key={module.id}
                    delete={this.deleteModule}
                    module={module}

                />
            });
        return <ul>{modules}</ul>;
    }


    render() {
        return (
            <Router>
            <div className="row">



                <div className="col-3">

                <div >
                    <input className="form-control"
                           onChange={this.titleChanged}
                           placeholder="title"/>
                    <button onClick={this.createModule}
                            className="btn btn-primary btn-block">
                        <i className="fa fa-plus"></i>
                    </button>

                    <ul className="list-group-item">
                        {this.renderListOfModules()}
                    </ul>
                </div>
                    </div>
                <div className="col-8">
                    <div >
                        <Route path="/course/:courseId/module/:moduleId"
                               component={ModuleEditor}/>

                    </div>
                {/*<LessonTabs courseId={this.state.courseId}*/}
                            {/*moduleId ={this.state.module.id}*/}
                {/*/>*/}

                </div>




            </div>
    </Router>
        )

    }
}

export default ModuleList;