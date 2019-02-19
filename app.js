App({
  data:{
     e: 'https://yangsheng.sjwke.com/' //图片地址
  },
    onLaunch: function() {
    },
    request: require("utils/request.js"), /*备注一*/
    siteInfo: require("siteinfo.js"),
    pageOnLoad: function(e) {
        this.page.onLoad(e);
    },
    pageOnReady: function(e) {
        this.page.onReady(e);
    },
    pageOnShow: function(e) {
        this.page.onShow(e);
    },
    pageOnHide: function(e) {
        this.page.onHide(e);
    },
    pageOnUnload: function(e) {
        this.page.onUnload(e);
    },
   page: require("utils/page.js"),
  
    });