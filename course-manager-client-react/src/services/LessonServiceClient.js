

const LESSON_API_URL = 'https://course-manager-server-sijiazhu.herokuapp.com/api/lesson';
const LESSON_API_FIND = 'https://course-manager-server-sijiazhu.herokuapp.com/api/course/courseID/module/module_ID/lesson';
const LESSON_API_DEL = 'https://course-manager-server-sijiazhu.herokuapp.com/api/lesson/lessonId';
let _singleton = Symbol();

export default  class LessonServiceClient {
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
    findAllLessonssForModule(moduleID){
        return fetch(
            LESSON_API_FIND
                .replace('module_ID', moduleID))
            .then(function (response) {
                return response.json();
            })
    }
    createLesson(moduleID,lesson){
        return fetch(LESSON_API_FIND.replace('module_ID', moduleID),
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