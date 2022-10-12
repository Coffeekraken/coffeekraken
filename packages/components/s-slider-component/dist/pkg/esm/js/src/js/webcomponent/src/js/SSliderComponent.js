import __SComponent from '@coffeekraken/s-component';
import { __elementAreaStats } from '@coffeekraken/sugar/dom';
import { __easeInterval } from '@coffeekraken/sugar/function';
import { __uniqid } from '@coffeekraken/sugar/string';
import __css from '../../../../../src/css/s-slider-component.css';
import __SSliderComponentInterface from '../../../../../src/js/interface/SSLiderComponentInterface';
const DEFAULT_PROPS = __SSliderComponentInterface.defaults();
/**
 * Usage:
 *
 *  <s></s>
 *
 */
export default class S extends HTMLElement {
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
                    self.state._component.injectStyleInShadowRoot([__css, ...((_a = self.props.cssDeps) !== null && _a !== void 0 ? _a : [])], self._$container);
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
        __SSliderComponentInterface;
        this.state._component = new __SComponent('s-slider', {
            bare: false,
        });
        this.update();
        this.state._id = `s-slider-${__uniqid()}`;
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
export function define(props = {}, tagName = 's') {
    __SComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, class SComponent extends S {
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNRQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sS0FBSyxNQUFNLCtDQUErQyxDQUFDO0FBQ2xFLE9BQU8sMkJBQTJCLE1BQU0sMkRBQTJELENBQUM7QUFDcEcsTUFBTSxhQUFhLEdBQUcsMkJBQTJCLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFN0Q7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLENBQUUsU0FBUSxXQUFXO0lBQ3RDLElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE9BQU8sRUFBRSxNQUFNO1lBQ2YsR0FBRyxFQUFFLElBQUk7WUFDVCxlQUFlLEVBQUUsSUFBSTtZQUNyQixVQUFVLEVBQUUsSUFBSTtZQUNoQixVQUFVLEVBQUUsRUFBRTtZQUNkLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsS0FBSzs7Z0JBQ0QsSUFBSTtvQkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FDekMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ3RDLElBQUksQ0FBQyxXQUFXLENBQ25CLENBQUM7aUJBQ0w7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtnQkFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRztvQkFDcEIsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRTt3QkFDOUIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDckMsY0FBYyxDQUFDLDhCQUE4QixHQUFHLEtBQUssQ0FBQzt3QkFFdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRTs0QkFDbkMsY0FBYyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxDQUFDLHdEQUF3RDs0QkFDakcsK0NBQStDOzRCQUMvQyxrREFBa0Q7NEJBQ2xELGlEQUFpRDs0QkFDakQsbUNBQW1DOzRCQUNuQyxpREFBaUQ7NEJBQ2pELGFBQWE7NEJBQ2IsWUFBWTs0QkFDWix1Q0FBdUM7NEJBQ3ZDLGFBQWE7NEJBQ2IsU0FBUzs0QkFDVCxtQ0FBbUM7NEJBQ25DLGdDQUFnQzs0QkFDaEMsTUFBTTs0QkFFTixJQUFJLGFBQWEsQ0FBQzs0QkFDbEIsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dDQUM1QyxJQUNJLGNBQWMsQ0FBQyw4QkFBOEIsRUFDL0M7b0NBQ0UsT0FBTztpQ0FDVjtnQ0FFRCxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7Z0NBQzVCLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO29DQUM1QixJQUFJLFlBQVksRUFDWixnQkFBZ0IsR0FBRyxDQUFDLENBQUM7b0NBRXpCLEtBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNULENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQ3BDLENBQUMsRUFBRSxFQUNMO3dDQUNFLE1BQU0sTUFBTSxHQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUVqQyxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FDNUIsTUFBTSxFQUNOOzRDQUNJLFVBQVUsRUFBRSxjQUFjO3lDQUM3QixDQUNKLENBQUM7d0NBRUYsSUFDSSxLQUFLLENBQUMsV0FBVzs0Q0FDYixLQUFLLENBQUMsV0FBVzs0Q0FDckIsZ0JBQWdCLEVBQ2xCOzRDQUNFLGdCQUFnQjtnREFDWixLQUFLLENBQUMsV0FBVztvREFDakIsS0FBSyxDQUFDLFdBQVcsQ0FBQzs0Q0FDdEIsWUFBWSxHQUFHLE1BQU0sQ0FBQzt5Q0FDekI7cUNBQ0o7b0NBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FDMUIsWUFBWSxDQUNmLENBQ0osQ0FBQyxDQUFDLDZCQUE2QjtnQ0FDcEMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzRCQUNaLENBQUMsQ0FBQyxDQUFDO3lCQUNOO3dCQUVELE1BQU0sS0FBSyxHQUNILElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEVBQy9DLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMscUJBQXFCLEVBQUUsRUFDMUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxFQUNwQyxVQUFVLEdBQUcsY0FBYyxDQUFDLHFCQUFxQixFQUFFLENBQUM7d0JBQ3hELElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxVQUFVLEVBQ2xDLE1BQU0sR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO3dCQUN0QyxNQUFNLElBQUksR0FDTixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVOzRCQUMvQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRzs0QkFDM0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLCtDQUErQzt3QkFFckYsTUFBTSxxQkFBcUIsR0FDbkIsY0FBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQ3ZDLHFCQUFxQixHQUNqQixjQUFjLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQzt3QkFDNUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO3dCQUNoRCxjQUFjLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7d0JBQ2hELGNBQWMsQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUM7d0JBRXJELGNBQWMsQ0FDVixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUM3QixDQUFDLFVBQVUsRUFBRSxFQUFFOzRCQUNYLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQzs0QkFFekMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7Z0NBQ3JDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQzs2QkFDOUM7aUNBQU07Z0NBQ0gsY0FBYyxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDOzZCQUMvQzt3QkFDTCxDQUFDLEVBQ0Q7NEJBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCOzRCQUVuQyxLQUFLO2dDQUNELGNBQWMsQ0FBQyxLQUFLLENBQUMsY0FBYztvQ0FDL0IscUJBQXFCLENBQUM7Z0NBQzFCLGNBQWMsQ0FBQyxLQUFLLENBQUMsY0FBYztvQ0FDL0IscUJBQXFCLENBQUM7Z0NBQzFCLGNBQWMsQ0FBQyw4QkFBOEI7b0NBQ3pDLEtBQUssQ0FBQzs0QkFDZCxDQUFDO3lCQUNKLENBQ0osQ0FBQztvQkFDTixDQUFDO2lCQUNKLENBQUMsQ0FBQyw4QkFBOEI7Z0JBRWpDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNsQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FDaEQsQ0FBQyxDQUFDLHlCQUF5QjtnQkFFNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDakQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ1YsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELENBQUMsQ0FDSixDQUFDLENBQUMsbUNBQW1DO2dCQUV0QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBRWQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDakI7Z0JBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBQ0QsbUJBQW1CLENBQUMsTUFBTTtnQkFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV0RCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDWixPQUFPO2lCQUNWO2dCQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUNELG9CQUFvQixDQUFDLE1BQU07Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQ3pDLENBQUM7WUFDTixDQUFDO1lBQ0QsbUJBQW1CLENBQUMsRUFBRTtnQkFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVuRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFDRCxlQUFlLENBQUMsRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQ0QsZUFBZTtnQkFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFDRCxjQUFjO2dCQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25FLENBQUM7WUFDRCxrQkFBa0I7Z0JBQ2QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUV4RCxJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQUU7b0JBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDtnQkFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkMsQ0FBQztZQUNELGNBQWM7Z0JBQ1YsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUV4RCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7b0JBQ2hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDtnQkFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEMsQ0FBQztZQUNELGtCQUFrQjtnQkFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELE1BQU07Z0JBQ0YsT0FBTyxDQUNILElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQzdELENBQUM7WUFDTixDQUFDO1lBQ0QsT0FBTztnQkFDSCxPQUFPLENBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FDOUQsQ0FBQztZQUNOLENBQUM7WUFDRCxRQUFRO2dCQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUMxQyxPQUFPO2lCQUNWO2dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELENBQUM7WUFDRCxJQUFJO2dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUN6QyxPQUFPO2lCQUNWO2dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBQ0QsSUFBSSxDQUFDLE9BQU87O2dCQUNSLG9CQUFvQjtnQkFDcEIsTUFBTSxVQUFVLEdBQ1osTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUywwQ0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxtQ0FDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFHO29CQUNULFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7b0JBQ3ZDLFNBQVMsRUFBRSxPQUFPO29CQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO29CQUNoQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQjtvQkFDbkQsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZTtvQkFDM0MsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZTtvQkFDM0MsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztvQkFDekMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtvQkFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztpQkFDOUIsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO2dCQUU1QyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixDQUFDO1NBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ2xCLFNBQVM7WUFDVCxXQUFXO1lBQ1gsb0JBQW9CO1lBQ3BCLGtCQUFrQjtZQUNsQixPQUFPO1lBQ1AsTUFBTTtZQUNOLFdBQVc7WUFDWCxVQUFVO1lBQ1YsS0FBSztZQUNMLFVBQVU7WUFDVixLQUFLO1lBQ0wsT0FBTztZQUNQLFlBQVk7WUFDWixjQUFjO1lBQ2QsVUFBVTtTQUNiLENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkIsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUzQixpREFBaUQ7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUM7UUFFRixpREFBaUQ7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUM7UUFFRixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsNERBQTREO1FBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCOztRQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNqQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7d0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO3FCQUNoQztpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FDN0IsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsbUNBQUksWUFBWSxDQUFDLEVBQUUsbUNBQUksYUFBYSxDQUFDLEVBQUUsQ0FBQztRQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDVixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLG1DQUFJLFlBQVksQ0FBQyxHQUFHLG1DQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ2hCLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsbUNBQ3BCLFlBQVksQ0FBQyxTQUFTLG1DQUN0QixhQUFhLENBQUMsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUNoQixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLG1DQUNwQixZQUFZLENBQUMsU0FBUyxtQ0FDdEIsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDZixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLG1DQUNuQixZQUFZLENBQUMsUUFBUSxtQ0FDckIsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7WUFDcEIsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxtQ0FDeEIsWUFBWSxDQUFDLGFBQWEsbUNBQzFCLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7WUFDeEIsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLG1DQUM1QixZQUFZLENBQUMsaUJBQWlCLG1DQUM5QixhQUFhLENBQUMsaUJBQWlCLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQ2YsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FDbkIsWUFBWSxDQUFDLFFBQVEsbUNBQ3JCLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO1lBQ1YsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxtQ0FBSSxZQUFZLENBQUMsR0FBRyxtQ0FBSSxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUNaLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUNBQUksWUFBWSxDQUFDLEtBQUssbUNBQUksYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7WUFDakIsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxtQ0FDckIsWUFBWSxDQUFDLFVBQVUsbUNBQ3ZCLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO1lBQ25CLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksbUNBQ3ZCLFlBQVksQ0FBQyxZQUFZLG1DQUN6QixhQUFhLENBQUMsWUFBWSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUNYLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksbUNBQUksWUFBWSxDQUFDLElBQUksbUNBQUksYUFBYSxDQUFDLElBQUksQ0FBQztRQUMvRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDWixNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLG1DQUFJLFlBQVksQ0FBQyxLQUFLLG1DQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQ2YsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FDbkIsWUFBWSxDQUFDLFFBQVEsbUNBQ3JCLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ1osTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxtQ0FBSSxZQUFZLENBQUMsS0FBSyxtQ0FBSSxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUNmLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsbUNBQ25CLFlBQVksQ0FBQyxRQUFRLG1DQUNyQixhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CO1lBQzFCLE9BQUEsT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixxQ0FDOUIsWUFBWSxDQUFDLG1CQUFtQixxQ0FDaEMsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCO1lBQ3pCLE9BQUEsT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixxQ0FDN0IsWUFBWSxDQUFDLGtCQUFrQixxQ0FDL0IsYUFBYSxDQUFDLGtCQUFrQixDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO1lBQ3ZCLE9BQUEsT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixxQ0FDM0IsWUFBWSxDQUFDLGdCQUFnQixxQ0FDN0IsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO1lBQ3hCLE9BQUEsT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixxQ0FDNUIsWUFBWSxDQUFDLGlCQUFpQixxQ0FDOUIsYUFBYSxDQUFDLGlCQUFpQixDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUNkLE9BQUEsT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8scUNBQUksWUFBWSxDQUFDLE9BQU8scUNBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUV4RSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUEwQmxCLENBQUM7UUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUUxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxFQUFFO1FBQ1YsK0VBQStFO1FBQy9FLDhEQUE4RDtRQUM5RCwrRUFBK0U7UUFDL0UsMENBQTBDO1FBRTFDLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QixJQUFJLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxLQUFLLEVBQUU7Z0JBQ1gsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsT0FBTyxFQUFFO2dCQUNiLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUM5QjtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTztRQUNILFVBQVU7UUFDViwyQkFBMkIsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBQyxVQUFVLEVBQUU7WUFDakQsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxZQUFZLFFBQVEsRUFBRSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDekIsa0JBQWtCLEVBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FDbEMsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDekIsa0JBQWtCLEVBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FDL0IsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtZQUM3QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVELE1BQU07UUFDRixrRkFBa0Y7UUFDbEYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTs7WUFDOUQsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV0QyxFQUFFLENBQUMsU0FBUyxHQUFHLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRXBFLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFOUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVuRCxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxtQ0FBSSxTQUFTLENBQUMsQ0FBQztZQUU5RCxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxtQ0FBSSxTQUFTLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTs7WUFDOUQsRUFBRSxDQUFDLFNBQVMsR0FBRyxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7O1lBQzlELEVBQUUsQ0FBQyxTQUFTLEdBQUcsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7O1lBQzlELEVBQUUsQ0FBQyxTQUFTLEdBQUcsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsMENBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQzdELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUN2RCxJQUFJLGFBQWEsRUFBRTtnQkFDZixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDNUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQzlELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRXpDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsc0JBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUU7Z0JBQzNCLENBQUMsQ0FBQyxRQUFRO2dCQUNWLENBQUMsQ0FBQyxFQUNWLEVBQUUsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQzlELEVBQUUsQ0FBQyxTQUFTLEdBQUcsK0JBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQzFELEVBQUUsQ0FBQztZQUVILEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0QsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUM5RCxFQUFFLENBQUMsU0FBUyxHQUFHLDJCQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUN6RCxFQUFFLENBQUM7WUFFSCxFQUFFLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkJBQTJCO0lBQzNCLGNBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSTtRQUNuQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLEtBQUssRUFBRTtZQUNYLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUNELElBQUksRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE9BQU8sRUFBRTtZQUNiLFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUNqQztRQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxlQUFlO0lBQ2YsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJOztRQUNiLEdBQUc7WUFDQyxJQUFJLEtBQUssR0FBRyxNQUFBLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxLQUFLLDBDQUFHLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSixRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtJQUNuQyxDQUFDO0lBRUQseUJBQXlCO0lBQ3pCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYztRQUMzRCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN4QyxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQ3ZCLElBQUksUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEtBQUssRUFBRTtnQkFDakIsTUFBTSxTQUFTLEdBQUc7b0JBQ2QsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUTt3QkFDdEIsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFOzRCQUNoQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDdkI7d0JBQ0QsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTs0QkFDeEIsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUMvQjt3QkFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEIsQ0FBQztpQkFDSixDQUFDO2dCQUNGLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDNUM7WUFDRCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtvQkFDeEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDM0I7Z0JBQ0QsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUN6QixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7b0JBQzlCLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ2pDO2dCQUNELEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7b0JBQ2xCLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2lCQUMzQjtnQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsR0FBRztJQUM1QyxZQUFZLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLFVBQVcsU0FBUSxDQUFDO0tBQUcsQ0FBQyxDQUFDO0FBQ2xFLENBQUMifQ==