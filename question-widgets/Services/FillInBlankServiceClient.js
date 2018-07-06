// const FillInBlankQuestion_API_URL = 'http://localhost:8080/api/blanks';
// const FillInBlankQuestion_API_FIND = 'http://localhost:8080/api/exam/examID/blanks';
// const FillInBlankQuestion_API_ID = 'http://localhost:8080/api/blanks/blanksId';


const FillInBlankQuestion_API_URL = 'https://webdev-summerfull-2018.herokuapp.com/api/blanks';
const FillInBlankQuestion_API_FIND = 'https://webdev-summerfull-2018.herokuapp.com/api/exam/examID/blanks';
const FillInBlankQuestion_API_ID = 'https://webdev-summerfull-2018.herokuapp.com/api/blanks/blanksId';


let _singleton = Symbol();

export default class FillInBlankServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FillInBlankServiceClient(_singleton);
        return this[_singleton]
    }

    findAllFillInBlankQuestion() {

        return fetch(FillInBlankQuestion_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllFillInBlankQuestionsForExam(examID) {
        return fetch(
            FillInBlankQuestion_API_FIND
                .replace('examID', examID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateFillInBlankQuestion(examID, FillInBlankQuestion) {
        console.log("yes create fill in blank question");
        return fetch(FillInBlankQuestion_API_FIND.replace('examID', examID),
            {
                body: JSON.stringify(FillInBlankQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }

    deleteFillInBlankQuestion(FillInBlankQuestionId) {
        return fetch(FillInBlankQuestion_API_ID.replace
        ('blanksId', FillInBlankQuestionId), {
            method: 'delete'
        })
    }


    findFillInBlankQuestionById(FillInBlankQuestionId) {
        return fetch(FillInBlankQuestion_API_ID.replace
        ('blanksId', FillInBlankQuestionId))
            .then(function (response) {
                return response.json()

            })
    }

    updateFillInBlankQuestion(FillInBlankQuestionId, FillInBlankQuestion) {
        return fetch(FillInBlankQuestion_API_ID.replace('blanksId', FillInBlankQuestionId),
            {
                body: JSON.stringify(FillInBlankQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}