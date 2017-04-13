<template>
	<div class="receiveMsg-goods" v-if="item.receiveObj.questionType == 'goods'">
		<div class="receiveMsg-goods-top">
			<img class="img-icon" src="../static/images/receiveMsg-icon.png">
			<div class="receiveMsg-goods-text">{{ item.receiveObj.title }}</div>
		</div>
		<div class="receiveMsg-goods-container">
			<div class="goods-container-banner" v-if="item.receiveObj.data.banner.length > 0">
				<div class="swiper-container banner-container">
				  <div class="swiper-wrapper">
				    <div class="swiper-slide" v-for="ban in item.receiveObj.data.banner">
				      <router-link to="ban.linkUrl">
				        <figure>
				          <img :src="ban.imgUrl">
				        </figure>
				      </router-link>
				    </div>
				  </div>
				  <div class="swiper-pagination"></div>
				</div>
			</div>
			<div class="goods-container-list" v-bind:class="item.receiveObj.data.banner.length == 0 ? 'empty-banner': ''">
				<div class="goods-list" v-for="(good,index) in item.receiveObj.data.stuff.slice(goodsIndex,goodsIndex + 2)">
					<router-link to="good.linkUrl" v-if="index == 0 || index == 1">
						<div class="goods-container-item">
							<img :src="good.imgUrl" class="goods-image">
							<div class="goods-item-detail">
								<div class="goods-item-title">{{ good.name }}</div>
								<div class="goods-item-price">
									<span class="goods-item-nowprice">{{ good.price }}</span>
									<span class="goods-item-littleprice">.00</span>
									<img v-bind:src="good.source | getImgUrl" class="goods-item-icon"/>
								</div>
								<div class="goods-item-back">
										{{good.rebateValue}}
								</div>
								<div class="goods-find-similar">
									<router-link to="good.linkUrl">
										找相似
									</router-link>
								</div>
							</div>
						</div>
					</router-link>
					<router-link to="good.likeUrl">
						<div class="goods-container-like"></div>
					</router-link>
				</div>
			</div>
		</div>
		<div class="receiveMsg-goods-next">
				不满意？ <span v-on:click="changeGoods(item.type,item.receiveObj.type)">换一批</span>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				goodsIndex: 0,
				copyItem: {

				}
			}
		},
		name: 'receiveMsgGoods',
		props: ['item'],
		filters: {
			// filter for get image url from key
			getImgUrl: function(value){
				return "../static/style/images/" + value + ".png";
			}
		},
		methods: {
			changeGoods: function(itemId,type){
				(this.goodsIndex + 2) >= this.item.receiveObj.data.banner.length ? this.goodsIndex = 0 : this.goodsIndex += 2
			}
		}
	}
</script>
<style lang="less">
	.receiveMsg-goods{
		.receiveMsg-goods-top{
			text-align: left;
			margin-top: 30px;
			.receiveMsg-goods-text{
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
			.receiveMsg-goods-text:before{
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
			.receiveMsg-goods-text:after{
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
		.receiveMsg-goods-container{
			width: 90%;
			margin: 20px auto;
			background: #fff;
			overflow: hidden;
			.goods-container-banner{
				width: 90%;
				max-width: 324px;
				margin: 10px auto;
				height: 100px;
				.swiper-container{
					height: 100px;
				}
				.swiper-pagination{
					text-align: right;
				}
			}
			.goods-list{
				width: 100%;
				height: 122.5px;
				margin: 20px 0px;
				border-top: solid 1px #eee;
				.goods-container-item{
					zoom: 1;
					text-align: left;
					height: 122.5px;
					.goods-image{
						display: inline-block;
						width: 95px;
						height: 95px;
						float: left;
						margin-top: 10px;
					}
					.goods-item-detail{
						padding: 10px 18px;
						margin-left: 95px;
						height: 122.5px;
						position: relative;
						.goods-item-title{
					        overflow: hidden;
					        height: 36px;
					        line-height: 18px;
					        font-size: 13px;
					        text-overflow: ellipsis;
					        display: -webkit-box;
					        display: -moz-box;
					        -moz-line-clamp: 2;
					        -webkit-line-clamp: 2;
					        -webkit-box-orient: vertical;
					        white-space: normal;
						}
						.goods-item-price{
							padding-top: 20px;
							
							.goods-item-nowprice{
								color: #fb472b;
								font-size: 16px;
							}
							.goods-item-littleprice{
								color: #fb472b;
								font-size: 11px;
							}
							.goods-item-icon{
								width: 15px;
								height: 15px;
								margin-left: 20px;
							}
						}
						.goods-item-back{
							color: #fd472b;
							font-size: 11px;
							padding-top: 15px;
						}
						.goods-find-similar{
							position: absolute;
							width: 50px;
							height: 25px;
							border-radius: 10px;
							border: solid 1px #eee;
							right: 20px;
							bottom: 0;
							font-size: 10px;
							text-align: center;
							line-height: 20px;
							a{
								color: #000;
							}
						}
					}
				}

			}
		}
		.empty-banner .goods-list:nth-of-type(1){
			border: none;
			margin-top: 0;
		}
		.receiveMsg-goods-next{
			width: 100%;
			text-align: center;
			font-size: 15px;
			span{
				color: #30a8fd;
			}
		}
	}
</style>