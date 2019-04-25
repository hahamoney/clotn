// pages/news/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onClickHome() {
    // console.log('GO!Pikachu!');
    wx.navigateBack({
      delta: 1
    })
  },

  onClickStar() {
    
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