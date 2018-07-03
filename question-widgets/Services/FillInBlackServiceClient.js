const FillInBlackQuestion_API_URL = 'http://localhost:8080/api/blanks';
const FillInBlackQuestion_API_FIND = 'http://localhost:8080/api/exam/examID/blanks';
const FillInBlackQuestion_API_ID = 'http://localhost:8080/api/blanks/blanksId';

let _singleton = Symbol();

export default class FillInBlackServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FillInBlackServiceClient(_singleton);
        return this[_singleton]
    }

    findAllFillInBlackQuestion() {

        return fetch(FillInBlackQuestion_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllFillInBlackQuestionsForExam(examID) {
        return fetch(
            FillInBlackQuestion_API_FIND
                .replace('examID', examID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateFillInBlackQuestion(FillInBlackQuestionId, FillInBlackQuestion) {
        console.log("yescreateExan");
        return fetch(FillInBlackQuestion_API_FIND.replace('blanksId', FillInBlackQuestionId),
            {
                body: JSON.stringify(FillInBlackQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }

    deleteFillInBlackQuestion(FillInBlackQuestionId) {
        return fetch(FillInBlackQuestion_API_ID.replace
        ('blanksId', FillInBlackQuestionId), {
            method: 'delete'
        })
    }


    findFillInBlackQuestionById(FillInBlackQuestionId) {
        return fetch(FillInBlackQuestion_API_ID.replace
        ('blanksId', FillInBlackQuestionId))
            .then(function (response) {
                return response.json()

            })
    }

    updateFillInBlackQuestion(FillInBlackQuestionId, FillInBlackQuestion) {
        return fetch(FillInBlackQuestion_API_ID.replace('blanksId', FillInBlackQuestionId),
            {
                body: JSON.stringify(FillInBlackQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}