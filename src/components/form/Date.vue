<template>
    <div v-bind:class="Class">
        <label :for="Label" class="active">{{ Label }}</label>
        <v-TimeDate :config="config" v-model="DateData" v-on:input="onInput()"></v-TimeDate>
    </div>
</template>

<script>
    export default {
        name: 'Date',
        data() {
            return {
                Class: this.class,
                DateData: this.date,
                Label: this.label,
                config: {
                    dateFormat: 'Y-m-d',
                },
            };
        },
        props: {
            label: String,
            date: String,
            class: String,
        },
        methods: {
            onInput() {
                this.$emit('input', this.DateData);
            }
        },
    };
</script>