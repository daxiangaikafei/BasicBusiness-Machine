<template>
	<transition name="custom-classes-transition"
    enter-active-class="animated bounceInUp"
    leave-active-class="animated bounceOutLeft">
		<div class="receiveMsg-weather" v-if="item.receiveObj.questionType == 'weather'">
			<div class="receiveMsg-weather-top">
				<img class="img-icon" src="../static/images/receiveMsg-icon.png">
				<div class="receiveMsg-weather-text">{{ item.receiveObj.title }}</div>
			</div>
			<table class="weather-table">
				<tr v-for="weather in item.receiveObj.data.weatherInfo">
					<td>{{ weather.date }}</td>
					<td>
						<img src="../static/images/sunny.png" v-if="weather.status == 1">
						<img src="../static/images/rain.png" v-else-if="weather.status == 2">
						<img src="../static/images/rain.png" v-else-if="weather.status == 3">
						{{ weather.weather }}
					</td>
					<td>{{ weather.temperature }}</td>
					<td class="weather-last-child">{{ weather.airQuality }}</td>
				</tr>
			</table>
		</div>
	</transition>
</template>

<script>
	import '../static/style/animate.min.css'
	export default {
		name: 'receiveMsgWeather',
		props: ['item']
	}
</script>
<style lang="less">
	.receiveMsg-weather{
		.receiveMsg-weather-top{
			text-align: left;
			margin-top: 30px;
			.receiveMsg-weather-text{
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
			    margin-left: 20px;
			    padding: 15px 17.5px 15px 17.5px;
			}
			.receiveMsg-weather-text:before{
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
			.receiveMsg-weather-text:after{
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
		
		.weather-table{
			margin: 20px auto;
			width: 90%;
			text-align: center;
			background: #fff;
			border-right: solid 1px #F5F5F5;
			border-bottom: solid 1px #F5F5F5;
			border-radius: 10px;
			tr{
				height: 50px;
				color: #D3D3D3;
				td{
					border-right: solid 1px #F5F5F5;
					border-bottom: solid 1px #F5F5F5;
					img{
						width: 20px;
						vertical-align: middle;
					}
				}
			}
			tr:nth-of-type(1){
				color: #000;
			}
			.weather-last-child{
				border-right: none;
			}					
		}
	}
</style>