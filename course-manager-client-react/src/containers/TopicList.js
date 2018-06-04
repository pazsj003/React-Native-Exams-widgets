import React from 'react'
import TopicServiceClient from "../services/TopicServiceClient";
import TopicListItem from '../components/TopicListItem';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleEditor from "./ModuleEditor";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Radium from 'radium';
class TopicList
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: {tittle: '', id: ''},
            moduleId: '',
            courseId: '',
            lessonId:'',
            topics: [
                {title: 'Topics 1', id: 123},
                {title: 'Topics 2 ', id: 234},
                {title: 'Topics 3', id: 345},
                {title: 'Topics 4 ', id: 456},
                {title: 'Topics 5', id: 567},
                {title: 'Topics 6 ', id: 678},]
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.CreateTopic = this.CreateTopic.bind(this);

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);

        this.deleteTopic = this.deleteTopic.bind(this);

        this.topicService = TopicServiceClient.instance;

    }

    setTopics(topics) {
        this.setState({topics: topics})
    }

    CreateTopic() {
        this.topicService
            .CreateTopics(

                this.state.lessonId,
                this.state.topic)
            .then(() => {
                this.findAllTopicsForLesson
                (this.state.lessonId);
            });

    }

    deleteTopic(TopicsId) {


        this.topicService
            .deleteTopic(TopicsId)
            .then(() => {
                this.findAllTopicsForLesson
                (this.state.LessonId)
            });


    }

    componentDidMount() {

        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        // if(this.props.courseId!=newProps.courseId){
        //     this.setCourseId(newProps.courseId);
        // }
        // if(this.props.moduleId!=newProps.moduleId){
        //     this.setModuleId(newProps.moduleId);
        // }
        if(this.props.lessonId!=newProps.lessonId){
            this.setLessonId(newProps.lessonId);
            this.findAllTopicsForLesson(newProps.lessonId);
        }



    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(ModuleId) {
        this.setState({moduleId: ModuleId});
    }
    setLessonId(LessonId) {
        this.setState({lessonId:LessonId});
    }


    titleChanged(event) {
        console.log(event.target.value);
        this.setState({topic: {title: event.target.value}});


    }

    findAllTopicsForLesson(lessonId) {
        this.topicService
            .findAllTopicsForLesson(lessonId)
            .then((Topics) => {
                this.setTopics(Topics)
            });
    }

    renderListOfTopics() {
        let Topics = this.state.topics
            .map((topic) => {
                    return <TopicListItem
                    moduleId={this.state.moduleId}
                    title={topic.title}
                    key={topic.id}
                    courseId={this.props.courseId}
                    lessonId={this.props.lessonId}
                    delete={this.deleteTopic}
                    topic={topic}

                />
            });

        return <ul className="nav nav-tabs">{Topics}</ul>;
    }

    render() {
        return (
            <div>


                <ul className="nav nav-tabs">
                    {this.renderListOfTopics()}
                    <div>
                        <form className="form-inline">
                        <input onChange={this.titleChanged}

                               className="form-control mr-sm-2"
                               id="titleFld"
                               placeholder="Topic"/>

                        <button onClick={this.CreateTopic}
                                className="btn btn-outline-success my-2 my-sm-0" >Add

                        </button>

</form>
                    </div>

                </ul>

            </div>

        );
    }
}
export default Radium(TopicList);