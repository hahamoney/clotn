//index.js
//获取应用实例
const app = getApp()
const user_location = app.user_Loction();
Page({
  data: {
    imageurl:'/image/',
    imgUrls: [
      // {path:"banner1.jpeg"},
      // {path:"banner2.png"},
      // {path:"banner3.png"}
    ],
    hotmerchant: [],
    merchant_list:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollTop: 100,
    title_list: ['热门推荐', '品质商家'],
    page_list: [1,  1],
    message_list: [[], []],
    index: 0
  },

  onLoad: function () {    
    var _this = this;
    this.getmessage(0);
  },

  getmessage(index, page = 1) {
    var _this = this;
    var idx = index;
    var page = page;
    var list = _this.data.message_list;
    wx.request({
      url: app.data.api + 'home?' + user_location,
      data: { type: index, page: page },
      success(res) {
        if (list[0] == false) {
          _this.setData({
            // imgUrls: res.data.data.banner,
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


  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var user_id = wx.getStorageSync('user_id');
    if(user_id){
      var address = wx.getStorageSync('my_address');
      var longitude = wx.getStorageSync('my_longitude');
      var latitude = wx.getStorageSync('my_latitude');
      wx.request({
        url: app.data.api +'update_location',
        method:'post',
        dataType:'json',
        data:{user_id:user_id,address:address,longitude:longitude,
        latitude:latitude},
        success(res){
        }
      })
    }
  },
  postmerchant() {
    wx.navigateTo({
      url: '/pages/merchant/apply',
    })
  },
  newsdetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/detail?id=' + id,
    })
  },
  newsproduct(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/product?id='+id,
    })
  },
  phone(e){
    app.phone_call(e.currentTarget.dataset.phone);
  },
  merchantdetail(e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/merchant/merchantdetail?id='+id,
    })
  },
  cardetail(e) {
    var _this = this;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news/cardetail?id=' + id,
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

