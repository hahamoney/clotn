// pages/user/userreply.js
const app = getApp();
Page({

  data: {

  },

  onLoad: function (options) {
    var _this = this;
    app.check_login();
    _this.getcomment();
  },
  getcomment() {
    var _this = this;
    var user_id = wx.getStorageSync('user_id');
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.data.api + 'mycomment',
      method: 'get',
      data: {user_id: user_id},
      dataType: 'json',
      success(res) {
        wx.hideLoading();
        console.log(res.data.data)
        _this.setData({
          commentlist: res.data.data
        })
      },
      fail(res) {
        wx.showLoading({
          title: '网络错误',
        })
      }
    });
  },
  newsproduct(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/product?id=' + id,
    })
  },
  phone(e) {
    app.phone_call(e.currentTarget.dataset.phone);
  },
})