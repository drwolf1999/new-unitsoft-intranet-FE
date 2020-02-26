<template>
    <v-text-field :label="Label" v-model="InputData" v-on:input="onInput()"></v-text-field>
</template>

<script>
    export default {
        name: 'Date',
        data() {
            return {
                Class: this.class,
                InputData: this.data,
                Label: this.label === undefined ? '' : this.label,
                Readonly: !(this.readonly === undefined || this.readonly === false),
            };
        },
        props: {
            label: String,
            data: String,
            class: String,
            readonly: Boolean,
        },
        methods: {
            onInput() {
                this.$emit('input', this.InputData);
            }
        },
    };
</script>
