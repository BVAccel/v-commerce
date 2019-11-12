const $http = require('axios');
const ChangeCart = '/cart/change.js';
const AddToCart = '/cart/add.js';
const ClearCart = '/cart/clear.js';
const GetCart = '/cart.js';

import { ProductService } from './product.service';

/**
 TODO : The cart ajax request is missing a few item so we
 need to use the product service to get those missing line items.
    - This is an edge case might want to wait till needed.
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

        return $http.post(ChangeCart,{ quantity:qty,id:key })
            .then((resp)=>{
                    return resp.data;
            }).catch((error)=>{
                console.error(error);
            });

    }


    /** CHANGE ITEM IN CART
     * @param { item quantity } qty
     * @param { item varient ID } variant_id
     */
    addItem(qty,variant_id,properties){

        return $http.post(AddToCart, {
                quantity:qty,
                id:variant_id,
                properties: properties
            })
            .then((productData)=>{
                /** this resp is the product data - must update store
                cart data with additional call*/
                this.getCartData().then((resp)=>{
                    // send cart data back to store.
                    return resp.data;
                })
            })
            .catch((error)=>{
                console.error(error);
            });
    }


    // GET CART DATA
    getCartData() {
        const TimeStamp = new Date().getTime();
        const Url = `${GetCart}?q=${TimeStamp}`;
        return $http.get(Url)
            .then((resp)=>{
                return resp;
            })
            .catch((error)=>{
                console.error(error);
            });
    }


    /** UPDATE ITEM IN CART
     * @param { item quantity } qty
     * @param { item key } key
     */
    updateItem(qty,key){
        const Url = `updates[${key}]=${qty}`;
        return  $http.post(UpdateCart,Url)
            .then((resp)=>{
                return resp.data;
            }).catch((error)=>{
                console.error(error);
            });
    }


    /** CLEAR ALL ITEMS IN CART */
    clearCart(){

        return  $http.post(ClearCart)
            .then((resp)=>{
                return resp.data;
            }).catch((error)=>{
                console.error(error);
            });

    }



    // GET CART DATA WITH EXTRA DATA
    /** TODO - This is not functional, com back when needed seems to been an edge case */
    // getCartDataExtra() {

    //         const timestamp = new Date().getTime()
    //         const getCart = `${GetCart}?q=${timestamp}`;

    //         $http.get(getCart)
    //             .then(function (resp) {

    //                 /**
    //                 Cart request does not have all the values that we need so need to requet each item
    //                 and map addition values
    //                 **/
    //                 let items = resp.data.items;
    //                 for (let i = 0; i < items.length; i++) {
    //                     const handle = items[i].handle;
    //                     vm.productService.getProductData(handle).then((product)=>{
    //                        // map cart data and product data with addition info
    //                     })
    //                 }

    //                 resolve(resp);
    //             }, function (error) {
    //                 reject(error);
    //             });

    // }



}