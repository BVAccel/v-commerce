// Template
<template>
    <div> <!-- No tempalte in dto component  --> </div>
</template>

// Javascript
<script>

    /**
     * Note: this component is purely a DTO component. It facilitates the liquid
     * created JSON object into the the vuew store. In this case a general link list
     * to the link list DTO VueX store.
     */

    import { DtoDispatch } from 'scripts/store/dispatch.js';

    export default {
        name: 'LinkListDto',
        computed: {},
        props: {
            handle: String,
            dto: Object
        },
        methods: {},
        created() {
            // Set the link list dto in the vue store.
            this.$store.dispatch(DtoDispatch.setLinkList,
            {
                handle: this.handle,
                dto: this.dto
            })
        },
    };
</script>

// SCSS
<style lang="scss" scoped>
    //  No SCSS in dto component
</style>
