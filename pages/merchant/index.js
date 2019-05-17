const app = getApp()

Page({
  data: {
    imageurl: '',
    imgUrls: [],
    merchant_list: [],
    car_list: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollTop: 100
  },

  onLoad: function () {
    var _this = this;
    wx.request({
      url: app.data.api + 'home',
      success(res) {
        _this.setData({
          imgUrls: res.data.data.banner,
          merchant_list: res.data.data.merchant,
          car: res.data.data.car,
          imageurl: app.data.image
        })
      }
    })
  },
  postmerchant() {
    wx.navigateTo({
      url: '/pages/merchant/apply',
    })
  },
  newsdetail() {
    wx.navigateTo({
      url: '/pages/news/detail',
    })
  },
  merchantdetail() {
    wx.navigateTo({
      url: '/pages/merchant/merchantdetail',
    })
  }
})
