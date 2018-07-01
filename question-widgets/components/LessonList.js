import React, {Component} from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import FixedHeader from '../elements/FixedHeader'
class LessonList extends Component {
    static navigationOptions = {title: 'Lessons'}
    constructor(props) {
        super(props)
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        this.setState({
            courseId: courseId,
            moduleId: moduleId
        })
        fetch("http://localhost:8080/api/course/"+courseId+"/module/"+moduleId+"/lesson")
            .then(response => (response.json()))
            .then(lessons => this.setState({lessons}))
    }
    render() {
        return(
    <ScrollView>
        <FixedHeader/>
            <View style={{padding: 15}}>
                {this.state.lessons.map(
                    (lesson, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("TopicList",
                                    {courseId: this.state.courseId,
                                     moduleId: this.state.moduleId,
                                     lessonId: lesson.id})}
                            key={index}
                            title={lesson.title}/>))}
            </View>
    </ScrollView>
        )
    }
}
export default LessonList