<template>
    <div v-bind:class="Class">
        <label :for="name" class="active">{{ name }}</label>
        <model-list-select style="width: 100%;" v-model="selectedData" :list="selectList" v-on:input="onInput()" option-value="id" option-text="name"></model-list-select>
    </div>
</template>

<script>
	import {ModelListSelect} from 'vue-search-select';

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
			ModelListSelect,
		}
	};
</script>
