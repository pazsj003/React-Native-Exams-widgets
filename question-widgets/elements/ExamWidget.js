import React, {Component} from 'react'
import {View,ScrollView,ListView} from 'react-native'
import {ListItem, Text} from 'react-native-elements'
import {Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}  from 'react-native-elements'
import QuestionTypeButtonGroupChooser from './QuestionTypeButtonGroupChooser'
import {connect} from 'react-redux'
import * as actions from "../actions"
import ExamContainer from './Exam'
// const questions = [
//     {	title: 'Question 1', subtitle: 'Multiple choice',
//         icon: 'list'},
//     {	title: 'Question 2', subtitle: 'Fill-in the blanks',
//         icon: 'code'},
//     {	title: 'Question 3', subtitle: 'True or false',
//         icon: 'check'},
//     {	title: 'Question 4', subtitle: 'Essay',
//         icon: 'subject'}]

export default  class ExamWidget extends Component {

    static navigationOptions = {title: 'Questions'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: 1
        }
        this.props.findAllQuestionsForExam(this.props.examId),
        this.setExamId=this.setExamId.bind(this)
    }
    componentDidMount() {
        // const examId=this.setExamId(this.props.examId);
        // const {navigation} = this.props;
        //         // const examId = navigation.getParam("examId")

        // fetch("http://localhost:8080/api/exam/"+examId+"/question")
        //     .then(response => (response.json()))
        //     .then(questions => this.setState({questions}))

        this.setExamId(this.props.examId);
    }

    setExamId(ExamId) {
        this.setState({examId: ExamId});
    }

    render() {
        console.log("question"+this.state.questions)
        return(
            <View style={{padding: 15}}>
                {/*{this.state.questions.map(*/}
                    {/*(question, index) => (*/}
                        {/*<ListItem*/}
                            {/*onPress={() => {*/}
                                {/*if(question.type === "TrueFalse")*/}
                                    {/*this.props.navigation*/}
                                        {/*.navigate("TrueFalseQuestionEditor", {questionId: question.id})*/}
                                {/*if(question.type === "MultipleChoice")*/}
                                    {/*this.props.navigation*/}
                                        {/*.navigate("MultipleChoiceQuestionEditor", {questionId: question.id})*/}
                            {/*}}*/}
                            {/*key={index}*/}
                            {/*leftIcon={{name: question.icon}}*/}

                            {/*subtitle={question.description}*/}
                            {/*title={question.title}/>))}*/}


                <View>

                        {/*{this.state.questions.map(question => (*/}
                            {/*< ListItem className="list-unstyled">*/}
                            {/*<ExamContainer   exam={question}*/}
                                             {/*preview={this.props.previewMode}*/}
                                             {/*key={question.id}/>*/}
                            {/*</ListItem>))*/}
                                {/*}*/}



                    <FormLabel>Question Title</FormLabel>

                    <FormInput
                        onChangeText={(text) => this.setState({exam: {title: text}})}

                    />

                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>

                    <Button title="Add Question"
                            onPress={this.props.AddQuestion}/>
                </View>



            </View>
        )
    }
}




