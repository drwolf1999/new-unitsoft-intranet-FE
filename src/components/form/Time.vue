<template>
    <div v-bind:class="Class">
        <label :for="Label" class="active">{{ Label }}</label>
        <v-TimeDate :config="config" v-model="TimeData" v-on:input="onInput()"></v-TimeDate>
    </div>
</template>

<script>
    export default {
        name: 'Time',
        data() {
            return {
                Class: this.class,
                TimeData: this.time,
                Label: this.label,
                config: {
                    time_24hr: true,
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: 'H:i',
                },
            };
        },
        props: {
            label: String,
            time: String,
            class: String,
        },
        methods: {
            onInput() {
                this.$emit('input', this.TimeData);
            }
        },
    };
</script>