// pages/news/peoplelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

})