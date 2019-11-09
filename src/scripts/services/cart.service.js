const $http = require('axios');
const ChangeCart = '/cart/change.js';
const AddToCart = '/cart/add.js';
const ClearCart = '/cart/clear.js';
const GetCart = '/cart.js';

import { ProductService } from './product.service';

/**
 TODO : The cart ajax request is missing a few item so we
 need to use the product service to get those missing line items.
 **/

export class CartService{

    constructor(productService = new ProductService()){
        this.productService = productService;
    }

    /** CHANGE ITEM IN CART
     * @param { item quantity } qty
     * @param { item key } key
     */
    changeItem(qty,key){
        return new Promise((resolve,reject)=>{
            $http.post(ChangeCart,{ quantity:qty,id:key })
            .then(function (resp) {
                    resolve(resp.data);
                },function (error) {
                    reject(error);
                }
            );
        })
    }


    /** CHANGE ITEM IN CART
     * @param { item quantity } qty
     * @param { item varient ID } variant_id
     */
    addItem(qty,variant_id,properties){
        let vm = this;
        return new Promise((resolve,reject)=>{
            $http.post(AddToCart, {
                quantity:qty,
                id:variant_id,
                properties: properties
            })
            .then(function (resp) {
                // check to see what the resp is here first
                vm.getCartData().then((resp)=>{
                    resolve(resp.data);
                })
                },function (error) {
                    reject(error);
                }
            );
        })
    }


    // GET CART DATA
    getCartData() {
        let vm = this;
        return new Promise((resolve, reject) => {
            const timestamp = new Date().getTime()
            const getCart = `${GetCart}?q=${timestamp}`;
            $http.get(getCart)
                .then(function (resp) {
                    resolve(resp);
                }, function (error) {
                    reject(error);
                });
        })
    }



    // GET CART DATA WITH EXTRA DATA
    /** TODO - This is not functional, com back when needed seems to been an edge case */
    getCartDataExtra() {
        let vm = this;
        return new Promise((resolve, reject) => {
            const timestamp = new Date().getTime()
            const getCart = `${GetCart}?q=${timestamp}`;

            $http.get(getCart)
                .then(function (resp) {

                    /**
                    Cart request does not have all the values that we need so need to requet each item
                    and map addition values
                    **/
                    let items = resp.data.items;
                    for (let i = 0; i < items.length; i++) {
                        const handle = items[i].handle;
                        vm.productService.getProductData(handle).then((product)=>{
                           // map cart data and product data with addition info
                        })
                    }

                    resolve(resp);
                }, function (error) {
                    reject(error);
                });
        })
    }


    /** UPDATE ITEM IN CART
     * @param { item quantity } qty
     * @param { item key } key
     */
    updateItem(qty,key){
        let vm = this;
        return new Promise((resolve,reject)=>{
            $http.post(UpdateCart, `updates[${key}]=${qty}` )
            .then(function (resp) {
                    resolve(resp.data);
                },function (error) {
                    reject(error);
                }
            );
        })
    }


    /** CLEAR ALL ITEMS IN CART */
    clearCart(){
        let vm = this;
        return new Promise((resolve,reject)=>{
            $http.post(ClearCart)
            .then(function (resp) {
                    resolve(resp.data);
                },function (error) {
                    reject(error);
                }
            );
        })
    }


}