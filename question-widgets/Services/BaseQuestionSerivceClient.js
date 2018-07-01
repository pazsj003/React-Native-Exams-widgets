const Assignment_API_URL = 'http://localhost:8080/api/assignment';
const Assignment_API_FIND = 'http://localhost:8080/api/topic/topicID/assignment';
const Assignment_API_ID = 'http://localhost:8080/api/assignment/assignmentId';
let _singleton = Symbol();

export default class BaseQuestionSerivceClientt {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new BaseQuestionSerivceClientt(_singleton);
        return this[_singleton]
    }

    findAllBaseQuestion() {

        return fetch(Assignment_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllBaseQuestionsForExam(topicID) {
        return fetch(
            Assignment_API_FIND
                .replace('topicID', topicID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateBaseQuestion(assignmentId, assign) {
        console.log("yescreateExan");
        return fetch(Assignment_API_FIND.replace('assignmentId', assignmentId),
            {
                body: JSON.stringify(assign),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }

    deleteBaseQuestion(assignmentID) {
        return fetch(Assignment_API_ID.replace
        ('assignmentId', assignmentID), {
            method: 'delete'
        })
    }


    findBaseQuestionById(assignmentId) {
        return fetch(Assignment_API_ID.replace
        ('assignmentId', assignmentID))
            .then(function (response) {
                return response.json()

            })
    }

    updateBaseQuestion(assignmentId, assign) {
        return fetch(Assignment_API_ID.replace('assignmentId', assignmentId),
            {
                body: JSON.stringify(assign),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}