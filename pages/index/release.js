// pages/index/release.js
var api = require('../../api.js'), app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
     var _that = this
     _that.setData({
       options : res
     })
     console.log("onLoad======>",res)
  },
  // 添加
  releaseAdd:function(t){
    wx.reLaunch({
      url: '/pages/address/index?uid='+this.data.options.uid + '&btnTitle='+this.data.options.btnTitle + '&btnText='+ this.data.options.btnText+'&index='+t.currentTarget.dataset.index,
    })
  },
  // 提交
  btn: function(options){
    var options = this.data.options
    var user = wx.getStorageSync("user")
    if(options.deptid == undefined){
       options.deptid = 0
    }else{
      options = this.data.options
    }
    if(options.uids == undefined){
      options.uids = 0
    }
    console.log("btn========>", this.data.options,user)
      app.request({
      url: api.infoCenter.create,
      method: "POST",
      data: {
        isadministrator: user.isadministrator,
        uid: options.uid, 
        type: 0,
        publishScope: options.deptid + ',' + options.uids,
        status: 1,
        subject: options.btnTitle,
        content: options.btnText,
        catid: 0,
        attachmentid: 0, 
      },
      success: function (res) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        wx.reLaunch({
          url: '/pages/index/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        console.log("信息添加======>", res)
      }

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