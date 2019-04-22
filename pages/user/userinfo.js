const app = getApp()

Page({
  data: {
  },

  checkNum: function (event) {
    var phone = event.detail
    console.log(phone)
    if (!(/^1[345789]\d{9}$/.test(phone))) {
      this.setData({
        errormsg: '手机号码格式错误'
      })
    } else {
      this.setData({
        errormsg: ''
      })
    }
  },

  onLoad: function () {
  }
})