<template>
    <loading
        transition="fade"
        :active.sync="isLoading"
        :is-full-page="fullPage"
    >
    </loading>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name: "LoadingBlock",
    components: {
        Loading,
    },
    props: {
        isLoading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            fullPage: true,
        };
    },
};
</script>
