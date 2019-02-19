// pages/index/create.js
var api = require('../../api.js'), app = getApp()
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
  
  },
  formSubmit:function(res){
    var btnTitle = res.detail.value.btnTitle
    var btnText = res.detail.value.btnText
    var user = wx.getStorageSync("user")
    if ((btnTitle == undefined || btnTitle == "")||(btnText == undefined || btnText=="")){
               wx.showToast({
                 title: '请输入标题或内容',
                 icon: 'none'
               })
    }else{
    wx.navigateTo({
      url: '/pages/index/release?uid='+user.uid+'&btnTitle='+btnTitle+'&btnText='+btnText,
    })
    }
  },
  // 获取用户输入标题的值
  btnTitle:function(e){
    var _that = this
        _that.setData({
          btnTitle : e.detail.value
        })
       console.log("标题的值====>",e.detail.value)
  },
  //获取用户输入内容的值
  btnText: function(e){
    var _that = this
    _that.setData({
      btnText: e.detail.value
    })
       console.log("内容的值=====>",e.detail.value)
  },
  //保存为草稿
  btnRest:function(){
    var user = wx.getStorageSync("user")
    var _that = this
    var btnTitle = _that.data.btnTitle
    var btnText = _that.data.btnText
   if(btnTitle == '' || btnTitle == undefined){
       wx.showToast({
         title: '标题为空',
         icon: 'none'
       })
       return false
   }else if(btnText == undefined || btnText == ''){
       wx.showToast({
         title: '内容为空',
         icon: 'none'
       })
       return false
   }else{
     wx.showModal({
       title: '保存为草稿',
       success: function(res){
         res.confirm ?
         app.request({
           url: api.infoCenter.create,
           method: "POST",
           data: {
             uid: user.uid,
             type: 0,
             publishScope: '',
             status: 3,
             subject: btnTitle,
             content: btnText,
             catid: 0,
             attachmentid: 0,
           },
           success: function (res) {
             console.log("infoPeread========>", res)
             wx.redirectTo({
               url: '/pages/index/index',
             })
           }

         })
           : wx.showToast({
             title: '您点击了取消',
             icon: 'none'
           })
       }
     })
     
   }
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