// pages/news/detail.js
  const app =getApp();
  const user_location = app.user_Loction();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      top_list:[],
      id:'',
      index:0,
      message_list:[[],[],[]],
      page_list:[1,1,1],
      top_list:['最近','新入','热门']

  },
  onLoad(options) {
      if(!options.id){
        app.showMsg('请求有误');
        wx.navigateBack();
      }
    this.setData({
      id:options.id
    })
    this.getmessage(0);


  },
  newsproduct(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/product?id=' + id,
    })
  },
  phone(e) {
    app.phone_call(e.currentTarget.dataset.phone);
  },
  getmessage(index, page = 1) {
    var _this = this;
    var idx = index;
    var page = page;
    var list = _this.data.message_list
    var id = _this.data.id;
    if(id==''){
      app.showMsg('请求有误');
      return false;
    }
    wx.request({
      url: app.data.api + 'msg?' + user_location,
      data: { type: index, page: page ,id:id},
      success(res) {
        if (list[0] == false) {
          _this.setData({
            imageurl: app.data.image,
          })
        }
        res.data.data.forEach(function (elem) {
          list[idx].push(elem);
        });
        _this.setData({
          message_list: list,
        })
      }
    })
  },
  onChange(e) {
    if (this.data.message_list[e.detail.index] == false) {
      this.getmessage(e.detail.index);
    }
    this.setData({
      index: e.detail.index
    })
  },
  onReachBottom() {
    var _this = this;
    var index = _this.data.index;
    var page_list = _this.data.page_list;
    page_list[index]++;
    _this.getmessage(index, page_list[index]);
    _this.setData({
      page_list: page_list
    })
  }
})