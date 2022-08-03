"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var htmlToFigma = (function (e) {
    var t = {};
    function n(o) {
        if (t[o])
            return t[o].exports;
        var r = (t[o] = { i: o, l: !1, exports: {} });
        return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
    }
    return ((n.m = e),
        (n.c = t),
        (n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
        }),
        (n.r = function (e) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t))
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var o = Object.create(null);
            if ((n.r(o),
                Object.defineProperty(o, "default", { enumerable: !0, value: e }),
                2 & t && "string" != typeof e))
                for (var r in e)
                    n.d(o, r, function (t) {
                        return e[t];
                    }.bind(null, r));
            return o;
        }),
        (n.n = function (e) {
            var t = e && e.__esModule
                ? function () {
                    return e.default;
                }
                : function () {
                    return e;
                };
            return n.d(t, "a", t), t;
        }),
        (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ""),
        n((n.s = 0)));
})([
    function (e, t, n) {
        "use strict";
        function o(e, t) {
            return 1 === t.length
                ? t[0]
                : t.reduce((t, n) => {
                    if (!t)
                        return n;
                    const o = r(n)[e], i = r(t)[e];
                    if ("left" === e || "top" === e) {
                        if (o < i)
                            return n;
                    }
                    else if (o > i)
                        return n;
                    return t;
                }, null);
        }
        function r(e) {
            if (getComputedStyle(e).display.includes("inline") && e.children.length) {
                const t = e.getBoundingClientRect(), n = (function (e) {
                    if (!e.length)
                        return null;
                    const { top: t } = r(o("top", e)), { left: n } = r(o("left", e)), { bottom: i } = r(o("bottom", e)), { right: l } = r(o("right", e));
                    return {
                        top: t,
                        left: n,
                        bottom: i,
                        right: l,
                        width: l - n,
                        height: i - t,
                    };
                })(Array.from(e.children));
                return t.width > n.width
                    ? Object.assign(Object.assign({}, n), {
                        width: t.width,
                        left: t.left,
                        right: t.right,
                    })
                    : n;
            }
            return e.getBoundingClientRect();
        }
        n.r(t);
        const i = (e) => e && Array.isArray(e.children);
        function l(e, t, n) {
            e && (t(e, n), i(e) && e.children.forEach((n) => l(n, t, e)));
        }
        function c(e) {
            let t = e;
            do {
                const e = getComputedStyle(t);
                if ("none" === e.display || "hidden" === e.visibility)
                    return !0;
                if ("visible" !== e.overflow && t.getBoundingClientRect().height < 1)
                    return !0;
            } while ((t = t.parentElement));
            return !1;
        }
        function s(e) {
            let t = e instanceof Node && e.nodeType === Node.TEXT_NODE
                ? e.parentElement
                : e;
            const n = [];
            for (; t && (t = t.parentElement);)
                n.push(t);
            return n;
        }
        function a(e) {
            return s(e).length;
        }
        const d = (e) => {
            if (!e)
                return null;
            const t = e.match(/([\d\.]+)px/), n = null == t ? void 0 : t[1];
            return n ? { unit: "PIXELS", value: parseFloat(n) } : null;
        };
        function u(e) {
            if (!e)
                return null;
            const [t, n, o, r, i, l] = e.match(/rgba?\(([\d\.]+), ([\d\.]+), ([\d\.]+)(, ([\d\.]+))?\)/) ||
                [], c = l && 0 === parseFloat(l);
            return n && o && r && !c
                ? {
                    r: parseInt(n) / 255,
                    g: parseInt(o) / 255,
                    b: parseInt(r) / 255,
                    a: l ? parseFloat(l) : 1,
                }
                : null;
        }
        const f = /^[0-9]+[a-zA-Z%]+?$/, h = (e) => {
            if (!/px$/.test(e) && "0" !== e)
                return 0;
            const t = parseFloat(e);
            return isNaN(t) ? 0 : t;
        }, p = (e) => {
            if (e.startsWith("rgb")) {
                const t = e.match(/(rgba?\(.+?\))(.+)/);
                t && (e = (t[2] + " " + t[1]).trim());
            }
            const t = e.split(/\s(?![^(]*\))/), n = t.includes("inset"), o = t.slice(-1)[0], r = ((e) => "0" === e || f.test(e))(o) ? "rgba(0, 0, 0, 1)" : o, i = t
                .filter((e) => "inset" !== e)
                .filter((e) => e !== r)
                .map(h), [l, c, s, a] = i;
            return {
                inset: n,
                offsetX: l,
                offsetY: c,
                blurRadius: s,
                spreadRadius: a,
                color: r,
            };
        };
        function g(e, t, n) {
            e.data || (e.data = {}), (e.data[t] = n);
        }
        const m = [
            "opacity",
            "backgroundColor",
            "border",
            "borderTop",
            "borderLeft",
            "borderRight",
            "borderBottom",
            "borderRadius",
            "backgroundImage",
            "borderColor",
            "boxShadow",
        ];
        const y = (e) => e[0].toUpperCase() + e.substring(1), b = ({ borderWidth: e, borderType: t, borderColor: n }) => e && "0" !== e && "none" !== t && n;
        function E({ dir: e, rect: t, computedStyle: n, el: o }) {
            const r = n["border" + y(e)];
            if (r) {
                const n = r.match(/^([\d\.]+)px\s*(\w+)\s*(.*)$/);
                if (n) {
                    const [r, i, l, c] = n;
                    if (b({ borderWidth: i, borderType: l, borderColor: c })) {
                        const n = u(c);
                        if (n) {
                            const r = ["top", "bottom"].includes(e) ? t.width : parseFloat(i), l = ["left", "right"].includes(e) ? t.height : parseFloat(i), c = {
                                type: "SOLID",
                                color: { r: n.r, b: n.b, g: n.g },
                                opacity: n.a || 1,
                            };
                            return {
                                ref: o,
                                type: "RECTANGLE",
                                x: "left" === e ? t.left - r : "right" === e ? t.right : t.left,
                                y: "top" === e ? t.top - l : "bottom" === e ? t.bottom : t.top,
                                width: r,
                                height: l,
                                fills: [c],
                            };
                        }
                    }
                }
            }
        }
        const x = (e) => {
            for (const t of Array.from(e.querySelectorAll("use")))
                try {
                    const e = t.href.baseVal, n = document.querySelector(e);
                    n && (t.outerHTML = n.innerHTML);
                }
                catch (e) {
                    console.warn("Error querying <use> tag href", e);
                }
        }, S = ({ node: e }) => {
            var t;
            const n = (null === (t = e.textContent) || void 0 === t ? void 0 : t.trim()) ||
                "";
            if (!n.length)
                return;
            const o = e.parentElement;
            if (o) {
                if (c(o))
                    return;
                const t = getComputedStyle(o), r = document.createRange();
                r.selectNode(e);
                const i = ((e) => "symbol" == typeof e ? null : JSON.parse(JSON.stringify(e)))(r.getBoundingClientRect()), l = d(t.lineHeight);
                if ((r.detach(), l && i.height < l.value)) {
                    const e = l.value - i.height;
                    (i.top -= e / 2), (i.height = l.value);
                }
                if (i.height < 1 || i.width < 1)
                    return;
                const s = {
                    x: Math.round(i.left),
                    ref: e,
                    y: Math.round(i.top),
                    width: Math.round(i.width),
                    height: Math.round(i.height),
                    type: "TEXT",
                    characters: n.replace(/\s+/g, " "),
                }, a = [], f = u(t.color);
                f &&
                    a.push({
                        type: "SOLID",
                        color: { r: f.r, g: f.g, b: f.b },
                        opacity: f.a || 1,
                    }),
                    a.length && (s.fills = a);
                const h = d(t.letterSpacing);
                h && (s.letterSpacing = h), l && (s.lineHeight = l);
                const { textTransform: p } = t;
                switch (p) {
                    case "uppercase":
                        s.textCase = "UPPER";
                        break;
                    case "lowercase":
                        s.textCase = "LOWER";
                        break;
                    case "capitalize":
                        s.textCase = "TITLE";
                }
                const g = d(t.fontSize);
                return (g && (s.fontSize = Math.round(g.value)),
                    t.fontFamily && (s.fontFamily = t.fontFamily),
                    ["underline", "strikethrough"].includes(t.textDecoration) &&
                        (s.textDecoration = t.textDecoration.toUpperCase()),
                    ["left", "center", "right", "justified"].includes(t.textAlign) &&
                        (s.textAlignHorizontal = t.textAlign.toUpperCase()),
                    s);
            }
        }, T = ({ layer: e, root: t }) => {
            let n = null;
            try {
                l(t, (t) => {
                    if (t && t.children && t.children.includes(e))
                        throw ((n = t), "DONE");
                });
            }
            catch (e) {
                "DONE" === e || console.error(e instanceof Error ? e.message : e);
            }
            return n;
        }, M = ({ root: e, layers: t }) => {
            (e.children = t.slice(1)),
                (({ root: e, layers: t }) => {
                    const n = new WeakMap();
                    t.forEach((e) => {
                        e.ref && n.set(e.ref, e);
                    });
                    let o = !0, c = 0;
                    for (; o;) {
                        if (((o = !1), c++ > 1e4)) {
                            console.error("Too many tree iterations 1");
                            break;
                        }
                        l(e, (t, r) => {
                            const l = t.ref;
                            let c = (l && l.parentElement) || null;
                            do {
                                if (c === document.body)
                                    break;
                                if (c && c !== document.body) {
                                    const l = n.get(c);
                                    if (l === r)
                                        break;
                                    if (l && l !== e) {
                                        if (!i(l)) {
                                            let i = l.ref;
                                            i &&
                                                i instanceof Node &&
                                                i.nodeType === Node.TEXT_NODE &&
                                                (i = i.parentElement);
                                            const s = {
                                                type: "FRAME",
                                                clipsContent: !!(i instanceof Element &&
                                                    "visible" !== getComputedStyle(i).overflow),
                                                x: l.x,
                                                y: l.y,
                                                width: l.width,
                                                height: l.height,
                                                ref: l.ref,
                                                backgrounds: [],
                                                children: [l, t],
                                            }, a = T({ layer: l, root: e });
                                            if (!a) {
                                                console.warn("\n\nCANT FIND PARENT\n", JSON.stringify(Object.assign(Object.assign({}, l), { ref: null })));
                                                continue;
                                            }
                                            if (r) {
                                                const e = r.children.indexOf(t);
                                                r.children.splice(e, 1);
                                            }
                                            delete l.ref;
                                            const d = a.children.indexOf(l);
                                            return (n.set(c, s), a.children.splice(d, 1, s), void (o = !0));
                                        }
                                        if (r) {
                                            const e = r.children.indexOf(t);
                                            return (r.children.splice(e, 1),
                                                l.children.push(t),
                                                void (o = !0));
                                        }
                                    }
                                }
                            } while (c && (c = c.parentElement));
                        });
                    }
                    let d = !0, u = 0;
                    for (; d;) {
                        if (u++ > 1e4) {
                            console.error("Too many tree iterations 2");
                            break;
                        }
                        (d = !1),
                            l(e, (e, t) => {
                                if (!d && "FRAME" === e.type) {
                                    const t = e.ref;
                                    if (e.children && e.children.length > 2) {
                                        const o = e.children && e.children.map((e) => e.ref);
                                        let i = e.ref, l = a(i);
                                        for (const t of o) {
                                            const n = o.filter((e) => e !== t), r = s(t);
                                            for (const t of n) {
                                                const n = s(t);
                                                for (const t of n)
                                                    if (r.includes(t) && e.ref.contains(t)) {
                                                        const e = a(t);
                                                        e > l && ((i = t), (l = e));
                                                    }
                                            }
                                        }
                                        if (i && i !== e.ref) {
                                            const o = e.children.filter((e) => i.contains(e.ref));
                                            if (o.length !== e.children.length) {
                                                const l = r(i), c = {
                                                    type: "FRAME",
                                                    clipsContent: !!(i instanceof Element &&
                                                        "visible" !== getComputedStyle(i).overflow),
                                                    ref: i,
                                                    x: l.left,
                                                    y: l.top,
                                                    width: l.width,
                                                    height: l.height,
                                                    backgrounds: [],
                                                    children: o,
                                                };
                                                n.set(i, t);
                                                let s = e.children.length - 1;
                                                for (const t of o) {
                                                    const n = e.children.indexOf(t);
                                                    n > -1 && n < s && (s = n);
                                                }
                                                e.children.splice(s, 0, c);
                                                for (const t of o) {
                                                    const n = e.children.indexOf(t);
                                                    n > -1 && e.children.splice(n, 1);
                                                }
                                                d = !0;
                                            }
                                        }
                                    }
                                }
                            });
                    }
                    l(e, (e) => {
                        if ("FRAME" === e.type || "GROUP" === e.type) {
                            const { x: t, y: n } = e;
                            (t || n) &&
                                l(e, (o) => {
                                    o !== e && ((o.x = o.x - t), (o.y = o.y - n));
                                });
                        }
                    });
                })({ root: e, layers: t });
            const n = [e];
            return ((function (e) {
                e.forEach((e) => {
                    l(e, (e) => {
                        if ("SVG" === e.type)
                            e.constraints = { horizontal: "CENTER", vertical: "MIN" };
                        else {
                            const t = e.ref;
                            if (t) {
                                const n = t instanceof HTMLElement ? t : t.parentElement, o = null == n ? void 0 : n.parentElement;
                                if (n && o) {
                                    const t = n.style.display;
                                    n.style.setProperty("display", "none", "!important");
                                    let r = getComputedStyle(n);
                                    const i = null == r ? void 0 : r.width.trim().endsWith("px"), l = null == r ? void 0 : r.height.trim().endsWith("px");
                                    n.style.display = t;
                                    const c = getComputedStyle(o);
                                    let s = "auto" === r.marginLeft, a = "auto" === r.marginRight, d = "auto" === r.marginTop, u = "auto" === r.marginBottom;
                                    if (((r = getComputedStyle(n)),
                                        ["absolute", "fixed"].includes(r.position) &&
                                            g(e, "position", r.position),
                                        l && g(e, "heightType", "fixed"),
                                        i && g(e, "widthType", "fixed"),
                                        r.display && r.display.includes("inline"))) {
                                        const t = c.textAlign;
                                        "center" === t
                                            ? ((s = !0), (a = !0))
                                            : "right" === t && (s = !0),
                                            "middle" === r.verticalAlign
                                                ? ((d = !0), (u = !0))
                                                : "bottom" === r.verticalAlign &&
                                                    ((d = !0), (u = !1)),
                                            g(e, "widthType", "shrink");
                                    }
                                    const f = "flex" === c.display &&
                                        (("row" === c.flexDirection && c.justifyContent) ||
                                            ("column" === c.flexDirection && c.alignItems));
                                    "center" === f
                                        ? ((s = !0), (a = !0))
                                        : f &&
                                            (f.includes("end") || f.includes("right")) &&
                                            ((s = !0), (a = !1));
                                    const h = "flex" === c.display &&
                                        (("column" === c.flexDirection && c.justifyContent) ||
                                            ("row" === c.flexDirection && c.alignItems));
                                    "center" === h
                                        ? ((d = !0), (u = !0))
                                        : h &&
                                            (h.includes("end") || h.includes("bottom")) &&
                                            ((d = !0), (u = !1)),
                                        "TEXT" === e.type &&
                                            ("center" === r.textAlign
                                                ? ((s = !0), (a = !0))
                                                : "right" === r.textAlign && ((s = !0), (a = !1))),
                                        (e.constraints = {
                                            horizontal: s && a ? "CENTER" : s ? "MAX" : "SCALE",
                                            vertical: u && d ? "CENTER" : d ? "MAX" : "MIN",
                                        });
                                }
                            }
                            else
                                e.constraints = { horizontal: "SCALE", vertical: "MIN" };
                        }
                    });
                });
            })(n),
                n);
        };
        n.d(t, "htmlToFigma", function () {
            return R;
        });
        const v = (e) => {
            const t = (e) => {
                var n;
                return Array.from((null === (n = e.shadowRoot) || void 0 === n
                    ? void 0
                    : n.querySelectorAll("*")) || []).reduce((e, n) => [...e, n, ...t(n)], []);
            };
            return Array.from(e.querySelectorAll("*")).reduce((e, n) => [...e, n, ...t(n)], []);
        };
        const w = (e) => {
            const t = [];
            if (c(e))
                return [];
            if (e instanceof SVGSVGElement)
                return (t.push(((e) => {
                    const t = e.getBoundingClientRect();
                    return {
                        type: "SVG",
                        ref: e,
                        svg: e.outerHTML,
                        x: Math.round(t.left),
                        y: Math.round(t.top),
                        width: Math.round(t.width),
                        height: Math.round(t.height),
                    };
                })(e)),
                    t);
            if (e instanceof SVGElement)
                return [];
            if ((e.parentElement instanceof HTMLPictureElement &&
                e instanceof HTMLSourceElement) ||
                e instanceof HTMLPictureElement)
                return [];
            const n = (function (e, t) {
                if (!(e instanceof HTMLElement || e instanceof SVGElement))
                    return {};
                const n = getComputedStyle(e, t), o = n.color, r = {
                    transform: "none",
                    opacity: "1",
                    borderRadius: "0px",
                    backgroundImage: "none",
                    backgroundPosition: "0% 0%",
                    backgroundSize: "auto",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    backgroundAttachment: "scroll",
                    border: "0px none " + o,
                    borderTop: "0px none " + o,
                    borderBottom: "0px none " + o,
                    borderLeft: "0px none " + o,
                    borderRight: "0px none " + o,
                    borderWidth: "0px",
                    borderColor: o,
                    borderStyle: "none",
                    boxShadow: "none",
                    fontWeight: "400",
                    textAlign: "start",
                    justifyContent: "normal",
                    alignItems: "normal",
                    alignSelf: "auto",
                    flexGrow: "0",
                    textDecoration: "none solid " + o,
                    lineHeight: "normal",
                    letterSpacing: "normal",
                    backgroundRepeat: "repeat",
                    zIndex: "auto",
                };
                return (function (e, t) {
                    const n = {};
                    return (t.forEach((t) => {
                        e[t] && e[t] !== r[t] && (n[t] = e[t]);
                    }),
                        n);
                })(n, m);
            })(e), o = getComputedStyle(e);
            if (((function (e) {
                return Object.keys(e).length;
            })(n) ||
                e instanceof HTMLImageElement ||
                e instanceof HTMLVideoElement) &&
                "none" !== o.display) {
                const n = r(e);
                if (n.width >= 1 && n.height >= 1) {
                    const r = [], i = u(o.backgroundColor);
                    if (i) {
                        const e = {
                            type: "SOLID",
                            color: { r: i.r, g: i.g, b: i.b },
                            opacity: i.a || 1,
                        };
                        r.push(e);
                    }
                    const l = {
                        type: "RECTANGLE",
                        ref: e,
                        x: Math.round(n.left),
                        y: Math.round(n.top),
                        width: Math.round(n.width),
                        height: Math.round(n.height),
                        fills: r,
                    }, c = (({ computedStyle: { border: e } }) => {
                        if (e) {
                            const t = e.match(/^([\d\.]+)px\s*(\w+)\s*(.*)$/);
                            if (t) {
                                const [e, n, o, r] = t;
                                if (b({ borderWidth: n, borderType: o, borderColor: r })) {
                                    const e = u(r);
                                    if (e)
                                        return {
                                            strokes: [
                                                {
                                                    type: "SOLID",
                                                    color: { r: e.r, b: e.b, g: e.g },
                                                    opacity: e.a || 1,
                                                },
                                            ],
                                            strokeWeight: Math.round(parseFloat(n)),
                                        };
                                }
                            }
                        }
                    })({ computedStyle: o });
                    if ((c && Object.assign(l, c), !l.strokes))
                        for (const r of ["top", "left", "right", "bottom"]) {
                            const i = E({ dir: r, rect: n, computedStyle: o, el: e });
                            i && t.push(i);
                        }
                    const s = (({ computedStyle: e, el: t }) => {
                        if (t instanceof SVGSVGElement) {
                            return {
                                url: `data:image/svg+xml,${encodeURIComponent(t.outerHTML.replace(/\s+/g, " "))}`,
                                type: "IMAGE",
                                scaleMode: "FILL",
                                imageHash: null,
                            };
                        }
                        {
                            const n = {
                                type: "IMAGE",
                                scaleMode: "contain" === e.objectFit ? "FIT" : "FILL",
                                imageHash: null,
                            };
                            if (t instanceof HTMLImageElement) {
                                const e = t.currentSrc;
                                if (e)
                                    return Object.assign({ url: e }, n);
                            }
                            else if (t instanceof HTMLVideoElement) {
                                const e = t.poster;
                                if (e)
                                    return Object.assign({ url: e }, n);
                            }
                        }
                        if (e.backgroundImage && "none" !== e.backgroundImage) {
                            const t = e.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/), n = null == t ? void 0 : t[1];
                            if (n)
                                return {
                                    url: n,
                                    type: "IMAGE",
                                    scaleMode: "contain" === e.backgroundSize ? "FIT" : "FILL",
                                    imageHash: null,
                                };
                        }
                    })({ computedStyle: o, el: e });
                    s && (r.push(s), (l.name = "IMAGE"));
                    const a = (({ computedStyle: { boxShadow: e } }) => {
                        if (e && "none" !== e) {
                            const t = p(e), n = u(t.color);
                            if (n) {
                                return [
                                    {
                                        color: n,
                                        type: "DROP_SHADOW",
                                        radius: t.blurRadius,
                                        blendMode: "NORMAL",
                                        visible: !0,
                                        offset: { x: t.offsetX, y: t.offsetY },
                                    },
                                ];
                            }
                        }
                    })({ computedStyle: o });
                    a && (l.effects = a);
                    const f = (({ computedStyle: e }) => {
                        const t = d(e.borderTopLeftRadius), n = d(e.borderTopRightRadius), o = d(e.borderBottomRightRadius), r = d(e.borderBottomLeftRadius);
                        return Object.assign(Object.assign(Object.assign(Object.assign({}, t ? { topLeftRadius: t.value } : {}), n ? { topRightRadius: n.value } : {}), o ? { bottomRightRadius: o.value } : {}), r ? { bottomLeftRadius: r.value } : {});
                    })({ computedStyle: o });
                    Object.assign(l, f), t.push(l);
                }
            }
            return t;
        };
        function R(e = "body", t = !1, n = !1) {
            n && console.time("Parse dom");
            const o = [], r = e instanceof HTMLElement ? e : document.querySelector(e || "body");
            if (r) {
                x(r),
                    v(r).forEach((e) => {
                        const t = w(e);
                        o.push(...t);
                    });
                const e = (function (e) {
                    let t = null;
                    const n = [], o = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null);
                    for (; (t = o.nextNode());)
                        n.push(t);
                    return n;
                })(r);
                for (const t of e) {
                    const e = S({ node: t });
                    e && o.push(e);
                }
            }
            const i = {
                type: "FRAME",
                width: Math.round(window.innerWidth),
                height: Math.round(document.documentElement.scrollHeight),
                x: 0,
                y: 0,
                ref: document.body,
            };
            o.unshift(i);
            const c = t ? M({ layers: o, root: i }) : o;
            return ((function ({ layers: e, root: t }) {
                e.concat([t]).forEach((e) => {
                    l(e, (e) => {
                        delete e.ref;
                    });
                });
            })({ layers: c, root: i }),
                n && (console.info("\n"), console.timeEnd("Parse dom")),
                c);
        }
    },
]);
exports.default = htmlToFigma;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxXQUFXLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDNUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1gsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDdEUsQ0FBQztJQUNELE9BQU8sQ0FDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDO1FB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