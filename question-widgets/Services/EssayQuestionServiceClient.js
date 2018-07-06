const ESSAYQuestion_API_URL = 'https://webdev-summerfull-2018.herokuapp.com/api/essay';
const ESSAYQuestion_API_FIND = 'https://webdev-summerfull-2018.herokuapp.com/api/exam/examID/essay';
const ESSAYQuestion_API_ID = 'https://webdev-summerfull-2018.herokuapp.com/api/essay/essayId';


// const ESSAYQuestion_API_URL = 'http://localhost:8080/api/essay';
// const ESSAYQuestion_API_FIND = 'http://localhost:8080/api/exam/examID/essay';
// const ESSAYQuestion_API_ID = 'http://localhost:8080/api/essay/essayId';


let _singleton = Symbol();

export default class EssayQuestionServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EssayQuestionServiceClient(_singleton);
        return this[_singleton]
    }

    findAllEssayQuestion() {

        return fetch(ESSAYQuestion_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllEssayQuestionsForExam(examID) {
        return fetch(
            BaseQuestion_API_FIND
                .replace('examID', examID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateEssayQuestion(examID, EssayQuestion) {
        console.log("yes create Essay");
        return fetch(ESSAYQuestion_API_FIND.replace('examID', examID),
            {
                body: JSON.stringify(EssayQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }

    deleteEssayQuestion(easyQuestionId) {
        return fetch(ESSAYQuestion_API_ID.replace
        ('essayId', easyQuestionId), {
            method: 'delete'
        })
    }


    findEssayQuestionById(easyQuestionId) {
        return fetch(ESSAYQuestion_API_ID.replace
        ('essayId', easyQuestionId))
            .then(function (response) {
                return response.json()

            })
    }

    updateEssayQuestion(easyQuestionId, EassyQuestion) {
        return fetch(ESSAYQuestion_API_ID.replace('essayId', easyQuestionId),
            {
                body: JSON.stringify(EassyQuestion),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}