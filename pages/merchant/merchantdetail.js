// pages/merchant/merchantdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    disabled: false
  },

  onLoad(options) {
    var _this = this;
    var id = options.id;
    wx.request({
      url: app.data.api +'merchant_detail',
      method: 'get',
      dataType: 'json',
      data: {id: id},
      success(res) {
        var data = res.data;
        console.log(data);
        if (data.code == '200') {
          _this.setData({
            name: data.data.name,
            phone: data.data.phone,
            merchant_city: data.data.merchant_city,
            announcement: data.data.announcement,
          })
        }
      }
    })
  },

  onClickHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onClickCmt() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onClickCall(e) {
    app.phone_call(e.currentTarget.dataset.phone)
  },

  merchantapply: function () {
    wx.navigateTo({
      url: '/pages/merchant/apply',
    })
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
      title: data.name,
      path: '/pages/merchant/merchantdtail?id='+data.id,
    }
  },

  formSubmit(e) {
    app.check_login();
    var user_id = wx.getStorageSync('user_id');
    var _this = this;
    //console.log(e.detail);return false;
    var data = e.detail.value;
    if (data.content == null || data.content.replace(/\s*/g, "") == '') {
      app.showMsg('评论内容不能为空');
      return;
    }

    wx.request({
      url: app.data.api + 'comment',
      method: 'post',
      dataType: 'Json',
      data: {
        user_id: user_id,
        message_id: 1,
        content: data.content,
      },
      success(res) {
        //console.log(res);
        var data = JSON.parse(res.data);
        if (data.msg == 'success') {
          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 1500,
            success() {
              _this.setData({
                disabled: true
              })
              setTimeout(function () {
                _this.setData({ show: false });
              }, 1500)
            }
          })
        }
      }
    })
  }

})