
const MODULE_API_URL = 'https://course-manager-server-sijiazhu.herokuapp.com/api/course/CID/module';

const MODULE_API_URL_DEL = 'https://course-manager-server-sijiazhu.herokuapp.com/api/module/MODULE_ID';
const MODULE_API_URL_FIND = 'https://course-manager-server-sijiazhu.herokuapp.com/api/module';
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
    findModuleById(moduleId){
        return fetch(MODULE_API_URL_FIND + '/' + moduleId)
            .then(function (response) {
                return response.json()

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

