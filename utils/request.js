module.exports = function(a) {
    a.data || (a.data = {});
    var e = wx.getStorageSync("access_token");
    e && (a.data.access_token = e), a.data._uniacid = this.siteInfo.uniacid, a.data._acid = this.siteInfo.acid
    wx.request({
        url: a.url,
        header: a.header || {
            "content-type": "application/x-www-form-urlencoded"
        },
        data: a.data || {},
        method: a.method || "GET",
        dataType: a.dataType || "json",
        success: function(e) {
            -1 == e.data.code ? getApp().login() : a.success && a.success(e.data);
        },
        fail: function(e) {
            console.warn("--- request fail >>>"), console.warn(e), console.warn("<<< request fail ---");
            var t = getApp();
            t.is_on_launch ? (t.is_on_launch = !1, wx.showModal({
                title: "网络请求出错",
                content: e.errMsg,
                showCancel: !1,
                success: function(e) {
                    e.confirm && a.fail && a.fail(e);
                }
            })) : (wx.showToast({
                title: e.errMsg,
                image: "/images/icon-warning.png"
            }), a.fail && a.fail(e));
        },
        complete: function(e) {
            200 != e.statusCode && (console.log("--- request http error >>>"), console.log(e.statusCode), 
            console.log(e.data), console.log("<<< request http error ---")), a.complete && a.complete(e);
        }
    });
};