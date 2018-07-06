import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import {Button} from 'react-native-elements'
class QuestionList extends Component {
    static navigationOptions = {title: 'Questions1'}
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        fetch("https://webdev-summerfull-2018.herokuapp.com/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions}))
    }
    render() {
        return(
            <View style={{padding: 15}}>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            onPress={() => {
                                if(question.type === "TrueFalse")
                                    this.props.navigation
                                        .navigate("TrueFalseQuestionEditor", {questionId: question.id})
                                if(question.type === "MultipleChoice")
                                    this.props.navigation
                                        .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                            }}
                            key={index}
                            subtitle={question.description}
                            title={question.title}/>))}


                <View>
                    <FormLabel>Question Title</FormLabel>

                    <FormInput
                        onChangeText={(text) => this.setState({exam: {title: text}})}

                    />

                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>

                    <Button title="Add Exam"
                            onPress={this.CreateExam}/>
                </View>



            </View>
        )
    }
}
export default QuestionList