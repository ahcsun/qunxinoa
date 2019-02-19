// pages/login/login.js
var api = require("../../api.js"),
  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
  },
  // 获取手机号
  phone: function(res) {
    console.log(res.detail.value)
    this.setData({
      phone: res.detail.value
    })
  },
  // 获取密码
  pass: function(res) {
    console.log(res.detail.value)
    this.setData({
      pass: res.detail.value
    })
  },
  // 登录
  Submit: function(res) {
    var that = this;
    var phone = that.data.phone; // 获取手机号
    var pass = that.data.pass; //获取密码
    if (phone == '' || phone == undefined) {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none'
      })
    }else if (pass == undefined || pass == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    } else {
      app.request({
        url: api.login,
       
        method: "POST",
        data: {
          username: phone,
          password: pass
        },
        success: function (t) {
          console.log("success",t)
          var login = t.login
          var msg = t.msg
          var user = t.user
          login == false ? wx.showToast({
            title: msg,
            icon: "none"
          }) : wx.navigateTo({
            url: '/pages/index/index'
          }) 
          wx.setStorage({
            key: 'user',
            data: user,
          })
        },
        fail: function () {
          console.log("fail")
        },
        complete: function(){
          console.log("complate")
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})