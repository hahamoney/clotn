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
  },
  check_login(){
    if (!wx.getStorageSync('user_id')){
      wx.showToast({
        title: '请登陆',
        icon:'none',
        success(res){
          wx.switchTab({
            url: '/pages/user/user'
          });
        }
      })
      return false;
    }
  },
    phone_call(phone){
      if(phone==''){
        this.showMsg('没有预留电话哦');
        return false;
      }
      wx.makePhoneCall({
        phoneNumber: phone // 仅为示例，并非真实的电话号码
      })
    }
})