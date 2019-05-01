// pages/merchant/apply.js
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    longitude:'',
    latitude:'',
    merchant_classify:'',
    index:0,
    facility:'',
    logo:'/image/merchant.png',
    wechat:'/image/merchant.png',
    image_list:[],
    merchant_detail_image: [],
    merchant_detail_list:[],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this;
      wx.request({
        url: app.data.api+'merchant_classify',
        success(res){
          obj.setData({
            merchant_classify:res.data
          })
        } 
      });
    wx.request({
      url: app.data.api + 'merchant_facility',
      success(res) {
        obj.setData({
          facility: res.data
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }, 

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //列表
  classify(e){
     this.setData({
        index:e.detail.value
     });
  },

  onChangeAddress(){
    wx.navigateTo({
      url: "/pages/merchant/map"
    });
  },
  upload_logo(){
    this.upload(1); 
  },
  upload_wechat() {
    this.upload(2); 
  },
  upload_detail() {
    var _this = this;
    if (_this.data.merchant_detail_list.length>6){
      return false;
    }
          this.upload(3); 
  },

  upload(type){
    var _this=this;
    var image,list;
    if(type == 1){
      image = _this.data.logo;
    }

    if(type == 2){
      image = _this.data.wechat;
    }

    list = _this.data.image_list;

    if(type == 3){
      image = _this.data.merchant_detail_image;
      list = _this.data.merchant_detail_list;
    }

      wx.chooseImage({
      success(res) {
        wx.uploadFile({
          url: app.data.api + 'merchant_image',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            type: type
          },
          success(res) {
           var data= JSON.parse(res.data);
            list.push(data.id);
            if(type == 3){
              image.push(app.data.image+data.path);
              _this.setData({
                merchant_detail_image:image,
                merchant_detail_list:list
              })
              return false;  
            }

            _this.setData({
              image_list:list
            })

            if(type == 1){
              _this.setData({
                logo:app.data.image+data.path
              })
              return false;
            }

            if(type == 2){
              _this.setData({
                wechat:app.data.image+data.path
              })
              return false;
            }

          }
        })
      }
    })
  },
  formSubmit(e){
     var _this=this;
     var data=e.detail.value;;
     console.log(data);
    if (data.merchant_name==null||data.merchant_name.replace(/\s*/g, "")==''){
      app.showMsg('名称不能为空');
      return;
     }

    if (data.merchant_city == null) {
      app.showMsg('地址不能为空');
      return;
    }
    if (data.merchant_keyword == null || data.merchant_keyword.replace(/\s*/g, "") == '') {
      app.showMsg('关键字不能为空');
      return;
    }
    if (data.announcement == null || data.announcement.replace(/\s*/g, "") == '') {
      app.showMsg('商家介绍不能为空');
      return;
    }
    if (data.facility.length==0) {
      app.showMsg('商家设施不能为空');
      return;
    }

    wx.request({
      url: app.data.api + 'merchant_enter',
      method:'post',
      dataType:'Json',
      data:{
        merchant_name: data.merchant_name,
        merchant_type: _this.data.merchant_classify[data.merchant_type]['id'],
        merchant_keyword: data.merchant_keyword,
        merchant_city: data.merchant_city,
        facility: data.facility,
        announcement: data.announcement,
        image_list: _this.data.image_list,
        merchant_detail_list:_this.data.merchant_detail_list,
        user_id :1,
        longitude: _this.data.longitude,
        latitude:_this.data.latitude,
      },success(res){
        console.log(res);
      }
    })
  }, bindGetUserInfo(e){
     console.log(e);
    wx.login({
      success(res) {
            console.log(res);
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.data.appid+'&secret=' + app.data.appSecret+'&js_code='+res.code+'&grant_type=authorization_code';
            wx.request({
              url: url,
              success(res){
                console.log(res);
              }
            })
      }
    })
  }



})