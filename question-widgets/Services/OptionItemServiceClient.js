// const OptionItem_API_URL = 'http://localhost:8080/api/option';
// const OptionItem_API_FIND_Multi = 'http://localhost:8080/api/choice/choiceID/option';
// const OptionItem_API_ID = 'http://localhost:8080/api/option/optionId';

const OptionItem_API_URL = 'https://webdev-summerfull-2018.herokuapp.com/api/option';
const OptionItem_API_FIND_Multi = 'https://webdev-summerfull-2018.herokuapp.com/api/choice/choiceID/option';
const OptionItem_API_ID = 'https://webdev-summerfull-2018.herokuapp.com/api/option/optionId';


let _singleton = Symbol();



export default class OptionItemServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new OptionItemServiceClient(_singleton);
        return this[_singleton]
    }

    findAllOptionItem() {

        return fetch(OptionItem_API_URL)
            .then(function (response) {
                return response.json();
            });

    }

    findAllOptionItemForMulti(multiID) {
        return fetch(
            OptionItem_API_FIND_Multi
                .replace('choiceID', multiID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateOptionItemForMulti(multiID, Item) {
        console.log("yescreateExan");
        return fetch(OptionItem_API_FIND_Multi.replace('choiceID', multiID),
            {
                body: JSON.stringify(Item),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }


    deleteOptionItem(ItemId) {
        return fetch(OptionItem_API_ID.replace
        ('optionId', ItemId), {
            method: 'delete'
        })
    }


    findOptionItemById(ItemId) {
        return fetch(OptionItem_API_ID.replace
        ('optionId', ItemId))
            .then(function (response) {
                return response.json()

            })
    }

    updateOptionItem(ItemId, Item) {
        return fetch(OptionItem_API_ID.replace('optionId', ItemId),
            {
                body: JSON.stringify(Item),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}