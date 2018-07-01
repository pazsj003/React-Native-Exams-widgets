import React,{Component} from "react";
import ExamWidget from '../elements/ExamWidget'
import {widgetReducer} from "../reducers/widgetReducer"


class WidgetEditor extends Component {
    static navigationOptions = {title: 'QuestionEditor'}

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: 1
        }

    }
    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId")
        console.log("topic ID " + examId)
        this.setState({
            examId: examId,

        })
    }


    render() {

        return(

        <ExamWidget   examId={this.props.examId} />

        )
    }
}

export default WidgetEditor;