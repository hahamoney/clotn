// pages/news/merpublish.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[],
    address:'',
    longitude: '',
    latitude: '',
    checked: false,
    xychecked: false,
    message_image:[],
    image_list:[],
    f_type:''
  },
  onLoad:function(option){
    var _this = this;
  
    if(!wx.getStorageSync('msg_type'+option.type)){
      wx.request({
        url: app.data.api + 'msg_type?type=' + option.type,
        dataType: 'json',
        success(res) {
          _this.setData({
            type: res.data.data,
          })
          wx.setStorageSync('msg_type' + option.type, res.data.data);
        }
      })
    }else{
      _this.setData({
        type:wx.getStorageSync('msg_type'+option.type),
      })
    }
    _this.setData({
      f_type:option.type,
      address: wx.getStorageSync('my_address'),
      longitude: wx.getStorageSync('my_longitude'),
      latitude: wx.getStorageSync('my_latitude')
    })


  },
  onShow: function () {
    if(wx.getStorageSync('address')){
      this.setData({
        address: wx.getStorageSync('address'),
        longitude: wx.getStorageSync('longitude'),
        latitude: wx.getStorageSync('latitude'),
      });
      wx.removeStorageSync('address');
      wx.removeStorageSync('longitude');
      wx.removeStorageSync('latitude');
    }

  },

  onChangeAddress: function (e) {
    wx.navigateTo({
      url: "/pages/merchant/map"
    });
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },

  onxyChange({ detail }) {
    this.setData({ xychecked: detail });
  },
  upload_detail(){
    app.check_login();
    var user_id = wx.getStorageSync('user_id');
    var _this = this;
    var list = _this.data.image_list;
    var image = _this.data.message_image;
    wx.chooseImage({
      success(res) {
        wx.uploadFile({
          url: app.data.api + 'msg_image',
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            user_id: user_id
          },
          success(res) {
            var data = JSON.parse(res.data);
            list.push(data.id);
            image.push(app.data.image+data.path);
            _this.setData({
              image_list:list,
              message_image:image
            })
          }
        })
      }
    })

  },
  submit(e){
    app.check_login();
    var _this = this;
    var data = e.detail.value;;
    console.log(data);
    var user_id = wx.getStorageSync('user_id');
    if (data.content == null || data.content.replace(/\s*/g, "") == '') {
      app.showMsg('内容描述不能为空');
      return;
    }
    if (data.type == null) {
      app.showMsg('类别不能为空');
      return;
    }
    if (data.linkman == null || data.linkman.replace(/\s*/g, "") == '') {
      app.showMsg('联系人不能为空');
      return;
    }
    if (data.link_phone == null || data.link_phone.replace(/\s*/g, "") == '') {
      app.showMsg('联系电话不能为空');
      return;
    }
    if (data.checkword == null || data.checkword.replace(/\s*/g, "") == '') {
      app.showMsg('关键字不能为空');
      return;
    }
    if (data.address == null || data.address.replace(/\s*/g, "") == '') {
      app.showMsg('地址不能为空');
      return;
    }
    wx.request({
      url: app.data.api +'msg_save',
      dataType:'Json',
      method:'POST',
      data:{
        content: data.content,
        type:data.type,
        linkman: data.linkman,
        link_phone: data.link_phone,
        checkword: data.checkword,
        address: data.address,
        longitude:_this.data.longitude,
        latitude:_this.data.latitude,
        user_id: user_id,
        message_image:_this.data.image_list,
        f_type: _this.data.f_type
      },
      success(res){
        var data =JSON.parse(res.data);
        if(res.msg=='success'){
          wx.showToast({
            title: data.msg,
            icon:'none',
            success(){
              wx.switchTab({
                url: '/pages/index/index'
              });
            }
          })
        }
      }
    })


  }

})