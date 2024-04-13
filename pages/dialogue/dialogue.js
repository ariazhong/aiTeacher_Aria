// pages/dialogue/dialogue.js
let utils = require('../../utils/historyStorage');
let histrotyNew = [];
let clock = false;
let useCon = '';

Page({
    data: {
        useContent: '',
        history: [],
        top: '100rpx',
        conBottom: 0,
        loading: false,
        photoPath: ''  // 新增数据项，用于存储图片路径
    },
    onLoad() {
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: res => {
                console.log(res);
            }
        });
    },
    onShow() {
        wx.hideHomeButton();
    },
    getFocus(event) {
        let height = event?.detail?.height || 0;
        let inputBottom = height === 0 ? 0 : wx.getSystemInfoSync().windowHeight - height + 20;
        console.log(height);
        this.setData({
            conBottom: heiinputBottomght
        });
    },
    async sub() {
        if (clock) return;
        useCon = this.data.useContent;
        utils.addHistory('user', useCon, histrotyNew);
        this.setData({
            history: histrotyNew,
            useContent: '',
            loading: true
        });
        clock = true;
        let respon = await utils.requestAi(histrotyNew);
        utils.addHistory('system', respon, histrotyNew);
        clock = false;
        this.setData({
            history: histrotyNew,
            loading: false
        });
    },
    async requestAi() {},

    takePhoto: function() {
        let that = this;
        // 显示操作菜单
        wx.showActionSheet({
            itemList: ['拍照', '从相册选择'],
            success: function(res) {
                // res.tapIndex 为用户点击的按钮序号，从上到下的顺序，从0开始
                wx.chooseImage({
                    count: 1, // 默认9，这里设置为单张
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: res.tapIndex === 0 ? ['camera'] : ['album'], // 来源是相册还是相机
                    success: function(res) {
                        // 可以获取到图片
                        that.setData({
                            photoPath: res.tempFilePaths[0] // 获取并更新图片路径
                        });
                        // 这里可以根据项目需求进行后续操作，如上传图片等
                    },
                    fail: function() {
                        // 处理错误情况
                    }
                });
            },
            fail: function() {
                // 处理错误情况
            }
        });
    },
    

    // 处理点击 swiper-item 的事件
    sendMessage: function(e) {
        const message = e.currentTarget.dataset.message;
        if (message) {
            // 模拟用户发送消息
            this.addMessageToHistory('user', message);

            // 调用 AI 服务
            this.requestAi(message);
        }
    },

    // 假设的请求后端的方法
    requestAi: function(message) {
        let that = this;
        wx.request({
            url: 'http://localhost:3002/api', // 更改为你的 AI 服务 URL
            method: 'POST',
            data: {
                query: message
            },
            header: {
                'content-type': 'application/json' // 根据你的服务器要求可能需要修改
            },
            success: function(res) {
                if (res.data && res.data.reply) {
                    // 更新历史记录以显示 AI 的回复
                    that.addMessageToHistory('system', res.data.reply);
                }
            },
            fail: function(err) {
                // 在失败时打印错误消息或显示给用户
                console.log('请求 AI 服务失败:', err);
            }
        });
    },

    // 新增方法：添加消息到历史记录
    addMessageToHistory: function(role, content) {
        let history = this.data.history.concat({
            role: role,
            content: content
        });
        this.setData({
            history: history
        });
    },

    // ...其他代码...



});