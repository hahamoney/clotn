// pages/news/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    people: '',
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
  },

  onLoad: function (options) {
    var obj = this;

    wx.request({
      url: app.data.api +'people_type',
      success(res){
        obj.setData({
          people: res.data,
        })
      }
    })
  }

})