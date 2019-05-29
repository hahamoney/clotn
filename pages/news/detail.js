// pages/news/detail.js
  const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      top_list:[]
  },
  onLoad(options) {
      if(!options.id){
        app.showMsg('请求有误');
        wx.navigateBack();
      }
      var _this = this;
    wx.request({
      url: app.data.api +'msg_type?fid='+options.id,
      dataType:'json',
      success(res){
        _this.setData({
          top_list:res.data.data
        })
      }
    })


  },
  newsproduct() {
    wx.navigateTo({
      url: '/pages/news/product',
    })
  }

})