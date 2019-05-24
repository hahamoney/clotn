// pages/news/product.js
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
        // console.log(data);
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

  onClickHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onClickCall() {
    var _this = this;
    app.phone_call(_this.data.phone);
  },

  onClickStar() {
    
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