// pages/news/product.js
import { base64src } from '../../utils/base64src.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
  },

  onLoad(options) {
    var _this = this;
    var id = options.id;
    _this.getDetail(id);
    _this.getCommentlist(id);
    _this.setData({
      imageurl: app.data.image,
    })
  },

  getDetail(id) {
    var _this = this;
    wx.showLoading({
      'title': '加载中'
    });
    wx.request({
      url: app.data.api + 'msg_detail',
      method: 'get',
      data: {id: id},
      dataType: 'json',
      success(res) {
        wx.hideLoading();
        var data = res.data.data;
        var qrcode = data.qrcode;
        base64src(qrcode, res => {
          // console.log(res) // 返回图片地址，直接赋值到image标签即可
          _this.setData({
            qrcode: res
          })
        });
        console.log(data);
        _this.setData({
          productid: id,
          name: data.res[0].user.name,
          img: data.res[0].user.avatarUrl,
          type: data.res[0].type,
          city: data.res[0].city,
          content: data.res[0].content,
          created_at: data.res[0].created_at,
          phone: data.res[0].link_phone,
          proimg: data.proimg,
        })
      },
      fail(res) {
        wx.showLoading({
          'title': '网络错误'
        })
      }
    })
  },

  getCommentlist(id) {
    var _this = this;
    wx.request({
      url: app.data.api + 'comment_list',
      method: 'get',
      data: { message_id: id },
      dataType: 'json',
      success(res) {
        var data = res.data;
        _this.setData({
          commentlist: data.data.comment_list,
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

  onClickStar(e) {
    var _this = this;
    var user_id = wx.getStorageSync('user_id');
    var collect_id = _this.data.productid;
    // console.log(collect_id);return false;
    wx.request({
      url: app.data.api + 'collect',
      method: 'post',
      data: {
        user_id: user_id,
        collect_id: collect_id,
        type: 3,
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

  onClickCmt() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  

  onShareAppMessage() {
    var _this = this;
    var id = _this.data.productid;
    return {
      title: '个人物流详情',
      path: '/pages/news/product?id=' + id
    }
  },
})