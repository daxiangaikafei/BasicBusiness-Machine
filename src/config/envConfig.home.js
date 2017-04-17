var _defaultApi = {
    debug: {
        question: '/mock/2.json',
        question1: '/mock/1.json',
        question2: '/mock/2.json',
        question3: '/mock/3.json',
        question4: '/mock/4.json',
        allTagList: '/mock/messageList.json',
        tagItem: '/mock/tagList.json'
    },
    product: {
        question: '/ai/talk/question.do?',
        allTagList: '/ai/tag/allList.do?',
        tagList: '/ai/tag/items.do?',

    }
}
module.exports = {
    getApi: function(env,name){
        var type = env == 'product' ? env : 'debug'
        return _defaultApi[type][name]
    }
}