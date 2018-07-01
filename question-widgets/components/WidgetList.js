import React, {Component} from 'react'
import ExamServiceClient from "../Services/ExamServiceClient";
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
            moduleId: 1
        }
        this.titleChanged = this.titleChanged.bind(this);
        this.CreateExam = this.CreateExam.bind(this);
        this.setTopicId = this.setTopicId.bind(this);
        this.examService = ExamServiceClient.instance;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        console.log("topic ID " + topicId)
        this.setState({
            topicId: topicId,

        })

        fetch("http://localhost:8080/api/topic/" + topicId + "/exam")
            .then(response => (response.json()))
            .then(exams => this.setState({exams}));
        console.log("widgets didmount" + this.state.exams)
    }

    componentWillReceiveProps(newProps) {

        if (this.props.topicId !== newProps.topicId) {
            this.setTopicId(newProps.topicId);
            this.props.findAllExamsForTopic(newProps.topicId);
        }


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

    findAllWidgetsForTopic(topicId) {
        this.examService
            .findAllExamsForTopic(topicId)
            .then((widgets) => {
                this.setWidgets(widgets)
            });
        console.log("widgets find from topic" + this.state.widgets)
    }

    setExams(exams) {
        this.setState({exams: exams})
    }

    setWidgets(widgets) {
        this.setState({widgets: widgets})
    }

    render() {
        console.log("widgets console" + this.state.exam.title)

        return (
            <ScrollView>
                <FixedHeader/>

                <View style={{padding: 15}}>

                    {this.state.exams.map(
                        (exam, index) => (
                            <ListItem
                                onPress={() => this.props.navigation
                                    .navigate("ExamWidget", {examId: exam.id})}
                                key={index}
                                // subtitle={widget.description}
                                title={exam.title}/>))}


                    {/*<Button title="Add Exam"*/}
                    {/*onPress={() => this.props.navigation*/}
                    {/*.navigate('Exam') } />*/}


                    <View>
                        <FormLabel>Exam Title</FormLabel>

                        <FormInput
                            onChangeText={(text) => this.setState({exam: {title: text}})}

                        />

                        <FormValidationMessage>
                            Title is required
                        </FormValidationMessage>

                        <Button title="Add Exam"
                                onPress={this.CreateExam}/>
                    </View>

                    <View>
                        <FormLabel>Assignment Title</FormLabel>

                        <FormInput
                            onChangeText={(text) => this.setState({assignment: {title: text}})}

                        />

                        <FormValidationMessage>
                            Title is required
                        </FormValidationMessage>

                        <Button title="Add Assignment"
                                onPress={this.CreateAssignment}/>
                    </View>




                </View>
            </ScrollView>
        )
    }
}

export default WidgetList