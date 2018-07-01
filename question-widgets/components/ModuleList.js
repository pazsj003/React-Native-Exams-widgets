import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import FixedHeader from '../elements/FixedHeader'
class ModuleList extends Component {
    static navigationOptions = {title: 'Modules'}

    constructor(props) {
        super(props)
        this.state = {
            modules: [],
            courseId: 1
        }
    }
    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        this.setState({
            courseId: courseId
        })
        fetch('http://localhost:8080/api/course/' + courseId + '/module')
            .then(response => (response.json()))
            .then(modules => this.setState({modules: modules}))
    }
    render() {
        return(
    <ScrollView>
        <FixedHeader/>
            <View style={{padding: 15}}>
                {this.state.modules.map((module, index) => (
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("LessonList", {courseId:
                                this.state.courseId, moduleId: module.id})}
                        key={index}
                        title={module.title}/>
                ))}
            </View>
    </ScrollView>
        )
    }
}
export default ModuleList