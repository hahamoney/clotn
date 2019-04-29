// pages/merchant/merchantdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onClickHome() {
    wx.navigateBack({
      delta: 1
    })
  },

  onClickCall: function () {
    wx.makePhoneCall({
      phoneNumber: '8008208820',
      success: function () {
        console.log('调起拨打界面')
      },
      fail: function () {
        console.log('拨打失败')
      }
    })
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
      title: '产品详情',
      path: '/page/user?id=123'
    }
  }

})