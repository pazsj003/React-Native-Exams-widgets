const VariableItem_API_URL = 'https://webdev-summerfull-2018.herokuapp.com/api/variable';
const VariableItem_API_FIND_Fill = 'https://webdev-summerfull-2018.herokuapp.com/api/blanks/blanksID/variable';
const VariableItem_API_ID = 'https://webdev-summerfull-2018.herokuapp.com/api/variable/variableId';


// const VariableItem_API_URL = 'http://localhost:8080/api/variable';
// const VariableItem_API_FIND_Fill = 'http://localhost:8080/api/blanks/blanksID/variable';
// const VariableItem_API_ID = 'http://localhost:8080/api/variable/variableId';


let _singleton = Symbol();



export default class VariableServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new VariableServiceClient(_singleton);
        return this[_singleton]
    }

    findAllOptionItem() {

        return fetch(VariableItem_API_URL)
            .then(function (response) {
                return response.json();
            });

    }





    findAllVariableItemForFill(FillID) {
        return fetch(
            VariableItem_API_FIND_Fill
                .replace('blanksID', FillID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateVariableItemForFill(FillID, Item) {
        console.log("yescreateExan");
        return fetch(VariableItem_API_FIND_Fill.replace('blanksID', FillID),
            {
                body: JSON.stringify(Item),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }





    deleteVariableItem(ItemId) {
        return fetch(VariableItem_API_ID.replace
        ('variableId', ItemId), {
            method: 'delete'
        })
    }


    findVariableItemById(ItemId) {
        return fetch(VariableItem_API_ID.replace
        ('variableId', ItemId))
            .then(function (response) {
                return response.json()

            })
    }

    updateVariableItem(ItemId, Item) {
        return fetch(VariableItem_API_ID.replace('variableId', ItemId),
            {
                body: JSON.stringify(Item),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}