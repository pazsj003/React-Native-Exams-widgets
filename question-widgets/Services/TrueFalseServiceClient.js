const TrueFalseQuestion_API_URL = 'http://localhost:8080/api/truefalse';
const TrueFalseQuestion_API_FIND = 'http://localhost:8080/api/exam/examID/truefalse';
const TrueFalseQuestion_API_ID = 'http://localhost:8080/api/truefalse/TrueFalseId';
let _singleton = Symbol();

export default class TrueFalseServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TrueFalseServiceClient(_singleton);
        return this[_singleton]
    }

    findAllTrueFalseQuestion() {

        return fetch(TrueFalseQuestion_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllTrueFalseQuestionsForExam(examID) {
        return fetch(
            TrueFalseQuestion_API_FIND
                .replace('examID', examID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateTrueFalseQuestion(TrueFalseQuestionId, TrueFalseQuestion) {
        console.log("yescreateExan");
        return fetch(TrueFalseQuestion_API_FIND.replace('TrueFalseId', TrueFalseQuestionId),
            {
                body: JSON.stringify(TrueFalseQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }

    deleteTrueFalseQuestion(TrueFalseQuestionId) {
        return fetch(TrueFalseQuestion_API_ID.replace
        ('TrueFalseId', TrueFalseQuestionId), {
            method: 'delete'
        })
    }


    findTrueFalseQuestionById(baseQuestionId) {
        return fetch(TrueFalseQuestion_API_ID.replace
        ('TrueFalseId', baseQuestionId))
            .then(function (response) {
                return response.json()

            })
    }

    updateTrueFalseQuestion(TrueFalseQuestionId, TrueFalseQuestion) {
        return fetch(TrueFalseQuestion_API_ID.replace('TrueFalseId', TrueFalseQuestionId),
            {
                body: JSON.stringify(TrueFalseQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}