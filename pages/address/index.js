// pages/address/index.js
var api = require('../../api.js'), app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAllStatus: false,     // 全选状态，默认全选
    settlement: true, //底部显示隐藏
    arr: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this
    _that.setData({
      options: options
    })
    options.index == '0' && _that.setData({
      settlement: false
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
    var options = _that.data.options
    var arr = this.data.arr;
    var str = '';
    console.log("部门id======>", users[idx].deptid)
    for (var i = 0; i < arr.length; i++) {
      str += 'de' + arr[i] + ',';
    }
    console.log("btnClick====>",str)
    var arr = this.data.arr;
    users.map(function (item, index) {
      idx == index && wx.navigateTo({
        url: '/pages/address/address?deptids=' + users[idx].deptid + '&index=' + _that.data.options.index + '&uid=' + options.uid + '&btnTitle=' + options.btnTitle + '&btnText=' + options.btnText + '&deptid='+str + '&indexs='+_that.data.options.indexs + '&indexss=' + _that.data.options.indexss,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    })
  },
  // 选择事件
  selectList: function (e) {
    var _that = this
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.users;                    // 获取通讯录列表
    var arr = _that.data.arr;
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    console.log("当前商品选中状态为：" + !selected)
    if (selected == true) {
      console.log("当前没有选中")
      this.setData({
        selectAllStatus: false
      })
    }
    carts[index].selected = !selected;              // 改变状态
    arr.push(carts[index].deptid)
    _that.setData({
      users: carts,
      arr: arr,
    });
  },
  // 全选
  selectAll: function (e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.users;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      users: carts
    });
  },
  // 去提交
  handle: function (e) {
    var _that = this
    let carts = this.data.users;
    var selectvalue = new Array();
    var selectname = new Array()
    var options = _that.data.options
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected == true) {
        selectvalue.push(carts[i].deptid)
        selectname.push(carts[i].deptname)
        var arry = selectvalue
        var arryname = selectname
        var sums = ''
        var sumname = ''
        arry.map(function (index, item) {
          index = 'de' + index + ','
          sums += index
        })
        arryname.map(function (index, item) {
          index = index + '、'
          sumname += index
        })
        wx.reLaunch({
          url: '/pages/index/release?deptid=' + sums + '&uid=' + options.uid + '&btnTitle=' + options.btnTitle + '&btnText=' + options.btnText + '&sumname=' + sumname,
        })
      } else {
        wx.showToast({
          title: '请选择部门',
          icon: 'none'
        })
      }
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