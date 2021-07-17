export default function coco(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("index", [], e) : "object" == typeof exports ? exports.index = e() : t.index = e();
}
("undefined" != typeof self ? self : this, (function () {
    return function (t) {
        var e = {};
        function n(r) {
            if (e[r])
                return e[r].exports;
            var o = e[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
        }
        return n.m = t, n.c = e, n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
            });
        }, n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            });
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
                for (var o in t)
                    n.d(r, o, function (e) {
                        return t[e];
                    }.bind(null, o));
            return r;
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default;
            } : function () {
                return t;
            };
            return n.d(e, "a", e), e;
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, n.p = "", n(n.s = 1);
    }([function (t, e, n) {
            "use strict";
            (function (t) {
                n.d(e, "a", (function () {
                    return c;
                }));
                Object.assign, Object.prototype.hasOwnProperty, Array.isArray, Object.prototype.toString;
                const r = t => {
                    const e = Object.create(null);
                    return n => e[n] || (e[n] = t(n));
                }, o = /-(\w)/g, i = (r(t => t.replace(o, (t, e) => e ? e.toUpperCase() : "")), /\B([A-Z])/g), u = (r(t => t.replace(i, "-$1").toLowerCase()), r(t => t.charAt(0).toUpperCase() + t.slice(1))), c = r(t => t ? "on" + u(t) : "");
            }).call(this, n(2));
        }, function (t, e, n) {
            t.exports = n(3);
        }, function (t, e) {
            var n;
            n = function () {
                return this;
            }();
            try {
                n = n || new Function("return this")();
            }
            catch (t) {
                "object" == typeof window && (n = window);
            }
            t.exports = n;
        }, function (t, e, n) {
            "use strict";
            n.r(e), n.d(e, "default", (function () {
                return j;
            }));
            var r = n(0), o = /-(\w)/g, i = function (t) {
                return t.replace(o, (function (t, e) {
                    return e ? e.toUpperCase() : "";
                }));
            }, u = /\B([A-Z])/g, c = function (t) {
                return t.replace(u, "-$1").toLowerCase();
            };
            function a(t, e) {
                if (t) {
                    var n = t.$options[e] || [];
                    Array.isArray(n) || (n = [n]), n.forEach((function (e) {
                        e.call(t);
                    }));
                }
            }
            function f(t, e) {
                return new CustomEvent(t, {
                    bubbles: !1,
                    cancelable: !1,
                    detail: 1 === e.length ? e[0] : e
                });
            }
            var s = function (t) {
                return /function Boolean/.test(String(t));
            }, l = function (t) {
                return /function Number/.test(String(t));
            };
            function p(t, e) {
                if (3 === t.nodeType)
                    return t.data.trim() ? t.data : null;
                if (1 === t.nodeType) {
                    var n = {
                        attrs: d(t),
                        domProps: {
                            innerHTML: t.innerHTML
                        }
                    };
                    return n.attrs.slot && (n.slot = n.attrs.slot, delete n.attrs.slot), e(t.tagName, n);
                }
                return null;
            }
            function d(t) {
                for (var e = {}, n = 0, r = t.attributes.length; n < r; n++) {
                    var o = t.attributes[n];
                    e[o.nodeName] = o.nodeValue;
                }
                return e;
            }
            function y(t) {
                return (y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t;
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                })(t);
            }
            function b(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                }
            }
            function v(t, e) {
                return !e || "object" !== y(e) && "function" != typeof e ? h(t) : e;
            }
            function h(t) {
                if (void 0 === t)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t;
            }
            function m(t) {
                var e = "function" == typeof Map ? new Map : void 0;
                return (m = function (t) {
                    if (null === t || (n = t, -1 === Function.toString.call(n).indexOf("[native code]")))
                        return t;
                    var n;
                    if ("function" != typeof t)
                        throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== e) {
                        if (e.has(t))
                            return e.get(t);
                        e.set(t, r);
                    }
                    function r() {
                        return _(t, arguments, O(this).constructor);
                    }
                    return r.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: r,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), w(r, t);
                })(t);
            }
            function _(t, e, n) {
                return (_ = g() ? Reflect.construct : function (t, e, n) {
                    var r = [null];
                    r.push.apply(r, e);
                    var o = new (Function.bind.apply(t, r));
                    return n && w(o, n.prototype), o;
                }).apply(null, arguments);
            }
            function g() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" == typeof Proxy)
                    return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0;
                }
                catch (t) {
                    return !1;
                }
            }
            function w(t, e) {
                return (w = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t;
                })(t, e);
            }
            function O(t) {
                return (O = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t);
                })(t);
            }
            function j(t, e, n, o) {
                var u, d, y, _ = t, j = !1;
                var x = function (t) {
                    !function (t, e) {
                        if ("function" != typeof e && null !== e)
                            throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && w(t, e);
                    }(C, t);
                    var c, m, x, A, S, P = (c = C, m = g(), function () {
                        var t, e = O(c);
                        if (m) {
                            var n = O(this).constructor;
                            t = Reflect.construct(e, arguments, n);
                        }
                        else
                            t = e.apply(this, arguments);
                        return v(this, t);
                    });
                    function C() {
                        var t;
                        !function (t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function");
                        }(this, C), (t = P.call(this))._wrapper = void 0, t._component = void 0, t._props = void 0, t._slotChildren = void 0, t._mounted = !1;
                        var r = t.createEventProxies(_.emits);
                        t._props = {}, t._slotChildren = [];
                        var o = h(t);
                        return t._wrapper = e({
                            render: function () {
                                var t = Object.assign({}, o._props, r);
                                return delete t.dataVApp, n(_, t, (function () {
                                    return o._slotChildren;
                                }));
                            },
                            mounted: function () {
                                o._mounted = !0;
                            },
                            unmounted: function () {
                                o._mounted = !1;
                            }
                        }), new MutationObserver((function (e) {
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                j && "attributes" === r.type && r.target === h(t) ? r.attributeName && t.syncAttribute(r.attributeName) : !0;
                            }
                        })).observe(h(t), {
                            childList: !0,
                            subtree: !0,
                            characterData: !0,
                            attributes: !0
                        }), t;
                    }
                    return x = C, (A = [{
                            key: "createEventProxies",
                            value: function (t) {
                                var e = this, n = {};
                                return t && t.forEach((function (t) {
                                    var o = Object(r.a)(i(t));
                                    n[o] = function () {
                                        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
                                            r[o] = arguments[o];
                                        e.dispatchEvent(f(t, r));
                                    };
                                })), n;
                            }
                        }, {
                            key: "syncAttribute",
                            value: function (t) {
                                var e, n = i(t), r = void 0;
                                this.hasOwnProperty(t) ? r = this[t] : this.hasAttribute(t) && (r = this.getAttribute(t)), this._props[n] = function (t, e) {
                                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = n.type;
                                    if (s(r))
                                        return "true" === t || "false" === t ? "true" === t : "" === t || t === e || null != t;
                                    if (l(r)) {
                                        var o = parseFloat(t);
                                        return isNaN(o) ? t : o;
                                    }
                                    return t;
                                }(r, t, y[n]), null === (e = this._component) || void 0 === e || e.$forceUpdate();
                            }
                        }, {
                            key: "syncSlots",
                            value: function () {
                                var t;
                                this._slotChildren = function (t, e) {
                                    for (var n = [], r = 0, o = t.length; r < o; r++)
                                        n.push(p(t[r], e));
                                    return n;
                                }(this.childNodes, n), null === (t = this._component) || void 0 === t || t.$forceUpdate();
                            }
                        }, {
                            key: "syncInitialAttributes",
                            value: function () {
                                var t, e = this;
                                this._props = (t = {}, d.forEach((function (e) {
                                    t[e] = void 0;
                                })), t), u.forEach((function (t) {
                                    e.syncAttribute(t);
                                }));
                            }
                        }, {
                            key: "connectedCallback",
                            value: function () {
                                this._component && this._mounted ? a(this._component, "mounted") : (j && this.syncInitialAttributes(), this.syncSlots(), this._component = this._wrapper.mount(this)), (null == o ? void 0 : o.connectedCallback) && o.connectedCallback.bind(this)();
                            }
                        }, {
                            key: "disconnectedCallback",
                            value: function () {
                                a(this._component, "unmounted");
                            }
                        }]) && b(x.prototype, A), S && b(x, S), C;
                }(m(HTMLElement));
                return function () {
                    if (!j) {
                        var t = Array.isArray(_.props) ? _.props : Object.keys(_.props || {});
                        u = t.map(c), d = t.map(i);
                        var e = Array.isArray(_.props) ? {} : _.props || {};
                        y = d.reduce((function (n, r, o) {
                            return n[r] = e[t[o]], n;
                        }), {}), j = !0;
                    }
                }(), x;
            }
        }]).default;
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlMy13ZWJjb21wb25lbnQtd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZ1ZTMtd2ViY29tcG9uZW50LXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDN0IsUUFBUSxJQUFJLE9BQU8sT0FBTyxJQUFJLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLE9BQU8sTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUE7QUFDMU4sQ0FBQztBQUFBLENBQUMsV0FBVyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLE9BQU8sVUFBUyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRVgsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO2dCQUNYLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFDO1lBQ0YsT0FBTyxDQUFD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QUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQ3RFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzt3QkFDcEQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzs0QkFDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTt3QkFDNUIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO3FCQUNsQjtnQkFDTCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDVixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUE7QUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDIn0=