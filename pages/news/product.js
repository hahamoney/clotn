// pages/news/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
  },

  onClickHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onClickStar() {
    
  },

  onClickCmt() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '产品详情',
      path: '/page/user?id=123'
    }
  }
})