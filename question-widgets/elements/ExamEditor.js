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





export default  class ExamEditor extends Component {

    static navigationOptions = {title: 'Exam Editor'}
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
            // examId: -1,
        }


        // this.props.findAllQuestionsForExam(this.props.examId),
        // this.setExamId=this.setExamId.bind(this)

        this.DeleteExam = this.DeleteExam.bind(this);
        this.setTopicId = this.setTopicId.bind(this);
        this.CreateExam = this.CreateExam.bind(this);
        this.UpdateExam = this.UpdateExam.bind(this);
        this.setRefresh = this.setRefresh.bind(this);

        this.examServiceClient = ExamServiceClient.instance;
    }
    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId").toString();
        const refresh = navigation.getParam("refresh");

        console.log("topic ID " + topicId)

        this.setTopicId(topicId);
        this.setRefresh(refresh);
        const exam = navigation.getParam("exam");
        if (exam != null) {
            this.setExam(exam)
        }

        // this.setExamId(this.props.examId);
    }

    // setExamId(ExamId) {
    //     this.setState({examId: ExamId});
    // }

    setRefresh(refresh) {
        this.setState({refresh: refresh});
    }

    componentWillReceiveProps(newProps) {

        if (this.props.topicId !== newProps.topicId) {
            this.setTopicId(newProps.topicId);


        }
    }

    setTopicId(TopicId) {
        this.setState({topicId: TopicId});
    }

    setExam(exam) {
        this.setState({exam: exam})
    }

    UpdateExam() {
        if (this.state.exam.id !== -1) {
            this.examServiceClient
                .updateExam(
                    this.state.exam.id,
                    this.state.exam)
                .then(() => {
                    alert("Exam Updated");
                    this.state.refresh();
                    this.props.navigation.goBack();
                });

        }
        else {
            alert("Create Exam First")
        }


    }

    CreateExam() {

        if (this.state.exam.id !== -1) {
            alert("Exam Already Created")

        }

        else {
            this.examServiceClient
                .CreateExams(
                    this.state.topicId,
                    this.state.exam)
                .then(() => {
                    alert("Exam Created");
                    this.state.refresh();
                    this.props.navigation.goBack();
                })
        }


    }


    DeleteExam() {
        if (this.state.exam.id !== -1) {
            this.examServiceClient
                .deleteExam(this.state.exam.id)
                .then(() => {
                    alert("Exam Deleted");
                    this.state.refresh();
                    this.props.navigation.goBack();
                });
        }
        else {
            alert("Create Exam First")
        }
    }


    updateForm(newState) {

        this.setState(newState)
    }


    render() {
        console.log("Exam"+this.state.exam)
        return(
            <ScrollView>
                <View style={{padding: 15}}>

                    {/*this is QuestionList*/}

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




                    {/*this is editor*/}


                    <View style={styles.borderStyle}>

                        {/*<View style={styles.DInline}>*/}
                        <Text style={styles.previewText}>
                            Exam Editor</Text>


                        <FormLabel>Title</FormLabel>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.otherText}
                                onChangeText={
                                    text => this.updateForm({exam: {...this.state.exam, title: text}})
                                }
                                value={this.state.exam.title}

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
                                    text => this.updateForm({exam: {...this.state.exam, description: text}})
                                }
                                value={this.state.exam.description}

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
                                    text => this.updateForm({exam: {...this.state.exam, points: text}})
                                }
                                value={this.state.exam.points}
                            />
                        </View>
                        <FormValidationMessage>
                            Description is required
                        </FormValidationMessage>


                        {/*this is Button*/}


                        <View style={styles.createGroupButton}>
                            <Button
                                onPress={this.CreateExam}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor="blue"
                                color="white"
                                title="Create"/>
                            <Button
                                onPress={this.UpdateExam}
                                style={{right: 25}}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor="green"
                                color="white"
                                title="Update"/>

                            <Button
                                onPress={this.DeleteExam}
                                style={{right: 50}}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor="orange"
                                color="white"
                                title="Delete"/>

                            <Button

                                onPress={() => this.props
                                    .navigation
                                    .goBack()}

                                style={{right: 75}}
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



                        {/*/!*this is Submit*!/*/}

                        {/*<View style={styles.buttonGroup}>*/}

                        {/*<Button backgroundColor="#00BFFF"*/}
                        {/*buttonStyle={{borderWidth: 0, borderRadius: 5}}*/}
                        {/*color="white"*/}
                        {/*title="Submit"/>*/}
                        {/*<Button backgroundColor="red"*/}
                        {/*buttonStyle={{borderWidth: 0, borderRadius: 5}}*/}
                        {/*style={{right: 25}}*/}
                        {/*color="white"*/}
                        {/*title="Cancel"/>*/}

                        {/*</View>*/}

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
    buttonStyle:{
        borderWidth: 0,
        borderRadius: 5,
        padding:10,

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




