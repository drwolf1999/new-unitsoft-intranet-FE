<template>
    <v-btn :text="text" :color="color">{{ content }}</v-btn>
</template>

<script>
    export default {
        name: 'Button',
        data() {
            return {
                text: this.Text === undefined ? false : this.Text,
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
