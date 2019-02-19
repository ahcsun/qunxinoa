// pages/index/over.js
var api = require('../../api.js'),app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: ['全部类型', '我待办的', '我发起的'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad",options.id)
    var _that = this
    options.id == 1 ? this.taskSearch(options)
      : this.taskList(options) 
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
//已完成任务列表
  taskList: function(options){
    var _that = this
    app.request({
      url: api.taskAssigned.tasklist,
      method:"POST",
      data:{
          uid: options.uid,
      },
      success: function(res){
        var datas = res.datas
        datas.map(function (item, index) {
          datas[index].bind = 'btnClick'
        })
         _that.setData({
           datas: res.datas
         })
        console.log("已完成任务列表========>",res)  
      }
    })
  },
  //搜索
  taskSearch: function(options){
    var _that = this
    console.log("tasksearch", options)
    app.request({
      url: api.taskAssigned.tasksearch,
      method: "POST",
      data: {
        uid: options.uid,
        keyword: options.keyword
      },
      success: function (res) {
        _that.setData({
          datas: res.datas
        })
        console.log("任务列表搜索接口========>", res)
      }
    })
  },
  // 任务详情
  0: function(options){
    // console.log("click")
    var _that = this
    var indexs = options.currentTarget.dataset.index
    var datas = _that.data.datas
    var user = wx.getStorageSync("user")
    datas.map(function (item, index){
      indexs == index && wx.navigateTo({
        url: '/pages/index/taskdetail?assignmentid='+datas[indexs].assignmentid + '&uid='+user.uid + '&shows='+true,
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