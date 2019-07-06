// pages/merchant/merchantdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl: '',
    facility: [],
    show: false,
    disabled: false
  },

  onLoad(options) {
    var _this = this;
    var id = options.id;
    _this.getMerchant(id);
    _this.setData({
      imageurl: app.data.image,
    })
    //_this.getCommentlist(id);
  },

  getMerchant(id) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.data.api + 'merchant_detail',
      method: 'get',
      dataType: 'json',
      data: { id: id },
      success(res) {
        wx.hideLoading();
        var data = res.data;
        // console.log(data.data.facility);
        if (data.code == '200') {
          _this.setData({
            merid: data.data.res.id,
            name: data.data.res.name,
            phone: data.data.res.phone,
            facility: data.data.facility,
            merchant_city: data.data.res.merchant_city,
            announcement: data.data.res.announcement,
            merchant_time: data.data.res.merchant_time,
            detail_image:data.data.detail_image,
            handsome:data.data.res.image[0].path
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

  getCommentlist(id) {
    var _this = this;
    wx.request({
      url: app.data.api + 'merchant_comments',
      method: 'get',
      data: { message_id: id },
      dataType: 'json',
      success(res) {
        var data = res.data;
        // console.log(data);return false;
        _this.setData({
          commentlist: data.data.comment_list,
        })
      }
    })
  },

  onClickHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onClickCmt() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onClickCall() {
    var _this = this;
    app.phone_call(_this.data.phone);
  },

  merchantapply: function () {
    wx.navigateTo({
      url: '/pages/merchant/apply',
    })
  },

  onClickStar() {
    var _this = this;
    var user_id = wx.getStorageSync('user_id');
    var collect_id = _this.data.merid;
    wx.request({
      url: app.data.api + 'collect',
      method: 'post',
      data: {
        user_id: user_id,
        collect_id: collect_id,
        type: 4,
      },
      dataType: 'json',
      success(res) {
        var data = res.data;
        // console.log(data);
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

  onShareAppMessage: function (res) {
    var _this = this;
    var id = _this.data.merid;
    return {
      title: '商家详情',
      path: '/pages/merchant/merchantdtail?id='+id,
    }
  },

  formSubmit(e) {
    app.check_login();
    var _this = this;
    var user_id = wx.getStorageSync('user_id');
    var id = _this.data.merid;
    var data = e.detail.value;
    if (data.content == null || data.content.replace(/\s*/g, "") == '') {
      app.showMsg('评论内容不能为空');
      return;
    }

    wx.request({
      url: app.data.api + 'comment',
      method: 'post',
      dataType: 'Json',
      data: {
        user_id: user_id,
        message_id: id,
        content: data.content,
      },
      success(res) {
        //console.log(res);
        var data = JSON.parse(res.data);
        if (data.msg == 'success') {
          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 1500,
            success() {
              _this.setData({
                disabled: true
              })
              setTimeout(function () {
                _this.getCommentlist(id);
                _this.setData({ show: false });
              }, 1500)
            }
          })
        }
      }
    })
  }

})