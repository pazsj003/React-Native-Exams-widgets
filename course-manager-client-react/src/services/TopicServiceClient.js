const TOPIC_API_URL = 'http://localhost:8080/api/topic';
const TOPIC_API_FIND = 'http://localhost:8080/api/course/courseID/module/module_ID/lesson/lesson_Id/topic';
const TOPIC_API_DEL = 'http://localhost:8080/api/topic/topicId';
let _singleton = Symbol();

export default class TopicServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicServiceClient(_singleton);
        return this[_singleton]
    }

    findAllTopics() {

        return fetch(TOPIC_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllTopicsForLesson(lessonID) {
        return fetch(
            TOPIC_API_FIND
                .replace('lesson_Id', lessonID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateTopics(lessonID, topic) {
        return fetch(TOPIC_API_FIND.replace('lesson_Id', lessonID),
            {
                body: JSON.stringify(topic),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteTopic(lessonID) {
        return fetch(TOPIC_API_DEL.replace
        ('lessonId', lessonID), {
            method: 'delete'
        })
    }

    findTopicsById(topicId) {
        return fetch(TOPIC_API_URL + '/' + topicId)
            .then(function (response) {
                return response.json()

            })
    }

    updateTopics() {

    }


}