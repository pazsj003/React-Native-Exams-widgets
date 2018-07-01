import * as constants from "../constants/index"







export const findAllWidgetsForTopic = (dispatch,examId) => {
    fetch(('http://localhost:8080/api/exam/examId/question').replace('examId', examId))
        .then(response => (response.json()))
        .then(questions => dispatch({
            type: constants.FIND_ALL_WIDGETS_FOR_TOPIC,
            questions: questions
        }))
}

export const AddQuestion = dispatch => (
    dispatch({type: constants.ADD_QUESTION})
)