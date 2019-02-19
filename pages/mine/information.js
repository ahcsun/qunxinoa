// pages/mine/information.js
var api = require('../../api.js'),
  app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['男', '女'],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.modifyInfo()
  },
  // 页面加载时请求修改个人信息接口
  modifyInfo: function() {
    var user = wx.getStorageSync("user")
    var _that = this
    console.log("user=====>", user)
    _that.setData({
      weixin: user.weixin,
      gender: user.gender,
      mobile: user.mobile,
      email: user.email,
      username: user.username,
      deptname: user.deptname,
      posname: user.posname
    })
  },
  // 获取输入用户信息的值
  userInfo: function(options) {
    var _that = this
    var userInfo = options.detail.value
    _that.setData({
      userInfo: userInfo
    })
    console.log("userInfo========>", userInfo)
  },
  // 获取输入微信的值
  wxInfo: function(options) {
    var _that = this
    var wxInfo = options.detail.value
    _that.setData({
      wxInfo: wxInfo
    })
    console.log("wxInfo========>", wxInfo)
  },
  // 获取输入的邮箱值
  yxInfo: function(options) {
    var _that = this
    var yxInfo = options.detail.value
    _that.setData({
      yxInfo: yxInfo
    })
    console.log("yxInfo=======>", yxInfo)
  },
  // 获取输入的手机值
  sjInfo: function(options) {
    var _that = this
    var sjInfo = options.detail.value
    _that.setData({
      sjInfo: sjInfo
    })
    console.log("sjInfo======>", sjInfo)
  },
  // 性别选择
  bindPickerChange: function(e) {
    var index = this.data.index
    var _that = this
    var values = e.detail.value
    _that.setData({
      gender: parseInt(values)+1
    })
    console.log('picker发送选择改变，携带值为', _that.data.gender)
  },
  // 头像上传
  picUpload: function() {
    var _that = this
    var user = wx.getStorageSync("user")
    var uid = user.uid
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        _that.setData({
          tempFilePaths: tempFilePaths[0]
        })
        wx.uploadFile({
          url: api.upload, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'avatar',
          formData: {
            'user': 'test',
            uid: uid
          },
          success: function(res) {
            var data = res.data
            console.log("upload", res)
            //do something
          }
        })
      }
    })
  },
  // 保存
  formSubmit: function(e) {
    var t = this
    var user = wx.getStorageSync("user")
    var uid = user.uid
    var wxInfo = t.data.wxInfo
    // var userInfo = t.data.userInfo
    var xbInfo = t.data.gender
    var sjInfo = t.data.sjInfo
    var yxInfo = t.data.yxInfo
    // var deptname = t.data.deptname
    // var posname = t.data.posname
    var msg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g //邮箱
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; //手机号
    app.request({
      url: api.modify,
      method: "POST",
      data: {
        uid: uid,
        weixin: wxInfo,
        // username: userInfo,
        gender: xbInfo,
        mobile: sjInfo,
        email: yxInfo,
        // deptname: deptname,
        // posname: posname
      },
      success: function(res) {
        wx.showToast({
          title: '修改成功',
        })
        console.log("succes")
        console.log("modify", res)
      }
    })
    //  if(wxInfo == ''|| wxInfo == undefined){
    //     wx.showToast({
    //       title: '请修改微信号',
    //       icon: "none"
    //     })
    //   }else 
    //   if(yxInfo == "" || yxInfo == undefined){
    //      wx.showToast({
    //        title: '请修改邮箱',
    //        icon: 'none'
    //      })
    //   }else if(msg.test(yxInfo) == false){
    //     wx.showToast({
    //       title: '邮箱格式错误',
    //       icon: "none"
    //     })
    //   }else if(sjInfo == "" || sjInfo == undefined){
    //      wx.showToast({
    //        title: '请修改手机号',
    //        icon: 'none'
    //      })
    //   }else if(myreg.test(sjInfo) == false){
    //     wx.showToast({
    //       title: '手机格式错误',
    //       icon: "none"
    //     })
    //   }else{
    //     console.log("uid=====>", uid)

    //   }
  },
  // 退出登录
  loadExit: function() {
    app.request({
      url: api.exit,
      method: "POST",
      data: {},
      success: function(res) {
        console.log("exit", res)
        wx.reLaunch({
          url: '/pages/login/login',
        })
        wx.clearStorage("user")
      }
    })
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

  }
})