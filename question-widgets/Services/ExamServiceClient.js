const EXAM_API_URL = 'http://localhost:8080/api/exam';
const EXAM_API_FIND = 'http://localhost:8080/api/topic/topicID/exam';
const EXAM_API_ID = 'http://localhost:8080/api/exam/examId';
let _singleton = Symbol();

export default class ExamServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamServiceClient(_singleton);
        return this[_singleton]
    }

    findAllExam() {

        return fetch(EXAM_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllExamsForTopic(topicID) {
        return fetch(
            EXAM_API_FIND
                .replace('topicID', topicID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateExams(topicID, exam) {
        console.log("yescreateExan");
        return fetch(EXAM_API_FIND.replace('topicID', topicID),
            {
                body: JSON.stringify(exam),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }

    deleteExam(examID) {
        return fetch(EXAM_API_ID.replace
        ('examId', examID), {
            method: 'delete'
        })
    }

    findExamById(examId) {
        return fetch(EXAM_API_ID.replace
        ('examId', examID))
            .then(function (response) {
                return response.json()

            })
    }

    updateExam(examId, exam) {
        return fetch(EXAM_API_ID.replace('examId', examId),
            {
                body: JSON.stringify(exam),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}