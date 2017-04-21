<template>
<!-- <transition name="custom-classes-transition"
    enter-active-class="animated bounceInUp"
    leave-active-class="animated bounceOutLeft"> -->
	<div class="sendMsg">
		<div class="sendMsg-container">
			<div class="sendMsg-text">{{item.text}}</div>
			<img class="img-icon" src="../static/images/sendMsg-icon.png">
		</div>
	</div>
<!-- </transition> -->
</template>
<script>
	import '../static/style/animate.min.css'
	export default {
		name: 'sendMsg',
		props: ['item']
	}
	
</script>
<style lang="less">
	.sendMsg-container{
		width: 100%;
		text-align: right;
		margin-top: 30px;
		.sendMsg-text{
			display: inline-block;
			position: relative;
		    min-height: 50px;
		    line-height: 20px;
		    border: solid 1px #fff;
		    background: #fff;
		    border-radius: 10px;
		    vertical-align: top;
		    max-width: 250px;
		    margin-right: 20px;
		    padding: 15px 17.5px 15px 17.5px;
		}
		.sendMsg-text:before{
			content: '';  
		    width: 0;  
		    height: 0;  
		    border: 10px solid transparent;  
		    border-left-color: #fff;  
		    position: absolute;  
		    left: 100%;  
		    top: 20px;  
		    margin-top: -10px;
		}
		.sendMsg-text:after{
			content: "";  
			width: 0;  
			height: 0;  
			border: 8px solid transparent;  
			border-left-color: #fff;  
			position: absolute;  
			left: 100%;  
			top: 20px;  
			margin-top: -8px;
		}
		img{
			margin-right: 12px;
		}

	}
</style>