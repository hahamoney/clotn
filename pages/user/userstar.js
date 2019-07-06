// pages/user/userstar.js
const app = getApp();
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
const user_id = wx.getStorageSync('user_id');

Page({
  data: {
    star_list:[
      // { type: 1, name: '车队' },
      { type: 2, name: '个人' },
      { type: 3, name: '发帖' },
      { type: 4, name: '商家' },
      ],
      message:[],
      message_page:[0,0,0],
      message_url:[],
      index:0
  },

  onLoad(options) {
    app.check_login();
    var _this = this;
  
    var message = _this.data.message
    wx.request({
      url: app.data.api + 'mycollect',
      method: 'get',
      data: { user_id: user_id, type: 2 },
      dataType: 'json',
      success(res) {
        message[0]=res.data.data
        if(res.data.code==200){
          _this.setData({
            message: message
          })
        }else{
          app.showMsg('查询有误');
    
          return false;
        }
      }
    })
  },

  tabSwitch(e) {
      if(e.detail.index==null){
        app.showMsg('参数错误');
        wx.navigateBack();
        return false;
      }
      var _this = this;
      var star_list = _this.data.star_list;
      var index = e.detail.index;
      var message = _this.data.message;
      _this.setData({
        index:index 
      })
      if(!message[index]){
        wx.request({
          url: app.data.api + 'mycollect',
          method: 'get',
          data: { user_id: user_id, type: star_list[index]['type'] },
          dataType: 'json',
          success(res) {
            message[index] = res.data.data
            if (res.data.code == 200) {
              _this.setData({
                message: message
              })
            } else {
              app.showMsg('查询有误');
              return false;
            }
          }
        })
      }
  },

  phone(e) {
    app.phone_call(e.currentTarget.dataset.phone);
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
  merchantdetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/merchant/merchantdetail?id=' + id,
    })
  },
  newsproduct(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/product?id=' + id,
    })
  },
})