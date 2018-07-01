import React, {Component} from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import FixedHeader from '../elements/FixedHeader'
class TopicList extends Component {
    static navigationOptions = {title: 'Topics'}
    constructor(props) {
        super(props)
        this.state = {
            topics:[],
            lessonId: 1,
            courseId: 1,
            moduleId: 1
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        fetch("http://localhost:8080/api/course/"+courseId+"/module/"+moduleId+"/lesson/"+lessonId+"/topic")
            .then(response => (response.json()))
            .then(topics => this.setState({topics}))
    }
    render() {
        console.log(this.state.topics)
        return(
    <ScrollView>
        <FixedHeader/>
            <View style={{padding: 15}}>
                {this.state.topics.map(
                    (topic, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {topicId: topic.id})}
                            key={index}
                            title={topic.title}/>

                    ))}
            </View>
    </ScrollView>
        )
    }
}
export default TopicList