// pages/merchant/apply.js
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    longitude:'',
    latitude:'',
    merchant_classify:'',
    index:0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    var obj = this;
      wx.request({
        url: app.data.api+'merchant_classify',
        success(res){
          obj.setData({
            merchant_classify:res.data
          })
        } 
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      address: wx.getStorageSync('address'),
      longitude: wx.getStorageSync('longitude'),
      latitude: wx.getStorageSync('latitude'),
    });
    wx.removeStorageSync('address');
    wx.removeStorageSync('longitude');
    wx.removeStorageSync('latitude');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }, 

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //列表
  classify(e){
     this.setData({
        index:e.detail.value
     });
  },

  onChangeAddress: function (e) {
    wx.navigateTo({
      url: "/pages/merchant/map"
    });
  }
})