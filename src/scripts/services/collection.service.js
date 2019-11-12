import { parseDataForEditor } from 'scripts/lib/util.js'
const $http = require('axios');

export class CollectionService{

    constructor(){}

    // GET COLLECTION DATA
    getCollectionData(handle) {

        const Url = `/collections/${handle}?view=json`;
        return $http.get(Url)
            .then((resp)=>{
                return parseDataForEditor(resp);
            }).catch((error)=>{
                console.error(error);
            });
    }

}