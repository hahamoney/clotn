// pages/merchant/merchantdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  onLoad(options) {
    var _this = this;
    var id = options.id;
    _this.getCar(id);
  },

  getCar(id) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.data.api + 'car_detail',
      method: 'get',
      data: { id: id },
      dataType: 'json',
      success(res) {
        wx.hideLoading();
        var data = res.data;
        if (data.code == '200') {
          _this.setData({
            carid: id,
            name: data.data.name,
            contact: data.data.contact,
            phone: data.data.phone,
            address: data.data.address,
            scope: data.data.scope,
            introduce: data.data.introduce
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
    var collect_id = _this.data.carid;
    // console.log(collect_id);return false;
    wx.request({
      url: app.data.api + 'collect',
      method: 'post',
      data: {
        user_id: user_id,
        collect_id: collect_id,
        type: 1,
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
    var id = _this.data.carid;
    return {
      title: '车队详情',
      path: '/pages/news/cardetail?id='+id
    }
  },

})