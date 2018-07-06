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

} from 'react-native-elements'

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CustomCheckbox from "./CustomCheckbox";
import ExamServiceClient from "../Services/ExamServiceClient";
import EssayQuestionServiceClient from "../Services/EssayQuestionServiceClient"
import FillInBlankServiceClient from "../Services/FillInBlankServiceClient"
import MultipleChoiceServiceClient from "../Services/MultipleChoiceServiceClient"
import TrueFalseServiceClient from "../Services/TrueFalseServiceClient"
import BaseQuestionServiceClient from "../Services/BaseQuestionServiceClient"
import TFListServiceClient from "../Services/TFListServiceClient"

export default class TrueOrFalseQuestionWidget extends Component {

    static navigationOptions = {title: 'True False Question'}

    constructor(props) {
        super(props)
        this.state = {
            examId: '',
            text: '',
            refresh: '',
            optionsChoice: [],
            option: {name:'',id:1},
            TrueList:[],
            isTrue: true,

            OptionItem:{
                // name:'',
                // id:-1,
                // questionType:{},
                // fillquestion:{},
                // multiplequestion:{},
                // trueFalsequestion:{},

            },


            OptionItems:[],


            TrueFalseItem:{
                name:'yes',
                id:1,
            },


            TrueFalseList:[],
            question: {
                title: '',
                description: '',
                points: '',
                instructions: '',
                id: -1,
                type: '',
                icon: '',
                options: [],
                correctOption: -1,
                isTrue: true,

            },

        }
        this.createItem=this.createItem.bind(this);
        this.saveChoice=this.saveChoice.bind(this);
        // this.renderOption=this.renderOption.bind(this);
        this.saveChoice=this.saveChoice.bind(this);
        this.UpdateQuestion = this.UpdateQuestion.bind(this);
        this.setRefresh = this.setRefresh.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.trueFalseServiceClient = TrueFalseServiceClient.instance;
        this.examServiceClient = ExamServiceClient.instance;
        this.tflistServiceClient=TFListServiceClient.instance
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
        this.setState({optionsChoice:this.state.question.options})
        // this.findAllItemForQuestion(question.id)
    }

    createItem(){

    console.log("optionId in create Item" + JSON.stringify( this.state.TrueFalseItem))
        console.log("QuestionId in create Item" + JSON.stringify( this.state.question.id))
        this.tflistServiceClient
            .CreateTFListItemForTrueFalse(
                this.state.question.id,
                this.state.TrueFalseItem)
            .then(() => {
                this.findAllItemForQuestion
                (this.state.question.id);

            })

    }


    findAllItemForQuestion(QuestionId){
        console.log("find all item for TrueFalse qustion Id:"+QuestionId)
        this.tflistServiceClient
            .findAllTFListItemForTrueFalse(QuestionId)
            .then((Items) => {
                this.setItems(Items)
            });
    }

    deleteChoice() {


    }



    setItems(Items){
        console.log("find all item for in SET item:"+Items.id)
        this.setState({TrueFalseList: Items});
        console.log("after find all item for in SET item:"+JSON.stringify(this.state.TrueFalseList))
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

    renderOption(option, key) {

        return (
            <ListItem
                // chevron={true}
                containerStyle={{
                   right:20,
                   borderBottomWidth:0}}
                title={<CustomCheckbox key={key} tag={option}/>}

                rightIcon={
                    <Icon
                        name="close"
                        type="EvilIcons"
                        // onPress={
                        //     () => this.DeleteCheckBox(
                        //     question.type,
                        //     question.id,
                        //     this.state.exam.id,
                        // )}

                    />}
            />

        )
    }



    saveChoice (){


        this.setState(
            {
                question:{...this.state.question,options: this.state.optionsChoice,}

            },
            () => {
                console.log("new save" + JSON.stringify(this.state.question));
            },
        );

    }
    addChoice(option) {

        console.log("option" + JSON.stringify(option));

        this.setState(
            {
                optionsChoice:
                    [
                        ...this.state.optionsChoice,
                        this.state.option
                    ]
            },
            () => {
                console.log("new" + JSON.stringify(this.state.optionsChoice));
            },
        );

    }


    setQuestion(question) {
        this.setState({question: question})
    }

    UpdateQuestion() {
        this.saveChoice();



        this.trueFalseServiceClient
            .updateTrueFalseQuestion(
                this.state.question.id,
                this.state.question)
            .then(() => {
                console.log("local local" + JSON.stringify(this.state.question));
                alert("Question Saved");
                this.state.refresh();
                this.props.navigation.goBack();
            });

    }


    updateForm(newState) {

        this.setState(newState)
    }

    onSelect(index, value) {
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
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


                        {/*this is add choice*/}

                        <FormLabel>Choice Text</FormLabel>
                        <View style={styles.inputWithButton}>
                            {/*<View style={styles.buttonGroup}>*/}
                            <TextInput
                                style={styles.FormInputTextBeforeButton}
                                onChangeText={
                                    text => this.updateForm(
                                        {option:text})
                                }

                                value={this.state.option}
                            />

                            <View style={{
                                // paddingBottom: 15,
                                paddingTop: 5,
                                flexDirection: 'row',
                                width: 145,
                            }}>
                                <Button
                                    onPress={() => this.addChoice()}
                                    buttonStyle={styles.buttonStyle}
                                    backgroundColor="#00BFFF"
                                    color="white"
                                    title="+"/>

                                <Button
                                    // onPress={() => this.addChoice(this.state.option)}
                                    style={{right: 25}}
                                    buttonStyle={styles.buttonStyle}
                                    backgroundColor="orange"
                                    color="white"
                                    title="x"/>
                                {/*</View>*/}
                            </View>


                        </View>


                        <View style={styles.container}>


                                {this.state.optionsChoice
                                    .map((option, index) => {
                                        return (
                                            this.renderOption(option, index)


                                        )})}


                            <Text style={styles.choiceButtonDisplayText}>{this.state.text}</Text>



                        </View>


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


                        {/*this is Multiple choice*/}


                        <View
                            style={styles.container}

                        >




                                {this.state.optionsChoice
                                    .map((option, index) => {
                                        return (
                                            this.renderOption(option, index)


                                        )})}




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


    choiceButtonDisplayText: {
        fontSize: 15,
        padding: 15,
        // borderStyle: 'solid',
        // borderRadius: 5,
        // borderWidth: 1,
        borderColor: '#B8B8B8',

        height: 50,
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

    FormInputTextBeforeButton: {
        fontSize: 15,
        padding: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B8B8B8',
        width:230,
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

    inputWithButton:{
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'start',
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
        paddingTop: 65,
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




