import React, {Component} from 'react'

import {
    View,
    ScrollView,
    ListView,
    AppRegistry,
    StyleSheet,
    TextInput,

} from 'react-native'

import {
    Alert,
    ListItem,
    Text,
    Button,
    CheckBox,
    FormLabel,
    FormInput,
    FormValidationMessage,

} from 'react-native-elements'


import ExamServiceClient from "../Services/ExamServiceClient";
import EssayQuestionServiceClient from "../Services/EssayQuestionServiceClient"
import FillInBlankServiceClient from "../Services/FillInBlankServiceClient"
import MultipleChoiceServiceClient from "../Services/MultipleChoiceServiceClient"
import TrueFalseServiceClient from "../Services/TrueFalseServiceClient"
import BaseQuestionServiceClient from "../Services/BaseQuestionServiceClient"


export default class EssayQuestionWidget extends Component {

    static navigationOptions = {title: 'Essay Question'}

    constructor(props) {
        super(props)
        this.state = {
            examId: '',

            refresh: '',
            question: {
                title: '',
                description: '',
                points: '',
                instructions: '',
                id: -1,
                type: '',
                icon: '',
                text: '',
            },

        }


        this.UpdateQuestion = this.UpdateQuestion.bind(this);
        this.setRefresh = this.setRefresh.bind(this);
        this.essayQuestionServiceClient = EssayQuestionServiceClient.instance;
        this.examServiceClient = ExamServiceClient.instance;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId").toString();
        const refresh = navigation.getParam("refresh");

        console.log("exam ID " + examId)


        this.setRefresh(refresh);
        const question = navigation.getParam("question");
        if (question != null) {
            this.setQuestion(question)
        }

        this.setExamId(examId);

        this.setQuestion(question)
    }

    setExamId(ExamId) {
        this.setState({examId: ExamId});
    }

    setRefresh(refresh) {
        this.setState({refresh: refresh});
    }

    componentWillReceiveProps(newProps) {

        if (this.props.examId !== newProps.examId) {
            this.setTopicId(newProps.examId);


        }
    }


    setQuestion(question) {
        this.setState({question: question})
    }

    UpdateQuestion() {

        this.essayQuestionServiceClient
            .updateEssayQuestion(
                this.state.question.id,
                this.state.question)
            .then(() => {
                alert("Question Saved");
                this.state.refresh();
                this.props.navigation.goBack();
            });

    }


    updateForm(newState) {

        this.setState(newState)
    }


    render() {
        console.log("Question" + this.state.question)
        return (
            <ScrollView>
                <View style={{padding: 15}}>


                    {/*this is editor*/}


                    <View style={styles.borderStyle}>

                        {/*<View style={styles.DInline}>*/}
                        {/*<Text style={styles.previewText}>*/}
                        {/*Question Editor</Text>*/}


                        <FormLabel>Title</FormLabel>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.otherText}
                                onChangeText={
                                    text => this.updateForm({question: {...this.state.question, title: text}})
                                }
                                value={this.state.question.title}

                            />
                        </View>
                        <FormValidationMessage>
                            Title is required
                        </FormValidationMessage>

                        {/*this is Description*/}

                        <FormLabel>Description</FormLabel>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.essayText}
                                multiline={true}
                                onChangeText={
                                    text => this.updateForm({question: {...this.state.question, description: text}})
                                }
                                value={this.state.question.description}

                            />
                        </View>
                        <FormValidationMessage>
                            Description is required
                        </FormValidationMessage>

                        {/*this is Points*/}

                        <FormLabel>Points</FormLabel>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.otherText}
                                onChangeText={
                                    text => this.updateForm({question: {...this.state.question, points: text}})
                                }
                                value={this.state.question.points}
                            />
                        </View>
                        <FormValidationMessage>
                            Points is required
                        </FormValidationMessage>


                        {/*this is Button*/}


                        <View style={styles.createGroupButton}>
                            <Button
                                onPress={this.UpdateQuestion}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor="#00BFFF"
                                color="white"
                                title="Save"/>


                            <Button

                                onPress={() => this.props
                                    .navigation
                                    .goBack()}

                                style={{right: 25}}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor="red"
                                color="white"
                                title="Cancel"/>
                        </View>

                    </View>


                    {/*this is preview*/}

                    <View style={styles.borderStyle}>

                        <Text style={styles.previewText}>
                            Preview</Text>
                        <View style={styles.DInline}>
                            <View>
                                <Text style={styles.titleText}>{this.state.question.title}</Text>
                            </View>
                            <View>
                                <Text style={styles.pointsText}>{this.state.question.points}</Text>
                            </View>
                        </View>


                        {/*this is description*/}


                        <View>
                            <TextInput
                                multiline={true}
                                style={styles.description}>
                                {this.state.question.description}
                            </TextInput>
                        </View>

                        {/*this is Essay*/}

                        <Text style={styles.titleText}>Essay answer</Text>

                        <View style={styles.container}>
                            <TextInput
                                editable={true}
                                selectTextOnFocus={true}

                                multiline={true}

                                style={styles.essayText}
                                onChangeText={
                                    text => this.updateForm({question: {...this.state.question, text: text}})
                                }/>
                        </View>

                        {/*this is Submit*/}

                        <View style={styles.buttonGroup}>

                            <Button
                                onPress={this.UpdateQuestion}
                                backgroundColor="#00BFFF"
                                buttonStyle={{
                                    borderWidth: 0,
                                    borderRadius: 5
                                }}
                                color="white"
                                title="Submit"/>
                            <Button
                                onPress={() => this.props
                                    .navigation
                                    .goBack()}

                                backgroundColor="red"
                                buttonStyle={{
                                    borderWidth: 0,
                                    borderRadius: 5
                                }}
                                style={{right: 25}}
                                color="white"
                                title="Cancel"/>

                        </View>

                    </View>

                    <View>
                        <Text>
                            {'\n'}
                        </Text>
                    </View>


                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
    },

    inputText: {
        fontSize: 15,
        padding: 15,


    },

    otherText: {
        fontSize: 15,
        padding: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B8B8B8',

        height: 50,
    },

    essayText: {
        Top: 5,
        fontSize: 15,
        padding: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B8B8B8',
        multiLine: 'true',
        height: 150,
        flexDirection: "row",
    },
    container: {
        padding: 15,

    },
    description: {
        fontSize: 15,
        padding: 15,


        height: 150,
    },


    DInline: {

        flexDirection: 'row',

        justifyContent: 'space-between',
    },


    pointsText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,

    },


    previewText: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 15,
    },
    borderStyle: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#B8B8B8',
        backgroundColor: 'white'
    },
    buttonStyle: {
        borderWidth: 0,
        borderRadius: 5,
        padding: 10,

    },

    buttonGroup: {
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'start',
    },
    createGroupButton: {
        paddingBottom: 15,
        paddingTop: 15,
        flexDirection: 'row',
        width: 145,

        // right: 7,
    }


});




