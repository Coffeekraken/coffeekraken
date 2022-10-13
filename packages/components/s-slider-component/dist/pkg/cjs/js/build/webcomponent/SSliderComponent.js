"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = exports.metas = exports.DEFAULT_PROPS = void 0;
const s_slider_component_css_1 = __importDefault(require("../../../../src/css/s-slider-component.css"));
const SSliderComponentInterface_1 = __importDefault(require("../../../../src/js/interface/SSliderComponentInterface"));
const s_component_1 = __importDefault(require("@coffeekraken/s-component"));
const dom_1 = require("@coffeekraken/sugar/dom");
const function_1 = require("@coffeekraken/sugar/function");
const string_1 = require("@coffeekraken/sugar/string");
exports.DEFAULT_PROPS = SSliderComponentInterface_1.default.defaults();
exports.metas = {
    interface: SSliderComponentInterface_1.default,
    preview: `
        <s-slider>
            <div s-slider-slide>
                <img src="https://picsum.photos/1600/900?1" />
            </div>
            <div s-slider-slide>
                <img src="https://picsum.photos/1600/900?2" />
            </div>
            <div s-slider-slide>
                <img src="https://picsum.photos/1600/900?3" />
            </div>
        </s-slider>
    `,
};
/**
 * Usage:
 *
 *  <s-slider></s-slider>
 *
 */
