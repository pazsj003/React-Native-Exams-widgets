import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/TextHeadings'
import Icons from './elements/Icons'

import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'


import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import ExamWidget from './elements/ExamWidget'
import AssignmentWidget from './elements/AssignmentWidget'
import AssignmentItemPreview from './elements/AssignmentItemPreview'
import ExamEditor from "./elements/ExamEditor";


import TrueOrFalseQuestionWidget from "./elements/TrueOrFalseQuestionWidget";
import EssayQuestionWidget from "./elements/EssayQuestionWidget";
import MultipleChoiceQuestionWidget from "./elements/MultipleChoiceQuestionWidget";
import FillInTheBlanksQuestionWidget from "./elements/FillInTheBlanksQuestionWidget";
import TrueFalseQuestionPreview from "./elements/TrueFalseQuestionPreview";


class Home extends React.Component {
    static navigationOptions = {

        title: 'Home'
    }

    constructor(props) {
        super(props)
    }
    render() {
        return(
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList') } />

                <Button title="Topic"
                        onPress={() => this.props.navigation
                            .navigate('WidgetList',{topicId:222}) } />

                {/*<Button title="Exam"*/}
                        {/*onPress={() => this.props.navigation*/}
                            {/*.navigate('ExamWidget',{topicId:22}) } />*/}


                {/*<TrueFalseQuestionEditor/>*/}
                {/*<AssignmentWidget/>*/}
                {/*<MultipleChoiceQuestionEditor/>*/}
                {/*<QuestionTypeButtonGroupChooser/>*/}
                {/*<QuestionTypePicker/>*/}
                {/*<TrueFalseQuestionPreview/>*/}


                {/*<Icons/>*/}
                {/*<View style={{padding: 20}}>*/}
                    {/*<TextHeadings/>*/}
                {/*</View>*/}
            </ScrollView>
        )
    }
}

class ScreenA extends React.Component {
    static navigationOptions = {title: "Screen A"}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />
            </View>
        )
    }
}

const ScreenB = () => (
    <View>
        <Text h1>Screen B</Text>
    </View>
)

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    ExamWidget,
    AssignmentItemPreview,
    MultipleChoiceQuestionWidget,
    FillInTheBlanksQuestionWidget,
    EssayQuestionWidget,
    TrueFalseQuestionPreview,
    TrueOrFalseQuestionWidget,
    ExamEditor,
    AssignmentWidget,

});

export default App;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });