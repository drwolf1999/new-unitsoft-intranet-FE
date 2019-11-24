<template>
    <div v-bind:class="Class" class="material">
        <label>{{ Label }}</label>
        <datetime no-label minute-interval="5" format="hh:mm" output-format="hh:mm a" v-model="TimeData" v-on:input="onInput()" only-time></datetime>
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
