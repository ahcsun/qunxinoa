// pages/index/index.js
var api = require("../../api.js"), uids = null, assignmentIds = null, size = 10, pageSize = null,
//  WxParse = require('../../wxParse/wxParse.js'),
 WxParse = require('../../wxParse/html2json.js'),
  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    winHeight: "", //窗口高度
    Show: "none",
    status: null, // 信息中心筛选
    loadingHidden: true,// 页面加载
    search: 1,
    index: 0,
    // 左侧栏假数据
    List: [
      {
        num: 0,
        text: "信息中心"
      },
      {
        num: 1,
        text: "任务指派"
      },
      // {
      //   num: 2,
      //   text: "敬请期待"
      // }
    ],
    // 右侧栏假数据
    allstart: [],
    // 消息心假数据
    infoList: [
      {
        title: "接收",
        receive: [
          { ficon: 'icon-all', title: "全部", bind: "clickAll", img: "/images/duigou.png", tag: "✔" },
          { ficon: 'icon-course', title: "未读", bind: "clickstar", },
          { ficon: 'icon-view', title: "已读", bind: "clickEnd", }
        ]
      },
      {
        title: "发布",
        receive: [
          // { ficon: 'icon-all', title: "我发布的", bind: "clickAlls" },
          { ficon: 'icon-book', title: "草稿箱", bind: "clickEnds" },
          {}
        ]
      },
    ],
    // 任务指派假数据
    statusList: [
      { title: "我待办的", text: "暂无任务" },
      // { title: "我发起的", text: "暂无任务" }
    ],
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (e) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 220;
        console.log("高度自适应", calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    that.setData({
      currentTab: e.curtid
    })

    this.refreshLoad(e), this.tasknolist()
  },
  // 页面加载时请求信息中心接口
  refreshLoad: function (e) {
    var user = wx.getStorageSync("user")
    var _that = this
    uids = user.uid
    assignmentIds = user.isadministrator
    var status = this.data.status
    console.log("页面刷新加载时", this.data.status)
    app.request({
      url: api.infoCenter.List,
      method: "POST",
      data: {
        uid: user.uid,
        isadministrator: user.isadministrator,
        page: 0,
        pagesize: size,
        type: status
      },
      success: function (t) {
        console.log("信息中心==============>",t)
        var allstart = t.data
        var pageSizes = allstart.length
        // var newinfo = []
        allstart.map(function (inex, item) {
          allstart[item].bind = 'btnList'
          inex["content"] = WxParse.html2json(inex["content"], 'returnData'); 
          // newinfo.push(inex.content)
        })
        // newinfo.map(function(index,item){
        //   WxParse.wxParse('info' + item, 'html', index , _that);  
        //     if(item == newinfo.length - 1){
        //       WxParse.wxParseTemArray("allstart",'info',newinfo.length,_that)
        //     }
        // })
        _that.setData({
          allstart: t.data
        })
        console.log("接口总页数", pageSizes)
        pageSize = pageSizes
      }
    });
  },
  //滚动到底部时
  lower: function () {
    var _that = this
    _that.setData({
      loadingHidden: false
    })
    setTimeout(function () {
      _that.setData({
        ladingHidden: true
      })
      _that.update()
    }, 1000)
    console.log("滚动到底部")
  },
  update: function () {
    var _that = this
    size += 10
    if (size > pageSize + 10) {
      size = pageSize,
        wx.showToast({
          title: '已到达最大页数',
          icon: 'none'
        })
      _that.setData({
        loadingHidden: true
      })
      return false
    }
    _that.refreshLoad()
    _that.setData({
      loadingHidden: true
    })
  },
  //全部
  clickAll: function () {
    var _that = this
    var hide = "";
    _that.setData({
      status: null
    })
    _that.refreshLoad() 
    _that.data.Show == "block" ? hide = "none" : hide = "none"
    _that.setData({
      Show: hide
    })
  },
  // 未读筛选
  clickstar: function () {
    var _that = this
    var hide = "";
    _that.setData({
      status: "new"
    })
    _that.refreshLoad()
    _that.data.Show == "block" ? hide = "none" : hide = "none"
    _that.setData({
      Show: hide
    })
  },
  //已读筛选
  clickEnd: function () {
    var _that = this
    var hide = "";
    _that.setData({
      status: "old"
    })
    _that.refreshLoad()
    _that.data.Show == "block" ? hide = "none" : hide = "none"
    _that.setData({
      Show: hide
    })
  },
  //草稿箱筛选
  clickEnds: function(){
     var _that = this
     var hide = ""
     _that.setData({
       status: "draft"
     })
     _that.refreshLoad()
     _that.data.show == "block" ? hide = "none" : hide = "none"
     _that.setData({
        Show: hide
     })
  },

  //待办任务列表
  tasknolist: function () {
    var _that = this
    app.request({
      url: api.taskAssigned.tasknolist,
      method: "POST",
      data: {
        uid: uids
      },
      success: function (res) {
        _that.setData({
          chargeData: res.chargeData,  //我指派的任务
          designeeData: res.designeeData, //我负责的任务
          participantData: res.participantData, //我参与的任务
          user: res.user
        })
        console.log("待办任务列表===========>", res)

      }
    })
  },
  // 任务列表搜索
  keyword: function(options){
    var _that = this
    var id = options.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/over?uid=' + uids + '&keyword=' + options.detail.value + '&id='+id,
    })
  },
 //跳转任务详情页面
  //  我指派的任务
  btnAssigned: function(t){
   var chargeData = this.data.chargeData
   var indexs = t.currentTarget.dataset.index
   chargeData.map(function(index,item){
     item == indexs && wx.navigateTo({
       url: '/pages/index/taskdetail?uid=' + uids + '&assignmentid=' + index.assignmentid,
     }) 
   })
  },
  // 我负责的任务
  btnResponsible: function(t){
    var designeeData = this.data.designeeData
    var indexs = t.currentTarget.dataset.index
    designeeData.map(function (index, item) {
      // console.log(index, item)
      item == indexs && wx.navigateTo({
        url: '/pages/index/taskdetail?uid=' + uids + '&assignmentid=' + index.assignmentid,
      })
    })
  },
  // 我参与的任务
  btnJoin: function(t){
    var participantData = this.data.participantData
    var indexs = t.currentTarget.dataset.index
    participantData.map(function (index, item) {
      // console.log(index, item)
      item == indexs && wx.navigateTo({
        url: '/pages/index/taskdetail?uid=' + uids + '&assignmentid=' + index.assignmentid,
      })
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  // 信息中心列表跳转
  btnList: function (e) {
    var allstart = this.data.allstart
    var index = e.currentTarget.dataset.index
    allstart.map(function (item, indexs) {
      index == indexs && wx.navigateTo({
        url: '/pages/index/details?articleid=' + item.articleid,
      })
    })
  },
  //选择信息分类
  bindtypeChange: function (e) {
    var xx = this;
    var k = e.detail.value;
    var _type = this.data.type1.type_name[k];
    var type_id = this.data.type1.type_id[k];
    console.log('你选择的是', _type, type_id)
    xx.setData({
      type_index: k,
      type_id: type_id,
    })
  },
  /*信息中心打开遮罩*/
  showList: function (e) {
    var that = this
    var show = "";
    var array = that.data.infoList[0].receive
    // console.log(array)
    array.map(function (item, index) {
      that.setData({
        id: index
      })
      // console.log("map",index)
    })
    // console.log("showList",that.data)
    this.data.Show == "none" ? show = "block" : show = "none"
    this.setData({
      Show: show
    })
  },
  // 关闭遮罩
  close: function (e) {
    var hide = "";
    this.data.Show == "block" ? hide = "none" : hide = "none"
    this.setData({
      Show: hide
    })
  },
  // 创建
  btnCreate: function () {
    wx.navigateTo({
      url: '/pages/index/create',
    })
  },
  // 新建
  stuCreate: function (t) {
   console.log(t.currentTarget.dataset.index)
    wx.navigateTo({
      url: '/pages/index/newCreate?indexs=' + t.currentTarget.dataset.index + '&description='+'请输入新建内容...',
    })
  },
  // 已完成任务
  taskOver: function () {
    wx.navigateTo({
      url: "/pages/index/over?uid="+ uids,
    })
  },
  // 跳转到外部网页
  sjwke: function () {
    wx.navigateTo({
      url: '/pages/sjwke/sjwke',
    })
  },
  // 截获竖向滑动
  catchTouchMove: function (res) {
    return false
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