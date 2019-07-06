// pages/news/carlist.js
const app = getApp()
Page({

  data: {
  },

  carlist(e) {
    wx.switchTab({
      url: '/pages/news/carlist',
    })
  },


  onLoad(options) {
    var _this = this;
    if(!options.id){
      app.showMsg('网络有误');
      wx.navigateBack();
      return false;
    }
    wx.request({
      url: app.data.api +'car_branch?car_id='+options.id,
      success(res){
        _this.setData({
          res:res.data.data
        })
      }
    })
  },
  phone(e) {
    app.phone_call(e.currentTarget.dataset.phone);
  },
})