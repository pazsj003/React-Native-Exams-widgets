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
    Icon,
    Alert,
    ListItem,
    Text,
    Button,
    CheckBox,
    FormLabel,
    FormInput,
    FormValidationMessage,
    ButtonGroup,

} from 'react-native-elements'


import ExamServiceClient from "../Services/ExamServiceClient";
import EssayQuestionServiceClient from "../Services/EssayQuestionServiceClient"
import FillInBlankServiceClient from "../Services/FillInBlankServiceClient"
import MultipleChoiceServiceClient from "../Services/MultipleChoiceServiceClient"
import TrueFalseServiceClient from "../Services/TrueFalseServiceClient"
import BaseQuestionServiceClient from "../Services/BaseQuestionServiceClient"


export default class ExamWidget extends Component {

    static navigationOptions = {title: 'Quiz'}

    constructor(props) {
        super(props)
        this.state = {
            topicId: '',
            text: '',
            refresh: '',
            exam: {
                title: '',
                description: '',
                points: '',
                id: -1,
            },
            questions: [],
            examId: '',
            question: {
                title: '',
                description: '',
                points: '',
                instructions: '',
                id: -1,
                type: '',
                icon: '',
            },
            selectedQuestionTypeIndex: 0,
            questionTypes: [
                'Multiple Choice',
                'Fill in the blank',
                'Essay',
                'True or\nfalse']
        }


// this.props.findAllQuestionsForExam(this.props.examId),
        this.setExamId = this.setExamId.bind(this)


// this.UpdateExam = this.UpdateExam.bind(this);
        this.setQuestionType = this.setQuestionType.bind(this);
        this.setRefresh = this.setRefresh.bind(this);
        this.selectQuestionType = this.selectQuestionType.bind(this);
        this.CreateQuestion = this.CreateQuestion.bind(this);
        this.refreshExam = this.refreshExam.bind(this);
        this.examServiceClient = ExamServiceClient.instance;
        this.essayQuestionServiceClient = EssayQuestionServiceClient.instance;
        this.fillInBlankServiceClient = FillInBlankServiceClient.instance;
        this.multipleChoiceServiceClient = MultipleChoiceServiceClient.instance;
        this.trueFalseServiceClient = TrueFalseServiceClient.instance;
        this.baseQuestionServiceClient = BaseQuestionServiceClient.instance;


    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId").toString();
        const refresh = navigation.getParam("refresh");
        const examId = navigation.getParam("examId");

        console.log("topic ID " + topicId)
        console.log("did mount exam ID " + examId)

        this.setTopicId(topicId);
        this.setRefresh(refresh);

        const exam = navigation.getParam("exam");
        if (exam != null) {
            this.setExam(exam)
        }

        this.setExamId(examId);
        this.findAllQuestionsForExam(examId);


    }

    refreshExam() {
        console.log("this is refreshExam")
        this.componentDidMount();
    }


    componentWillReceiveProps(newProps) {

        if (this.props.topicId !== newProps.topicId) {
            this.setTopicId(newProps.topicId);

        }
    }


    selectQuestionType = (newQuestionTypeIndex) => {
        this.setState({
            selectedQuestionTypeIndex: newQuestionTypeIndex,
        })
        this.setQuestionType(newQuestionTypeIndex);

    }

    setQuestionType(TypeIndex) {
        switch (TypeIndex) {
            case 0:
                console.log("Multiple Choice selected")
                this.setState({
                    question: {
                        type: 'Multiple Choice',
                        icon: 'list',
                    },
                })
                break;
            case 1:
                console.log("Fill in the blank selected")
                this.setState({
                    question: {
                        type: 'Fill in the blank',
                        icon: 'code',
                    },
                })
                break;
            case 2:
                console.log("Essa selected")
                this.setState({
                    question: {
                        type: 'Essay',
                        icon: 'check',
                    },
                })
                break;
            case 3:
                console.log("True or false selected")
                this.setState({
                    question: {
                        type: 'True or false',
                        icon: 'subject',
                    },
                })
                break;
            default:
                this.setState({
                    question: {type: ''},

                })
                break;


        }

    }

