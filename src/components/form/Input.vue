<template>
    <div v-bind:class="Class">
        <md-field>
            <label>{{ Label }}</label>
            <md-input v-model="InputData" v-on:input="onInput()"></md-input>
        </md-field>
    </div>
</template>

<script>
	export default {
		name: 'Date',
		data() {
			return {
				Class: this.class,
				InputData: this.data,
				Label: this.label,
			};
		},
		props: {
			label: String,
			data: String,
			class: String,
		},
		methods: {
			onInput() {
				this.$emit('input', this.InputData);
			}
		},
	};
</script>
