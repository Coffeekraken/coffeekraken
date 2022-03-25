var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SSliderComponent_exports = {};
__export(SSliderComponent_exports, {
  default: () => SSlider,
  define: () => define
});
module.exports = __toCommonJS(SSliderComponent_exports);
var import_SSliderBehavior = __toESM(require("./SSliderBehavior"));
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"));
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_component_utils = __toESM(require("@coffeekraken/s-component-utils"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_lit = require("lit");
var import_s_slider_component = __toESM(require("../css/s-slider-component.css"));
var import_SSliderComponentInterface = __toESM(require("./interface/SSliderComponentInterface"));
var import_getTranslateProperties = __toESM(require("@coffeekraken/sugar/js/dom/style/getTranslateProperties"));
var import_easeInterval = __toESM(require("@coffeekraken/sugar/shared/function/easeInterval"));
var import_parse = __toESM(require("@coffeekraken/sugar/shared/string/parse"));
var import_class = __toESM(require("@coffeekraken/sugar/shared/is/class"));
var import_onSwipe = __toESM(require("@coffeekraken/sugar/js/dom/detect/onSwipe"));
console.log("plop");
class SSlider extends import_s_lit_component.default {
  constructor() {
    var _a, _b;
    console.log("SSS___Y");
    super((0, import_deepMerge.default)({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: import_s_interface.default.mix(import_SSliderComponentInterface.default, (_b = (_a = import_s_component_utils.default.getDefaultProps("s-slider").behavior) == null ? void 0 : _a.interface) != null ? _b : {})
      }
    }));
    this.$slides = [];
    this.$navs = [];
    this._currentSlideIdx = 0;
    this._timer = {
      total: 0,
      current: 0,
      percentage: 0
    };
    this._playing = true;
  }
  static get properties() {
    return import_s_lit_component.default.properties({}, import_SSliderComponentInterface.default);
  }
  static get styles() {
    return import_lit.css`
            ${(0, import_lit.unsafeCSS)(`
                ${import_s_slider_component.default}
            `)}
        `;
  }
  async firstUpdated() {
    var _a, _b, _c, _d, _e;
    this.$root = this.querySelector(`.${this.componentUtils.className("")}`);
    this.$slidesWrapper = this.querySelector(`.${this.componentUtils.className("__slides-wrapper")}`);
    this.$slidesContainer = this.querySelector(`.${this.componentUtils.className("__slides")}`);
    this.$slides = this.querySelectorAll("[s-slider-slide]");
    this.$slides.forEach(($item) => {
      $item.classList.add(this.componentUtils.className("__slide"));
    });
    this._initNavigation();
    if (this.props.behavior) {
      if (typeof this.props.behavior === "string") {
        let behavior;
        for (let [behaviorId, behaviorObj] of Object.entries(this.props.availableBehaviors)) {
          const id = (_b = (_a = behaviorObj.class) == null ? void 0 : _a.id) != null ? _b : behaviorObj.id;
          if (id === this.props.behavior) {
            behavior = behaviorObj;
            break;
          }
        }
        if (!behavior) {
          throw new Error(`The behavior "${this.props.behavior}" is not available`);
        }
        if (!behavior.class) {
          throw new Error(`The behavior "${this.props.behavior}" is not valid. You must provide the "<yellow>class</yellow>" property and an optional "<yellow>settings</yellow>" one...`);
        }
        this.behavior = new behavior.class((_c = behavior.settings) != null ? _c : {});
      } else if ((0, import_class.default)(this.props.behavior)) {
        this.behavior = new this.props.behavior({});
      } else if (this.props.behavior instanceof import_SSliderBehavior.default) {
        this.behavior = this.props.behavior;
      } else {
        throw new Error(`Invalid behavior type, must be a string, an SSliderBehavior extended class or an SSliderBehavior instance`);
      }
      this.behavior.$slider = this;
      (_e = (_d = this.behavior).firstUpdated) == null ? void 0 : _e.call(_d);
    }
    this.props.intersectionClasses && this._handleIntersections();
    this.props.mousewheel && this._handleMousewheel();
    this.props.clickOnSlide && this._handleClickOnSlide();
    this.props.swipe && this._handleSwipe();
    if (this.props.autoplay && this.props.timer) {
      this.play();
    }
  }
  _handleSwipe() {
    (0, import_onSwipe.default)(this.$root, (swipe) => {
      if (this.props.direction === "horizontal") {
        if (swipe.left) {
          this.next();
        } else if (swipe.right) {
          this.previous();
        }
      } else if (this.props.direction === "vertical") {
        if (swipe.top) {
          this.next();
        } else if (swipe.down) {
          this.previous();
        }
      }
    });
  }
  _initNavigation() {
    this.$navs = this.querySelectorAll("[s-slider-nav]");
    if (!this.$navs.length && this.props.nav) {
      Array(this.$slides.length).fill().forEach((v, i) => {
        const $nav = document.createElement("div");
        $nav.setAttribute("s-slider-nav", i);
        this.appendChild($nav);
      });
      this.$navs = this.querySelectorAll("[s-slider-nav]");
    }
    this.requestUpdate();
  }
  _handleMousewheel() {
    this.addEventListener("wheel", (e) => {
      if (e.deltaY < 0) {
        this.previous();
      } else if (e.deltaY > 0) {
        this.next();
      }
    });
  }
  _handleClickOnSlide() {
    this.$slidesContainer.addEventListener("click", (e) => {
      for (let [i, $slide] of this.$slides.entries()) {
        if ($slide.contains(e.target) || $slide === e.target) {
          this.goTo($slide);
        }
      }
    });
  }
  _handleIntersections() {
    var _a;
    (_a = this.$slides) == null ? void 0 : _a.forEach(($slide) => {
      function buildThresholdList() {
        let thresholds = [];
        let numSteps = 10;
        for (let i = 1; i <= numSteps; i++) {
          let ratio = i / numSteps;
          thresholds.push(ratio);
        }
        thresholds.push(0);
        return thresholds;
      }
      function handleIntersect(entries, observer2) {
        let highestRatio = 0;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
          }
        });
        [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].forEach((threshold, idx) => {
          if (highestRatio >= threshold) {
            $slide.classList.add(`in-${threshold * 100}`);
          } else {
            $slide.classList.remove(`in-${threshold * 100}`);
          }
        });
      }
      let observer;
      let options = {
        root: this.$root,
        rootMargin: "0px",
        threshold: buildThresholdList()
      };
      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe($slide);
    });
  }
  _dispatch(name, detail = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
  }
  requestUpdate() {
    var _a;
    super.requestUpdate();
    (_a = this.$slides) == null ? void 0 : _a.forEach(($slide, i) => {
      if (i === this.currentSlideIdx)
        $slide.classList.add("active");
      else
        $slide.classList.remove("active");
    });
  }
  isLast() {
    return this.currentSlideIdx >= this.$slides.length - 1;
  }
  isFirst() {
    return this.currentSlideIdx <= 0;
  }
  getCurrentSlideIdx() {
    return this._currentSlideIdx;
  }
  setCurrentSlideByIdx(idx) {
    this._currentSlideIdx = idx;
    this.requestUpdate();
  }
  setCurrentSlide(idIdxOrElement) {
    const slide = this.getSlide(idIdxOrElement);
    this.setCurrentSlideByIdx(slide.idx);
    return this;
  }
  get currentSlideIdx() {
    return this.getCurrentSlideIdx();
  }
  getCurrentSlideElement() {
    return this.$slides[this._currentSlideIdx];
  }
  get currentSlideElement() {
    return this.getCurrentSlideElement();
  }
  getNextSlideIdx() {
    const nextSlideIdx = this._currentSlideIdx + 1;
    if (nextSlideIdx >= this.$slides.length - 1)
      return this.$slides.length - 1;
    return nextSlideIdx;
  }
  get nextSlideIdx() {
    return this.getNextSlideIdx();
  }
  getNextSlideElement() {
    return this.$slides[this.getNextSlideIdx()];
  }
  get nextSlideElement() {
    return this.getNextSlideElement();
  }
  getPreviousSlideIdx() {
    const previousSlideIdx = this._currentSlideIdx - 1;
    if (previousSlideIdx <= 0)
      return 0;
    return previousSlideIdx;
  }
  get previousSlideIdx() {
    return this.getPreviousSlideIdx();
  }
  getPreviousSlideElement() {
    return this.$slides[this.getPreviousSlideIdx()];
  }
  get previousSlideItem() {
    return this.$slides[this.getPreviousSlideIdx()];
  }
  getSlideIdxById(id) {
    for (let i = 0; i < this.$slides.length; i++) {
      if (this.$slides[i].getAttribute("s-slider-slide") === id)
        return i;
    }
  }
  getSlideElementByIdx(idx) {
    return this.$slides[idx];
  }
  getCurrentSlide() {
    return this.getSlide(this.currentSlideIdx);
  }
  get currentSlide() {
    return this.getCurrentSlide();
  }
  getSlide(idIdxOrElement) {
    var _a, _b;
    let $slide, id, idx, timer;
    if (idIdxOrElement instanceof HTMLElement) {
      const id2 = idIdxOrElement.getAttribute("s-slider-slide");
      if (id2)
        return this.getSlide(id2);
      return this.getSlide(Array.from(this.$slides).indexOf(idIdxOrElement));
    } else if (typeof idIdxOrElement === "number") {
      idx = idIdxOrElement;
      $slide = this.getSlideElementByIdx(idx);
      id = $slide.getAttribute("s-slider-slide");
      timer = $slide._sSliderComponentTimer;
      if (!timer) {
        timer = {
          total: (_a = $slide.getAttribute("timer")) != null ? _a : this.props.timer,
          current: 0,
          percentage: 0
        };
        $slide._sSliderComponentTimer = timer;
      }
    } else if (typeof idIdxOrElement === "string") {
      idx = this.getSlideIdxById(idIdxOrElement);
      id = idIdxOrElement;
      $slide = this.getSlideElementByIdx(idx);
      timer = $slide._sSliderComponentTimer;
      if (!timer) {
        timer = {
          total: (_b = $slide.getAttribute("timer")) != null ? _b : this.props.timer,
          current: 0,
          percentage: 0
        };
        $slide._sSliderComponentTimer = timer;
      }
    }
    if (!$slide)
      return;
    return {
      id,
      idx,
      $slide,
      timer
    };
  }
  getFirstSlide() {
    return this.getSlide(0);
  }
  getLastSlide() {
    return this.getSlide(this.$slides.length - 1);
  }
  async goTo(slideIdIdxOrElement, userAction = true) {
    const nextSlide = this.getSlide(slideIdIdxOrElement);
    if (!nextSlide || nextSlide.idx === this.currentSlide.idx)
      return;
    const currentSlide = this.getCurrentSlide();
    this._currentSlideIdx = nextSlide.idx;
    this._dispatch("s-slider-goto", {
      currentSlide,
      nextSlide
    });
    await this._transitionHandler(currentSlide.$side, nextSlide.$slide);
    this._dispatch("s-slider-goto-end", {
      currentSlide,
      nextSlide
    });
    this.requestUpdate();
    if (this.isPlaying()) {
      this._playSlide(this.currentSlideIdx);
    }
    return this;
  }
  next(userAction) {
    if (this.props.loop && this.isLast()) {
      return this.goTo(0, userAction);
    }
    return this.goTo(this.nextSlideIdx, userAction);
  }
  previous(userAction) {
    if (this.props.loop && this.isFirst()) {
      return this.goTo(this.getLastSlide().id, userAction);
    }
    return this.goTo(this.getPreviousSlideIdx(), userAction);
  }
  getTimer(slideIdIdxOrElement) {
    var _a;
    if (!slideIdIdxOrElement) {
      let total = 0, current = 0;
      for (let i = 0; i < this.$slides.length; i++) {
        const slide2 = this.getSlide(i);
        if (i < this.currentSlideIdx) {
          current += slide2.timer.total;
        } else if (i === this.currentSlideIdx) {
          current += slide2.timer.current;
        }
        total += (_a = slide2.timer.total) != null ? _a : 0;
      }
      this._timer.total = total;
      this._timer.current = current;
      this._timer.percentage = Math.round(100 / total * current);
      return this._timer;
    }
    const slide = this.getSlide(slideIdIdxOrElement);
    return slide.timer;
  }
  isPlaying() {
    if (!this._playing)
      return false;
    return this.props.timer !== void 0;
  }
  play() {
    if (!this.props.timer)
      return;
    this._playing = true;
    this._playSlide(this.currentSlide.idx);
    return this;
  }
  stop() {
    this._playing = false;
    return this;
  }
  _playSlide(idIdxOrElement) {
    const slide = this.getSlide(idIdxOrElement);
    if (!slide || !slide.timer)
      return;
    const interval = 100;
    let elapsed = 0;
    const slideInterval = setInterval(() => {
      if (!this.isPlaying())
        return;
      elapsed += interval;
      slide.timer.current = elapsed;
      slide.timer.percentage = 100 / slide.timer.total * elapsed;
      this.requestUpdate();
      if (elapsed >= slide.timer.total) {
        clearInterval(slideInterval);
        slide.timer.current = 0;
        slide.timer.percentage = 0;
        this.next(false);
      }
    }, interval);
    return this;
  }
  _transitionHandler($from, $to) {
    const $slideableItem = this.$slidesWrapper.children[0];
    const translates = (0, import_getTranslateProperties.default)($slideableItem);
    if (this.props.transitionHandler) {
      this.props.transitionHandler($from, $to);
      return;
    }
    const nextBounds = $to.getBoundingClientRect();
    const sliderBounds = this.$slidesWrapper.getBoundingClientRect();
    const deltaX = nextBounds.left - sliderBounds.left, deltaY = nextBounds.top - sliderBounds.top;
    (0, import_easeInterval.default)(this.props.transitionDuration, (percent) => {
      if (this.props.direction === "horizontal") {
        const computedDelta = translates.x + deltaX / 100 * percent * -1;
        $slideableItem.style.transform = `translateX(${computedDelta}px)`;
      } else {
        const computedDelta = translates.y + deltaY / 100 * percent * -1;
        $slideableItem.style.transform = `translateY(${computedDelta}px)`;
      }
    }, {
      easing: this.props.transitionEasing
    });
    this.requestUpdate();
  }
  render() {
    var _a;
    let slide;
    try {
      slide = this.getCurrentSlide();
    } catch (e) {
    }
    return import_lit.html`
            <div
                class="${this.componentUtils.className("")}"
                behavior="${(_a = this.props.behavior) == null ? void 0 : _a.id}"
                style="
                    --s-slider-slide: ${this.currentSlideIdx};
                    --s-slider-total: ${this.$slides.length};
                    ${slide ? `
                        --s-slider-slide-timer-total: ${slide.timer.total / 1e3}s;
                    ` : ""}
                "
            >
                <div
                    class="${this.componentUtils.className("__slides-wrapper")}"
                >
                    <div class="${this.componentUtils.className("__slides")}">
                        ${Array.from(this.$slides).map(($slide, idx) => {
      return $slide;
    })}
                    </div>
                </div>
                ${this.props.progress ? import_lit.html`
                          <div
                              class="${this.componentUtils.className("__progress")}"
                          >
                              <div
                                  class="${this.componentUtils.className("__progress-bar")}"
                              ></div>
                          </div>
                      ` : ""}
                <div class="${this.componentUtils.className("__nav")}">
                    ${Array.from(this.$navs).map(($nav, idx) => {
      if (!$nav._navInited) {
        $nav.addEventListener("click", (e) => {
          var _a2;
          e.preventDefault();
          this.goTo((_a2 = (0, import_parse.default)(e.target.getAttribute("s-slider-nav"))) != null ? _a2 : idx);
        });
        $nav._navInited = true;
      }
      if ($nav.getAttribute("s-slider-nav")) {
        const id = (0, import_parse.default)($nav.getAttribute("s-slider-nav"));
        if (id === this.getCurrentSlide().id || id === this.getCurrentSlide().idx)
          $nav.classList.add("active");
        else
          $nav.classList.remove("active");
      } else {
        if (this.currentSlideIdx === idx)
          $nav.classList.add("active");
        else
          $nav.classList.remove("active");
      }
      return $nav;
    })}
                </div>
                ${this.props.controls ? import_lit.html`
                          <div
                              class="${this.componentUtils.className("__controls")}"
                          >
                              <div
                                  class="${this.componentUtils.className("__controls-previous")} ${this.isFirst() && !this.props.loop ? "" : "active"}"
                                  @click=${() => this.previous()}
                              >
                                  ${this.props.previousIconClass ? import_lit.html`
                                            <i
                                                class="${this.props.previousIconClass}"
                                            ></i>
                                        ` : import_lit.html`<div
                                            class="${this.componentUtils.className("__controls-previous-arrow")}"
                                        ></div>`}
                              </div>
                              <div
                                  class="${this.componentUtils.className("__controls-next")} ${this.isLast() && !this.props.loop ? "" : "active"}"
                                  @click=${() => this.next()}
                              >
                                  ${this.props.nextIconClass ? import_lit.html`
                                            <i
                                                class="${this.props.nextIconClass}"
                                            ></i>
                                        ` : import_lit.html`<div
                                            class="${this.componentUtils.className("__controls-next-arrow")}"
                                        ></div>`}
                              </div>
                          </div>
                      ` : ""}
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-slider") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, SSlider);
}
