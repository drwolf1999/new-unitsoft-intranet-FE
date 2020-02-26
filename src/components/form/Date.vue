<template>
    <v-dialog ref="dialog" v-model="showDialog" :return-value.sync="DateData" persistent width="290px" v-on:input="onInput()">
        <template v-slot:activator="{ on }">
            <v-text-field v-model="DateData" label="Picker in dialog" prepend-icon="event" readonly v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="DateData" scrollable v-on:input="onInput()">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="showDialog = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(DateData)">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
    export default {
        name: 'Date',
        data() {
            return {
                showDialog: false,
                DateData: this.date,
                Label: this.label,
            };
        },
        props: {
            label: {type: String, default: ''},
            date: {type: String, default: '2020-12-02'},
        },
        methods: {
            onInput() {
                this.$emit('input', this.DateData);
            }
        },
    };
</script>
