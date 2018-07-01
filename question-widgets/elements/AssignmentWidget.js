
import React, {Component} from 'react'
import {View,ScrollView,ListView} from 'react-native'
import {ListItem, Text} from 'react-native-elements'
import {Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}  from 'react-native-elements'

class AssignmentWidget extends Component{


    static navigationOptions = {title: 'Questions'}
    constructor(props) {
        super(props)
        this.state = {
            Assignment: [],
            examId: 1
        }
        this.props.findAllAssignmentForExam(this.props.examId),
            this.setExamId=this.setExamId.bind(this)
    }


    componentDidMount() {

    }

    render() {
        console.log("question"+this.state.questions)
        return(
            <View style={{padding: 15}}>


                <View>

                    <View style={{padding: 15}}>
                        {this.state.assignments.map(
                            (assignment, index) => (
                                <ListItem
                                    onPress={() => this.props.navigation
                                        .navigate("AssignmentEditor", {assignmentId: assignment.id})}
                                    key={index}
                                    title={assignment.title}/>

                            ))}
                    </View>



                    <FormLabel>Question Title</FormLabel>

                    <FormInput
                        onChangeText={(text) => this.setState({exam: {title: text}})}

                    />

                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>

                    <Button title="Add Assignment"
                            onPress={this.props.AddQuestion}/>
                </View>



            </View>
        )
    }
}