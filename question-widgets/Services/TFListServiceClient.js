// const TRListItem_API_URL = 'http://localhost:8080/api/truefalseList';
// const TRListItem_API_FIND_TF = 'http://localhost:8080/api/truefalse/truefalseID/truefalseList';
// const TRListItem_API_ID = 'http://localhost:8080/api/truefalseList/TFListID';

const TRListItem_API_URL = 'https://webdev-summerfull-2018.herokuapp.com/api/truefalseList';
const TRListItem_API_FIND_TF = 'https://webdev-summerfull-2018.herokuapp.com/api/truefalse/truefalseID/truefalseList';
const TRListItem_API_ID = 'https://webdev-summerfull-2018.herokuapp.com/api/truefalseList/TFListID';


let _singleton = Symbol();



export default class TFListServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TFListServiceClient(_singleton);
        return this[_singleton]
    }

    findAllTFListItem() {

        return fetch(TRListItem_API_URL)
            .then(function (response) {
                return response.json();
            });

    }




    findAllTFListItemForTrueFalse(TruefalseID) {
        console.log("access to findAllOptionItemForTrueFalse Id"+TruefalseID)
        return fetch(
            TRListItem_API_FIND_TF
                .replace('truefalseID', TruefalseID))
            .then(function (response) {
                return response.json();
            })
    }

    CreateTFListItemForTrueFalse(TruefalseID, Item) {
        console.log("yescreateExan");
        return fetch(TRListItem_API_FIND_TF.replace('truefalseID', TruefalseID),
            {
                body: JSON.stringify(Item),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        });


    }




    deleteTRListItem(ItemId) {
        return fetch(TRListItem_API_ID.replace
        ('TFListID', ItemId), {
            method: 'delete'
        })
    }


    findTRListItemById(ItemId) {
        return fetch(TRListItem_API_ID.replace
        ('TFListID', ItemId))
            .then(function (response) {
                return response.json()

            })
    }

    updateTRListItem(ItemId, Item) {
        return fetch(TRListItem_API_ID.replace('TFListID', ItemId),
            {
                body: JSON.stringify(Item),
                headers: {'Content-Type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
            return response.json();
        });
    }


}