import { parseDataForEditor } from 'scripts/lib/util.js'
const $http = require('axios');

export class CollectionService{

    constructor(){}

    // GET COLLECTION DATA
    getCollectionData(handle) {
        return new Promise((resolve, reject) => {
            const getCollection = `/collections/${handle}?view=json`;
            $http.get(getCollection)
                .then(function (resp) {
                    resolve(parseDataForEditor(resp));
                }, function (error) {
                    reject(error);
                });
        })
    }



}