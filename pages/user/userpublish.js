// pages/user/userpublish.js
const app =getApp();
Page({

  data: {
    message:[]
  },

  onLoad: function (options) {
    app.check_login();
    var _this = this;
    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: app.data.api +'my_message?user_id='+user_id,
      success(res){
        if(res.data.code==200){
          _this.setData({
            message:res.data.data
          })
        }
      }
    })
  }, msg(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/product?id=' + id,
    })
  }
})