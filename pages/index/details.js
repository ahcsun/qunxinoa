// pages/index/details.js
var api = require('../../api.js'), app = getApp(), WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.infoDetail(options)
  },
  // 信息详情
  infoDetail: function(options){
    var user = wx.getStorageSync("user")
    var _that = this
    let that = this
    console.log(user)
    app.request({
      url: api.infoCenter.detail,
      method: "POST",
      data: {
        uid: user.uid,
        articleid: options.articleid,
        isadministrator: user.isadministrator
      },
      success: function(t){
        var contents = t.data.content
         _that.setData({
           teit: t.data,
           teitList: t.data.readers
         })
        WxParse.wxParse('article', 'html', contents, _that)
         console.log("detail",t.data,contents)
      },
      fail: function(){
        console.log("fail")
      }
    })
    // this.infoBjread(options)
  },
  //把信息标记为已读
  // infoBjread: function(options){
  //   var user = wx.getStorageSync("usr")
  //   app.request({
  //     url: api.infoCenter.bjread,
  //     method: "POST",
  //     data: {
  //         uid: user.uid,
  //      articleid: options.articleid
  //     },
  //     success: function(t){
  //       console.log("infoBjread=======>",t)
  //     }
  //   })
  // },
  //信息被那些人员阅读过
  // infoPeread: function(options){
  //   app.request({
  //     url: api.infoCenter.peread,
  //     method:"POST",
  //     data:{
  //         articleid: options.articleid,
  //     },
  //     success: function(res){
  //       var jsb = "技术部"
  //       console.log("infoPeread========>",res)  
  //     }
  //   })

  // },
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