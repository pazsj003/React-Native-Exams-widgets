

const LESSON_API_URL = 'http://localhost:8080/api/lesson';
const LESSON_API_FIND = 'http://localhost:8080/api/course/courseID/module/moudle_ID/lesson';
const LESSON_API_DEL = 'http://localhost:8080/api/lesson/lessonId';
let _singleton = Symbol();

class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    findAllLessons(){

        return fetch(LESSON_API_URL)
            .then(function(response){
                return response.json();
            });

    }
    findAllLessonssForModule(moudleID){
        return fetch(
            LESSON_API_FIND
                .replace('moudle_ID', moudleID))
            .then(function (response) {
                return response.json();
            })
    }
    createLesson(moudleID,lesson){
        return fetch(LESSON_API_FIND.replace('moudle_ID', moudleID),
            {   body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }
    deleteLesson(lessonID){
        return fetch(LESSON_API_DEL.replace
        ('lessonId', lessonID), {
            method: 'delete'
        })
    }
    findLessonById(){

    }
    updateLesson(){

    }



}