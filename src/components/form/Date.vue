<template>
    <div>
        <datetime only-date :label="Label" format="YYYY-MM-DD" formatted="ll" v-model="DateData" v-on:input="onInput()"></datetime>
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
