<template>
    <v-btn :text="TextBtn" :color="color">{{ content }}</v-btn>
</template>

<script>
    export default {
        name: 'Button',
        data() {
            return {
                TextBtn: this.textBtn === undefined ? false : this.textBtn,
                color: this.Color === undefined ? 'normal' : this.Color,
            };
        },
        props: {
            content: {type: String, default: 'Button',},
            Color: {type: String, default: 'normal',},
            textBtn: {type: Boolean, default: false,}
        },
        methods: {}
    };
</script>
