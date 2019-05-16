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
  cardetail() {
    wx.navigateTo({
      url: '/pages/news/cardetail',
    })
  },

  onLoad: function (options) {
    var obj = this;

    // wx.request({
    //   url: app.data.api +'',
    //   success(res){
    //     obj.setData({
    //       people: res.data,
    //     })
    //   }
    // })
  }

})