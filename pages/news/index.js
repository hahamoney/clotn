// pages/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  newsdetail() {
    wx.navigateTo({
      url: '/pages/news/detail',
    })
  },
  newsproduct() {
    wx.navigateTo({
      url: '/pages/news/product',
    })
  }

})