//app.js
App({
  data:{
    mapkey:'IHTBZ-7V5CR-4WZWT-WNDFX-7B2V5-ZEFYY',
    api:'http://cloth.com/api/',
    image:'http://cloth.com/',
    appid:'wx716a760549d1ba15',
    appSecret:'c02165caa149933c3687cf4d33e09e68'
    },
  onLaunch: function () {

  },showMsg(title){
    wx.showToast({
      title: title,
      icon:'none'
    })
  }
})