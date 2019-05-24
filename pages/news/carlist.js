// pages/news/carlist.js
const app = getApp()
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;

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

  carlist(e) {
    wx.switchTab({
      url: '/pages/news/carlist',
    })
  },
  cardetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/cardetail?id=' + id,
    })
  },
  peopledetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/peopledetail?id=' + id,
    })
  },
  phone(e) {
    app.phone_call(e.currentTarget.dataset.phone);
  },
  peoplelist(e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/news/peoplelist?type=' + type,
    })
  },

  onLoad(options) {
    var _this = this;
    _this.getlogistics();
  },

  getlogistics() {
    var _this = this;
    wx.request({
      url: app.data.api + 'logistics',
      success(res) {
        // console.log(res);
        _this.setData({
          imgUrls: res.data.data.banner,
          imageurl: app.data.image,
          car: res.data.data.car,
          people_type: res.data.data.people_type,
        })
      }
    });

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
            latitude: res.latitude,
            longitude: res.longitude
          },
          success(r) {
            // console.log(r);
            wx.setStorageSync('merchant_city', r.result.ad_info.city);
            wx.setStorageSync('my_address', r.result.address);
          }
        })
      }
    })
  },

})