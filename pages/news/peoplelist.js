// pages/news/peoplelist.js
const app = getApp()
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad(options) {
    var _this = this;
    var type = options.type;
    _this.getpeoplelist(type);
  },

  getpeoplelist(type) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    });
    // console.log(type);
    wx.request({
      url: app.data.api + 'people_lists',
      method: 'get',
      data: {type: type},
      dataTyle: 'json',
      success(res) {
        wx.hideLoading();
        var data = res.data;
        console.log(data);
        if (data.code == '200') {
          _this.setData({
            peoplelist: data.data,
          })
        }
      },
      fail(res) {
        wx.showLoading({
          title: '网络错误',
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