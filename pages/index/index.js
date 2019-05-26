//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    imageurl:'',
    imgUrls: [],
    hotmerchant: [],
    merchant_list:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollTop: 100
  },

  onLoad: function () {    
    var _this = this;
    var user_location = app.user_Loction();
    wx.request({
      url: app.data.api + 'home?' + user_location,
      success(res){
        _this.setData({
          imgUrls:res.data.data.banner,
          imageurl:app.data.image,
          _new: res.data.data.new,
          nearby: res.data.data.nearby,
          hot: res.data.data.hot,
        })
        // console.log(res.data.data.new_message);
      }
    })
  },
  postmerchant() {
    wx.navigateTo({
      url: '/pages/merchant/apply',
    })
  },
  newsdetail(){
    wx.navigateTo({
      url: '/pages/news/detail',
    })
  },
  newsproduct(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/product?id='+id,
    })
  },
  phone(e){
    app.phone_call(e.currentTarget.dataset.phone);
  },
  merchantdetail(e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/merchant/merchantdetail?id='+id,
    })
  },
  cardetail(e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/cardetail?id=' + id,
    })
  }
})
