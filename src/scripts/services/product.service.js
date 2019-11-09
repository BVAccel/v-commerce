import { parseDataForEditor } from 'scripts/lib/util.js'
const $http = require('axios');

export class ProductService{

    constructor(){}

    /**
     * GET PRODUCT DATA
     * @param {product handle String} handle
     */
    getProductData(handle) {
        return new Promise((resolve, reject) => {
            const getProduct = `/products/${handle}.js`;
            $http.get(getProduct)
                .then(function (resp) {
                    resolve(parseDataForEditor(resp));
                }, function (error) {
                    reject(error);
                });
        })
    }


    // !! THIS STILL NEEDS TO BE TESTED !!
    /**
     * GET PRODUCTS DATA
     * @param {array or handle strings} handles
     */
    getProductsData(handles) {
        let vm = this;
        let promises = [];

        if(handles){
            for (let i = 0; i < handles.length; i++) {
                const handle = handles[i];
                // store promises
                promises.push(vm.getProductData(handle))
            }
        }

        // Wait on all promises to resolve before returning data.
        return Promise.all(promises).then((resp)=>{
            resolve(resp);
        })
    }



}