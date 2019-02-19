// pages/address/junkindex.js
var api = require('../../api.js'), app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAllStatus: false,     // 全选状态，默认全选
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this
    _that.setData({
      options: options
    })
    app.request({
      url: api.Address.addressindex,
      method: "POST",
      data: {},
      success: function (res) {
        var users = res.data.depts
        users.map(function (item) {
          item.bind = "btnClick",
            item.selected = false
        })
        _that.setData({
          users: res.data.depts
        })
        console.log("通讯录主页", res)
      }
    })
  },

  // 进入通讯录页面
  btnClick: function (t) {
    var _that = this
    var idx = t.currentTarget.dataset.index
    var users = this.data.users
    users.map(function (item, index) {
         wx.navigateTo({
        url: '/pages/address/junkcode?deptids=' + users[idx].deptid + '&indexs='+_that.options.indexs,
      })
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