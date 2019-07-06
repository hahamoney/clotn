// pages/news/index.js
const app = getApp()
const user_location = app.user_Loction();

Page({

  data: {
    imageurl: '',
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollTop: 100,
    title_list: ['货车', '面包车', '其他'],
    page_list: [1, 1, 1],
    message_list: [[], [], []],
    index: 0
  },

  onLoad: function () {
    this.getmessage(0);
  },



  getmessage(index, page = 1) {
    var _this = this;
    var idx = index;
    var page = page;
    var list = _this.data.message_list
    wx.request({
      url: app.data.api + 'logistics?' + user_location,
      data: { type: index, page: page },
      success(res) {
        if (list[0] == false) {
          _this.setData({
            imgUrls: res.data.data.banner,
            imageurl: app.data.image,
          })
        }
        res.data.data.res.forEach(function (elem) {
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
  },

  carlist(e) {
    wx.switchTab({
      url: '/pages/news/carlist',
    })
  },
  cardetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/cardetail?id=' + id,
    })
  },
  peopledetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/peopledetail?id=' + id,
    })
  },
  phone(e) {
    app.phone_call(e.currentTarget.dataset.phone);
  },
  peoplelist(e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/news/peoplelist?type=' + type,
    })
  },


})