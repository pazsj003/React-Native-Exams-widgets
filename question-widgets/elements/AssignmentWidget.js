import React, {Component} from 'react'
import {
    View,
    ScrollView,
    ListView,
    AppRegistry,
    StyleSheet,
    TextInput,

}
    from 'react-native'

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


import AssignmentServiceClient from "../Services/AssignmentServiceClient"




class AssignmentWidget extends Component {


    static navigationOptions = {title: 'Assignment'}

    constructor(props) {
        super(props);
        this.state = {
            topicId: '',

            refresh: '',
            assignment: {
                title: '',
                description: '',
                points: '',
                id: -1,
                text: '',
                hrefLink:'',

            }
        }

        this.DeleteAssignment = this.DeleteAssignment.bind(this);
        this.setTopicId = this.setTopicId.bind(this);
        this.CreateAssignment = this.CreateAssignment.bind(this);
        this.UpdateAssignment = this.UpdateAssignment.bind(this);
        this.setRefresh = this.setRefresh.bind(this);

        this.assignmentServiceClient = AssignmentServiceClient.instance;
    }


    componentDidMount() {

        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId").toString();
        const refresh = navigation.getParam("refresh");

        console.log("topic ID " + topicId)

        this.setTopicId(topicId);
        this.setRefresh(refresh);
        const assignment = navigation.getParam("assignment");
        if (assignment != null) {
            this.setAssignment(assignment)
        }

    }

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

    setAssignment(assignment) {
        this.setState({assignment: assignment})
    }

    UpdateAssignment() {
        if (this.state.assignment.id !== -1) {
            this.assignmentServiceClient
                .updateAssignment(
                    this.state.assignment.id,
                    this.state.assignment)
                .then(() => {
                    alert("Assignment Updated");
                    this.state.refresh();
                    this.props.navigation.navigate("WidgetList", {topicId: this.state.topicId});
                });

        }
        else {
            alert("Create Assignment First")
        }


    }

    CreateAssignment() {

        if (this.state.assignment.id !== -1) {
            alert("Assignment Already Created")

        }

        else {
            this.assignmentServiceClient
                .createAssignment(
                    this.state.topicId,
                    this.state.assignment)
                .then(() => {
                    alert("Assignment Created");
                    this.state.refresh();
                    this.props.navigation.goBack();
                })
        }


    }


    DeleteAssignment() {
        if (this.state.assignment.id !== -1) {
            this.assignmentServiceClient
                .deleteAssignment(this.state.assignment.id)
                .then(() => {
                    alert("Assignment Deleted");
                    this.state.refresh();
                    this.props.navigation.navigate("WidgetList", {topicId: this.state.topicId});
                });
        }
        else {
            alert("Create Assignment First")
        }
    }


    updateForm(newState) {
        console.log(newState.assignment.title)
        this.setState(newState)
    }


    render() {

        return (
            <ScrollView>
                <View style={{padding: 15}}>


                    {/*this is editor*/}


                    <View style={styles.borderStyle}>

                        {/*<View style={styles.DInline}>*/}
                        <Text style={styles.previewText}>
                            Assignment Editor</Text>


                        <FormLabel>Title</FormLabel>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.otherText}
                                onChangeText={
                                    text => this.updateForm({assignment: {...this.state.assignment, title: text}})
                                }
                                value={this.state.assignment.title}

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
                                    text => this.updateForm({assignment: {...this.state.assignment, description: text}})
                                }
                                value={this.state.assignment.description}

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
                                    text => this.updateForm({assignment: {...this.state.assignment, points: text}})
                                }
                                value={this.state.assignment.points}
                            />
                        </View>
                        <FormValidationMessage>
                            Description is required
                        </FormValidationMessage>


                        {/*this is Button*/}


                        <View style={styles.createGroupButton}>
                            <Button
                                onPress={this.CreateAssignment}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor="blue"
                                color="white"
                                title="Create"/>
                            <Button
                                onPress={this.UpdateAssignment}
                                style={{right: 25}}
                                buttonStyle={styles.buttonStyle}
                                backgroundColor="green"
                                color="white"
                                title="Update"/>

                            <Button
                                onPress={this.DeleteAssignment}
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
                                <Text style={styles.titleText}>{this.state.assignment.title}</Text>
                            </View>
                            <View>
                                <Text style={styles.pointsText}>{this.state.assignment.points}</Text>
                            </View>
                        </View>


                        {/*this is description*/}


                        <View>
                            <TextInput
                                multiline={true}
                                style={styles.description}>
                                {this.state.assignment.description}
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
                                    text => this.updateForm({text: text})
                                }/>
                        </View>


                        <Text style={styles.titleText}>Upload a file</Text>

                        {/*this is upload*/}

                        <View style={styles.container}>
                            <View style={{
                                padding: 10,

                                flexDirection: 'row',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderColor: '#B8B8B8',
                                justifyContent: 'start',
                            }}>
                                <Button backgroundColor="#F0F8FF"
                                        buttonStyle={{
                                            padding: 5,
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            width: 120,
                                            borderColor: '#B8B8B8',
                                            height: 40,
                                            right: 15
                                        }}
                                        color="black"
                                        title="Choose File"/>
                                <Text style={{
                                    fontSize: 20,
                                    right: 20,
                                    top: 5,
                                    // fontWeight: 'bold',
                                    // padding: 15,
                                }}
                                > No file chosen
                                </Text>
                            </View>
                        </View>


                        {/*this is link*/}

                        <Text style={styles.titleText}>Submit a link</Text>

                        <View style={styles.container}>
                            <TextInput
                                style={styles.otherText}
                                onChangeText={
                                    text => this.updateForm({text: text})
                                }/>
                        </View>

                        <View style={styles.buttonGroup}>

                            <Button backgroundColor="#00BFFF"
                                    buttonStyle={{borderWidth: 0, borderRadius: 5}}
                                    color="white"
                                    title="Submit"/>
                            <Button backgroundColor="red"
                                    buttonStyle={{borderWidth: 0, borderRadius: 5}}
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

export default AssignmentWidget

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
    buttonStyle:{
        borderWidth: 0,
        borderRadius: 5,
        padding:10,

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

        right: 0,
    }


});

// AppRegistry.registerComponent('AssignmentWidget', () => AssignmentWidget);