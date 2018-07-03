const MultipleChoice_API_URL = 'http://localhost:8080/api/choice';
const MultipleChoice_API_FIND = 'http://localhost:8080/api/exam/examID/choice';
const MultipleChoice_API_ID = 'http://localhost:8080/api/choice/choiceId';
let _singleton = Symbol();

export default class MultipleChoiceServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MultipleChoiceServiceClient(_singleton);
        return this[_singleton]
    }

    findAllMultipleChoiceQuestion() {

        return fetch(MultipleChoice_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllMultipleChoiceQuestionsForExam(examID) {
        return fetch(
            MultipleChoice_API_FIND
                .replace('examID', examID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateMultipleChoiceQuestion(MultipleChoiceQuestionId, MultipleChoiceQuestion) {
        console.log("yescreateExan");
        return fetch(MultipleChoice_API_FIND.replace('choiceId', MultipleChoiceQuestionId),
            {
                body: JSON.stringify(MultipleChoiceQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }

    deleteMultipleChoiceQuestion(MultipleChoiceQuestionId) {
        return fetch(MultipleChoice_API_ID.replace
        ('choiceId', MultipleChoiceQuestionId), {
            method: 'delete'
        })
    }


    findMultipleChoiceQuestionById(MultipleChoiceQuestionId) {
        return fetch(MultipleChoice_API_ID.replace
        ('choiceId', MultipleChoiceQuestionId))
            .then(function (response) {
                return response.json()

            })
    }

    updateMultipleChoiceQuestion(MultipleChoiceQuestionId, MultipleChoiceQuestion) {
        return fetch(MultipleChoice_API_ID.replace('choiceId', MultipleChoiceQuestionId),
            {
                body: JSON.stringify(MultipleChoiceQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}