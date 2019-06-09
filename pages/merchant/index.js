const app = getApp()

Page({
  data: {
    imageurl: '',
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollTop: 100
  },

  onLoad: function () {
    var _this = this;
    var user_location = app.user_Loction();
    var ball = wx.getStorageSync('ball');
    _this.setData({
      imageurl: app.data.image,
      ball:ball
    })
    wx.request({
      
      url: app.data.api + 'merchant?'+user_location,
      success(res) {
        _this.setData({
          imgUrls: res.data.data.banner,
          hot:res.data.data.hot,
          _new:res.data.data.new,
          nearby: res.data.data.nearby
        })
      }
    })
  },
  postmerchant() {
    wx.navigateTo({
      url: '/pages/merchant/apply',
    })
  },
  newsdetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/detail?id='+id,
    })
  },
  phone(e) {
    app.phone_call(e.currentTarget.dataset.phone);
  },
  merchantdetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/merchant/merchantdetail?id='+id,
    })
  }
})
