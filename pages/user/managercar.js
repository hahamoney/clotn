// pages/user/managermer.js
import Dialog from '../../vant-weapp/dist/dialog/dialog';

const app = getApp()
const user_location = app.user_Loction()

Page({
  data: {
    imageurl: app.data.image,
  },

  onLoad: function () {
    app.check_login();
    this.getmessage();
  },

  getmessage() {
    var _this = this;
    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: app.data.api + 'my_people?' + user_location,
      method: 'get',
      data: { user_id: user_id },
      success(res) {
        var data = res.data.data;
        if (data == null || data == '') {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            success(res) {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/user/user'
                })
              }, 1000)
            }
          });
        }
        _this.setData({
          list: data,
        })
      }
    })
  },

  edit(e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/merchant/applypeople?id=' + id
    });
  },

  delete(e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    Dialog.confirm({
      title: '警告',
      message: '确认删除此项？'
    }).then(() => {
      // on confirm
      wx.request({
        url: app.data.api + 'mypeople_del',
        method: 'post',
        dataType: 'json',
        data: { id: id },
        success(res) {
          var data = res.data;
          if (data.msg == 'success') {
            wx.showToast({
              title: data.data.msg,
              icon: 'none',
              duration: 1500,
              success(res) {
                setTimeout(function () {
                  _this.onLoad();
                }, 1500)
              }
            })
          } else {
            wx.showToast({
              title: data.data.msg,
              icon: 'none',
              duration: 1500,
            })
          }
        }
      })
    }).catch(() => {
      // on cancel
      Dialog.close();
    });
  }

})