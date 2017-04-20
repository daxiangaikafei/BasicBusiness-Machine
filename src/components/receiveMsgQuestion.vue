<template>
	<transition name="custom-classes-transition"
    enter-active-class="animated bounceInUp"
    leave-active-class="animated bounceOutLeft">
		<div class="receiveMsg-question" v-if="item.receiveObj.questionType == 'q&a'">
			<div class="receiveMsg-question-container">
				<img class="img-icon" src="../static/images/receiveMsg-icon.png">
				<div class="receiveMsg-question-list">
					<div class="receiveMsg-question-item" v-for="(question,index) in item.receiveObj.data">
						<header>
							<img class="question-icon" src="../static/images/question-icon.png">
							<span class="question-title">{{ question.dirName }}</span>
							<span class="action-arrow" v-on:click="arrowClick($event)" v-bind:class="index == 0 ? 'action-arrow-up' : 'action-arrow-down'"></span>
						</header>
						<section v-bind:class="index > 0 ? 'hide-subtitle' : ''">
							<div class="question-subtitle" v-for="subQuestion in question.questions" v-on:click="invokeSendMsg(subQuestion.question,subQuestion.id)">{{ subQuestion.question }}</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import '../static/style/animate.min.css'
	export default {
		name: 'receiveMsgQuestion',
		props: ['item'],
		methods: {
			invokeSendMsg: function (title,id) {
				this.$emit('getAnswer',title,id)
			},
			arrowClick: function(event) {
				if(event.target.className.indexOf('action-arrow-up') != -1){
					event.target.className = 'action-arrow action-arrow-down';
					event.target.parentElement.parentElement.lastChild.style = 'display:none';
				}else if(event.target.className.indexOf('action-arrow-down') != -1){
					event.target.className = 'action-arrow action-arrow-up';
					event.target.parentElement.parentElement.lastChild.style = 'display:block';
				}
			}
		}
	}
</script>
<style lang="less">
	.receiveMsg-question{
		.receiveMsg-question-container{
			text-align: left;
			margin-top: 30px;
			.receiveMsg-question-list{
				display: inline-block;
			    position: relative;
			    min-height: 50px;
			    line-height: 20px;
			    border-radius: 10px;
			    vertical-align: top;
			    width: 280px;
			    margin-left: 20px;
			    .receiveMsg-question-item{
			    	header{
			    		height: 45px;
			    		line-height: 45px;
			    		font-size: 15px;
			    		background: #fff;
			    		border-left: solid 1px #fff;
			    		border-right: solid 1px #fff;
			    	}
			    	section{
			    		background: #eee;
			    	}
			    	section.hide-subtitle{
						display: none;
			    	}
			    	.question-icon{
			    		width: 16px;
			    		height: 16px;
			    		margin-left: 15px;
			    		vertical-align: middle;
			    	}
			    	.question-title{
			    		margin-left: 10px;
			    		color: #35353f;
			    	}
			    	.action-arrow{
			    		float: right;
			    		margin-right: 12px;
			    		width: 10px;
	    		        height: 10px;
	    		        display: inline-block;
	    		        border-bottom: solid 1px #CDC9C9;
	    		        border-left: solid 1px #CDC9C9;
	    		        margin-left: 10px;
	    		        transform: rotate(135deg);
	    		        -webkit-transform: rotate(135deg);
	    		        -moz-transform: rotate(135deg);
	    		        margin-bottom: 0;
	    		        vertical-align: middle;
			    	}
			    	.action-arrow.action-arrow-up{
			    	    margin-bottom: 5px;
			    	    -webkit-animation-timing-function: ease-out;
	    	            -webkit-animation-duration: 200ms;
	    	            -moz-animation-timing-function: ease-out;
	    	            -moz-animation-duration: 200ms;
	    	            animation-timing-function: ease-out;
	    	            animation-duration: 200ms;
	    	            -webkit-transform: rotate(135deg);
	    	            -moz-transform: rotate(135deg);
	    	            transform: rotate(135deg);
	    	            -webkit-animation-name: arrow-down;
	    	            -moz-animation-name: arrow-down;
	    	            animation-name: arrow-down;
	    	            margin-top: 20px;
			    	}
	    	       
			    	.action-arrow.action-arrow-down{
		    	        -webkit-animation-timing-function: ease-out;
		    	        -webkit-animation-duration: 200ms;
		    	        -moz-animation-timing-function: ease-out;
		    	        -moz-animation-duration: 200ms;
		    	        animation-timing-function: ease-out;
		    	        animation-duration: 200ms;
		    	        -webkit-transform: rotate(-45deg);
		    	        -moz-transform: rotate(-45deg);
		    	        transform: rotate(-45deg);
		    	        -webkit-animation-name: arrow-up;
		    	        -moz-animation-name: arrow-up;
		    	        animation-name: arrow-up;
		    	        margin-bottom: 10px;
		    	        margin-top: 13px;
			    	}
			    	.question-subtitle{
			    		background: rgb(233,233,237);
			    		padding-left: 43px;
			    		font-size: 13px;
			    		height: 40px;
			    		line-height: 40px;
			    		color: #66666e;
			    		border: solid 1px #d9d9d9;
			    		overflow: hidden;
			    		text-overflow: ellipsis;
			    		white-space: nowrap;
			    	}
			    }
			    
			    
			}
		}
	}	
</style>