// pages/address/address.js
var api = require('../../api.js'), app = getApp()
Page({
  data: {
    // 当前选择的导航字母
    selected: 0,
    selectAllStatus: false,     // 全选状态，默认全选
    arr: [], //人员id
    personid: [], //人员姓名
    settlement: true, //底部显示隐藏
  },
  onLoad: function (options) {
    var _that = this
    this.setData({
      options: options
    })
    options.index == '0' && _that.setData({
      settlement: false
    })
    options.indexs == '0' && _that.setData({
      settlement: false
    })
    options.indexss == '0' && _that.setData({
      settlement: false
    })
    console.log("onLoad======>",options)
    this.address(options)
  },
  // 根据部门id返回用户信息
  address: function (options) {
    var _that = this
    app.request({
      url: api.Address.addresslist,
      method: "POST",
      data: {
        deptid: options.deptids,
      },
      success: function (res) {
        var groups = res.data
        groups.map(function (item, index) {
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
  selectList: function (e) {
    var _that = this
    var arr = this.data.arr;
    var personid = this.data.personid
    console.log(e);
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    const idx = e.currentTarget.dataset.idx;    // 获取data- 传进来的idx
    let users = _that.data.groups;                    // 获取通讯录列表
    const selected = users[index].users[idx].selected;         // 获取当前商品的选中状态
    console.log("当前商品选中状态为：" + !selected)
    if (selected == true) {
      console.log("当前没有选中")
      _that.setData({
        selectAllStatus: false
      })
    }
    users[index].users[idx].selected = !selected;              // 改变状态
    console.log("当前状态==========>",users[index].users[idx].selected)
    if (users[index].users[idx].selected == true){
      arr.push(users[index].users[idx].uid)   //把选中的人员id存到数组
      personid.push(users[index].users[idx].realname) //把人员姓名存到数组
    }else{
       console.log("arr",arr)
       arr.map(function(index,item){
            delete arr[item]
       })
    }    
    // console.log("改变的状态=======>", users[index].users[idx].selected,arr)
    _that.setData({
      groups: users,
      arr: arr,
      // realname : realname
    });
    console.log("当前累加用户id==========>",arr)
  },
  // 全选
  selectAll: function (e) {
    var _that = this
    var arr = this.data.arr;
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let users = _that.data.groups;
    var str = '';
    for (var i = 0; i < arr.length; i++) {
      str += 'ui' + arr[i] + ',';
    }
    for (let i = 0; i < users.length; i++) {
      for(var j in users[i].users){
        console.log(j);
        users[i].users[j].selected = selectAllStatus;            // 改变所有选中状态
        arr.push(users[i].users[j].uid)
      }
      
    }
    console.log(users);
    this.setData({
      selectAllStatus: selectAllStatus,
      groups: users

    });
  },
  // 提交
  handle: function (options) {
    var _that = this
    var groups = _that.data.groups
    var arr = this.data.arr;
    var personid = this.data.personid
    var str = '';
    var nostr = '';
    var repersonid = '';
    var options = _that.data.options
    let users = _that.data.groups;
console.log("users=======>",groups,arr)

    for (var i = 0; i < arr.length; i++) {
      str += 'ui' + arr[i] + ',';
      nostr += arr[i] + ','; 
    }
    for (var i = 0; i < personid.length; i++){
        repersonid += personid[i] + ','
    }
   console.log("handle=======>", str,repersonid);
   console.log(this.data.options.index)
   this.data.options.index == '0' ?
     wx.reLaunch({
       url: '/pages/index/release?uids=' + str + '&uid=' + options.uid + '&btnTitle=' + options.btnTitle + '&btnText=' + options.btnText + '&deptid=' + options.deptid + '&personid='+ repersonid, 
     }) : wx.reLaunch({
       url: '/pages/index/newCreate?uids=' + nostr + '&uid=' + options.uid + '&deptid=' + options.deptid + '&indexs=' + options.indexs,
     })
  },


})
