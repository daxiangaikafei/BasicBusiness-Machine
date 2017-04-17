<template>
	<div class="tag-container">
		<div class="tag-item" v-on:click="invokeSendMsg(tag.value,tag.tagDetailId)" v-for="tag in tagList.items">
			{{ tag.value }}
		</div>
	</div>
</template>
<script>
	export default {
		name: 'dialogTag',
		props: ['tagList'],
		methods: {
			invokeSendMsg: function(value,id){
				this.$emit('sendMsg',value,id);
			}
		}
	}
</script>
<style lang="less">
	.tag-container{
		position: absolute;
		bottom: 55px;
		width: 100%;
		overflow-y: auto;
		white-space: nowrap;
		.tag-item{
			position: relative;
			display: inline-block;
			border-radius: 20px 20px;
			height: 30px;
			line-height: 30px;
			border: solid 1px #d5d5d5;
			margin: 0 10px;
			padding: 0 8px;
		}
	}
</style>
