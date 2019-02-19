var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, utils = {
    scene_decode: function(o) {
        var t = (o + "").split(","), n = {};
        for (var e in t) {
            var r = t[e].split(":");
            0 < r.length && r[0] && (n[r[0]] = r[1] || null);
        }
        return n;
    },
    objectToUrlParams: function(o, t, n) {
        if (null == o) return "";
        var e = "", r = void 0 === o ? "undefined" : _typeof(o);
        if ("string" == r || "number" == r || "boolean" == r) e += "&" + t + "=" + (null == n || n ? encodeURIComponent(o) : o); else for (var l in o) {
            var u = null == t ? l : t + (o instanceof Array ? "[" + l + "]" : "." + l);
            e += this.objectToUrlParams(o[l], u, n);
        }
        return e;
    }
};

module.exports = utils;