//app.js
var QQMapWX = require('./maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
App({
  data:{
    mapkey:'IHTBZ-7V5CR-4WZWT-WNDFX-7B2V5-ZEFYY',
   api:'http://cloth.com/api/',
   image:'http://cloth.com/',
    // api:'https://cloth.fumos.club/api/',
    // image:'https://cloth.fumos.club/',
   // appid:'wx48604553431a5ec2',
    appSecret:'c02165caa149933c3687cf4d33e09e68'
    },
  onLaunch: function () {

  },showMsg(title){
    wx.showToast({
      title: title,
      icon:'none'
    })
  },
  check_login(){
    if (!wx.getStorageSync('user_id')){
      wx.showToast({
        title: '请登陆',
        icon:'none',
        success(res){
          wx.switchTab({
            url: '/pages/user/user'
          });
        }
      })
      return false;
    }
  },
    phone_call(phone){
      if(phone==''){
        this.showMsg('没有预留电话哦');
        return false;
      }
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    user_Loction(){
      var _this = this;
      var latitude = wx.getStorageSync('my_latitude');
      var longitude = wx.getStorageSync('my_longitude');
      if (latitude == '' || longitude==''){
        wx.getLocation({
          type: 'wgs84', // 返回可以用于wx.openLocation的经纬度
          success(res) {
            wx.setStorageSync('my_latitude', res.latitude);
            wx.setStorageSync('my_longitude', res.longitude);
            qqmapsdk = new QQMapWX({
              key: _this.data.mapkey
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
      }
       latitude = wx.getStorageSync('my_latitude');
       longitude = wx.getStorageSync('my_longitude');
      return 'latitude=' + latitude + '&longitude=' + longitude;
    }
    

})