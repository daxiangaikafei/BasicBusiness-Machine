<template>
	<div id="dialog-list">
		<div id="dialog-container" v-on:click="sendMsg('发送消息')">
			<div class="dialog-item" v-for="item in itemList">
				<sendMsg v-bind:item="item"></sendMsg>
				<div class="receiveMsg-container" v-if="item.type == 2">
					<receiveMsgContext v-bind:item="item"></receiveMsgContext>
					<receiveMsgGoods v-bind:item="item"></receiveMsgGoods>
					<receiveMsgWeather v-bind:item="item"></receiveMsgWeather>
					<receiveMsgQuestion v-on:sendMsg="sendMsg" v-bind:item="item"></receiveMsgQuestion>
					<receiveMsgInit v-if="initFlag == 0" v-bind:item="item"></receiveMsgInit>
				</div>
			</div>
		</div>
		<dialogTag v-bind:tagList="tagList" v-on:sendMsg="sendMsg" v-if="id == 0"></dialogTag>

<!-- 		<button class="send-button" v-on:click="sendMsg">发送消息</button>
		<button class="receive-button" v-on:click="receiveMsg">接收消息</button> -->
	</div>

</template>

<script>
import '../plugins/swiper.min.js'
import '../static/style/swiper.min.css'
import ajax from  '../config/ajax'
import sendMsg from './sendMsg'
import receiveMsgContext from './receiveMsgContext'
import receiveMsgGoods from './receiveMsgGoods'
import receiveMsgWeather from './receiveMsgWeather'
import receiveMsgQuestion from './receiveMsgQuestion'
import receiveMsgInit from './receiveMsgInit'
import dialogTag from './dialogTag'
export default {
	name: 'dialogContainer',
	data() {
		return {
			itemList: [
				{
					type: 2,
					receiveObj: {
						questionType: 'normal',
						receiveContext: '欢迎使用智能机器人小智~~',
						data: {
							value: '欢迎使用智能机器人小智~~'
						}
					}
				}
			],
			id: 0,
			title: '',
			initFlag: 1,
			tagList: {}
		}
	},
	components: {
		sendMsg,
		receiveMsgContext,
		receiveMsgGoods,
		receiveMsgWeather,
		receiveMsgQuestion,
		receiveMsgInit,
		dialogTag
	},
	props: ['pageId'],
  	methods: {
  		sendMsg: function (value,id) {
			var obj = {
				type: 1,
				text: value
			}
			this.itemList.push(obj);

  			// call back function for dom update
  			this.afterRender();

  			var initObj = {
				type: 2,
				receiveObj: {
					questionType: 'init',
					receiveContext: '欢迎使用智能机器人小智~~',
					data: {
						value: '小智正在为您思考哟.....'
					}
				}
			}
			this.initFlag = 0;
			this.itemList.push(initObj);
			// call back function for dom update
  			this.afterRender();

  			//初始化swiper
	    	new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        loop: true,
		        autoplay:3000
		    });

	    	var number = this.getRandom();
	    	var url = '/mock/' + number + '.json';
		    // send message to server
		    ajax('GET',url).
		    then(res => {
				this.receiveMsg(res)
		})
  			
  		},
  		receiveMsg: function(data) {
  			var obj = {
  				type: 2,
  				receiveObj: data
  			}
  			this.initFlag = 1;
  			this.itemList.push(obj);
  			// call back function for dom update
  			this.afterRender();
  			
  		},
  		afterRender: function () {
  			this.$nextTick(function () {
  			    document.getElementById('dialog-container').scrollTop = document.getElementById('dialog-container').scrollHeight;
  			})
  		},
  		getRandom: function () {
  			var i = Math.random();
  			// return Math.ceil(i * 10) >= 5 ? 4 : Math.ceil(i * 10);
  			return 4;
  		}
  		
	},
	created(){
		var pageId = this.$route.query.pageId
		this.title = this.$route.query.title == undefined ? '小智' : this.$route.query.title
		var lat = this.$route.query.lat
		var lng = this.$route.query.lng
		this.id = pageId;
		document.title = this.title

    	//初始化swiper
    	new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        loop: true,
	        autoplay:3000
	    });
	},
	mounted () {
		document.getElementById('dialog-container').style.height = (document.body.clientHeight - 60) + 'px'

		ajax('GET','/mock/tagList.json').
		then(res => {
			this.tagList = res.data
			console.log(this.tagList.items)
		})

	},
	computed() {
	}
}
</script>

<style lang="less">
	#dialog-list{
		width: 100%;
		height: 100%;
		#dialog-container{
			height: 500px;
			overflow: auto;
		}
	}
	.dialog-item{
		width: 100%;
		zoom: 1;
		overflow: hidden;
		.sendMsg-container{
			width: 100%;
			text-align: right;
			margin-top: 30px;
			.sendMsg-text{
				display: inline-block;
				position: relative;
			    min-height: 50px;
			    max-height: 135px;
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
			    top: 40%;  
			    margin-top: -10px;
			}
			.sendMsg-text:after{
				content: "";  
				width: 0;  
				height: 0;  
				border: 8px solid transparent;  
				border-left-color: #FFF;  
				position: absolute;  
				left: 100%;  
				top: 40%;  
				margin-top: -8px;
			}
			img{
				margin-right: 12px;
			}

		}
		.receiveMsg-container{
			width: 100%;
			text-align: right;
			margin-top: 30px;		
		}
	}
	.img-icon{
		display: inline-block;
		width: 40px;
		height: 40px;
	}
	.send-button{
		position: absolute;
		bottom: 60px;
		left: 40%;
		width: 100px;
		height: 50px;
		border-radius: 20px;
		background: #427cf3;
	}
	.receive-button{
		position: absolute;
		bottom: 0;
		left: 40%;
		width: 100px;
		height: 50px;
		border-radius: 20px;
		background: #CDC9A5;
	}
</style>