    findAllQuestionsForExam(examId) {
        console.log("find all questions for exam")
        this.baseQuestionServiceClient
            .findAllBaseQuestionsForExam(examId)
            .then((questions) => {
                this.setQuestions(questions)
            });

    }


    setQuestions(questions) {
        console.log("set questions")
        this.setState({questions: questions});
    }


    setExamId(ExamId) {
        this.setState({examId: ExamId});
    }


    setRefresh(refresh) {
        this.setState({refresh: refresh});
    }


    setTopicId(TopicId) {
        this.setState({topicId: TopicId});
    }

    setExam(exam) {
        this.setState({exam: exam})
    }


    CreateQuestion() {
        switch (this.state.selectedQuestionTypeIndex) {
            case 0:
                this.multipleChoiceServiceClient
                    .CreateMultipleChoiceQuestion(
                        this.state.examId,
                        this.state.question)
                    .then(() => {
                        this.findAllQuestionsForExam(this.state.examId);
                        alert("Multiple Choice Question Created");
// this.state.refresh();
// this.props.navigation.goBack();
                    });
                break;

            case 1:
                this.fillInBlankServiceClient
                    .CreateFillInBlankQuestion(
                        this.state.examId,
                        this.state.question)
                    .then(() => {
                        this.findAllQuestionsForExam(this.state.examId);
                        alert("Fill In Black Question Created");
// this.state.refresh();
// this.props.navigation.goBack();
                    });
                break;
            case 2:
                this.essayQuestionServiceClient
                    .CreateEssayQuestion(
                        this.state.examId,
                        this.state.question)
                    .then(() => {
                        this.findAllQuestionsForExam(this.state.examId);
                        alert("Essay Question Created");
// this.state.refresh();
// this.props.navigation.goBack();
                    });
                break;
            case 3:
                this.trueFalseServiceClient
                    .CreateTrueFalseQuestion(
                        this.state.examId,
                        this.state.question)
                    .then(() => {
                        this.findAllQuestionsForExam(this.state.examId);
                        alert("True or False  Question Created");
// this.state.refresh();
// this.props.navigation.goBack();
                    });
                break;
            default:
                console.log("no action ");

        }


    }


    DeleteQuestion(questionType, questionId, examId) {


        switch (questionType) {
            case "Multiple Choice":
                this.multipleChoiceServiceClient
                    .deleteMultipleChoiceQuestion(
                        questionId)
                    .then(() => {
                        this.findAllQuestionsForExam(examId);
                        alert("Multiple Choice Question Deleted");

                    });
                break;

            case "Fill in the blank":
                this.fillInBlankServiceClient
                    .deleteFillInBlankQuestion(
                        questionId)
                    .then(() => {
                        this.findAllQuestionsForExam(examId);
                        alert("Fill In Black Question Deleted");

                    });
                break;
            case "Essay":
                this.essayQuestionServiceClient
                    .deleteEssayQuestion(
                        questionId)
                    .then(() => {
                        this.findAllQuestionsForExam(examId);
                        alert("Essay Question Deleted");

                    });
                break;
            case "True or false":
                this.trueFalseServiceClient
                    .deleteTrueFalseQuestion(
                        questionId)
                    .then(() => {
                        this.findAllQuestionsForExam(examId);
                        alert("True or False  Question Deleted");

                    });
                break;
            default:
                console.log("no action ");

        }


    }


    updateForm(newState) {

        this.setState(newState)
    }


