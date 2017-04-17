<template>
    <div class='plus_container' id='plus_container'>
        <div class="enter_field">
            <input type="text" @focus="beginInput" @blur="endInput" @keydown="enter($event)" v-model="sendMsg" placeholder="找小智帮忙">
            <div v-bind:class="{'op_btn':true,op_send:opt=='send',op_retract:opt=='retract',op_append:opt=='append'}"  @click="execute(opt)"></div>
        </div>
    <transition name="fade">
        <div class="plus_component" v-if="opt=='retract'">
    <div class='plus_panel'>
        <ul>
            <li v-for="item in panelList[curr_indx].items"><div class="content_btn" @click="chooseCtxt(item.value,item.tagDetailId)">{{item.value}}</div></li>
        </ul>
    </div>
    <div class="select_panel">
            <hr/>                            
    		<div class="swiper-container promotion-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in panelList">
					<div v-bind:class="{'swiper_item':true,active:item.activeFlag}" @click="focus(index)" :id="'item_'+index" :linkTo="item.tagNameName">
                        <div class="triangle-down"></div><div class="triangle-down-out"></div>{{item.tagNameName}}</div>
    				</div>
			</div>
		</div>
    </div>
    </div>
     </transition>
    </div>
</template>

<script>
    import ajax from '../config/ajax'
    // import '../plugins/jquery-1.9.1.min.js'
    import '../plugins/swiper.min.js'
    import '../static/style/swiper.min.css'
    import ApiControl from '../config/envConfig.home'
    var env = 'product';// set env type for debug or product
    export default {
        props: ['parseId'],
        data() {
            return {
                detailId: this.parseId,
                sendMsg: '',
                opt: this.parseId != 0 ? 'send' : 'append',
                currentKind: "",
                curr_indx: 0,
                beginHeight: 0,
                endHeight: 0,
                panelList: []
            }
        },
        created: function() {
            ajax('GET', ApiControl.getApi(env,"allTagList")).
            then(res => {
                this.panelList = res.data;
                this.panelList.forEach(function(val, index, arr) {  
                    val.activeFlag = index != 0 ? false : true;
                })
            })
        },
        methods: {
            sending: function(info, id) {
                this.sendMsg = '';
                // this.$emit("sendMsg", info, id ? id : '');
                this.$emit("sendMsg", info, '');
            },
            enter: function(ev) {
                if (ev.keyCode == 13) {
                    if (this.sendMsg && this.sendMsg.trim() != "") {
                        this.opt = 'send';
                        this.sending(this.sendMsg, this.detailId);
                    } else {
                        this.sendMsg = '';
                    }
                }
            },
            execute: function(index) {
                this.opt = (index == 'append' ? 'retract' : 'append');
                if (index == 'send') {
                    this.opt = 'send';
                    if (this.sendMsg && this.sendMsg.trim() != "") {
                        this.sending(this.sendMsg, this.detailId);
                    } else {
                        this.sendMsg = '';
                    }
                }
                this.$nextTick(function() {
                        if (this.opt == 'retract') {
                            new Swiper('.swiper-container', {
                                spaceBetween: 15,
                                freeMode: true,
                                slidesPerView: 4,
                                // centeredSlides: true,
                                onClick: function(swiper) {
                                    // var indx = swiper.clickedIndex;
                                }
                            });
                        }
                    })
                    // if (this.opt == 'retract') setTimeout(function() {
                    //     new Swiper('.swiper-container', {
                    //         spaceBetween: 15,
                    //         freeMode: true,
                    //         slidesPerView: 4,
                    //         // centeredSlides: true,
                    //         onClick: function(swiper) {
                    //             // var indx = swiper.clickedIndex;
                    //         }
                    //     });
                    // }, 100)
                    // if (this.opt == 'retract') setTimeout(function() {
                    //     new Swiper('.swiper-container', {
                    //         spaceBetween: 15,
                    //         freeMode: true,
                    //         slidesPerView: 4,
                    //         // centeredSlides: true,
                    //         onClick: function(swiper) {
                    //             // var indx = swiper.clickedIndex;
                    //         }
                    //     });
                    // }, 100)
            },
            beginInput: function() {
                var _obj = this;
                this.opt = 'send';
                setTimeout(function() {
                    _obj.endHeight = window.innerHeight;
                    var lastHeight = parseInt(_obj.beginHeight) - parseInt(_obj.endHeight);
                    // document.getElementById("plus_container").scrollIntoView(true);
                    // $(".plus_container").css("bottom", lastHeight);
                    // alert(window.innerHeight)
                    // if (/Android [4-6]/.test(navigator.appVersion)) {
                    window.addEventListener("resize", function() {
                            if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                                document.activeElement.scrollIntoViewIfNeeded();
                            }
                        })
                        // }
                }, 100);
            },
            endInput: function() {
                var _obj = this
                if (this.detailId == 1) setTimeout(function() {
                    _obj.opt = 'append'
                }, 100);
            },
            chooseCtxt: function(item, id) {
                this.sendMsg = item;
                this.sending(this.sendMsg, id);
                this.opt = 'append';
            },
            focus: function(indx) {
                this.curr_indx = indx;
                this.panelList.forEach(function(val, index, arr) {  
                    val.activeFlag = false;
                })
                this.panelList[indx].activeFlag = !this.panelList[indx].activeFlag;
            }
        },
        mounted: function() {
            this.beginHeight = window.innerHeight;
            // document.addEventListener("touchmove", function(e) {
            //     // e.preventDefault();
            //     e.stopPropagation();
            // }, false);

        }
    }
