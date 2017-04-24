<template>
	<transition name="custom-classes-transition"
    enter-active-class="animated bounceInUp"
    leave-active-class="animated bounceOutLeft">
		<div class="receiveMsg-news" v-if="item.receiveObj.questionType == 'search'">
			<div class="receiveMsg-news-container">
			<div class="news-container-list">
					<div class="news-list" v-for="(newCxt,index) in item.receiveObj.data.slice(newsIndex,newsIndex + 3)">
						<a :href="newCxt.link" target="_blank">
							<div class="news-container-item">
								<img :src="newCxt.icon" v-if="newCxt.icon" class="news-image">
								<div v-bind:class="{'news-item-detail':true,'empty':!newCxt.icon}">
									<div class="news-item-title">{{ newCxt.summary }}</div>
									<div class="news-item-content">{{ newCxt.content }}</div>
									<div class="news-item-footer"  v-if="newCxt.type&&newCxt.source">
									<div class="news-item-type">{{ newCxt.type }}</div><span>|</span>
									<div class="news-item-source">{{ newCxt.source }}</div>									
									<div style="clear:both"></div>									
								</div>
								</div>								
							</div>
						</a>
					</div>
				</div>
			<div class="receiveMsg-news-next">
					 小智已经为你找更多哟。 <span v-on:click="changenews(item.type,item.receiveObj.type)">换一批</span>
			</div>
			</div>
			<div class="receiveMsg-contact">
					 如果您还不满意可以咨询人工客服哦。
			</div>
					 <a class="customer-service" target="_blank" href="newtab://ai.qbao.com/service">立即前去</a>
			
		</div>
	</transition>
</template>
<script>
    import '../static/style/animate.min.css'
    export default {
        data() {
                return {
                    newsIndex: 0,
                    copyItem: {

                    }
                }
            },
            name: 'receiveMsgnews',
            props: ['item'],
            filters: {
                // filter for get image url from key
                getImgUrl: function(value) {
                    return iconList[value];
                }
            },
            methods: {
                changenews: function(itemId, type) {
                    (this.newsIndex + 3) >= this.item.receiveObj.data.length ? this.newsIndex = 0 : this.newsIndex += 3
                }
            },
            mounted() {

            }
    }
</script>
<style lang="less">
    .receiveMsg-news {
        .receiveMsg-news-top {
            text-align: left;
            margin-top: 30px;
            .receiveMsg-news-text {
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
            .receiveMsg-news-text:before {
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
            .receiveMsg-news-text:after {
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
            img {
                margin-left: 12px;
            }
        }
        .receiveMsg-news-container {
            width: 90%;
            margin: 20px auto;
            background: #fff;
            overflow: hidden;
            .news-container-banner {
                width: 90%;
                max-width: 324px;
                margin: 10px auto;
                height: 100px;
                .swiper-container {
                    height: 100px;
                }
                .swiper-pagination {
                    text-align: right;
                }
            }
            .news-list {
                width: 100%;
                height: 122.5px;
                border-top: solid 1px #eee;
                .news-container-item {
                    zoom: 1;
                    text-align: left;
                    height: 122.5px;
                    .news-image {
                        margin-left: 10px;
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                        float: left;
                        margin-top: 20px;
                    }
                    .news-item-detail {
                        padding: 21px 20px 10px 15px;
                        margin-left: 70px;
                        height: 122.5px;
                        position: relative;
                        .news-item-footer {
                            clear: both;
                            width: 100%;
                            line-height: 40px;
                            margin-bottom: 10px;
                            span {
                                color: #adadbd;
                                float: right;
                                margin-right: 10px;
                            }
                            .news-item-source {
                                max-width: 100px;
                                margin-right: 10px;
                                float: right;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                display: -webkit-box;
                                display: -moz-box;
                                -moz-line-clamp: 1;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                                white-space: normal;
                                color: #adadbd;
                                font-size: 12px;
                                font-family: PingFangSC-Regular;
                            }
                            .news-item-type {
                                max-width: 100px;
                                float: right;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                display: -webkit-box;
                                display: -moz-box;
                                -moz-line-clamp: 1;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                                white-space: normal;
                                color: #adadbd;
                                font-size: 12px;
                                font-family: PingFangSC-Regular;
                            }
                        }
                        .news-item-title {
                            color: #35353f;
                            font-family: PingFangSC-Regular;
                            overflow: hidden;
                            max-height: 28px;
                            line-height: 14px;
                            margin-bottom: 5px;
                            font-size: 14px;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            display: -moz-box;
                            -moz-line-clamp: 2;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            white-space: normal;
                        }
                        .news-item-content {
                            color: #adadbd;
                            font-family: PingFangSC-Regular;
                            overflow: hidden;
                            max-height: 24px;
                            line-height: 12px;
                            margin-bottom: 5px;
                            font-size: 12px;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            display: -moz-box;
                            -moz-line-clamp: 2;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            white-space: normal;
                        }
                        .news-item-price {
                            padding-top: 20px;
                            .news-item-nowprice {
                                color: #fb472b;
                                font-size: 16px;
                            }
                            .news-item-littleprice {
                                color: #fb472b;
                                font-size: 11px;
                            }
                            .news-item-icon {
                                width: 15px;
                                height: 15px;
                                margin-left: 20px;
                            }
                        }
                        .news-item-back {
                            color: #fd472b;
                            font-size: 11px;
                            padding-top: 15px;
                        }
                        .news-find-similar {
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
                            a {
                                color: #000;
                            }
                        }
                    }
                    .empty {
                        margin-left: 0px;
                    }
                }
            }
        }
        .empty-banner .news-list:nth-of-type(1) {
            border: none;
            margin-top: 0;
        }
        .receiveMsg-news-next {
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #66666e;
            span {
                color: #30a8fd;
            }
        }
    }
    
    .customer-service {
        margin-top: 10px;
        color: #30a8fd;
        font-size: 12px;
        display: block;
        text-align: center;
    }
    
    .receiveMsg-contact {
        font-size: 12px;
        text-align: center;
    }
</style>