"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_component_1 = __importDefault(require("@coffeekraken/s-component"));
const dom_1 = require("@coffeekraken/sugar/dom");
const function_1 = require("@coffeekraken/sugar/function");
const string_1 = require("@coffeekraken/sugar/string");
const s_slider_component_css_1 = __importDefault(require("../../../../../src/css/s-slider-component.css"));
const SSLiderComponentInterface_1 = __importDefault(require("../../../../../src/js/interface/SSLiderComponentInterface"));
const DEFAULT_PROPS = SSLiderComponentInterface_1.default.defaults();
/**
 * Usage:
 *
 *  <s></s>
 *
 */
class S extends HTMLElement {
    get _$container() {
        return this._root.querySelector("[data-ref='S-$container']");
    }
    get _$root() {
        return this._root.querySelector("[data-ref='S-$root']");
    }
    get _$slides() {
        return this._root.querySelector("[data-ref='S-$slides']");
    }
    get _root() {
        return this.shadowRoot || this;
    }
    constructor() {
        super();
        const self = this;
        this.state = {
            _status: 'idle',
            _id: null,
            _currentSlideId: null,
            _component: null,
            _behaviors: {},
            _slideElements: [],
            _slidesIds: [],
            mount() {
                var _a;
                try {
                    self.state._component.injectStyleInShadowRoot([s_slider_component_css_1.default, ...((_a = self.props.cssDeps) !== null && _a !== void 0 ? _a : [])], self._$container);
                }
                catch (e) { }
                self.state._behaviors = {
                    default({ fromSlideId, toSlideId }) {
                        const $slidesWrapper = self._$slides;
                        $slidesWrapper._isScrollingFromNextOrPrevious = false;
                        if (!$slidesWrapper._isBehaviorInited) {
                            $slidesWrapper._isBehaviorInited = true; // const $slideElements = $slides.querySelector('slot');
                            // console.log('^slot', slots.assignedNodes());
                            // self.state._slideElements.forEach(($slide) => {
                            //     const observer = new IntersectionObserver(
                            //         (entries, observer) => {
                            //             console.log('mutations', entries);
                            //         },
                            //         {
                            //             // root: $slidesWrapper,
                            //         },
                            //     );
                            //     console.log('SLIT', $slide);
                            //     observer.observe($slide);
                            // });
                            let scrollTimeout;
                            $slidesWrapper.addEventListener('scroll', (e) => {
                                if ($slidesWrapper._isScrollingFromNextOrPrevious) {
                                    return;
                                }
                                clearTimeout(scrollTimeout);
                                scrollTimeout = setTimeout(() => {
                                    let $inViewSlide, largerPercentage = 0;
                                    for (let i = 0; i < self.state._slideElements.length; i++) {
                                        const $slide = self.state._slideElements[i];
                                        const stats = (0, dom_1.__elementAreaStats)($slide, {
                                            relativeTo: $slidesWrapper,
                                        });
                                        if (stats.percentageX +
                                            stats.percentageY >
                                            largerPercentage) {
                                            largerPercentage =
                                                stats.percentageX +
                                                    stats.percentageY;
                                            $inViewSlide = $slide;
                                        }
                                    }
                                    self.state.goTo(self.state.getSlideIdByElement($inViewSlide)); // console.log($inViewSlide);
                                }, 100);
                            });
                        }
                        const $from = self.state.getSlideElementById(fromSlideId), $to = self.state.getSlideElementById(toSlideId);
                        const fromRect = $from.getBoundingClientRect(), toRect = $to.getBoundingClientRect(), parentRect = $slidesWrapper.getBoundingClientRect();
                        let startX = $slidesWrapper.scrollLeft, startY = $slidesWrapper.scrollTop;
                        const dist = self.props.direction === 'vertical'
                            ? toRect.y - parentRect.top
                            : toRect.x - parentRect.left; // remove "smooth" from the scroll-behavior css
                        const initialScrollBehavior = $slidesWrapper.style.scrollBehavior, initialScrollSnapType = $slidesWrapper.style.scrollSnapType;
                        $slidesWrapper.style.scrollBehavior = 'initial';
                        $slidesWrapper.style.scrollSnapType = 'initial';
                        $slidesWrapper._isScrollingFromNextOrPrevious = true;
                        (0, function_1.__easeInterval)(self.props.transitionDuration, (percentage) => {
                            const offset = (dist / 100) * percentage;
                            if (self.props.direction === 'vertical') {
                                $slidesWrapper.scrollTop = startY + offset;
                            }
                            else {
                                $slidesWrapper.scrollLeft = startX + offset;
                            }
                        }, {
                            easing: self.props.transitionEasing,
                            onEnd() {
                                $slidesWrapper.style.scrollBehavior =
                                    initialScrollBehavior;
                                $slidesWrapper.style.scrollSnapType =
                                    initialScrollSnapType;
                                $slidesWrapper._isScrollingFromNextOrPrevious =
                                    false;
                            },
                        });
                    },
                }; // get all the slides elements
                self.update();
                self.state._slideElements = Array.from(document.querySelectorAll('[s-slider-slide]')); // set all the slides ids
                self.update();
                self.state._slidesIds = self.state._slideElements.map(($slide, i) => {
                    return $slide.hasAttribute('id') ? $slide.id : i;
                }); // activate the correct slide first
                self.update();
                if (self.props.slide) {
                    self.state._currentSlideId = self.props.slide;
                    self.update();
                }
                else {
                    self.state._currentSlideId = self.state._slidesIds[0];
                    self.update();
                }
                self.state.goTo(self.state._currentSlideId);
            },
            getSlideIdByElement($slide) {
                const idx = self.state._slideElements.indexOf($slide);
                if (idx === -1) {
                    return;
                }
                return self.state._slidesIds[idx];
            },
            getSlideIdxByElement($slide) {
                return self.state.getSlideIdxById(self.state.getSlideIdByElement($slide));
            },
            getSlideElementById(id) {
                const slideIdx = self.state._slidesIds.indexOf(id);
                return self.state._slideElements[slideIdx];
            },
            getSlideIdxById(id) {
                return self.state._slidesIds.indexOf(id);
            },
            getFirstSlideId() {
                return self.state._slidesIds[0];
            },
            getLastSlideId() {
                return self.state._slidesIds[self.state._slidesIds.length - 1];
            },
            getPreviousSlideId() {
                const currentSlideIdx = self.state.getCurrentSlideIdx();
                if (currentSlideIdx > 0) {
                    return self.state._slidesIds[currentSlideIdx - 1];
                }
                return self.state.getLastSlideId();
            },
            getNextSlideId() {
                const currentSlideIdx = self.state.getCurrentSlideIdx();
                if (currentSlideIdx < self.state._slidesIds.length) {
                    return self.state._slidesIds[currentSlideIdx + 1];
                }
                return self.state.getFirstSlideId();
            },
            getCurrentSlideIdx() {
                return self.state.getSlideIdxById(self.state._currentSlideId);
            },
            isLast() {
                return (self.state._currentSlideId === self.state.getLastSlideId());
            },
            isFirst() {
                return (self.state._currentSlideId === self.state.getFirstSlideId());
            },
            previous() {
                if (!self.props.loop && self.state.isFirst()) {
                    return;
                }
                self.state.goTo(self.state.getPreviousSlideId());
            },
            next() {
                if (!self.props.loop && self.state.isLast()) {
                    return;
                }
                self.state.goTo(self.state.getNextSlideId());
            },
            goTo(slideId) {
                var _a, _b;
                // call the behavior
                const behaviorFn = (_b = (_a = self.props.behaviors) === null || _a === void 0 ? void 0 : _a[self.props.behavior]) !== null && _b !== void 0 ? _b : self.state._behaviors[self.props.behavior];
                behaviorFn === null || behaviorFn === void 0 ? void 0 : behaviorFn({
                    fromSlideId: self.state._currentSlideId,
                    toSlideId: slideId,
                    component: self.state._component,
                    getSlideElementById: self.state.getSlideElementById,
                    getSlideIdxById: self.state.getSlideIdxById,
                    getFirstSlideId: self.state.getFirstSlideId,
                    getLastSlideId: self.state.getLastSlideId,
                    isLast: self.state.isLast,
                    isFirst: self.state.isFirst,
                }); // assign the new state current slide id
                self.state._currentSlideId = slideId;
                self.update();
            },
        };
        if (!this.props) {
            this.props = {};
        }
        this.componentProps = [
            'cssDeps',
            'direction',
            'transitionDuration',
            'transitionEasing',
            'slide',
            'loop',
            'behaviors',
            'behavior',
            'lnf',
            'controls',
            'nav',
            'swipe',
            'mousewheel',
            'clickOnSlide',
            'children',
        ];
        this.updateDeps = [[]];
        // used to keep track of all nodes created by show/for
        this.nodesToDestroy = [];
        // batch updates
        this.pendingUpdate = false;
        // Event handler for 'pointerup' event on div-s-7
        this.onDivS7Pointerup = (event) => {
            this.state.previous();
        };
        // Event handler for 'pointerup' event on div-s-8
        this.onDivS8Pointerup = (event) => {
            this.state.next();
        };
        if (true) {
            this.attachShadow({ mode: 'open' });
        }
    }
    destroyAnyNodes() {
        // destroy current view template refs before rendering again
        this.nodesToDestroy.forEach((el) => el.remove());
        this.nodesToDestroy = [];
    }
    connectedCallback() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19;
        this.getAttributeNames().forEach((attr) => {
            const jsVar = attr.replace(/-/g, '');
            const regexp = new RegExp(jsVar, 'i');
            this.componentProps.forEach((prop) => {
                if (regexp.test(prop)) {
                    const attrValue = this.getAttribute(attr);
                    if (this.props[prop] !== attrValue) {
                        this.props[prop] = attrValue;
                    }
                }
            });
        });
        // default props
        const defaultProps = s_component_1.default.getDefaultProps(this.tagName.toLowerCase());
        this.props.id = (_b = (_a = this.props.id) !== null && _a !== void 0 ? _a : defaultProps.id) !== null && _b !== void 0 ? _b : DEFAULT_PROPS.id;
        this.props.lnf =
            (_d = (_c = this.props.lnf) !== null && _c !== void 0 ? _c : defaultProps.lnf) !== null && _d !== void 0 ? _d : DEFAULT_PROPS.lnf;
        this.props.direction =
            (_f = (_e = this.props.direction) !== null && _e !== void 0 ? _e : defaultProps.direction) !== null && _f !== void 0 ? _f : DEFAULT_PROPS.direction;
        this.props.behaviors =
            (_h = (_g = this.props.behaviors) !== null && _g !== void 0 ? _g : defaultProps.behaviors) !== null && _h !== void 0 ? _h : DEFAULT_PROPS.behaviors;
        this.props.behavior =
            (_k = (_j = this.props.behavior) !== null && _j !== void 0 ? _j : defaultProps.behavior) !== null && _k !== void 0 ? _k : DEFAULT_PROPS.behavior;
        this.props.nextIconClass =
            (_m = (_l = this.props.nextIconClass) !== null && _l !== void 0 ? _l : defaultProps.nextIconClass) !== null && _m !== void 0 ? _m : DEFAULT_PROPS.nextIconClass;
        this.props.previousIconClass =
            (_p = (_o = this.props.previousIconClass) !== null && _o !== void 0 ? _o : defaultProps.previousIconClass) !== null && _p !== void 0 ? _p : DEFAULT_PROPS.previousIconClass;
        this.props.controls =
            (_r = (_q = this.props.controls) !== null && _q !== void 0 ? _q : defaultProps.controls) !== null && _r !== void 0 ? _r : DEFAULT_PROPS.controls;
        this.props.nav =
            (_t = (_s = this.props.nav) !== null && _s !== void 0 ? _s : defaultProps.nav) !== null && _t !== void 0 ? _t : DEFAULT_PROPS.nav;
        this.props.swipe =
            (_v = (_u = this.props.swipe) !== null && _u !== void 0 ? _u : defaultProps.swipe) !== null && _v !== void 0 ? _v : DEFAULT_PROPS.swipe;
        this.props.mousewheel =
            (_x = (_w = this.props.mousewheel) !== null && _w !== void 0 ? _w : defaultProps.mousewheel) !== null && _x !== void 0 ? _x : DEFAULT_PROPS.mousewheel;
        this.props.clickOnSlide =
            (_z = (_y = this.props.clickOnSlide) !== null && _y !== void 0 ? _y : defaultProps.clickOnSlide) !== null && _z !== void 0 ? _z : DEFAULT_PROPS.clickOnSlide;
        this.props.loop =
            (_1 = (_0 = this.props.loop) !== null && _0 !== void 0 ? _0 : defaultProps.loop) !== null && _1 !== void 0 ? _1 : DEFAULT_PROPS.loop;
        this.props.slide =
            (_3 = (_2 = this.props.slide) !== null && _2 !== void 0 ? _2 : defaultProps.slide) !== null && _3 !== void 0 ? _3 : DEFAULT_PROPS.slide;
        this.props.progress =
            (_5 = (_4 = this.props.progress) !== null && _4 !== void 0 ? _4 : defaultProps.progress) !== null && _5 !== void 0 ? _5 : DEFAULT_PROPS.progress;
        this.props.timer =
            (_7 = (_6 = this.props.timer) !== null && _6 !== void 0 ? _6 : defaultProps.timer) !== null && _7 !== void 0 ? _7 : DEFAULT_PROPS.timer;
        this.props.autoplay =
            (_9 = (_8 = this.props.autoplay) !== null && _8 !== void 0 ? _8 : defaultProps.autoplay) !== null && _9 !== void 0 ? _9 : DEFAULT_PROPS.autoplay;
        this.props.intersectionClasses =
            (_11 = (_10 = this.props.intersectionClasses) !== null && _10 !== void 0 ? _10 : defaultProps.intersectionClasses) !== null && _11 !== void 0 ? _11 : DEFAULT_PROPS.intersectionClasses;
        this.props.transitionDuration =
            (_13 = (_12 = this.props.transitionDuration) !== null && _12 !== void 0 ? _12 : defaultProps.transitionDuration) !== null && _13 !== void 0 ? _13 : DEFAULT_PROPS.transitionDuration;
        this.props.transitionEasing =
            (_15 = (_14 = this.props.transitionEasing) !== null && _14 !== void 0 ? _14 : defaultProps.transitionEasing) !== null && _15 !== void 0 ? _15 : DEFAULT_PROPS.transitionEasing;
        this.props.transitionHandler =
            (_17 = (_16 = this.props.transitionHandler) !== null && _16 !== void 0 ? _16 : defaultProps.transitionHandler) !== null && _17 !== void 0 ? _17 : DEFAULT_PROPS.transitionHandler;
        this.props.cssDeps =
            (_19 = (_18 = this.props.cssDeps) !== null && _18 !== void 0 ? _18 : defaultProps.cssDeps) !== null && _19 !== void 0 ? _19 : DEFAULT_PROPS.cssDeps;
        this._root.innerHTML = `
                        
      <div data-el="div-s-1" data-ref="S-$container">
        <div data-el="div-s-2" data-ref="S-$root">
          <div data-el="div-s-3">
            <div data-el="div-s-4" data-ref="S-$slides">
              <slot></slot>
            </div>
          </div>
      
          <template data-el="show-s">
            <div class="s-slider__nav">
              <template data-el="for-s"><div data-el="div-s-6"></div></template>
            </div>
          </template>
      
          <div class="s-slider__controls">
            <div data-el="div-s-7">
              <div class="s-slider__controls-previous-arrow"></div>
            </div>
      
            <div data-el="div-s-8">
              <div class="s-slider__controls-next-arrow"></div>
            </div>
          </div>
        </div>
      </div>`;
        this.pendingUpdate = true;
        this.render();
        this.onMount();
        this.pendingUpdate = false;
        this.update();
    }
    showContent(el) {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
        // grabs the content of a node that is between <template> tags
        // iterates through child nodes to register all content including text elements
        // attaches the content after the template
        const elementFragment = el.content.cloneNode(true);
        const children = Array.from(elementFragment.childNodes);
        children.forEach((child) => {
            if (el === null || el === void 0 ? void 0 : el.scope) {
                child.scope = el.scope;
            }
            if (el === null || el === void 0 ? void 0 : el.context) {
                child.context = el.context;
            }
            this.nodesToDestroy.push(child);
        });
        el.after(elementFragment);
    }
    onMount() {
        // onMount
        SSLiderComponentInterface_1.default;
        this.state._component = new s_component_1.default('s-slider', {
            bare: false,
        });
        this.update();
        this.state._id = `s-slider-${(0, string_1.__uniqid)()}`;
        this.update();
        this.state.mount();
        this.state._status = 'mounted';
        this.update();
    }
    onUpdate() {
        const self = this;
        self._$root.style.setProperty('--s-slider-slide', self.state.getCurrentSlideIdx());
        self._$root.style.setProperty('--s-slider-total', self.state._slidesIds.length);
    }
    update() {
        if (this.pendingUpdate === true) {
            return;
        }
        this.pendingUpdate = true;
        this.render();
        this.onUpdate();
        this.pendingUpdate = false;
    }
    render() {
        // re-rendering needs to ensure that all nodes generated by for/show are refreshed
        this.destroyAnyNodes();
        this.updateBindings();
    }
    updateBindings() {
        this._root.querySelectorAll("[data-el='div-s-1']").forEach((el) => {
            var _a, _b, _c;
            el.setAttribute('id', this.state._id);
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('', null, 's-bare');
            el.setAttribute('status', this.state._status);
            el.setAttribute('direction', this.props.direction);
            el.setAttribute('behavior', (_b = this.props.behavior) !== null && _b !== void 0 ? _b : 'default');
            el.setAttribute('lnf', (_c = this.props.lnf) !== null && _c !== void 0 ? _c : 'default');
        });
        this._root.querySelectorAll("[data-el='div-s-2']").forEach((el) => {
            var _a;
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('__root');
        });
        this._root.querySelectorAll("[data-el='div-s-3']").forEach((el) => {
            var _a;
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('__slides-wrapper');
        });
        this._root.querySelectorAll("[data-el='div-s-4']").forEach((el) => {
            var _a;
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('__slides');
        });
        this._root.querySelectorAll("[data-el='show-s']").forEach((el) => {
            const whenCondition = this.state._slideElements.length;
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root.querySelectorAll("[data-el='for-s']").forEach((el) => {
            let array = this.state._slideElements;
            this.renderLoop(el, array, 'child');
        });
        this._root.querySelectorAll("[data-el='div-s-6']").forEach((el) => {
            const child = this.getScope(el, 'child');
            el.className = `s-slider__nav-item ${this.state.getSlideIdxByElement(child) ==
                this.state.getCurrentSlideIdx()
                ? 'active'
                : ''}`;
        });
        this._root.querySelectorAll("[data-el='div-s-7']").forEach((el) => {
            el.className = `s-slider__controls-previous ${this.props.loop || !this.state.isFirst() ? 'active' : ''}`;
            el.removeEventListener('pointerup', this.onDivS7Pointerup);
            el.addEventListener('pointerup', this.onDivS7Pointerup);
        });
        this._root.querySelectorAll("[data-el='div-s-8']").forEach((el) => {
            el.className = `s-slider__controls-next ${this.props.loop || !this.state.isLast() ? 'active' : ''}`;
            el.removeEventListener('pointerup', this.onDivS8Pointerup);
            el.addEventListener('pointerup', this.onDivS8Pointerup);
        });
    }
    // Helper to render content
    renderTextNode(el, text) {
        const textNode = document.createTextNode(text);
        if (el === null || el === void 0 ? void 0 : el.scope) {
            textNode.scope = el.scope;
        }
        if (el === null || el === void 0 ? void 0 : el.context) {
            textNode.context = el.context;
        }
        el.after(textNode);
        this.nodesToDestroy.push(el.nextSibling);
    }
    // scope helper
    getScope(el, name) {
        var _a;
        do {
            let value = (_a = el === null || el === void 0 ? void 0 : el.scope) === null || _a === void 0 ? void 0 : _a[name];
            if (value !== undefined) {
                return value;
            }
        } while ((el = el.parentNode));
    }
    // Helper to render loops
    renderLoop(template, array, itemName, itemIndex, collectionName) {
        const collection = [];
        for (let [index, value] of array.entries()) {
            const elementFragment = template.content.cloneNode(true);
            const children = Array.from(elementFragment.childNodes);
            const localScope = {};
            let scope = localScope;
            if (template === null || template === void 0 ? void 0 : template.scope) {
                const getParent = {
                    get(target, prop, receiver) {
                        if (prop in target) {
                            return target[prop];
                        }
                        if (prop in template.scope) {
                            return template.scope[prop];
                        }
                        return target[prop];
                    },
                };
                scope = new Proxy(localScope, getParent);
            }
            children.forEach((child) => {
                if (itemName !== undefined) {
                    scope[itemName] = value;
                }
                if (itemIndex !== undefined) {
                    scope[itemIndex] = index;
                }
                if (collectionName !== undefined) {
                    scope[collectionName] = array;
                }
                child.scope = scope;
                if (template.context) {
                    child.context = context;
                }
                this.nodesToDestroy.push(child);
                collection.unshift(child);
            });
        }
        collection.forEach((child) => template.after(child));
    }
}
exports.default = S;
function define(props = {}, tagName = 's') {
    s_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, class SComponent extends S {
    });
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXNRQSw0RUFBcUQ7QUFDckQsaURBQTZEO0FBQzdELDJEQUE4RDtBQUM5RCx1REFBc0Q7QUFDdEQsMkdBQWtFO0FBQ2xFLDBIQUFvRztBQUNwRyxNQUFNLGFBQWEsR0FBRyxtQ0FBMkIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUU3RDs7Ozs7R0FLRztBQUNILE1BQXFCLENBQUUsU0FBUSxXQUFXO0lBQ3RDLElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE9BQU8sRUFBRSxNQUFNO1lBQ2YsR0FBRyxFQUFFLElBQUk7WUFDVCxlQUFlLEVBQUUsSUFBSTtZQUNyQixVQUFVLEVBQUUsSUFBSTtZQUNoQixVQUFVLEVBQUUsRUFBRTtZQUNkLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsS0FBSzs7Z0JBQ0QsSUFBSTtvQkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDekMsQ0FBQyxnQ0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxFQUN0QyxJQUFJLENBQUMsV0FBVyxDQUNuQixDQUFDO2lCQUNMO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7Z0JBRWQsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7b0JBQ3BCLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUU7d0JBQzlCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3JDLGNBQWMsQ0FBQyw4QkFBOEIsR0FBRyxLQUFLLENBQUM7d0JBRXRELElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUU7NEJBQ25DLGNBQWMsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQyx3REFBd0Q7NEJBQ2pHLCtDQUErQzs0QkFDL0Msa0RBQWtEOzRCQUNsRCxpREFBaUQ7NEJBQ2pELG1DQUFtQzs0QkFDbkMsaURBQWlEOzRCQUNqRCxhQUFhOzRCQUNiLFlBQVk7NEJBQ1osdUNBQXVDOzRCQUN2QyxhQUFhOzRCQUNiLFNBQVM7NEJBQ1QsbUNBQW1DOzRCQUNuQyxnQ0FBZ0M7NEJBQ2hDLE1BQU07NEJBRU4sSUFBSSxhQUFhLENBQUM7NEJBQ2xCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQ0FDNUMsSUFDSSxjQUFjLENBQUMsOEJBQThCLEVBQy9DO29DQUNFLE9BQU87aUNBQ1Y7Z0NBRUQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dDQUM1QixhQUFhLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQ0FDNUIsSUFBSSxZQUFZLEVBQ1osZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO29DQUV6QixLQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDVCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUNwQyxDQUFDLEVBQUUsRUFDTDt3Q0FDRSxNQUFNLE1BQU0sR0FDUixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3Q0FFakMsTUFBTSxLQUFLLEdBQUcsSUFBQSx3QkFBa0IsRUFDNUIsTUFBTSxFQUNOOzRDQUNJLFVBQVUsRUFBRSxjQUFjO3lDQUM3QixDQUNKLENBQUM7d0NBRUYsSUFDSSxLQUFLLENBQUMsV0FBVzs0Q0FDYixLQUFLLENBQUMsV0FBVzs0Q0FDckIsZ0JBQWdCLEVBQ2xCOzRDQUNFLGdCQUFnQjtnREFDWixLQUFLLENBQUMsV0FBVztvREFDakIsS0FBSyxDQUFDLFdBQVcsQ0FBQzs0Q0FDdEIsWUFBWSxHQUFHLE1BQU0sQ0FBQzt5Q0FDekI7cUNBQ0o7b0NBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FDMUIsWUFBWSxDQUNmLENBQ0osQ0FBQyxDQUFDLDZCQUE2QjtnQ0FDcEMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzRCQUNaLENBQUMsQ0FBQyxDQUFDO3lCQUNOO3dCQUVELE1BQU0sS0FBSyxHQUNILElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEVBQy9DLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMscUJBQXFCLEVBQUUsRUFDMUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxFQUNwQyxVQUFVLEdBQUcsY0FBYyxDQUFDLHFCQUFxQixFQUFFLENBQUM7d0JBQ3hELElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxVQUFVLEVBQ2xDLE1BQU0sR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO3dCQUN0QyxNQUFNLElBQUksR0FDTixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVOzRCQUMvQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRzs0QkFDM0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLCtDQUErQzt3QkFFckYsTUFBTSxxQkFBcUIsR0FDbkIsY0FBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQ3ZDLHFCQUFxQixHQUNqQixjQUFjLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQzt3QkFDNUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO3dCQUNoRCxjQUFjLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7d0JBQ2hELGNBQWMsQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUM7d0JBRXJELElBQUEseUJBQWMsRUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUM3QixDQUFDLFVBQVUsRUFBRSxFQUFFOzRCQUNYLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQzs0QkFFekMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7Z0NBQ3JDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQzs2QkFDOUM7aUNBQU07Z0NBQ0gsY0FBYyxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDOzZCQUMvQzt3QkFDTCxDQUFDLEVBQ0Q7NEJBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCOzRCQUVuQyxLQUFLO2dDQUNELGNBQWMsQ0FBQyxLQUFLLENBQUMsY0FBYztvQ0FDL0IscUJBQXFCLENBQUM7Z0NBQzFCLGNBQWMsQ0FBQyxLQUFLLENBQUMsY0FBYztvQ0FDL0IscUJBQXFCLENBQUM7Z0NBQzFCLGNBQWMsQ0FBQyw4QkFBOEI7b0NBQ3pDLEtBQUssQ0FBQzs0QkFDZCxDQUFDO3lCQUNKLENBQ0osQ0FBQztvQkFDTixDQUFDO2lCQUNKLENBQUMsQ0FBQyw4QkFBOEI7Z0JBRWpDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNsQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FDaEQsQ0FBQyxDQUFDLHlCQUF5QjtnQkFFNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDakQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ1YsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELENBQUMsQ0FDSixDQUFDLENBQUMsbUNBQW1DO2dCQUV0QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBRWQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDakI7Z0JBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBQ0QsbUJBQW1CLENBQUMsTUFBTTtnQkFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV0RCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDWixPQUFPO2lCQUNWO2dCQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUNELG9CQUFvQixDQUFDLE1BQU07Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQ3pDLENBQUM7WUFDTixDQUFDO1lBQ0QsbUJBQW1CLENBQUMsRUFBRTtnQkFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVuRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFDRCxlQUFlLENBQUMsRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQ0QsZUFBZTtnQkFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFDRCxjQUFjO2dCQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25FLENBQUM7WUFDRCxrQkFBa0I7Z0JBQ2QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUV4RCxJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQUU7b0JBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDtnQkFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkMsQ0FBQztZQUNELGNBQWM7Z0JBQ1YsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUV4RCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7b0JBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDtnQkFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEMsQ0FBQztZQUNELGtCQUFrQjtnQkFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELE1BQU07Z0JBQ0YsT0FBTyxDQUNILElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQzdELENBQUM7WUFDTixDQUFDO1lBQ0QsT0FBTztnQkFDSCxPQUFPLENBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FDOUQsQ0FBQztZQUNOLENBQUM7WUFDRCxRQUFRO2dCQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUMxQyxPQUFPO2lCQUNWO2dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFDRCxJQUFJO2dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN6QyxPQUFPO2lCQUNWO2dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBQ0QsSUFBSSxDQUFDLE9BQU87O2dCQUNSLG9CQUFvQjtnQkFDcEIsTUFBTSxVQUFVLEdBQ1osTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUywwQ0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQ0FDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFHO29CQUNULFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7b0JBQ3ZDLFNBQVMsRUFBRSxPQUFPO29CQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO29CQUNoQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtvQkFDbkQsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZTtvQkFDM0MsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZTtvQkFDM0MsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztvQkFDekMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtvQkFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztpQkFDOUIsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO2dCQUU1QyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixDQUFDO1NBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ2xCLFNBQVM7WUFDVCxXQUFXO1lBQ1gsb0JBQW9CO1lBQ3BCLGtCQUFrQjtZQUNsQixPQUFPO1lBQ1AsTUFBTTtZQUNOLFdBQVc7WUFDWCxVQUFVO1lBQ1YsS0FBSztZQUNMLFVBQVU7WUFDVixLQUFLO1lBQ0wsT0FBTztZQUNQLFlBQVk7WUFDWixjQUFjO1lBQ2QsVUFBVTtTQUNiLENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkIsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUzQixpREFBaUQ7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUM7UUFFRixpREFBaUQ7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUM7UUFFRixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsNERBQTREO1FBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCOztRQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNqQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7d0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO3FCQUNoQztpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsTUFBTSxZQUFZLEdBQUcscUJBQVksQ0FBQyxlQUFlLENBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQzdCLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLG1DQUFJLFlBQVksQ0FBQyxFQUFFLG1DQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFDckUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO1lBQ1YsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxtQ0FBSSxZQUFZLENBQUMsR0FBRyxtQ0FBSSxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUNoQixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLG1DQUNwQixZQUFZLENBQUMsU0FBUyxtQ0FDdEIsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDaEIsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxtQ0FDcEIsWUFBWSxDQUFDLFNBQVMsbUNBQ3RCLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQ2YsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FDbkIsWUFBWSxDQUFDLFFBQVEsbUNBQ3JCLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO1lBQ3BCLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsbUNBQ3hCLFlBQVksQ0FBQyxhQUFhLG1DQUMxQixhQUFhLENBQUMsYUFBYSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO1lBQ3hCLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixtQ0FDNUIsWUFBWSxDQUFDLGlCQUFpQixtQ0FDOUIsYUFBYSxDQUFDLGlCQUFpQixDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUNmLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsbUNBQ25CLFlBQVksQ0FBQyxRQUFRLG1DQUNyQixhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztZQUNWLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsbUNBQUksWUFBWSxDQUFDLEdBQUcsbUNBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDWixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLG1DQUFJLFlBQVksQ0FBQyxLQUFLLG1DQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO1lBQ2pCLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsbUNBQ3JCLFlBQVksQ0FBQyxVQUFVLG1DQUN2QixhQUFhLENBQUMsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtZQUNuQixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLG1DQUN2QixZQUFZLENBQUMsWUFBWSxtQ0FDekIsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDWCxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLG1DQUFJLFlBQVksQ0FBQyxJQUFJLG1DQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDL0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ1osTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxtQ0FBSSxZQUFZLENBQUMsS0FBSyxtQ0FBSSxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUNmLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsbUNBQ25CLFlBQVksQ0FBQyxRQUFRLG1DQUNyQixhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUNaLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUNBQUksWUFBWSxDQUFDLEtBQUssbUNBQUksYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDZixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLG1DQUNuQixZQUFZLENBQUMsUUFBUSxtQ0FDckIsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtZQUMxQixPQUFBLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIscUNBQzlCLFlBQVksQ0FBQyxtQkFBbUIscUNBQ2hDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQjtZQUN6QixPQUFBLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IscUNBQzdCLFlBQVksQ0FBQyxrQkFBa0IscUNBQy9CLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtZQUN2QixPQUFBLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IscUNBQzNCLFlBQVksQ0FBQyxnQkFBZ0IscUNBQzdCLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQjtZQUN4QixPQUFBLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIscUNBQzVCLFlBQVksQ0FBQyxpQkFBaUIscUNBQzlCLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDZCxPQUFBLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLHFDQUFJLFlBQVksQ0FBQyxPQUFPLHFDQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFFeEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBMEJsQixDQUFDO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxXQUFXLENBQUMsRUFBRTtRQUNWLCtFQUErRTtRQUMvRSw4REFBOEQ7UUFDOUQsK0VBQStFO1FBQy9FLDBDQUEwQztRQUUxQyxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsS0FBSyxFQUFFO2dCQUNYLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQzthQUMxQjtZQUNELElBQUksRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE9BQU8sRUFBRTtnQkFDYixLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU87UUFDSCxVQUFVO1FBQ1YsbUNBQTJCLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxxQkFBWSxDQUFDLFVBQVUsRUFBRTtZQUNqRCxJQUFJLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFlBQVksSUFBQSxpQkFBUSxHQUFFLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUN6QixrQkFBa0IsRUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUNsQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUN6QixrQkFBa0IsRUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUMvQixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQzdCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTTtRQUNGLGtGQUFrRjtRQUNsRixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFOztZQUM5RCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXRDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFcEUsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU5QyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRW5ELEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLG1DQUFJLFNBQVMsQ0FBQyxDQUFDO1lBRTlELEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLG1DQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFOztZQUM5RCxFQUFFLENBQUMsU0FBUyxHQUFHLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTs7WUFDOUQsRUFBRSxDQUFDLFNBQVMsR0FBRyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRSxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTs7WUFDOUQsRUFBRSxDQUFDLFNBQVMsR0FBRyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDN0QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ3ZELElBQUksYUFBYSxFQUFFO2dCQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUM1RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFekMsRUFBRSxDQUFDLFNBQVMsR0FBRyxzQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQztnQkFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtnQkFDM0IsQ0FBQyxDQUFDLFFBQVE7Z0JBQ1YsQ0FBQyxDQUFDLEVBQ1YsRUFBRSxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDOUQsRUFBRSxDQUFDLFNBQVMsR0FBRywrQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDMUQsRUFBRSxDQUFDO1lBRUgsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzRCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQzlELEVBQUUsQ0FBQyxTQUFTLEdBQUcsMkJBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQ3pELEVBQUUsQ0FBQztZQUVILEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0QsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQkFBMkI7SUFDM0IsY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJO1FBQ25CLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsS0FBSyxFQUFFO1lBQ1gsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsT0FBTyxFQUFFO1lBQ2IsUUFBUSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ2pDO1FBQ0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELGVBQWU7SUFDZixRQUFRLENBQUMsRUFBRSxFQUFFLElBQUk7O1FBQ2IsR0FBRztZQUNDLElBQUksS0FBSyxHQUFHLE1BQUEsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLEtBQUssMENBQUcsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUNyQixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQ25DLENBQUM7SUFFRCx5QkFBeUI7SUFDekIsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxjQUFjO1FBQzNELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN0QixLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hDLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUM7WUFDdkIsSUFBSSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsS0FBSyxFQUFFO2dCQUNqQixNQUFNLFNBQVMsR0FBRztvQkFDZCxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRO3dCQUN0QixJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7NEJBQ2hCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUN2Qjt3QkFDRCxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFOzRCQUN4QixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQy9CO3dCQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QixDQUFDO2lCQUNKLENBQUM7Z0JBQ0YsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUM1QztZQUNELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUN4QixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMzQjtnQkFDRCxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7b0JBQ3pCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQzVCO2dCQUNELElBQUksY0FBYyxLQUFLLFNBQVMsRUFBRTtvQkFDOUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDakM7Z0JBQ0QsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtvQkFDbEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7aUJBQzNCO2dCQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNKO0FBcm9CRCxvQkFxb0JDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEdBQUc7SUFDNUMscUJBQVksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sVUFBVyxTQUFRLENBQUM7S0FBRyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUhELHdCQUdDIn0=