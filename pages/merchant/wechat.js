// pages/merchant/wechat.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.geturl();
  },

  geturl() {
    var _this = this;
    wx.request({
      url: app.data.api + 'classify?config_id=5',
      success(res) {
        var data = res.data;
        // console.log(data);
        _this.setData({
          wechaturl: data[0].name
        })
      }
    })
  }

})