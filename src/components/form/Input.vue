<template>
    <div>
        <md-field v-bind:class="Class">
            <label>{{ Label }}</label>
            <md-input :readonly="Readonly" v-model="InputData" v-on:input="onInput()"></md-input>
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
