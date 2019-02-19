module.exports = {
    onLoad: function(e) {
        if (console.log("--------pageOnLoad----------"), e.options) {
            var o = 0;
            if (e.options.user_id) o = e.options.user_id; else if (e.options.scene) if (isNaN(e.options.scene)) {
                var n = decodeURIComponent(e.options.scene);
                n && (n = getApp().utils.scene_decode(n)) && n.uid && (o = n.uid);
            } else o = e.options.scene;
            o && wx.setStorageSync("parent_id", o);
        }
        void 0 === e.openWxapp && (e.openWxapp = getApp().openWxapp), void 0 === e.showToast && (e.showToast = getApp().pageShowToast), 
        getApp().setNavigationBarColor(), getApp().setPageNavbar(e), e.naveClick = function(o) {
            getApp().navigatorClick(o, e);
        }, getApp().order_pay.init(e, getApp());
    },
    onReady: function(o) {},
    onShow: function(o) {},
    onHide: function(o) {},
    onUnload: function(o) {}
};