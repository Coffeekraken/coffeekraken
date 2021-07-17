export default function coco(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("index", [], e) : "object" == typeof exports ? exports.index = e() : t.index = e()
}("undefined" != typeof self ? self : this, (function() {
    return function(t) {
        var e = {};

        function n(r) {
            if (e[r]) return e[r].exports;
            var o = e[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }
        return n.m = t, n.c = e, n.d = function(t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: r
            })
        }, n.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function(t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var o in t) n.d(r, o, function(e) {
                    return t[e]
                }.bind(null, o));
            return r
        }, n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 1)
    }([function(t, e, n) {
        "use strict";
        (function(t) {
            n.d(e, "a", (function() {
                return c
            }));
            Object.assign, Object.prototype.hasOwnProperty, Array.isArray, Object.prototype.toString;
            const r = t => {
                    const e = Object.create(null);
                    return n => e[n] || (e[n] = t(n))
                },
                o = /-(\w)/g,
                i = (r(t => t.replace(o, (t, e) => e ? e.toUpperCase() : "")), /\B([A-Z])/g),
                u = (r(t => t.replace(i, "-$1").toLowerCase()), r(t => t.charAt(0).toUpperCase() + t.slice(1))),
                c = r(t => t ? "on" + u(t) : "")
        }).call(this, n(2))
    }, function(t, e, n) {
        t.exports = n(3)
    }, function(t, e) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || new Function("return this")()
        } catch (t) {
            "object" == typeof window && (n = window)
        }
        t.exports = n
    }, function(t, e, n) {
        "use strict";
        n.r(e), n.d(e, "default", (function() {
            return j
        }));
        var r = n(0),
            o = /-(\w)/g,
            i = function(t) {
                return t.replace(o, (function(t, e) {
                    return e ? e.toUpperCase() : ""
                }))
            },
            u = /\B([A-Z])/g,
            c = function(t) {
                return t.replace(u, "-$1").toLowerCase()
            };

        function a(t, e) {
            if (t) {
                var n = t.$options[e] || [];
                Array.isArray(n) || (n = [n]), n.forEach((function(e) {
                    e.call(t)
                }))
            }
        }

        function f(t, e) {
            return new CustomEvent(t, {
                bubbles: !1,
                cancelable: !1,
                detail: 1 === e.length ? e[0] : e
            })
        }
        var s = function(t) {
                return /function Boolean/.test(String(t))
            },
            l = function(t) {
                return /function Number/.test(String(t))
            };

        function p(t, e) {
            if (3 === t.nodeType) return t.data.trim() ? t.data : null;
            if (1 === t.nodeType) {
                var n = {
                    attrs: d(t),
                    domProps: {
                        innerHTML: t.innerHTML
                    }
                };
                return n.attrs.slot && (n.slot = n.attrs.slot, delete n.attrs.slot), e(t.tagName, n)
            }
            return null
        }

        function d(t) {
            for (var e = {}, n = 0, r = t.attributes.length; n < r; n++) {
                var o = t.attributes[n];
                e[o.nodeName] = o.nodeValue
            }
            return e
        }

        function y(t) {
            return (y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }

        function b(t, e) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        function v(t, e) {
            return !e || "object" !== y(e) && "function" != typeof e ? h(t) : e
        }

        function h(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }

        function m(t) {
            var e = "function" == typeof Map ? new Map : void 0;
            return (m = function(t) {
                if (null === t || (n = t, -1 === Function.toString.call(n).indexOf("[native code]"))) return t;
                var n;
                if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== e) {
                    if (e.has(t)) return e.get(t);
                    e.set(t, r)
                }

                function r() {
                    return _(t, arguments, O(this).constructor)
                }
                return r.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: r,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), w(r, t)
            })(t)
        }

        function _(t, e, n) {
            return (_ = g() ? Reflect.construct : function(t, e, n) {
                var r = [null];
                r.push.apply(r, e);
                var o = new(Function.bind.apply(t, r));
                return n && w(o, n.prototype), o
            }).apply(null, arguments)
        }

        function g() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
            } catch (t) {
                return !1
            }
        }

        function w(t, e) {
            return (w = Object.setPrototypeOf || function(t, e) {
                return t.__proto__ = e, t
            })(t, e)
        }

        function O(t) {
            return (O = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t)
            })(t)
        }

        function j(t, e, n, o) {
            var u, d, y, _ = t,
                j = !1;
            var x = function(t) {
                ! function(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && w(t, e)
                }(C, t);
                var c, m, x, A, S, P = (c = C, m = g(), function() {
                    var t, e = O(c);
                    if (m) {
                        var n = O(this).constructor;
                        t = Reflect.construct(e, arguments, n)
                    } else t = e.apply(this, arguments);
                    return v(this, t)
                });

                function C() {
                    var t;
                    ! function(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, C), (t = P.call(this))._wrapper = void 0, t._component = void 0, t._props = void 0, t._slotChildren = void 0, t._mounted = !1;
                    var r = t.createEventProxies(_.emits);
                    t._props = {}, t._slotChildren = [];
                    var o = h(t);
                    return t._wrapper = e({
                        render: function() {
                            var t = Object.assign({}, o._props, r);
                            return delete t.dataVApp, n(_, t, (function() {
                                return o._slotChildren
                            }))
                        },
                        mounted: function() {
                            o._mounted = !0
                        },
                        unmounted: function() {
                            o._mounted = !1
                        }
                    }), new MutationObserver((function(e) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n];
                            j && "attributes" === r.type && r.target === h(t) ? r.attributeName && t.syncAttribute(r.attributeName) : !0
                        }
                    })).observe(h(t), {
                        childList: !0,
                        subtree: !0,
                        characterData: !0,
                        attributes: !0
                    }), t
                }
                return x = C, (A = [{
                    key: "createEventProxies",
                    value: function(t) {
                        var e = this,
                            n = {};
                        return t && t.forEach((function(t) {
                            var o = Object(r.a)(i(t));
                            n[o] = function() {
                                for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                                e.dispatchEvent(f(t, r))
                            }
                        })), n
                    }
                }, {
                    key: "syncAttribute",
                    value: function(t) {
                        var e, n = i(t),
                            r = void 0;
                        this.hasOwnProperty(t) ? r = this[t] : this.hasAttribute(t) && (r = this.getAttribute(t)), this._props[n] = function(t, e) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                r = n.type;
                            if (s(r)) return "true" === t || "false" === t ? "true" === t : "" === t || t === e || null != t;
                            if (l(r)) {
                                var o = parseFloat(t);
                                return isNaN(o) ? t : o
                            }
                            return t
                        }(r, t, y[n]), null === (e = this._component) || void 0 === e || e.$forceUpdate()
                    }
                }, {
                    key: "syncSlots",
                    value: function() {
                        var t;
                        this._slotChildren = function(t, e) {
                            for (var n = [], r = 0, o = t.length; r < o; r++) n.push(p(t[r], e));
                            return n
                        }(this.childNodes, n), null === (t = this._component) || void 0 === t || t.$forceUpdate()
                    }
                }, {
                    key: "syncInitialAttributes",
                    value: function() {
                        var t, e = this;
                        this._props = (t = {}, d.forEach((function(e) {
                            t[e] = void 0
                        })), t), u.forEach((function(t) {
                            e.syncAttribute(t)
                        }))
                    }
                }, {
                    key: "connectedCallback",
                    value: function() {
                        this._component && this._mounted ? a(this._component, "mounted") : (j && this.syncInitialAttributes(), this.syncSlots(), this._component = this._wrapper.mount(this)), (null == o ? void 0 : o.connectedCallback) && o.connectedCallback.bind(this)()
                    }
                }, {
                    key: "disconnectedCallback",
                    value: function() {
                        a(this._component, "unmounted")
                    }
                }]) && b(x.prototype, A), S && b(x, S), C
            }(m(HTMLElement));
            return function() {
                if (!j) {
                    var t = Array.isArray(_.props) ? _.props : Object.keys(_.props || {});
                    u = t.map(c), d = t.map(i);
                    var e = Array.isArray(_.props) ? {} : _.props || {};
                    y = d.reduce((function(n, r, o) {
                        return n[r] = e[t[o]], n
                    }), {}), j = !0
                }
            }(), x
        }
    }]).default
}));