class SSlider extends HTMLElement {
    get _$container() {
        return this._root.querySelector("[data-ref='SSlider-$container']");
    }
    get _$root() {
        return this._root.querySelector("[data-ref='SSlider-$root']");
    }
    get _$slides() {
        return this._root.querySelector("[data-ref='SSlider-$slides']");
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
                catch (e) {
                    console.log(e);
                }
                console.log('DEFAU', exports.DEFAULT_PROPS);
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
                        console.log('f', fromSlideId, $from, $to);
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
                console.log('Go to', slideId, self.state._currentSlideId, self.state._slidesIds, self.state._slideElements); // call the behavior
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
        // Event handler for 'pointerup' event on div-s-slider-7
        this.onDivSSlider7Pointerup = (event) => {
            this.state.previous();
        };
        // Event handler for 'pointerup' event on div-s-slider-8
        this.onDivSSlider8Pointerup = (event) => {
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
        this.props.id = (_b = (_a = this.props.id) !== null && _a !== void 0 ? _a : defaultProps.id) !== null && _b !== void 0 ? _b : exports.DEFAULT_PROPS.id;
        this.props.lnf =
            (_d = (_c = this.props.lnf) !== null && _c !== void 0 ? _c : defaultProps.lnf) !== null && _d !== void 0 ? _d : exports.DEFAULT_PROPS.lnf;
        this.props.direction =
            (_f = (_e = this.props.direction) !== null && _e !== void 0 ? _e : defaultProps.direction) !== null && _f !== void 0 ? _f : exports.DEFAULT_PROPS.direction;
        this.props.behaviors =
            (_h = (_g = this.props.behaviors) !== null && _g !== void 0 ? _g : defaultProps.behaviors) !== null && _h !== void 0 ? _h : exports.DEFAULT_PROPS.behaviors;
        this.props.behavior =
            (_k = (_j = this.props.behavior) !== null && _j !== void 0 ? _j : defaultProps.behavior) !== null && _k !== void 0 ? _k : exports.DEFAULT_PROPS.behavior;
        this.props.nextIconClass =
            (_m = (_l = this.props.nextIconClass) !== null && _l !== void 0 ? _l : defaultProps.nextIconClass) !== null && _m !== void 0 ? _m : exports.DEFAULT_PROPS.nextIconClass;
        this.props.previousIconClass =
            (_p = (_o = this.props.previousIconClass) !== null && _o !== void 0 ? _o : defaultProps.previousIconClass) !== null && _p !== void 0 ? _p : exports.DEFAULT_PROPS.previousIconClass;
        this.props.controls =
            (_r = (_q = this.props.controls) !== null && _q !== void 0 ? _q : defaultProps.controls) !== null && _r !== void 0 ? _r : exports.DEFAULT_PROPS.controls;
        this.props.nav =
            (_t = (_s = this.props.nav) !== null && _s !== void 0 ? _s : defaultProps.nav) !== null && _t !== void 0 ? _t : exports.DEFAULT_PROPS.nav;
        this.props.swipe =
            (_v = (_u = this.props.swipe) !== null && _u !== void 0 ? _u : defaultProps.swipe) !== null && _v !== void 0 ? _v : exports.DEFAULT_PROPS.swipe;
        this.props.mousewheel =
            (_x = (_w = this.props.mousewheel) !== null && _w !== void 0 ? _w : defaultProps.mousewheel) !== null && _x !== void 0 ? _x : exports.DEFAULT_PROPS.mousewheel;
        this.props.clickOnSlide =
            (_z = (_y = this.props.clickOnSlide) !== null && _y !== void 0 ? _y : defaultProps.clickOnSlide) !== null && _z !== void 0 ? _z : exports.DEFAULT_PROPS.clickOnSlide;
        this.props.loop =
            (_1 = (_0 = this.props.loop) !== null && _0 !== void 0 ? _0 : defaultProps.loop) !== null && _1 !== void 0 ? _1 : exports.DEFAULT_PROPS.loop;
        this.props.slide =
            (_3 = (_2 = this.props.slide) !== null && _2 !== void 0 ? _2 : defaultProps.slide) !== null && _3 !== void 0 ? _3 : exports.DEFAULT_PROPS.slide;
        this.props.progress =
            (_5 = (_4 = this.props.progress) !== null && _4 !== void 0 ? _4 : defaultProps.progress) !== null && _5 !== void 0 ? _5 : exports.DEFAULT_PROPS.progress;
        this.props.timer =
            (_7 = (_6 = this.props.timer) !== null && _6 !== void 0 ? _6 : defaultProps.timer) !== null && _7 !== void 0 ? _7 : exports.DEFAULT_PROPS.timer;
        this.props.autoplay =
            (_9 = (_8 = this.props.autoplay) !== null && _8 !== void 0 ? _8 : defaultProps.autoplay) !== null && _9 !== void 0 ? _9 : exports.DEFAULT_PROPS.autoplay;
        this.props.intersectionClasses =
            (_11 = (_10 = this.props.intersectionClasses) !== null && _10 !== void 0 ? _10 : defaultProps.intersectionClasses) !== null && _11 !== void 0 ? _11 : exports.DEFAULT_PROPS.intersectionClasses;
        this.props.transitionDuration =
            (_13 = (_12 = this.props.transitionDuration) !== null && _12 !== void 0 ? _12 : defaultProps.transitionDuration) !== null && _13 !== void 0 ? _13 : exports.DEFAULT_PROPS.transitionDuration;
        this.props.transitionEasing =
            (_15 = (_14 = this.props.transitionEasing) !== null && _14 !== void 0 ? _14 : defaultProps.transitionEasing) !== null && _15 !== void 0 ? _15 : exports.DEFAULT_PROPS.transitionEasing;
        this.props.transitionHandler =
            (_17 = (_16 = this.props.transitionHandler) !== null && _16 !== void 0 ? _16 : defaultProps.transitionHandler) !== null && _17 !== void 0 ? _17 : exports.DEFAULT_PROPS.transitionHandler;
        this.props.cssDeps =
            (_19 = (_18 = this.props.cssDeps) !== null && _18 !== void 0 ? _18 : defaultProps.cssDeps) !== null && _19 !== void 0 ? _19 : exports.DEFAULT_PROPS.cssDeps;
        this._root.innerHTML = `
                        
      <div data-el="div-s-slider-1" data-ref="SSlider-$container">
        <div data-el="div-s-slider-2" data-ref="SSlider-$root">
          <div data-el="div-s-slider-3">
            <div data-el="div-s-slider-4" data-ref="SSlider-$slides">
              <slot></slot>
            </div>
          </div>
      
          <template data-el="show-s-slider">
            <div class="s-slider__nav">
              <template data-el="for-s-slider">
                <div data-el="div-s-slider-6"></div>
              </template>
            </div>
          </template>
      
          <div class="s-slider__controls">
            <div data-el="div-s-slider-7">
              <div class="s-slider__controls-previous-arrow"></div>
            </div>
      
            <div data-el="div-s-slider-8">
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
        SSliderComponentInterface_1.default;
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
        console.log('UPDTE');
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
        this._root
            .querySelectorAll("[data-el='div-s-slider-1']")
            .forEach((el) => {
            var _a, _b, _c;
            el.setAttribute('id', this.state._id);
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('', null, 's-bare');
            el.setAttribute('status', this.state._status);
            el.setAttribute('direction', this.props.direction);
            el.setAttribute('behavior', (_b = this.props.behavior) !== null && _b !== void 0 ? _b : 'default');
            el.setAttribute('lnf', (_c = this.props.lnf) !== null && _c !== void 0 ? _c : 'default');
        });
        this._root
            .querySelectorAll("[data-el='div-s-slider-2']")
            .forEach((el) => {
            var _a;
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('__root');
        });
        this._root
            .querySelectorAll("[data-el='div-s-slider-3']")
            .forEach((el) => {
            var _a;
            el.className =
                (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('__slides-wrapper');
        });
        this._root
            .querySelectorAll("[data-el='div-s-slider-4']")
            .forEach((el) => {
            var _a;
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('__slides');
        });
        this._root
            .querySelectorAll("[data-el='show-s-slider']")
            .forEach((el) => {
            const whenCondition = this.state._slideElements.length;
            if (whenCondition) {
                this.showContent(el);
            }
        });
        this._root
            .querySelectorAll("[data-el='for-s-slider']")
            .forEach((el) => {
            let array = this.state._slideElements;
            this.renderLoop(el, array, 'child');
        });
        this._root
            .querySelectorAll("[data-el='div-s-slider-6']")
            .forEach((el) => {
            const child = this.getScope(el, 'child');
            el.className = `s-slider__nav-item ${this.state.getSlideIdxByElement(child) ==
                this.state.getCurrentSlideIdx()
                ? 'active'
                : ''}`;
        });
        this._root
            .querySelectorAll("[data-el='div-s-slider-7']")
            .forEach((el) => {
            el.className = `s-slider__controls-previous ${this.props.loop || !this.state.isFirst() ? 'active' : ''}`;
            el.removeEventListener('pointerup', this.onDivSSlider7Pointerup);
            el.addEventListener('pointerup', this.onDivSSlider7Pointerup);
        });
        this._root
            .querySelectorAll("[data-el='div-s-slider-8']")
            .forEach((el) => {
            el.className = `s-slider__controls-next ${this.props.loop || !this.state.isLast() ? 'active' : ''}`;
            el.removeEventListener('pointerup', this.onDivSSlider8Pointerup);
            el.addEventListener('pointerup', this.onDivSSlider8Pointerup);
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
exports.default = SSlider;
function define(props = {}, tagName = 's-slider') {
    s_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, class SSliderComponent extends SSlider {
    });
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXNRQSx3R0FBK0Q7QUFDL0QsdUhBQWlHO0FBQ2pHLDRFQUFxRDtBQUNyRCxpREFBNkQ7QUFDN0QsMkRBQThEO0FBQzlELHVEQUFzRDtBQUN6QyxRQUFBLGFBQWEsR0FBRyxtQ0FBMkIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN2RCxRQUFBLEtBQUssR0FBRztJQUNqQixTQUFTLEVBQUUsbUNBQTJCO0lBQ3RDLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7O0tBWVI7Q0FDSixDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFxQixPQUFRLFNBQVEsV0FBVztJQUM1QyxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxPQUFPLEVBQUUsTUFBTTtZQUNmLEdBQUcsRUFBRSxJQUFJO1lBQ1QsZUFBZSxFQUFFLElBQUk7WUFDckIsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLEVBQUU7WUFDZCxjQUFjLEVBQUUsRUFBRTtZQUNsQixVQUFVLEVBQUUsRUFBRTtZQUNkLEtB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