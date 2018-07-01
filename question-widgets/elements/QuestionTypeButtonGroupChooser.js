import React, {Component} from 'react'
import {Alert} from 'react-native'
import {ButtonGroup} from 'react-native-elements'
import TrueFalseQuestionEditor from './TrueFalseQuestionEditor'
class QuestionTypeButtonGroupChooser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedQuestionTypeIndex: 0,
            questionTypes : [
                'Multiple Choice',
                'Fill in the blank',
                'Essay',
                'True or\nfalse']
        }
        this.selectQuestionType = this.selectQuestionType.bind(this)
    }


    selectQuestionType = ({widget,newQuestionTypeIndex}) => {
        this.setState({

            selectedQuestionTypeIndex: newQuestionTypeIndex

        })


        if(this.state.selectedQuestionTypeIndex===0){

            <TrueFalseQuestionEditor widget={widget}/>

        }
    }


    render() {

        return(
            <ButtonGroup
                onPress={this.selectQuestionType}
                selectedIndex={this.state.selectedQuestionTypeIndex}
                buttons={this.state.questionTypes}
                containerStyle={{height: 75}}/>
        )
    }
}
export default QuestionTypeButtonGroupChooser