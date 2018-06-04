import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import LessonTabs from './LessonTabs';
import ModuleServiceClient from '../services/ModuleServiceClient';
import ModuleEditor from './ModuleEditor';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Switch } from 'react-router'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Radium from 'radium';


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
        this.ModuleTitleChanged = this.ModuleTitleChanged.bind(this);
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
        if(this.props.courseId!=newProps.courseId){
            this.setCourseId(newProps.courseId);
            this.findAllModulesForCourse(newProps.courseId);
        }


    }

    setModules(modules) {
        this.setState({modules: modules})
    }


    ModuleTitleChanged(event) {

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
        return modules;
    }


    render() {
        return (
            <Switch>

            <div className="row">

                <div className="col-lg-2">

                <div >

                    <ul style={styles.listGroupItem}>
                        {this.renderListOfModules()}
                    </ul>

                    {/*<input className="form-control"*/}
                           {/*onChange={this.ModuleTitleChanged}*/}
                           {/*placeholder="title"/>*/}
                    {/*<button onClick={this.createModule}*/}
                            {/*className="btn btn-primary btn-block">*/}
                        {/*<i className="fa fa-plus"></i>*/}
                    {/*</button>*/}

                    <form className="form-inline.form-control">

                        <input className="form-control mr-sm-2"
                               onChange={this.ModuleTitleChanged}
                               placeholder="course"
                               aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0 "
                                onClick={this.createModule}
                                type="submit">Add
                        </button>



                    </form>


                </div>
                    </div>

                <div className="col-10">
                    <div >
                        <Route path="/course/:courseId/module/:moduleId"
                               component={ModuleEditor}/>

                    </div>
                {/*<LessonTabs courseId={this.state.courseId}*/}
                            {/*moduleId ={this.state.module.id}*/}
                {/*/>*/}

                </div>




            </div>
    </Switch>
        )

    }
}
const styles = {
    /* Style the tab */
    tab : {
        float: 'left',
        // border: '1px solid #ccc',
        backgroundColor: '#f1f1f1',
        width: '100px',
        height: '50px',


        /* Style the buttons inside the tab */
        ':button': {
            display: 'block',
            backgroundColor: 'inherit',
            color: 'black',
            padding: '22px 16px',
            width: '100%',
            border: 'none',
            outline: 'none',
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
        ':link':{
            color:'#000000',
        }

    },
    /* Style the tab content */
    tabContent :{
        float: 'left',
        // padding: '0px 12px',
        border: '1px solid #ccc',
        width: '100px',
        borderLeft: 'none',
        height: '50px',
    },

    listGroupItem :{
    position: 'relative',
    display: 'block',
    padding: '0rem 1rem',
    marginBottom: '0.8 px',
    backgroundColor: '#fff',
    border: '1 px solid rgba(0, 0, 0, 0.125)',
},
    btnOutlineSuccess : {
        color: '#28a745',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        borderColor: '#28a745',


        ':hover': {
            color: '#fff',
            backgroundColor: '#28a745',
            borderColor: '#28a745',
        },
    },

}

export default Radium(ModuleList);