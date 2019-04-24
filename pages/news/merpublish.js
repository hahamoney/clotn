// pages/news/merpublish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    longitude: '',
    latitude: '',
    checked: false,
    xychecked: false
  },

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

  onChangeAddress: function (e) {
    wx.navigateTo({
      url: "/pages/merchant/map"
    });
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },

  onxyChange({ detail }) {
    this.setData({ xychecked: detail });
  }

})