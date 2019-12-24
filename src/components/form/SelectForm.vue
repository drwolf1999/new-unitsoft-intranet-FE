<template>
    <div>
        <model-list-select :placeholder="name" style="width: 100%;" v-model="selectedData" :list="selectList" v-on:input="onInput()" option-value="id" option-text="name"></model-list-select>
    </div>
</template>

<script>
	import {ModelListSelect} from 'vue-search-select';

	export default {
		name: 'SelectForm',
		data() {
			return {
				selectedData: null,
			};
		},
		props: {
			name: String,
			selectList: Array,
		},
		methods: {
			onInput() {
				// emit this data to parent
				this.$emit('input', this.selectedData);
			},
		},
		components: {
			ModelListSelect,
		}
	};
</script>
