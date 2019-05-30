// pages/user/userstar.js
const app = getApp();
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  data: {

  },

  onLoad(options) {
    var _this = this;
    app.check_login();
    var _this = this;
    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: app.data.api + 'mycollect',
      method: 'get',
      data: { user_id: user_id, type: 3 },
      dataType: 'json',
      success(res) {
        console.log(res);
        _this.setData({
          message: res.data.data
        })
      }
    })
  },

  tabSwitch(e) {
    // wx.showToast({
    //   title: `点击类型 ${e.detail.index + 1}`,
    //   icon: 'none'
    // });
    var _this = this;
    var index = e.detail.index + 1;
    var type = '';
    if (index == '1') {
      type = '3';
    } else if (index == '2') {
      type = '2';
    } else if (index == '3') {
      type = '1';
    } else if (index == '4') {
      type = '4';
    }
    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: app.data.api + 'mycollect',
      method: 'get',
      data: {user_id: user_id, type: type},
      dataType: 'json',
      success(res) {
        _this.setData({
          message: res.data.data
        })
      }
    })
  },

  phone(e) {
    app.phone_call(e.currentTarget.dataset.phone);
  },
  cardetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/cardetail?id=' + id,
    })
  },
  peopledetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/peopledetail?id=' + id,
    })
  },
  merchantdetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/merchant/merchantdetail?id=' + id,
    })
  },
  newsproduct(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/product?id=' + id,
    })
  },
})