</script>

<style lang="less">
    .plus_component {
        height: 206px;
    }
    
    .enter_field {
        .op_btn {
            width: 35px;
            height: 35px;
            margin-top: 5px;
            float: left;
            margin-left: 17px;
        }
        .op_send {
            height: 31px;
            background: url(../images/enterField/send.png) no-repeat;
            background-size: contain;
        }
        .op_retract {
            background: url(../images/enterField/retract.png) no-repeat;
            background-size: contain;
        }
        .op_append {
            background: url(../images/enterField/append.png) no-repeat;
            background-size: contain;
        }
        width: 100%;
        padding-left: 10px;
        background:#fff;
        height: 44px;
        input {
            -webkit-appearance: none;
            box-shadow: 0 0 1px rgba(12, 9, 9, 0.52) inset;
            -moz-box-shadow: 0 0 1px rgba(12, 9, 9, 0.52) inset;
            /*firefox*/
            -webkit-box-shadow: 0 0 1px rgba(12, 9, 9, 0.52) inset;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #e1e1e1;
            color: #adadbd;
            font-size: 13px;
            margin-top: 5px;
            height: 35px;
            width: 80%;
            float: left;
            font-family: PingFangSC-Regular;
        }
        input:focus {
            box-shadow: 0 0 3px rgba(12, 9, 9, 0.52) inset;
            -moz-box-shadow: 0 0 3px rgba(12, 9, 9, 0.52) inset;
            /*firefox*/
            -webkit-box-shadow: 0 0 3px rgba(12, 9, 9, 0.52) inset;
        }
    }
    
    .swiper_item.active {
        color: #30a8fd!important;
        .triangle-down,
        .triangle-down-out {
            display: block;
        }
    }
    
    .triangle-down {
        display: none;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #ebebf0;
        position: absolute;
        top: -15px;
        left: 38%;
        z-index: 3;
    }
    
    .triangle-down-out {
        display: none;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid #c8c8c8;
        position: absolute;
        top: -14px;
        left: 36%;
    }
    
    .plus_container {
        border-top: 1px solid #e1e1e1;
        position: absolute;
        bottom: 0px;
        width: 100%;
        .select_panel {
            hr {
                position: absolute;
                height: 1px;
                border-top: 1px solid #c8c8c8;
                border-right: none;
                border-bottom: none;
                border-left: none;
                border-image: initial;
                bottom: 50px;
                width: 100%;
                z-index: 0;
                left: 0px;
            }
            padding-left: 15px;
            overflow: hidden;
            height: 60px;
            width: 100%;
            background: #f8f8f8;
            .swiper-container {
                overflow: visible;
                margin-top: 15px;
            }
            .swiper-slide {
                width: 60px!important;
                text-align: center;
                .swiper_item {
                    border: 1px solid #e1e1e1;
                    color: #90909b;
                    font-family: PingFangSC-Regular;
                    line-height: 24px;
                    font-size: 12px;
                    height: 25px;
                    background: #fff;
                    border-radius: 5px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
                    -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
                    /*firefox*/
                    -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
    
    .plus_panel {
        height: 146px;
        overflow-y: scroll;
        width: 100%;
        background: #ebebf0;
        li {
            float: left;
            width: 20%;
            .content_btn {
                color: #90909b;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                width: 80%;
                line-height: 24px;
                height: 25px;
                margin: 10px;
                background: #fff;
                border-radius: 20px;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
                -moz-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
                /*firefox*/
                -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
            }
        }
    }
    
    .fade-enter-active {
        transition: opacity .2s
    }
    
    .fade-leave-active {
        transition: opacity .1s
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
    
    .bounce-enter-active {
        animation: bounce-in .2s;
    }
    
    .bounce-leave-active {
        animation: bounce-out .1s;
    }
    
    @keyframes bounce-in {
        0%,
        60%,
        75%,
        90%,
        to {
            -webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
            animation-timing-function: cubic-bezier(.215, .61, .355, 1)
        }
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, 300px, 0);
            transform: translate3d(0, 300px, 0)
        }
        60% {
            opacity: 1;
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0)
        }
        75% {
            -webkit-transform: translate3d(0, 10px, 0);
            transform: translate3d(0, 10px, 0)
        }
        90% {
            -webkit-transform: translate3d(0, -5px, 0);
            transform: translate3d(0, -5px, 0)
        }
        to {
            -webkit-transform: translateZ(0);
            transform: translateZ(0)
        }
    }
    
    @keyframes bounce-out {
        0%,
        40%,
        80%,
        to {
            /*-webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
            animation-timing-function: cubic-bezier(.215, .61, .355, 1)*/
        }
        0% {
            opacity: 1;
            -webkit-transform: translate3d(0, 0px, 0);
            transform: translate3d(0, 0px, 0)
        }
        40% {
            opacity: .6;
            -webkit-transform: translate3d(0, 55px, 0);
            transform: translate3d(0, 55px, 0)
        }
        80% {
            opacity: .2;
            -webkit-transform: translate3d(0, 206px, 0);
            transform: translate3d(0, 206px, 0)
        }
        to {
            opacity: 0;
            -webkit-transform: none;
            transform: none
        }
    }
</style>