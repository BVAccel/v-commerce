import { parseDataForEditor } from 'scripts/lib/util.js'
const $http = require('axios');

export class ProductService{

    constructor(){}

    /**
     * GET PRODUCT DATA
     * @param {product handle: String} handle
    */
    getProductData(handle) {
      console.log('HANDLE', handle)
      const Url = `/products/${handle}.js`;
      return $http.get(Url)
      .then((resp) => {
        console.log('resp', resp);
        return parseDataForEditor(resp);
      })
      .catch((error) => console.error('[ERROR]', error));
    }





    // !! THIS STILL NEEDS TO BE TESTED - !!

    // use this example
    // function getUserAccount() {
    //     return axios.get('/user/12345');
    //   }

    //   function getUserPermissions() {
    //     return axios.get('/user/12345/permissions');
    //   }

    //   axios.all([getUserAccount(), getUserPermissions()])
    //     .then(axios.spread(function (acct, perms) {
    //       // Both requests are now complete
    //     }));

    /**
     * GET PRODUCTS DATA
     * @param {array or handle strings} handles
     */
    // getProductsData(handles) {
    //     let vm = this;
    //     let promises = [];

    //     if(handles){
    //         for (let i = 0; i < handles.length; i++) {
    //             const handle = handles[i];
    //             // store promises
    //             promises.push(vm.getProductData(handle))
    //         }
    //     }

    //     // Wait on all promises to resolve before returning data.
    //     return Promise.all(promises).then((resp)=>{
    //         resolve(resp);
    //     })
    // }



}