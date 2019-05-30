// pages/news/detail.js
  const app =getApp();
  const user_location = app.user_Loction();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      top_list:[],
      index:0,
      message:[],
      message_page:[1,1,1]

  },
  onLoad(options) {
      if(!options.id){
        app.showMsg('请求有误');
        wx.navigateBack();
      }
      var _this = this;
      var list = _this.data.message;
    wx.request({
      url: app.data.api +'msg_type?fid='+options.id,
      dataType:'json',
      success(res){
        _this.setData({
          top_list:res.data.data
        })

        wx.request({
          url: app.data.api + 'msg?' + user_location + '&type=' + _this.data.top_list[0]['id'],
          dataType: 'json',
          success(res) {
            if (res.data.code == 200) {
              list[0] = res.data.data;
              _this.setData({
                message: list
              })
            }
          }
        })

      }
    })



  },
  newsproduct() {
    wx.navigateTo({
      url: '/pages/news/product',
    })
  }, get_message(e){
    var _this = this;
    var index = e.detail.index;
    if(index==null){
      app.showMsg('参数错误');
      return false;
    }
    var type = _this.data.top_list[index]['id'];
    var list = _this.data.message;
    _this.setData({
      index:index
    })
    if (!_this.data.message[index]){
        wx.request({
          url: app.data.api +'msg?'+user_location+'&type='+type,
          dataType:'json',
          success(res){
            if(res.data.code==200){
              list[index] = res.data.data;
              _this.setData({
                  message:list,
              })
            }
          }
        })
    }
  },  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      app.showMsg('加载中');
      var _this = this;
      var index = _this.data.index;
      var type = _this.data.top_list[index]['id'];
      var list = _this.data.message;
      var message_page = _this.data.message_page;
      var page = message_page[index];
       ++page;
      message_page[index]=page;
    wx.request({
      url: app.data.api + 'msg?' + user_location + '&type=' + type+'&page='+page,
      dataType: 'json',
      success(res) {
        if (res.data.code == 200) {
          list[index].push(res.data.data);
          _this.setData({
            message: list,
            message_page:message_page
          })
        }
      }
    })

  },

})