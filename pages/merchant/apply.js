// pages/merchant/apply.js
var QQMapWX = require('../../maplib/qqmap-wx-jssdk.js');
var qqmapsdk;
const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_url :app.data.image,
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
    merchant_banner_image:[],
    disabled: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this;

      wx.request({
        url: app.data.api+'classify?config_id=1',
        success(res){
          obj.setData({
            merchant_classify:res.data
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
    if (_this.data.merchant_detail_image.length>6){
      return false;
    }
    this.upload(3); 
  },
  upload_banner(){
    var _this = this;
    if (_this.data.merchant_banner_image.length > 4) {
      return false;
    }
    this.upload(4); 
  },
  upload(type){
    app.check_login();
    var user_id = wx.getStorageSync('user_id');
    var _this=this;
    var image,list,itemid;
    list = _this.data.image_list;


    if(type == 3){
      image = _this.data.merchant_detail_image;
    }

    if(type == 4){
      image = _this.data.merchant_banner_image;
    }

      wx.chooseImage({
      success(res) {
        wx.uploadFile({
          url: app.data.api + 'merchant_image',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            type: type,
            user_id: user_id
          },
          success(res) {
            //console.log(res)
           var data= JSON.parse(res.data);
            list.push(data.id);
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

            if (type == 3) {
              image.push(data);
              _this.setData({
                merchant_detail_image: image,
              })
              return false;
            }
            if (type == 4) {
              image.push(app.data.image + data.path);
              _this.setData({
                merchant_banner_image: image,
              })
              return false;
            }
          }
        })
      }
    })
  },
  deleteimg(e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var image = _this.data.merchant_detail_image;
    // return false;
    wx.request({
      url: app.data.api +'merchant_del',
      method: 'post',
      dataType:'json',
      data:{id: id},
      success(res) {
        if (res.data.code == '200') {
          image.splice(index,1)
          _this.setData({
            merchant_detail_image: image
          })
        }
      },
      fail(err) {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  phonecheck(e){
    var _this = this;
    var phone = e.detail;
    if (!(/^1[3456789]\d{9}$/.test(phone))){
      _this.setData({
        errmsg: "请检查手机号码格式"
      })
    } else {
      _this.setData({
        errmsg: ""
      })
    }
  },
  formSubmit(e){
    app.check_login();
     var _this=this;
     var data=e.detail.value;
     var user_id = wx.getStorageSync('user_id');
    // console.log(data.merchant_city);return false;
    if (data.name==null||data.name.replace(/\s*/g, "")==''){
      app.showMsg('名称不能为空');
      return;
     }

    if (data.phone == null || data.phone.replace(/\s*/g, "") == '' || !(/^1[3456789]\d{9}$/.test(data.phone))) {
      app.showMsg('请检查手机号码');
      return;
    }

    if (data.merchant_city == null || data.merchant_city.replace(/\s*/g, "") == '') {
      app.showMsg('地址不能为空');
      return;
    }
    if (data.keyword == null || data.keyword.replace(/\s*/g, "") == '')   {
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
        name: data.name,
        type: _this.data.merchant_classify[data.type]['id'],
        keyword: data.keyword,
        merchant_city: data.merchant_city,
        phone: data.phone,
        merchant_time: data.merchant_time,
        facility: data.facility,
        announcement: data.announcement,
        image_list: _this.data.image_list,
        merchant_detail_list:_this.data.merchant_detail_list,
        user_id : user_id,
        longitude: _this.data.longitude,
        latitude:_this.data.latitude,
      },
      success(res){
        var data = JSON.parse(res.data);
        // console.log(data);
        _this.setData({
          disabled: true
        })
        if (data.msg == 'success') {
          wx.showToast({
            title: "提交成功",
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
      }
    })
  }
})