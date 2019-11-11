// Template
<template>
<div>
    <button
            @click="onButtonClick()">
            Add to cart
        </button>

        <button
            @click="onButtonClick2()">
            get collection
        </button>
    </div>
</template>

// Javascript
<script>
import { mapState } from 'vuex'
import { CartDispatch, CollectionDispatch } from 'scripts/store/dispatch.js';

export default {
    name: 'TestButton',
    computed: {
     ...mapState({
        checkout: state => state.cart.checkout
      }),
    },
    props: {
        product: Object
    },
    methods: {

        onButtonClick() {
            // get first varient for test purposes
            let varId = this.product.variants[0].id;
            this.$store.dispatch(CartDispatch.addItem,{
                id: varId,
                quantity: 1
            });
            // this.$store.dispatch('cart/openSidecart');
        },

        onButtonClick2(){
             // get first varient for test purposes
            let handle = 'Sunglasses';
            this.$store.dispatch(CollectionDispatch.setCollection,handle);

        }
    },
    created() {

    },
};
</script>

// SCSS
<style lang="scss" scoped>

</style>
