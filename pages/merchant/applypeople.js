// pages/merchant/applypeople.js
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    longitude: '',
    latitude: '',
    classify: [],
    index: 0,
    disabled: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this;

    wx.request({
      url: app.data.api + 'classify?config_id=4',
      success(res) {
        obj.setData({
          classify: res.data
        })
      }
    });

    var id = options.id;
    if (id) {
      wx.request({
        url: app.data.api + 'people_detail',
        method: 'get',
        data: { id: id },
        dataType: 'json',
        success(res) {
          var data = res.data;
          // console.log(data);
          obj.setData({
            peopleid: id,
            name: data.data.name,
            phone: data.data.phone,
            content: data.data.announcement,
            address: data.data.address,
            longitude: data.data.longitude,
            latitude: data.data.latitude,
            type: data.data.type,
            handsome: data.data.handsome,
          })
        }
      })
    }

  },

  onShow: function () {
    this.setData({
      address: wx.getStorageSync('address'),
      longitude: wx.getStorageSync('longitude'),
      latitude: wx.getStorageSync('latitude'),
    });
    wx.removeStorageSync('address');
    wx.removeStorageSync('longitude');
    wx.removeStorageSync('latitude');
  },

  onChangeAddress(){
    wx.navigateTo({
      url: "/pages/merchant/map"
    });
  },


  //列表
  classify(e) {
    this.setData({
      index: e.detail.value
    });
  },
  phonecheck(e) {
    var _this = this;
    var phone = e.detail;
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      _this.setData({
        errmsg: "请检查手机号码格式"
      })
    } else {
      _this.setData({
        errmsg: ""
      })
    }
  },
  formSubmit(e) {
    app.check_login();
    var _this = this;
    var data = e.detail.value;
    var user_id = wx.getStorageSync('user_id');
    var peopleid = _this.data.peopleid;
    if (data.name == null || data.name.replace(/\s*/g, "") == '') {
      app.showMsg('名称不能为空');
      return;
    }
    if (data.phone == null || data.phone.replace(/\s*/g, "") == '' || !(/^1[3456789]\d{9}$/.test(data.phone))) {
      app.showMsg('请检查手机号码');
      return;
    }
    if (data.announcement == null || data.announcement.replace(/\s*/g, "") == '') {
      app.showMsg('服务介绍不能为空');
      return;
    }

    if (peopleid) {
      wx.request({
        url: app.data.api + 'people_update',
        method: 'post',
        dataType: 'Json',
        data: {
          id: peopleid,
          name: data.name,
          type: _this.data.classify[data.type]['id'],
          phone: data.phone,
          announcement: data.announcement,
          user_id: user_id,
          address: data.merchant_city,
          longitude: _this.data.longitude,
          latitude: _this.data.latitude,
        },
        success(res) {
          var data = JSON.parse(res.data);
          // console.log(data);
          _this.setData({
            disabled: true
          })

          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 1500,
            success(res) {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/index/index'
                });
              }, 1500)
            }
          })

        }
      })
    } else {
      wx.request({
        url: app.data.api + 'people_save',
        method: 'post',
        dataType: 'Json',
        data: {
          name: data.name,
          type: _this.data.classify[data.type]['id'],
          phone: data.phone,
          announcement: data.announcement,
          user_id: user_id,
          // address: data.merchant_city,
          // longitude: _this.data.longitude,
          // latitude: _this.data.latitude,
          address: wx.getStorageSync('my_address'),
          latitude: wx.getStorageSync('my_latitude'),
          longitude: wx.getStorageSync('my_longitude'),
        },
        success(res) {
          var data = JSON.parse(res.data);
          // console.log(data);
          _this.setData({
            disabled: true
          })

          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 1500,
            success(res) {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/index/index'
                });
              }, 1500)
            }
          })

        }
      })
    }

  }
})