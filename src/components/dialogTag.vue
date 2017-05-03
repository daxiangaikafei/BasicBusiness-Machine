<template>
	<div class="tag-container">
		<div class="tag-item" v-on:click="invokeSendMsg(tag.value,tag.dirId)" v-for="tag in tagList.items">
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
				this.$emit('sendTagMsg',value,id);
			}
		}
	}
</script>
<style lang="less">
	.tag-container{
        position: fixed;
		bottom: 55px;
		width: 100%;
		overflow-y: auto;
		white-space: nowrap;
        background: #F5F5F5;
		.tag-item{
			position: relative;
			display: inline-block;
			border-radius: 20px 20px;
			height: 30px;
			line-height: 30px;
			border: solid 1px #d5d5d5;
			margin: 0 10px;
			padding: 0 8px;
			max-width: 100px;
    		overflow: hidden;
    		text-overflow: ellipsis;
		}
	}
</style>
