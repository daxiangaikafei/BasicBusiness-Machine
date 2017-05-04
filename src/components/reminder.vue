<template>
	<transition name="custom-classes-transition"
    enter-active-class="animated bounceInUp"
    leave-active-class="animated bounceOutDown">
		<div class="reminder">
			<p>亲抱歉，我没有听清楚</p>
			<p>请再说一遍</p>
			<img src="../static/images/try-again.png"/>
		</div>
	</transition>
</template>
<script>
import '../static/style/animate.min.css'
	export default {
		name: 'reminder'
	}
</script>
<style lang="less">
	.reminder{
		background: #fff;
		text-align: center;
		position: absolute;
		width: 100%;
		bottom: 45px;
		p{
			font-size: 13px;
			color: #919090;
			line-height: 20px;
		}
		p:nth-of-type(1){
			margin-top: 20px;
		}
		p:nth-of-type(2){
			margin-bottom: 10px;
		}
		img{
			margin-bottom: 15px;
			width: 30px;
		}
	}
</style>
