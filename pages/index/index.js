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
    wx.request({
      url: app.data.api+'home',
      success(res){
        _this.setData({
          imgUrls:res.data.data.banner,
          imageurl:app.data.image,
          new_message: res.data.data.new_message.data,
          nearby_message: res.data.data.nearby_message.data,
          hot_message: res.data.data.hot_message.data,
        })
        // console.log(res.data.data.new_message);
      }
    })

    wx.getLocation({
      type: 'wgs84', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        wx.setStorageSync('my_latitude', res.latitude);
        wx.setStorageSync('my_longitude', res.longitude);
        qqmapsdk = new QQMapWX({
          key: app.data.mapkey
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude:res.latitude ,
            longitude: res.longitude
          },
          success(r){
            // console.log(r);
            wx.setStorageSync('merchant_city', r.result.ad_info.city);
            wx.setStorageSync('my_address', r.result.address);
          }
        })
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
