<template>
    <transition name="slide-fade">
        <div class="cmodal">
            <div class="cmodal__header">
                <div class="cmodal__header-title">{{ popupTitle }}</div>
                <i @click="closeModal" class="material-icons">close</i>
            </div>
            <div class="cmodal__content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ModalBlock",
    props: {
        popupTitle: {
            type: String,
            default: "Окно",
        },
    },
    data() {
        return {};
    },
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
    },
};
</script>

<style lang="scss" scope>
.cmodal {
    min-width: 600px;
    box-shadow: 0 0 17px 0 #e7e7e7;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    font-size: 1.1em;
    position: fixed;
    top: 50px;
    left: calc(50% - 200px);
    background: white;
    // padding: 8px 16px;
    &__header,
    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100px;
        background: rgb(34, 123, 255);
        color: white;
        padding: 0 24px;
    }
    &__footer {
        justify-content: flex-end;
        background: rgb(240, 240, 240);
    }
    &__header i {
        cursor: pointer;
    }
    &__content {
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        background: white;
        padding: 16px;
        min-height: 500px;
        width: 100%;
    }
    button {
        box-shadow: none;
        border: none;
        padding: 5px;
        margin: 0 5px;
    }
    .ok {
        background: rgb(10, 233, 84);
        color: white;
    }
    .cancel {
        background: rgb(223, 1, 1);
        color: rgb(241, 241, 241);
    }
}

.slide-fade-enter-active {
    transition: all 0.1s ease;
}
.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
</style>
