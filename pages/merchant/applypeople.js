// pages/merchant/applypeople.js
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    classify: [],
    index: 0,
    disabled: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this;

    wx.request({
      url: app.data.api + 'classify?config_id=4',
      success(res) {
        obj.setData({
          classify: res.data
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
  classify(e) {
    this.setData({
      index: e.detail.value
    });
  },
  phonecheck(e) {
    var _this = this;
    var phone = e.detail;
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      _this.setData({
        errmsg: "请检查手机号码格式"
      })
    } else {
      _this.setData({
        errmsg: ""
      })
    }
  },
  formSubmit(e) {
    app.check_login();
    var _this = this;
    var data = e.detail.value;
    var user_id = wx.getStorageSync('user_id');
    if (data.name == null || data.name.replace(/\s*/g, "") == '') {
      app.showMsg('名称不能为空');
      return;
    }
    if (data.phone == null || data.phone.replace(/\s*/g, "") == '' || !(/^1[3456789]\d{9}$/.test(data.phone))) {
      app.showMsg('请检查手机号码');
      return;
    }
    if (data.announcement == null || data.announcement.replace(/\s*/g, "") == '') {
      app.showMsg('服务介绍不能为空');
      return;
    }

    wx.request({
      url: app.data.api + 'people_save',
      method: 'post',
      dataType: 'Json',
      data: {
        name: data.name,
        type: _this.data.classify[data.type]['id'],
        phone: data.phone,
        announcement: data.announcement,
        user_id: user_id,
      },
      success(res) {
        var data = JSON.parse(res.data);
        // console.log(data);
        _this.setData({
          disabled: true
        })
       
          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 1500,
            success(res) {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/index/index'
                });
              }, 1500)
            }
          })
        
      }
    })
  }
})