
const MODULE_API_URL = 'http://localhost:8080/api/course/CID/module';

const MODULE_API_URL_DEL = 'http://localhost:8080/api/module/MODULE_ID';
const MODULE_API_URL_FIND = 'http://localhost:8080/api/module';
let _singleton = Symbol();
export default class ModuleServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId),
            {   body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }
    deleteModule(moduleId) {
        return fetch(MODULE_API_URL_DEL.replace
        ('MODULE_ID', moduleId), {
            method: 'delete'
        })
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }
    findAllModules(){

            return fetch(MODULE_API_URL_FIND)
                .then(function(response){
                    return response.json();
                });

    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleServiceClient(_singleton);
        return this[_singleton]
    }
}

