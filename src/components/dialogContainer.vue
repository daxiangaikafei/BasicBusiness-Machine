<template>
    <div id="dialog-list">
        <div id="dialog-container" @click="hideReminder">
            <div class="dialog-item" v-for="item in itemList">
                <sendMsg v-bind:item="item" v-if="item.type == 1"></sendMsg>
                <div class="receiveMsg-container" v-if="item.type == 2">
                    <receiveMsgContext v-bind:item="item"></receiveMsgContext>
                    <receiveMsgGoods v-bind:item="item"></receiveMsgGoods>
                                <receiveMsgNews v-bind:item="item"></receiveMsgNews>
                    <receiveMsgWeather v-bind:item="item"></receiveMsgWeather>
                    <receiveMsgQuestion v-on:getAnswer="getAnswer" v-bind:item="item"></receiveMsgQuestion>
                    <receiveMsgInit v-if="initFlag == 0" v-bind:item="item"></receiveMsgInit>
                    <receiveMsgCustomService v-bind:item="item"></receiveMsgCustomService>
                </div>
            </div>
        </div>
        <dialogTag v-bind:tagList="tagList" v-on:sendTagMsg="sendTagMsg" v-if="id != 0"></dialogTag>
        <reminder v-if="isShowReminder"></reminder>
        <inputArea @hideReminder='hideReminder' @sendTagMsg='sendTagMsg' @sendMsg='sendMsg' v-bind="{parseId: id}"></inputArea>
    </div>
</template>

<script>
    import ajax from '../config/ajax'
    import utils from '../config/utils'
    import sendMsg from './sendMsg'
    import receiveMsgContext from './receiveMsgContext'
    import receiveMsgGoods from './receiveMsgGoods'
    import receiveMsgNews from './receiveMsgNews'
    import receiveMsgWeather from './receiveMsgWeather'
    import receiveMsgQuestion from './receiveMsgQuestion'
    import receiveMsgInit from './receiveMsgInit'
    import receiveMsgCustomService from './receiveMsgCustomService'
    import inputArea from './inputArea'
    import dialogTag from './dialogTag'
    import reminder from './reminder'
    import ApiControl from '../config/envConfig.home'
    var env = 'product';// set env type for debug or product
    // var dataArray = ["question1","question2","question3","question4","question5"]
    export default {
        name: 'dialogContainer',
        data() {
            return {
                itemList: [{
                    type: 2,
                    receiveObj: {
                        questionType: 'normal',
                        receiveContext: '终于等到你，小智很想你呦',
                        data: {
                            value: '终于等到你，小智很想你呦',
                            link: ''
                        }
                    }
                }],
                id: 0,
                menuId: 0,
                lat: '',
                lng: '',
                title: '',
                initFlag: 1,
                tagList: {},
                device: '',
                isShowReminder: false
            }
        },
        components: {
            sendMsg,
            receiveMsgContext,
            receiveMsgGoods,
            receiveMsgNews,
            receiveMsgWeather,
            receiveMsgQuestion,
            receiveMsgInit,
            receiveMsgCustomService,
            inputArea,
            dialogTag,
            reminder
        },
        props: ['pageId'],
        methods: {
            beforeSend: function(value){
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
                        receiveContext: '终于等到你，小智很想你呦',
                        data: {
                            value: '小智正在为您思考哟.....'
                        }
                    }
                }
                this.initFlag = 0;
                this.itemList.push(initObj);
                // call back function for dom update
                this.afterRender();
            },
            // normal send message for user input
            sendMsg: function(value, id) {
                this.beforeSend(value);
                // this.isShowReminder = false;

                // for server
                ajax('GET', ApiControl.getApi(env,"question"),{
                    lat: this.lat,
                    lon: this.lng,
                    device: this.device,
                    q: id == undefined || id == '' ? value: id
                }).
                then(res => {
                    this.receiveMsg(res)
                })

            },
            // method for click tag to get questionType=q&a answer
            sendTagMsg: function(value,id){
                this.beforeSend(value);
                this.ajaxTagMsg(id,value);

            },
            ajaxTagMsg: function(id,value){
                // for server
                ajax('GET', ApiControl.getApi(env,"getQuestionById"),{
                    device: this.device,
                    dirId: id
                }).
                then(res => {
                    this.receiveMsg(res)
                })
            },
            // method for click single question to get answer
            getAnswer: function(value,id){
                this.beforeSend(value);
                this.ajaxGetAnswer(value,id);
            },
            ajaxGetAnswer: function(value,id){
                // for server
                ajax('GET', ApiControl.getApi(env,"answer"),{
                    device: this.device,
                    id: id
                }).
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
            afterRender: function() {
                this.$nextTick(function() {
                    document.getElementById('dialog-container').scrollTop = document.getElementById('dialog-container').scrollHeight;
                })
            },
            hideReminder: function(){
                this.isShowReminder = false;
            }

        },
        created() {
            this.device = utils.getDevice();
            // if not mobile ,set empty document
            if(this.device == 3) document.body.innerHTML = '';
            var pageId = this.$route.query.pageId
            this.title = this.$route.query.title == undefined ? '小智' : this.$route.query.title
            var lat = this.$route.query.lat
            var lng = this.$route.query.lng
            this.id = pageId;
            this.lat = lat;
            this.lng = lng;
            this.menuId = this.$route.query.menuId;

            document.title = this.title

            

        },
        mounted() {
            const that = this;
            document.getElementById('dialog-container').style.height = (document.body.clientHeight - 100) + 'px'
            // not index and goods page, init to get tag item list
            if(this.id != 0 && this.id != 1035){
                ajax('GET', ApiControl.getApi(env,"tagItem"),{
                    id: this.menuId
                }).
                then(res => {
                    this.tagList = res.data
                })

                ajax('GET', ApiControl.getApi(env,"details"),{
                    lat: this.lat,
                    lon: this.lng,
                    device: this.device,
                    dirId: this.id
                }).
                then(res => {
                    this.receiveMsg(res)
                })
            }

            // if id=1035,init to get goods recommend info
            if(this.id == 1035){
                // this.itemList[0].receiveObj.data.value = '欢迎来到有好货呦~~'

                ajax('GET', ApiControl.getApi(env,"tagItem"),{
                    id: this.menuId
                }).
                then(res => {
                    this.tagList = res.data
                })

                ajax('GET', ApiControl.getApi(env,"recommend"),{
                    page: 1,
                    size: 5,
                    device: this.device
                }).
                then(res => {
                    this.receiveMsg(res)
                })
            }

            window.sendMsgByApp = window.sendMsgByApp || function(data){
                if(!data || data == ""){
                    that.isShowReminder = true;
                }else{
                    that.sendMsg(data);
                }
            }
        },
        computed() {}
    }
</script>

<style lang="less">
    #dialog-list {
        width: 100%;
        height: 100%;
        #dialog-container {
            height: 500px;
            overflow: auto;
            overflow-y: scroll;
        }
    }
    
    .dialog-item {
        width: 100%;
        zoom: 1;
        overflow: hidden;
        .receiveMsg-container {
            width: 100%;
            text-align: right;
        }
    }
    
    .img-icon {
        display: inline-block;
        width: 40px;
        height: 40px;
    }
    
    .send-button {
        position: absolute;
        bottom: 60px;
        left: 40%;
        width: 100px;
        height: 50px;
        border-radius: 20px;
        background: #427cf3;
    }
    
    .receive-button {
        position: absolute;
        bottom: 0;
        left: 40%;
        width: 100px;
        height: 50px;
        border-radius: 20px;
        background: #CDC9A5;
    }
</style>