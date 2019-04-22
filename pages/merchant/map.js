
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp();
Page({
  data: {
    latitude: 0,//地图初次加载时的纬度坐标
    longitude: 0, //地图初次加载时的经度坐标
    name: "" //选择的位置名称
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.data.mapkey
    });

    this.moveToLocation();
  },
  //移动选点
  moveToLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        //选择地点之后返回到原来页面
        wx.setStorageSync('latitude', res.latitude);
        wx.setStorageSync('address', res.address);
        wx.setStorageSync('longitude', res.longitude);
        wx.navigateBack();
      },
      fail: function (err) {
        console.log(err)
      }
    });
  }
});