    render() {
        console.log("Exam ID" + this.state.exam.id)
        console.log("questions List" + this.state.questions)
        return (
            <ScrollView>
                <View style={{padding: 15}}>


                    {/*this is preview*/}

                    <View style={styles.borderStyle}>

                        <View style={styles.DInline}>
                            <Text style={styles.previewText}>
                                Exam</Text>

                            <Button backgroundColor="orange"
                                    onPress={() => this.props.navigation
                                        .navigate("ExamEditor",
                                            {
                                                exam: this.state.exam,
                                                topicId: this.state.topicId,
                                                refresh: this.state.refresh,
                                            })}
                                    buttonStyle={{
                                        borderWidth: 0,
                                        borderRadius: 5,
                                        padding: 7,
                                    }}
                                    style={{
                                        right: 25,
                                        paddingTop: 15,
                                        left: 4,
                                    }}
                                    color="white"
                                    title="Edit"/>
                        </View>


                        <View style={styles.DInline}>
                            <View>
                                <Text style={styles.titleText}>{this.state.exam.title}</Text>
                            </View>
                            <View>
                                <Text style={styles.pointsText}>{this.state.exam.points}</Text>
                            </View>
                        </View>


                        {/*this is description*/}


                        <View>
                            <TextInput
                                multiline={true}
                                style={styles.description}>
                                {this.state.exam.description}
                            </TextInput>
                        </View>


                        {/*this is Create new Question*/}

                        <View>

                            <ButtonGroup
                                onPress={this.selectQuestionType}
                                selectedIndex={this.state.selectedQuestionTypeIndex}
                                buttons={this.state.questionTypes}
                                containerStyle={{height: 75}}/>

                            {/*<View style={styles.DInline}>*/}
                            {/*<Text style={styles.previewText}>*/}
                            {/*Exam Editor</Text>*/}


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
                                Description is required
                            </FormValidationMessage>


                            {/*this is Button*/}


                            <View style={styles.createGroupButton}>
                                <Button
                                    onPress={this.CreateQuestion}
                                    buttonStyle={styles.buttonStyle}
                                    backgroundColor="#00BFFF"
                                    color="white"
                                    title="Create"/>

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


                    </View>

                    <View>
                        <Text>
                            {'\n'}
                        </Text>
                    </View>


                    {/*this is QuestionList*/}

                    {this.state.questions.map(
                        (question, index) =>
                            <View style={styles.ListItem}>
                                <View
                                    style={
                                        {
                                            display: 'flex',
                                            // flexDirection: 'row-reverse',
                                            justifyContent: 'space-between',
                                            // alignItems: 'center',
                                            // backgroundColor: '#f1f1f1',
                                        }
                                    }
                                >
                                    <ListItem
                                        onPress={() => {
                                            if (question.type === "True or false")
                                                this.props.navigation
                                                    .navigate("TrueOrFalseQuestionWidget",
                                                        {
                                                            questionId: question.id,
                                                            question: question,
                                                            examId: this.state.exam.id,
                                                            refresh: this.refreshExam,

                                                        })
                                            if (question.type === "Multiple Choice")
                                                this.props.navigation
                                                    .navigate("MultipleChoiceQuestionWidget",
                                                        {
                                                            questionId: question.id,
                                                            question: question,
                                                            examId: this.state.exam.id,
                                                            refresh: this.refreshExam,


                                                        })
                                            if (question.type === "Essay")
                                                this.props.navigation
                                                    .navigate("EssayQuestionWidget", {

                                                            questionId: question.id,
                                                            question: question,
                                                            examId: this.state.exam.id,
                                                            refresh: this.refreshExam,

                                                        }
                                                    )
                                            if (question.type === "Fill in the blank")
                                                this.props.navigation
                                                    .navigate("FillInTheBlanksQuestionWidget",
                                                        {
                                                            questionId: question.id,
                                                            question: question,
                                                            examId: this.state.exam.id,
                                                            refresh: this.refreshExam,

                                                        })
                                        }}
                                        key={index}
                                        leftIcon={{name: question.icon}}
                                        chevron={true}
                                        rightIcon={
                                            <Icon
                                                name="close"
                                                type="EvilIcons"
                                                onPress={() => this.DeleteQuestion(
                                                    question.type,
                                                    question.id,
                                                    this.state.exam.id,
                                                )}

                                            />}
                                        subtitle={question.type}
                                        title={question.title}/>;
                                </View>

                                <View
                                    style={{
                                        flex: 3,
                                        display: 'flex',
                                    }}>


                                </View>

                            </View>
                    )}


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

    ListItem: {

        display: 'flex',
// flexDirection: 'row',
        flex: 1,
        justifyContent: 'start',
        flexDirection: 'column',
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




