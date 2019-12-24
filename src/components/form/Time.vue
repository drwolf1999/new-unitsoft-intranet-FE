<template>
    <datetime only-time :label="Label" format="hh:mm a" formatted="hh:mm a" v-model='TimeData' v-on:input="onInput()"></datetime>
</template>

<script>
	export default {
		name: 'Time',
		data() {
			return {
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
	};
</script>
