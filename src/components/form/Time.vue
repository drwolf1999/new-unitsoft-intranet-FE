<template>
    <v-dialog ref="dialog" v-model="Open" :return-value.sync="TimeData" persistent width="290px" v-on:input="onInput()">
        <template v-slot:activator="{ on }">
            <v-text-field
                v-model="TimeData"
                label="Picker in dialog"
                prepend-icon="access_time"
                readonly
                v-on="on"
            ></v-text-field>
        </template>
        <v-time-picker v-if="Open" :label="Label" v-model="TimeData" v-on:input="onInput()">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="Open = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(TimeData)">OK</v-btn>
        </v-time-picker>
    </v-dialog>
</template>

<script>

    export default {
        name: 'Time',
        data() {
            return {
                Open: false,
                Class: this.class,
                TimeData: this.time,
                Label: this.label,
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
        components: {
        }
    };
</script>
