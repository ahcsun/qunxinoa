// pages/index/taskdetail.js
var api = require('../../api.js'), Api = require("../../utils/util.js"),
  app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    shows: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _that = this
    var user = wx.getStorageSync("user")
    this.onpageRefresh(options)
    options.shows == 'true' && _that.setData({
      shows: options.shows
    })

    // 任务动态
    app.request({
      url: api.taskAssigned.comments,
      method: 'POST',
      data: {
        uid: options.uid,
        isadministrator: user.isadministrator,
        assignmentId: options.assignmentid
      },
      success: function(res) {
        var List = res.data.data.comments
        // List.map(function (index, item) {
        //   index.ctime = Api.toDate(index.ctime)
        // })
        _that.setData({
          Lists: List
        })
         
        console.log("任务动态========>", res)
      }
    })
  },

  //任务详情页面
  onpageRefresh: function(options) {
    var _that = this
    _that.setData({
      uid: options.uid,
      assignmentId: options.assignmentid
    })
    app.request({
      url: api.taskAssigned.taskdetail,
      method: 'POST',
      data: {
        uid: options.uid,
        assignmentId: options.assignmentid
      },
      success: function(res) {
        _that.setData({
          List: res

        })
        console.log("已任务详细页面========>", res)
      }
    })
  },
  // 编辑
  btnEditor: function() {
    var _that =  this
    wx.navigateTo({
      url: '/pages/index/newCreate?indexss=' + 0 + '&description=' + _that.data.List.data.assignment.description,
    })
  },
  // 已完成
  btnEnd: function(t) {
    var _that = this
    var uid = _that.data.uid
    var assignmentId = _that.data.assignmentId
    app.request({
      url: api.taskAssigned.taskend,
      method: "POST",
      data: {
        uid: uid,
        assignmentId: assignmentId
      },
      success: function(res) {
        setTimeout(function() {
          _that.setData({
            show: false
          })
        }, 3000)
        wx.navigateTo({
          url: '/pages/index/index'
        })
        console.log("已完成=====>", res)
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