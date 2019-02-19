// pages/address/create.js
var api = require('../../api.js'),
  user = wx.getStorageSync("user"),
  indexs = null,
  app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modeList: [
      {
        img: "/images/add.png",
        name: "参与者", bind: 'createJoin'
      },
      {
      img: "/images/add.png",
      name: "负责人", bind: 'createHead'
      }
    ],
    Title:'',
    Text: '',
    date: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    console.log('----------------------------------------------------')
    var _that = this
    var title = wx.getStorageSync('Title');
    var text = wx.getStorageSync("Text")
    if(text){
      this.setData({
        Text: text
      })
    }
   if(title){
      this.setData({
        Title: title
      })
    }
    indexs = options.indexs
    _that.setData({
      options: options
    })
    if (options.uids){
      wx.setStorageSync("participantuid", options.uids) //创建参与者id
    }

    if (options.fzruids) {
      wx.setStorageSync("chargeuid", options.fzruids) //创建参与者id
    }
    
  // wx.setStorageSync("chargeuid", options.fzruids) //创建负责人id

    console.log("onLoad==========>",options,_that.options)
  },
  // 开始日期
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    wx.setStorageSync("dateStart",e.detail.value)
  },
  // 截止日期
  bindDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dates: e.detail.value
    })
    wx.setStorageSync("dateEnd", e.detail.value)
  },
  // 表单提交
  formSubmit: function(res) {
    var _that = this
    var btnTitle = res.detail.value.btnTitle
    var btnText = res.detail.value.btnText
    var Title = wx.getStorageSync("Title")
    var Text = wx.getStorageSync("Text")
    var dateStart = wx.getStorageSync("dateStart")
    var dateEnd = wx.getStorageSync("dateEnd")
    var participantuid = wx.getStorageSync("participantuid") //获取参与者id
    var chargeuid = wx.getStorageSync("chargeuid") //负责人id
    if (btnTitle == undefined || btnTitle == '' || btnText == undefined || btnText == '') {
      wx.showToast({
        title: '请输入标题或内容',
        icon: 'none'
      })
    }else if(_that.data.date == undefined || _that.data.date == ""){
       wx.showToast({
         title: '请输入日期',
         icon: 'none'
       })
    }else {
      console.log("success")
      console.log("缓存======>", user, Title, Text, dateStart,dateEnd)
      indexs == '0' ?
        app.request({
          url: api.taskAssigned.taskadd,
          method: "POST",
          data: {
            uid: user.uid,
            subject: btnTitle,
            description: btnText,
            chargeuid: chargeuid,    //负责人
            participantuid: participantuid, //参与者
            starttime: dateStart,
            endtime: dateEnd
          },
          success: function(res) {
            var _that = this
            wx.removeStorageSync("Title")
            wx.removeStorageSync("Text")
            wx.removeStorageSync("participantuid")
            wx.removeStorageSync("chargeuid")
            wx.redirectTo({
              url: '/pages/index/index',
            })
            console.log("任务添加======>", res)
          }
        }) :
        app.request({
          url: api.taskAssigned.taskeditor,
          method: "POST",
          data: {
            uid: user.uid,
            subject: btnTitle,
            description: btnText,
            chargeuid: chargeuid,
            participantuid: participantuid,
            starttime: dateStart,
            endtime: dateEnd
          },
          success: function(res) {
            var _that = this
            wx.removeStorageSync("Title")
            wx.removeStorageSync("Text")
            wx.removeStorageSync("participantuid")
            wx.removeStorageSync("chargeuid")
            wx.redirectTo({
              url: '/pages/index/index?curtid='+1,
            })
            console.log("任务编辑======>", res)
          }
        })
      
    }
   
  },
  // 获取用户输入标题的值
  btnTitle: function(e) {
    var _that = this
    _that.setData({
      btnTitle: e.detail.value
    })
    wx.setStorageSync('Title', this.data.btnTitle);
    console.log("标题的值====>", e.detail.value)
  },
  //获取用户输入内容的值
  btnText: function(e) {
    var _that = this
    _that.setData({
      btnText: e.detail.value
    })
    wx.setStorageSync('Text', this.data.btnText);
    console.log("内容的值=====>", e.detail.value)
  },
  // 任务负责人添加
  createHead: function(options) {
    var _that = this
    wx.reLaunch({
      url: '/pages/address/junkindex?indexs=' + _that.data.options.indexs
    })
  },
  // 任务参与者添加
  createJoin: function(options){
    var _that = this
    wx.reLaunch({
      url: '/pages/address/index?indexs='+_that.data.options.indexs + '&indexss='+ _that.data.options.indexss
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
    console.log("onUnload==========>")
    //  
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