
const Assignment_API_URL = 'https://webdev-summerfull-2018.herokuapp.com/api/assignment';
const Assignment_API_FIND = 'https://webdev-summerfull-2018.herokuapp.com/api/topic/topic_ID/assignment';
const Assignment_API_ID = 'https://webdev-summerfull-2018.herokuapp.com/api/assignment/assignmentId';

// const Assignment_API_URL = 'http://localhost:8080/api/assignment';
// const Assignment_API_FIND = 'http://localhost:8080/api/topic/topic_ID/assignment';
// const Assignment_API_ID = 'http://localhost:8080/api/assignment/assignmentId';
let _singleton = Symbol();

export default class AssignmentServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentServiceClient(_singleton);
        return this[_singleton]
    }

    findAllAssignment() {

        return fetch(Assignment_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllAssignmentsForTopic(topicID) {
        return fetch(
            Assignment_API_FIND
                .replace('topic_ID', topicID))
            .then(function (response) {
                return response.json();
            })
    }

    createAssignment(topicID, assign) {
        console.log("yes createAssignment");
        return fetch(Assignment_API_FIND.replace('topic_ID', topicID),
            {
                body: JSON.stringify(assign),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }

    deleteAssignment(assignmentID) {
        return fetch(Assignment_API_ID.replace
        ('assignmentId', assignmentID), {
            method: 'delete'
        })
    }


    findAssignmentById(assignmentId) {
        return fetch(Assignment_API_ID.replace
        ('assignmentId', assignmentID))
            .then(function (response) {
                return response.json()

            })
    }

    updateAssignment(assignmentId, assign) {
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