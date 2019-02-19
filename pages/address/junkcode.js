// pages/address/junkcode.js
var api = require('../../api.js'),
  app = getApp()
Page({
  data: {
    // 当前选择的导航字母
    selected: 0,
    selectAllStatus: false, // 全选状态，默认全选
    arr: [],
    settlement: true, //底部显示隐藏
  },
  onLoad: function(options) {
    var _that = this
    this.setData({
      options: options
    })
    options.indexs == '0' && _that.setData({
      settlement: false
    })
    console.log("onLoad======>", options)
    this.address(options)
  },
  // 根据部门id返回用户信息 
  address: function(options) {
    var _that = this
    app.request({
      url: api.Address.addresslist,
      method: "POST",
      data: {
        deptid: options.deptids,
      },
      success: function(res) {
        var groups = res.data
        groups.map(function(item, index) {
          for (var i in item.users) {
            item.users[i].selected = false
          }
          _that.setData({
            groups: res.data,
          })
        })
        console.log(res)
      }
    })
  },
  // 选择事件
  selectList: function(e) {
    var _that = this
    var arr = this.data.arr;
    console.log(e);
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    const idx = e.currentTarget.dataset.idx; // 获取data- 传进来的idx
    let users = _that.data.groups; // 获取通讯录列表
    const selected = users[index].users[idx].selected; // 获取当前商品的选中状态
    console.log("当前商品选中状态为：" + !selected)
    if (selected == true) {
      console.log("当前没有选中")
      _that.setData({
        selectAllStatus: false
      })
    }
    users[index].users[idx].selected = !selected; // 改变状态
    if (users[index].users[idx].selected == true) {
      arr.push(users[index].users[idx].uid)   //把选中的人员id存到数组
    } else {
      console.log("arr", arr)
      arr.map(function (index, item) {
        delete arr[item]
      })
    }   
    _that.setData({
      groups: users,
      arr: arr,
      // realname : realname
    });

  },

  // 提交
  handle: function(options) {
    var _that = this
    var groups = _that.data.groups
    var arr = this.data.arr;
    var str = '';
    var nostr = '';
    var options = _that.data.options
    let users = _that.data.groups;
    console.log("users=======>", groups)

    for (var i = 0; i < arr.length; i++) {
      str += arr[i] + ',';
    }
    console.log("handle=======>", str);
    console.log(this.data.options.index)
    wx.reLaunch({
      url: '/pages/index/newCreate?fzruids=' + str + '&indexs=' + options.indexs,
    })
  },


})