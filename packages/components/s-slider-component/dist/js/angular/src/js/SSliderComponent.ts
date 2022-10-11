import { Component, ViewChild, ElementRef, Input } from "@angular/core";

/**
 * @name                SSliderComponent
 * @as                  Slider
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSliderComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-slider
 * @platform            html
 * @status              beta
 *
 * This component specify a range with some additional features than the native one like
 * displaying the value automatically in tooltip or inline.
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event           s-slider.goto                    Dispatched just before the transitionn
 * @event           s-slider.goto-end                Dispatched just after the transition
 * @event           s-slider.next                       Dispatched just before the transition to the next slide
 * @event           s-slider.previous                       Dispatched just before the transition to the previous slide
 * @event           s-slider.play                        Dispatched when the slider is set to play
 * @event           s-slider.stop                        Dispatched when the slider is set to stop
 * @event           s-slider                       Dispatched for every events of this component. Check the detail.eventType prop for event type
 *
 * @feature         Exteremely customizable
 * @feature         Simply controls (next, previous) built-in
 * @feature         Default dots navigation built-in
 * @feature         Custom navigation capabilities built-in
 * @feature         Horizontal and vertical direction built-in
 * @ƒeature         Mousewheel navigation built-in
 * @feature         Swipe navigation built-in
 * @feature         Loop capability built-in
 * @feature         Timer capability built-in
 * @feature         Mousewheel navigation
 * @feature         Custom behavior (extensions) capabilities built-in
 * @feature         Slideable behavior available
 *
 * @install          bash
 * npm i @coffeekraken/s-slider-component
 *
 * @install         js
 * import { define, SSliderSlideableBehavior } from '@coffeekraken/s-slider-component';
 * define({
 *      behaviors: {
 *          slideable: {
 *              class: SSliderSlideableBehavior
 *              settings: {}
 *          }
 *      }
 * });
 *
 * @example         html        Simple slider
 * <s-slider controls nav responsive='{"mobile":{"lnf":"default-contained"}}'>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Slideable slider
 * <s-slider behavior="slideable" controls nav id="coco">
 *      <responsive media="tablet" lnf="default-contained"></responsive>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:lead">Click and drag</p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Tight slider
 * <s-slider behavior="slideable" lnf="default-tight" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Contained slider
 * <s-slider behavior="slideable" lnf="default-contained" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Vertical slider
 * <s-slider behavior="slideable" direction="vertical" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Vertical tight slider
 * <s-slider behavior="slideable" direction="vertical" lnf="default-tight" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Vertical contained slider
 * <s-slider behavior="slideable" direction="vertical" lnf="default-contained" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Slider with progressbar
 * <s-slider behavior="slideable" progress controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Slider with progressbar, loop and timer
 * <s-slider behavior="slideable" progress loop controls nav timer="2500">
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
type Props = {
  id: string;
  lnf: "none" | "default";
  direction: "horizontal" | "vertical";
  behaviors: Record<string, any>;
  behavior: "none" | "default";
  nextIconClass: string;
  previousIconClass: string;
  controls: boolean;
  nav: boolean;
  swipe: boolean;
  mousewheel: boolean;
  clickOnSlide: boolean;
  loop: boolean;
  slide: number | string;
  progress: boolean;
  timer: number;
  autoplay: boolean;
  intersectionClasses: boolean;
  transitionDuration: number;
  transitionEasing: Function;
  transitionHandler: Function;
  cssDeps: string[];
};

import __SComponent from "@coffeekraken/s-component";
import { __elementAreaStats } from "@coffeekraken/sugar/dom";
import { __easeInterval } from "@coffeekraken/sugar/function";
import { __uniqid } from "@coffeekraken/sugar/string";
import __css from "../../../../../src/css/s-slider-component.css";
import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";
const DEFAULT_PROPS = __SSliderComponentInterface.defaults();

@Component({
  selector: "s",
  template: `
    <div
      [id]="_id"
      #$container
      [class]="_component?.className('', null, 's-bare')"
      [status]="_status"
      [direction]="direction"
      [behavior]="behavior ?? 'default'"
      [lnf]="lnf ?? 'default'"
    >
      <div [class]="_component?.className('__root')" #$root>
        <div [class]="_component?.className('__slides-wrapper')">
          <div #$slides [class]="_component?.className('__slides')">
            <ng-content></ng-content>
          </div>
        </div>

        <ng-container *ngIf="_slideElements.length">
          <div class="s-slider__nav">
            <ng-container *ngFor="let child of _slideElements">
              <div
                [class]="\`s-slider__nav-item \${getSlideIdxByElement(child) == getCurrentSlideIdx() ? 'active' : ''}\`"
              ></div>
            </ng-container>
          </div>
        </ng-container>

        <div class="s-slider__controls">
          <div
            [class]="\`s-slider__controls-previous \${loop || !isFirst() ? 'active' : ''}\`"
            (pointerup)="previous()"
          >
            <div class="s-slider__controls-previous-arrow"></div>
          </div>

          <div
            [class]="\`s-slider__controls-next \${loop || !isLast() ? 'active' : ''}\`"
            (pointerup)="next()"
          >
            <div class="s-slider__controls-next-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class S {
  @Input() cssDeps: Props["cssDeps"];
  @Input() direction: Props["direction"];
  @Input() transitionDuration: Props["transitionDuration"];
  @Input() transitionEasing: Props["transitionEasing"];
  @Input() slide: Props["slide"];
  @Input() loop: Props["loop"];
  @Input() behaviors: Props["behaviors"];
  @Input() behavior: Props["behavior"];
  @Input() lnf: Props["lnf"];
  @Input() controls: Props["controls"];
  @Input() nav: Props["nav"];
  @Input() swipe: Props["swipe"];
  @Input() mousewheel: Props["mousewheel"];
  @Input() clickOnSlide: Props["clickOnSlide"];

  @ViewChild("$container") $container: ElementRef;
  @ViewChild("$root") $root: ElementRef;
  @ViewChild("$slides") $slides: ElementRef;

  _status = "idle";
  _id = null;
  _currentSlideId = null;
  _component = null;
  _behaviors = {};
  _slideElements = [];
  _slidesIds = [];
  mount() {
    try {
      this._component.injectStyleInShadowRoot(
        [__css, ...(this.cssDeps ?? [])],
        this.$container.nativeElement
      );
    } catch (e) {}

    this._behaviors = {
      default({ fromSlideId, toSlideId }) {
        const $slidesWrapper = this.$slides.nativeElement;
        $slidesWrapper._isScrollingFromNextOrPrevious = false;

        if (!$slidesWrapper._isBehaviorInited) {
          $slidesWrapper._isBehaviorInited = true; // const $slideElements = $slides.querySelector('slot');
          // console.log('^slot', slots.assignedNodes());
          // this._slideElements.forEach(($slide) => {
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
          $slidesWrapper.addEventListener("scroll", (e) => {
            if ($slidesWrapper._isScrollingFromNextOrPrevious) {
              return;
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              let $inViewSlide,
                largerPercentage = 0;

              for (let i = 0; i < this._slideElements.length; i++) {
                const $slide = this._slideElements[i];

                const stats = __elementAreaStats($slide, {
                  relativeTo: $slidesWrapper,
                });

                if (stats.percentageX + stats.percentageY > largerPercentage) {
                  largerPercentage = stats.percentageX + stats.percentageY;
                  $inViewSlide = $slide;
                }
              }

              this.goTo(this.getSlideIdByElement($inViewSlide)); // console.log($inViewSlide);
            }, 100);
          });
        }

        const $from = this.getSlideElementById(fromSlideId),
          $to = this.getSlideElementById(toSlideId);
        const fromRect = $from.getBoundingClientRect(),
          toRect = $to.getBoundingClientRect(),
          parentRect = $slidesWrapper.getBoundingClientRect();
        let startX = $slidesWrapper.scrollLeft,
          startY = $slidesWrapper.scrollTop;
        const dist =
          this.direction === "vertical"
            ? toRect.y - parentRect.top
            : toRect.x - parentRect.left; // remove "smooth" from the scroll-behavior css

        const initialScrollBehavior = $slidesWrapper.style.scrollBehavior,
          initialScrollSnapType = $slidesWrapper.style.scrollSnapType;
        $slidesWrapper.style.scrollBehavior = "initial";
        $slidesWrapper.style.scrollSnapType = "initial";
        $slidesWrapper._isScrollingFromNextOrPrevious = true;

        __easeInterval(
          this.transitionDuration,
          (percentage) => {
            const offset = (dist / 100) * percentage;

            if (this.direction === "vertical") {
              $slidesWrapper.scrollTop = startY + offset;
            } else {
              $slidesWrapper.scrollLeft = startX + offset;
            }
          },
          {
            easing: this.transitionEasing,

            onEnd() {
              $slidesWrapper.style.scrollBehavior = initialScrollBehavior;
              $slidesWrapper.style.scrollSnapType = initialScrollSnapType;
              $slidesWrapper._isScrollingFromNextOrPrevious = false;
            },
          }
        );
      },
    }; // get all the slides elements

    this._slideElements = Array.from(
      document.querySelectorAll("[s-slider-slide]")
    ); // set all the slides ids

    this._slidesIds = this._slideElements.map(($slide, i) => {
      return $slide.hasAttribute("id") ? $slide.id : i;
    }); // activate the correct slide first

    if (this.slide) {
      this._currentSlideId = this.slide;
    } else {
      this._currentSlideId = this._slidesIds[0];
    }

    this.goTo(this._currentSlideId);
  }
  getSlideIdByElement($slide) {
    const idx = this._slideElements.indexOf($slide);

    if (idx === -1) {
      return;
    }

    return this._slidesIds[idx];
  }
  getSlideIdxByElement($slide) {
    return this.getSlideIdxById(this.getSlideIdByElement($slide));
  }
  getSlideElementById(id) {
    const slideIdx = this._slidesIds.indexOf(id);

    return this._slideElements[slideIdx];
  }
  getSlideIdxById(id) {
    return this._slidesIds.indexOf(id);
  }
  getFirstSlideId() {
    return this._slidesIds[0];
  }
  getLastSlideId() {
    return this._slidesIds[this._slidesIds.length - 1];
  }
  getPreviousSlideId() {
    const currentSlideIdx = this.getCurrentSlideIdx();

    if (currentSlideIdx > 0) {
      return this._slidesIds[currentSlideIdx - 1];
    }

    return this.getLastSlideId();
  }
  getNextSlideId() {
    const currentSlideIdx = this.getCurrentSlideIdx();

    if (currentSlideIdx < this._slidesIds.length) {
      return this._slidesIds[currentSlideIdx + 1];
    }

    return this.getFirstSlideId();
  }
  getCurrentSlideIdx() {
    return this.getSlideIdxById(this._currentSlideId);
  }
  isLast() {
    return this._currentSlideId === this.getLastSlideId();
  }
  isFirst() {
    return this._currentSlideId === this.getFirstSlideId();
  }
  previous() {
    if (!this.loop && this.isFirst()) {
      return;
    }

    this.goTo(this.getPreviousSlideId());
  }
  next() {
    if (!this.loop && this.isLast()) {
      return;
    }

    this.goTo(this.getNextSlideId());
  }
  goTo(slideId) {
    // call the behavior
    const behaviorFn =
      this.behaviors?.[this.behavior] ?? this._behaviors[this.behavior];
    behaviorFn?.({
      fromSlideId: this._currentSlideId,
      toSlideId: slideId,
      component: this._component,
      getSlideElementById: this.getSlideElementById,
      getSlideIdxById: this.getSlideIdxById,
      getFirstSlideId: this.getFirstSlideId,
      getLastSlideId: this.getLastSlideId,
      isLast: this.isLast,
      isFirst: this.isFirst,
    }); // assign the new state current slide id

    this._currentSlideId = slideId;
  }

  ngOnInit() {
    __SSliderComponentInterface;
    this._component = new __SComponent("s-slider", {
      bare: false,
    });
    this._id = `s-slider-${__uniqid()}`;
    this.mount();
    this._status = "mounted";
  }

  ngAfterContentChecked() {
    this.$root.nativeElement.style.setProperty(
      "--s-slider-slide",
      this.getCurrentSlideIdx()
    );
    this.$root.nativeElement.style.setProperty(
      "--s-slider-total",
      this._slidesIds.length
    );
  }
}
