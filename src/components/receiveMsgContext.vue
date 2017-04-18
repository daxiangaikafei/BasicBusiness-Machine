<template>
	<div class="receiveMsg-context" v-if="item.receiveObj.questionType == 'normal'">
		<img class="img-icon" src="../static/images/receiveMsg-icon.png">
		<div class="receiveMsg-context-text">{{ item.receiveObj.data.value }}
		</div>
	</div>
</template>
<script>
	export default {
		name: 'receiveMsgContext',
		props: ['item']
	}
	
</script>
<style lang="less">
	.receiveMsg-context{
		text-align: left;
		margin-top: 30px;
		.receiveMsg-context-text{
			display: inline-block;
			position: relative;
		    min-height: 50px;
		    line-height: 20px;
		    border: solid 1px #fff;
		    background: #fff;
		    border-radius: 10px;
		    vertical-align: top;
		    max-width: 250px;
		    margin-left: 20px;
		    padding: 15px 17.5px 15px 17.5px;
		    max-height: 250px;
	        overflow: hidden;
	        overflow-y: scroll;
		    .text-link{
		    	color: #427cf3;
		    	text-decoration: underline;
		    }
		}
		.receiveMsg-context-text:before{
			content: '';  
		    width: 0;  
		    height: 0;  
		    border: 10px solid transparent;  
		    border-right-color: #fff;  
		    position: absolute;  
		    right: 100%;  
		    top: 40%;  
		    margin-top: -10px;
		}
		.receiveMsg-context-text:after{
			content: "";  
			width: 0;  
			height: 0;  
			border: 8px solid transparent;  
			border-right-color: #FFF;  
			position: absolute;  
			right: 100%;  
			top: 40%;  
			margin-top: -8px;
		}
		img{
			margin-left: 12px;
		}
	}
</style>