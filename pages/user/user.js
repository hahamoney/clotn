const app = getApp()

Page({
  data: {
    username: '',
    avatarUrl:'/image/icon_7.png'
  },
  

  onLoad: function () {
    var avatarUrl = wx.getStorageSync('avatarUrl');
    var username = wx.getStorageSync('username');
    this.setData({
      avatarUrl:avatarUrl,
      username: username
    })
  },
  bindGetUserInfo(e){
    var _this = this;
      var userInfo = e.detail.userInfo;
        wx.login({
          success(res) {
              console.log(res.code);
            wx.request({
              url: app.data.api+'sign_in',
              method:'post',
              dataType:'Json',
              data: { code: res.code, userInfo:userInfo},
              success(res) {
                 var data = JSON.parse(res.data);
                wx.setStorageSync('user_id', data.id);
                wx.setStorageSync('avatarUrl', data.avatarUrl);
                wx.setStorageSync('username', data.name);
                  _this.setData({
                    avatarUrl: data.avatarUrl,
                    username: data.name
                  })
              }
            })
          }
        })
      }
})