import * as constants from "../constants/index"

export const widgetReducer = (state = {questions: [], preview: false}, action) => {
    let newState
    switch (action.type) {

        case constants.FIND_ALL_QUESTIONS_FOR_EXAM:
            newState = Object.assign({}, state)
            newState.questions = action.widgets
            newState.questions.sort((a, b) => a.orderList - b.orderList);
            return newState

        case constants.ADD_QUESTION:
            return {
                questions: [
                    ...state.ADD_QUESTION,
                    {
                        id: state.questions.length + 1,
                        text: '',
                        widgetType: 'Paragraph',
                        size: '2',
                        hrefLink: '',
                        src: '',
                        listType: 'unordered',
                        listItems: '',
                        name: 'widget name',
                        orderList: state.questions.length + 1,

                    }
                ]
            }

        default:
            return state
    }
}
