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
export default htmlToFigma;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksV0FBVyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNYLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3RFLENBQUM7SUFDRCxPQUFPLENBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQztRQUNG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