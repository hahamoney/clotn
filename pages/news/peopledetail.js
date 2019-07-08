// pages/news/peopledetail.js
import { base64src } from '../../utils/base64src.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  onLoad(options) {
    var _this = this;
    var scene = options.scene;
    if (scene) {
      var id = scene;
    } else {
      var id = options.id;
    }
    _this.getCar(id);
  },

  getCar(id) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.data.api + 'people_detail',
      method: 'get',
      data: { id: id },
      dataType: 'json',
      success(res) {
        wx.hideLoading();
        var data = res.data;
        var qrcode = data.data.qrcode;
        base64src(qrcode, res => {
          // console.log(res) // 返回图片地址，直接赋值到image标签即可
          _this.setData({
            qrcode: res
          })
        });
        if (data.code == '200') {
          _this.setData({
            peopleid: id,
            name: data.data.name,
            phone: data.data.phone,
            announcement: data.data.announcement,
            address: data.data.address,
            type: data.data.type,
            handsome: data.data.handsome,
            imageurl: app.data.image,
          })
        }
      },
      fail(res) {
        wx.showLoading({
          title: '网络错误'
        })
      }
    })
  },

  //点击开始的时间  
  timestart: function (e) {
    var _this = this;
    _this.setData({ timestart: e.timeStamp });
  },
  //点击结束的时间
  timeend: function (e) {
    var _this = this;
    _this.setData({ timeend: e.timeStamp });
  },

  saveimg(e) {
    var _this = this;
    var times = _this.data.timeend - _this.data.timestart;
    if (times > 300) {
      console.log("长按");
      wx.getSetting({
        success: function (res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              console.log("授权成功");
              var imgUrl = _this.data.qrcode;
              wx.downloadFile({
                url: imgUrl,
                success: function (res) {
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function (res) {
                      wx.showToast({
                        title: '保存成功',
                        icon: 'success'
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }

  },

  onClickHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onClickCall() {
    var _this = this;
    app.phone_call(_this.data.phone);
  },

  carapply() {
    wx.navigateTo({
      url: '/pages/news/carapply',
    })
  },

  onClickStar(e) {
    var _this = this;
    var user_id = wx.getStorageSync('user_id');
    var collect_id = _this.data.peopleid;
    // console.log(collect_id);return false;
    wx.request({
      url: app.data.api + 'collect',
      method: 'post',
      data: {
        user_id: user_id,
        collect_id: collect_id,
        type: 2,
      },
      dataType: 'json',
      success(res) {
        var data = res.data;
        if (data.code == '200') {
          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 1500,
          })
        }
      }
    })
  },

  onShareAppMessage() {
    var _this = this;
    var id = _this.data.peopleid;
    return {
      title: '个人物流详情',
      path: '/pages/news/peopledetail?id=' + id
    }
  },

})