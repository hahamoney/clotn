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
      }
    });

    wx.request({
      url: app.data.api +'edge_ball',
      success(res){
          wx.setStorageSync('ball', res.data.code);
          _this.setData({
            ball:res.data.code
          })
      }
    })

  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var user_id = wx.getStorageSync('user_id');
    if(user_id){
      var address = wx.getStorageSync('my_address');
      var longitude = wx.getStorageSync('my_longitude');
      var latitude = wx.getStorageSync('my_latitude');
      wx.request({
        url: app.data.api +'update_location',
        method:'post',
        dataType:'json',
        data:{user_id:user_id,address:address,longitude:longitude,
        latitude:latitude},
        success(res){

        }
      })
    }
  },
  postmerchant() {
    wx.navigateTo({
      url: '/pages/merchant/apply',
    })
  },
  newsdetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/detail?id=' + id,
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
