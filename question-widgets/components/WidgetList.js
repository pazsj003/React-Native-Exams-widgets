import React, {Component} from 'react'
import ExamServiceClient from "../Services/ExamServiceClient";
import AssignmentServiceClient from"../Services/AssignmentServiceClient"

import {View, Alert, TextInput, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import {Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import FixedHeader from '../elements/FixedHeader'
import ExamWidget from '../elements/ExamWidget'
class WidgetList extends Component {
    static navigationOptions = {title: 'Assignment and Exam'}

    constructor(props) {
        super(props)
        this.state = {
            exam: {title: '', id: ''},
            widgets: [],
            exams: [{title: '', id: ''}],
            widgetId: 1,
            topicId: 1,
            courseId: 1,
            moduleId: 1,
            assignments:[]
        }
        this.titleChanged = this.titleChanged.bind(this);
        this.CreateExam = this.CreateExam.bind(this);
        this.setTopicId = this.setTopicId.bind(this);
        this.refresh=this.refresh.bind(this);
        this.examService = ExamServiceClient.instance;
        this.Assignmentservice=AssignmentServiceClient.instance;
    }

    componentDidMount() {
        console.log("this is did mount ");
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        console.log("topic ID " + topicId)
        this.setState({
            topicId: topicId,

        })
        this.findAllWidgetsForTopic(topicId);
        console.log("didmount assignment" + this.state.assignments)




    }

    componentWillReceiveProps(newProps) {
        console.log("this is will receove mount ");
        if (this.props.topicId !== newProps.topicId) {
            this.setTopicId(newProps.topicId);
            this.props.findAllExamsForTopic(newProps.topicId);
            this.findAllWidgetsForTopic(newProps.topicId);
        }


    }

    findAllWidgetsForTopic(topicId){
        this.Assignmentservice
            .findAllAssignmentsForTopic(topicId)
            .then((Assignments)=>{
                this.setAssignments(Assignments)});

        this.examService
            .findAllExamsForTopic(topicId)
            .then((exams)=>{
                this.setExams(exams)
            })


        }



    setAssignments(Assignments){
        console.log("setAssignment" )
        this.setState({assignments:Assignments})
    }

    setTopicId(TopicId) {
        this.setState({topicId: TopicId});
    }

    CreateExam() {
        console.log("title is " + this.state.exam.title)
        console.log("topicID is " + this.state.topicId)
        console.log("exam is " + this.state.exam)

        this.examService.CreateExams(
            this.state.topicId,
            this.state.exam)
            .then(() => {
                this.findAllWidgetsForTopic
                (this.state.topicId)
            });
        console.log("create end")


    }


    CreateAssignment() {
        console.log("title is " + this.state.exam.title)
        console.log("topicID is " + this.state.topicId)
        console.log("exam is " + this.state.exam)

        this.examService.CreateExams(
            this.state.topicId,
            this.state.exam)
            .then(() => {
                this.findAllWidgetsForTopic
                (this.state.topicId)
            });
        console.log("create end")


    }

    titleChanged(event) {
        console.log(event.nativeEvent.text);
        this.setState({exam: {title: event.nativeEvent.text}});


    }


    setExams(exams) {
        this.setState({exams: exams})
    }

    setWidgets(widgets) {
        this.setState({widgets: widgets})
    }
    refresh(){
        this.componentDidMount();
        // console.log("this is refresh ");
        // const {navigation} = this.props;
        // console.log("this is navigation ");
        // const topicId = navigation.getParam("topicId")
        // console.log("topic ID " + topicId)
        // this.setState({
        //     topicId: topicId,
        //
        // })
        // console.log("this is topicId in refresh ");
        // this.Assignmentservice.findAllAssignmentsForTopic(topicId)
        //     .then(assignments=>this.setAssignments(assignments));
        //
        // this.examService.findAllExamsForTopic(topicId)
        //     .then(exams=>this.setExams(exams));


    }



    render() {
        console.log("widgets console" + this.state.exam.title)
        console.log("assignment reder console" + this.state.assignments)
        console.log("topicId"+this.state.topicId)
        let {navigation} =this.props;

        return (
            <ScrollView>
                <FixedHeader/>

                <View style={{padding: 15}}>

                    {this.state.exams.map(
                        (exam, index) => (
                            <ListItem
                                onPress={() => this.props.navigation
                                    .navigate("ExamWidget",
                                        {
                                            topicId: this.state.topicId,
                                            exam: exam,
                                            refresh:this.refresh,


                                        })}
                                key={index}
                                subtitle={"Quiz"}
                                leftIcon={{name: 'list'}}
                                title={exam.title}/>))}



                    {this.state.assignments.map(
                        (assignment, index) => (
                            <ListItem
                                onPress={() => this.props.navigation
                                    .navigate("AssignmentItemList", {
                                        topicId: this.state.topicId,
                                        assignment: assignment,
                                        refresh:this.refresh,
                                    })}
                                key={index}
                                subtitle={"Assignment"}
                                leftIcon={{name: 'code'}}
                                title={assignment.title}



                            />))}



                    <View>

                        <Button title="Add Exam"
                                onPress={() => this.props.navigation
                                    .navigate("ExamEditor",
                                        {topicId: this.state.topicId,
                                            refresh:this.refresh

                                        })}/>

                    </View>

                    <View>


                        <Button title="Add Assignment"
                                onPress={() => this.props.navigation
                            .navigate("AssignmentWidget",
                                {topicId: this.state.topicId,
                                    refresh:this.refresh

                                })}/>
                    </View>




                </View>
            </ScrollView>
        )
    }
}

export default WidgetList