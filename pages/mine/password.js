// pages/mine/password.js
var api = require('../../api.js'),
  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Show: 'none',
    success: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.password()
  },

  password: function() {

  },
  // 老密码
  oldpass: function(oldpass) {
    console.log("老密码", oldpass.detail.value);
    this.setData({
      oldpass: oldpass.detail.value
    })
  },
  // 新密码
  newpass: function(newpass) {
    console.log("新密码", newpass.detail.value);
    this.setData({
      newpass: newpass.detail.value
    })
  },
  // 确认密码
  surepass: function(surepass) {
    console.log("重复密码", surepass.detail.value);
    this.setData({
      surepass: surepass.detail.value
    })
  },
  // 提交
  btn: function() {
    var t = this;
    var oldpass = t.data.oldpass;
    var newpass = t.data.newpass;
    var surepass = t.data.surepass;
    if (oldpass == '' || oldpass == undefined || newpass == '' || newpass == undefined) {
      wx.showToast({
        title: '密码不得为空',
        icon: "none"
      })
    }else if(surepass == '' || surepass == undefined){
        wx.showToast({
          title: '请输入确认密码',
          icon: 'none'
        })
    } else if (newpass != surepass) {
      wx.showToast({
        title: '输入不一致 请重新输入',
        icon: "none"
      })
    } else {
      var user = wx.getStorageSync("user")
      var uid = user.uid
      console.log("uid=====>", uid)
      console.log("oldpass======>", oldpass)
      console.log("newpass=====>", newpass)
      console.log("repass======>", surepass)
      app.request({
        url: api.pwd,
        method: "POST",
        data: {
          uid: uid,
          oldpass: oldpass,
          newpass: newpass,
          repass: surepass
        },
        success: function(res) {
          console.log("pwd")
          console.log(res)
          var msg = res.msg
          var isSuccess = res.isSuccess
          isSuccess == false ? wx.showToast({
            title: msg,
            icon: 'none'
          }) : wx.reLaunch({
            url: '/pages/login/login',
          })
          wx.clearStorage("user")
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  },
  none: function() {
    this.setData({
      Show: 'none'
    })
    wx.navigateBack({
      url: '/pages/my/details/details'
    })
  },
})