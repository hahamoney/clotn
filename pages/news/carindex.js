// pages/news/carindex.js
const app = getApp()
Page({

  data: {
    bgurl: app.data.image,
    imageurl: '/image/',
    imgUrls: [
      // { path: "banner1.jpeg" },
      // { path: "banner4.png" },
      // { path: "banner5.png" }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollTop: 100,
    index: 1,
    res: []
  },

  carlist(e) {
    wx.switchTab({
      url: '/pages/news/carlist',
    })
  },
  branch(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/branch?id=' + id,
    })
  },

  onLoad(options) {
    var _this = this;
    _this.getcarlist();
  },
  onReachBottom: function () {
    return false;
    var _this = this;
    var index = _this.data.index;
    var list = _this.data.res;
    index++
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: app.data.api + 'car_list?page=' + index,
      success(res) {
        if (res.data.data) {
          res.data.data.forEach(function (elem) {
            list.push(elem);
          });
          _this.setData({
            res: list,
            index: index
          })
        } else {
          app.showMsg('无更多数据');
        }
      }
    });
  },

  getcarlist() {
    var _this = this;
    wx.request({
      url: app.data.api + 'car_hot',
      success(res) {
        // console.log(res);
        _this.setData({
          res: res.data.data,
        })
      }
    });
  },
  onSearch(e) {
    if (e.detail == '' || e.detail == null) {
      app.showMsg('输入不能为空');
      return false;
    }
    var _this = this;
    wx.request({
      url: app.data.api + 'car_search?search=' + e.detail,
      success(res) {
        if (res.data.code == '500') {
          app.showMsg('查询有误');
          return false;
        }
        _this.setData({
          res: res.data.data
        })
      }
    })
  }



})