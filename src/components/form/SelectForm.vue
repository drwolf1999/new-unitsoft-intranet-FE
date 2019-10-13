<template>
    <div v-bind:class="Class">
        <div class="form-control">
            <label :for="name" class="active">{{ name }}</label>
            <cool-select v-model="selectedData" :items="selectList" label="name" v-on:input="onInput()" item-text="name"
                         item-value="id"></cool-select>
        </div>
    </div>
</template>

<script>
    import {CoolSelect} from 'vue-cool-select';

    export default {
        name: 'SelectForm',
        data() {
            return {
                selectedData: null,
                Class: this.class,
            };
        },
        props: {
            name: String,
            class: String,
            selectList: Array
        },
        methods: {
            onInput() {
                // emit this data to parent
                this.$emit('input', this.selectedData);
            },
        },
        components: {
            CoolSelect,
        }
    };
</script>