var _defaultApi = {
    debug: {
        question: '/mock/2.json',
        question1: '/mock/1.json',
        question2: '/mock/2.json',
        question3: '/mock/3.json',
        question4: '/mock/4.json',
        question5: '/mock/5.json',
        allTagList: '/mock/messageList.json',
        tagItem: '/mock/tagList.json'
    },
    product: {
        question: '/ai/talk/question.do',
        allTagList: '/ai/tags/allList.do',
        tagList: '/ai/tags/items.do',

    }
}
module.exports = {
    getApi: function(env,name){
        var type = env == 'product' ? env : 'debug'
        return _defaultApi[type][name]
    }
}