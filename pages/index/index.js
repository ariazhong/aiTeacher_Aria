Page({
    data: {
      title: 'Quest',
      text: '你的私人专属英语老师',
      isFirstShow: true // 初始状态设置为true
    },
    onShow() {
      // 只有在isFirstShow为true时执行重定向
      if (this.data.isFirstShow) {
        // 设置isFirstShow为false
        this.setData({
          isFirstShow: false
        });
        // 延时后使用wx.reLaunch重定向到grade-select页面
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/grade-select/grade-select' // 确保这个路径是你grade-select页面的正确路径
          });
        }, 1000); // 1000毫秒后重定向
      }
    }
  });
  