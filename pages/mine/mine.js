// pages/mine/mine.js
var api = require("../../api.js"), app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log('getUserinfo', res.userInfo)
    //     that.setData({
    //       name: res.userInfo
    //     })
    //   }
    // })
     this.logins()
  },
logins:function(){
  console.log("logins")
  var _that = this
  var user = wx.getStorageSync("user")
  var t = app.data.e
  var imgurl = t + user.avatar_big
  console.log("uid", user.uid)
  console.log("url", user)
  _that.setData({
    user: user,
    uid: user.uid,
    imgurl: imgurl
  })  
},
  myinfo: function () {
    wx.navigateTo({
      url: '/pages/mine/information',
    })
  },
  // 关于我们
  collection: function () {
    wx.navigateTo({
      url: '/pages/mine/about',
    })
  },
  task: function () {
    wx.navigateTo({
      url: '/pages/my/keep/keep',
    })
  },
  // 修改密码
  release: function () {
    wx.navigateTo({
      url: '/pages/mine/password',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})