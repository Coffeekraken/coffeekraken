import __css from '../../../../src/css/s-slider-component.css';
import __SSliderComponentInterface from '../../../../src/js/interface/SSliderComponentInterface';
import __SComponent from '@coffeekraken/s-component';
import { __elementAreaStats } from '@coffeekraken/sugar/dom';
import { __easeInterval } from '@coffeekraken/sugar/function';
import { __uniqid } from '@coffeekraken/sugar/string';
export const DEFAULT_PROPS = __SSliderComponentInterface.defaults();
export const metas = {
    interface: __SSliderComponentInterface,
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
export default class SSlider extends HTMLElement {
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
                    self.state._component.injectStyleInShadowRoot([__css, ...((_a = self.props.cssDeps) !== null && _a !== void 0 ? _a : [])], self._$container);
                }
                catch (e) {
                    console.log(e);
                }
                self.state._behaviors = {
                    default({ fromSlideId, toSlideId }) {
                        const $slidesWrapper = self._$slides;
                        $slidesWrapper._isScrollingFromNextOrPrevious = false;
                        if (!$slidesWrapper._isBehaviorInited) {
                            $slidesWrapper._isBehaviorInited = true;
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
                                        const stats = __elementAreaStats($slide, {
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
                                    self.state.goTo(self.state.getSlideIdByElement($inViewSlide));
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
                        __easeInterval(self.props.transitionDuration, (percentage) => {
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
            'id',
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
        const defaultProps = __SComponent.getDefaultProps(this.tagName.toLowerCase());
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
      
          <template data-el="show-s-slider-2">
            <div class="s-slider__controls">
              <div data-el="div-s-slider-7">
                <div class="s-slider__controls-previous-arrow"></div>
              </div>
      
              <div data-el="div-s-slider-8">
                <div class="s-slider__controls-next-arrow"></div>
              </div>
            </div>
          </template>
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
        var _a;
        // onMount
        __SSliderComponentInterface;
        this.state._id = (_a = this.props.id) !== null && _a !== void 0 ? _a : `s-slider-${__uniqid()}`;
        this.update();
        this.state._component = new __SComponent('s-slider', {
            id: this.props.id,
            bare: false,
        });
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
            el.className = (_a = this.state._component) === null || _a === void 0 ? void 0 : _a.className('_root');
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
            const whenCondition = this.state._slideElements.length && this.props.nav;
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
            .querySelectorAll("[data-el='show-s-slider-2']")
            .forEach((el) => {
            const whenCondition = this.props.controls;
            if (whenCondition) {
                this.showContent(el);
            }
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
export function define(props = {}, tagName = 's-slider') {
    __SComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, class SSliderComponent extends SSlider {
    });
}
if (!metas.type) {
    metas.type = 'webcomponent';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNRQSxPQUFPLEtBQUssTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRCxPQUFPLDJCQUEyQixNQUFNLHdEQUF3RCxDQUFDO0FBQ2pHLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3BFLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRztJQUNqQixTQUFTLEVBQUUsMkJBQTJCO0lBQ3RDLE9BQU8sRUFBRTs7Ozs7Ozs7Ozs7O0tBWVI7Q0FDSixDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQVEsU0FBUSxXQUFXO0lBQzVDLElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLElBQUksR0FBRyxJQUFJ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