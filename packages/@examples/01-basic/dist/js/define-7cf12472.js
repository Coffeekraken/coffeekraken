import { o as __traverseUp, p as SPromise, S as SInterface, h as SLitComponent, i as css, u as unsafeCSS, c as __deepMerge, q as __uniqid, r as isClass, _ as __querySelectorLive, l as html } from "./index.esm.js";
import { _ as __querySelectorUp } from "./querySelectorUp-ba01e0d2.js";
function __onSwipe(elm, cb, settings = {}) {
  settings = Object.assign({ threshold: 100 }, settings);
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  const gesuredZone = elm;
  gesuredZone.addEventListener("touchstart", function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);
  gesuredZone.addEventListener("touchend", function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesure();
  }, false);
  function handleGesure() {
    const swipeNfo = {
      distanceX: Math.abs(touchendX - touchstartX),
      distanceY: Math.abs(touchendY - touchstartY)
    };
    if (touchendX + settings.threshold < touchstartX) {
      swipeNfo.left = true;
    }
    if (touchendX - settings.threshold > touchstartX) {
      swipeNfo.right = true;
    }
    if (touchendY + settings.threshold < touchstartY) {
      swipeNfo.up = true;
    }
    if (touchendY - settings.threshold > touchstartY) {
      swipeNfo.down = true;
    }
    if (swipeNfo.left || swipeNfo.right || swipeNfo.down || swipeNfo.up) {
      cb(swipeNfo);
    }
  }
}
function scrollTop() {
  return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}
function __scrollLeft() {
  return window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
}
function __elementAreaStats($elm, settings) {
  const finalSettings = Object.assign({ relativeTo: "visible" }, settings !== null && settings !== void 0 ? settings : {});
  if (finalSettings.relativeTo === "visible") {
    finalSettings.relativeTo = __traverseUp($elm, ($item) => {
      const style = window.getComputedStyle($item);
      if (style.overflow === "hidden")
        return $item;
      return false;
    });
  }
  let rootBoundingRect;
  if ((finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.relativeTo) && finalSettings.relativeTo instanceof HTMLElement) {
    rootBoundingRect = finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.relativeTo.getBoundingClientRect();
  } else {
    rootBoundingRect = {
      top: scrollTop(),
      left: __scrollLeft(),
      width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
  }
  const boundingRect = $elm.getBoundingClientRect();
  const left = boundingRect.left - rootBoundingRect.left, top = boundingRect.top - rootBoundingRect.top;
  let percentageX, percentageY;
  if (boundingRect.left + boundingRect.width < rootBoundingRect.left) {
    percentageX = 0;
  } else if (boundingRect.left > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 0;
  } else if (boundingRect.left >= rootBoundingRect.left && boundingRect.left + boundingRect.width <= rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100;
  } else if (boundingRect.left < rootBoundingRect.left && boundingRect.left + boundingRect.width > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * rootBoundingRect.width;
  } else if (boundingRect.left < rootBoundingRect.left && boundingRect.left + boundingRect.width <= rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * (boundingRect.left + boundingRect.width - rootBoundingRect.left);
  } else if (boundingRect.left < rootBoundingRect.left + rootBoundingRect.width && boundingRect.left + boundingRect.width > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * (boundingRect.width - (boundingRect.left + boundingRect.width - (rootBoundingRect.left + rootBoundingRect.width)));
  }
  if (boundingRect.left + boundingRect.height < rootBoundingRect.top) {
    percentageY = 0;
  } else if (boundingRect.top > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 0;
  } else if (boundingRect.top >= rootBoundingRect.top && boundingRect.top + boundingRect.height <= rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100;
  } else if (boundingRect.top < rootBoundingRect.top && boundingRect.top + boundingRect.height > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * rootBoundingRect.height;
  } else if (boundingRect.top < rootBoundingRect.top && boundingRect.top + boundingRect.height <= rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * (boundingRect.top + boundingRect.height - rootBoundingRect.top);
  } else if (boundingRect.top < rootBoundingRect.top + rootBoundingRect.height && boundingRect.top + boundingRect.height > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * (boundingRect.height - (boundingRect.top + boundingRect.height - (rootBoundingRect.top + rootBoundingRect.height)));
  }
  const surfaceX = boundingRect.width / 100 * percentageX, surfaceY = boundingRect.height / 100 * percentageY;
  const percentage = percentageX > 0 && percentageY > 0 ? 100 / 200 * (percentageX + percentageY) : 0;
  return {
    percentage,
    percentageX: percentageY > 0 ? percentageX : 0,
    percentageY: percentageX > 0 ? percentageY : 0,
    centerOffsetX: (rootBoundingRect.width * 0.5 - left - boundingRect.width * 0.5) * -1,
    centerOffsetY: (rootBoundingRect.height * 0.5 - top - boundingRect.height * 0.5) * -1,
    width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
    height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
    left: boundingRect.left,
    relLeft: left,
    top: boundingRect.top,
    relTop: top
  };
}
function __easeOutQuad(t) {
  return t * (2 - t);
}
function __easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}
function __easeInterval(duration, cb, settings = {}) {
  let cleared = false, animationFrame;
  const pro = new SPromise(({ resolve, reject, emit, on }) => {
    settings = Object.assign({ interval: 1e3 / 25, easing: __easeInOutQuart, from: 0, to: 100, onEnd: void 0 }, settings);
    const startTime = Date.now();
    on("cancel", () => {
      cleared = true;
      cancelAnimationFrame(animationFrame);
    });
    function animate() {
      var _a;
      if (cleared)
        return;
      const percent = 100 / duration * (Date.now() - startTime);
      const easedPercent = settings.easing(percent / 100) * 100;
      cb(easedPercent);
      if (percent < 100) {
        if (cleared)
          return;
        animationFrame = requestAnimationFrame(animate);
      } else {
        (_a = settings.onEnd) === null || _a === void 0 ? void 0 : _a.call(settings);
        resolve(easedPercent);
      }
    }
    animate();
  });
  return pro;
}
const __css = `.s-slider {
    display: block;
    font-size: calc(1rem * var(--s-scale, 1) * var(--s-scale-global, 1));
    --s-slider-space: 20px;
}

    .s-slider > .s-slider_root,
    .s-slider > .s-slider_root > .s-slider_slides-wrapper {
        position: relative;
    }

    .s-slider > .s-slider_root,
    .s-slider > .s-slider_root > .s-slider_slides-wrapper,
    .s-slider > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides {
        height: 100%;
        width: 100%;
    }

    .s-slider > .s-slider_root
        > .s-slider_slides-wrapper
        > .s-slider_slides
        > .s-slider_slide {
        position: relative;
    }

    .s-slider[direction='vertical'][pad] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides > .s-slider_pad-start {
                    height: var(--s-slider-pad-start, 0);
                }

    .s-slider[direction='vertical'][pad] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides > .s-slider_pad-end {
                    height: var(--s-slider-pad-end, 0);
                }

    .s-slider[direction='horizontal'][pad] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides > .s-slider_pad-start {
                    width: var(--s-slider-pad-start, 0);
                }

    .s-slider[direction='horizontal'][pad] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides > .s-slider_pad-end {
                    width: var(--s-slider-pad-end, 0);
                }

.s-slider_media-container {
}

.s-slider_media {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
       object-fit: cover;
}

.s-slider_body {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: hsla(calc(var(--s-color-main-h, 0) + var(--s-color-main-background-spin ,0)),calc((var(--s-color-main-s, 0) + var(--s-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-color-main-l, 0) + var(--s-color-main-background-lightness-offset, 0)) * 1%),0.3);
    padding: calc(calc(var(--s-padding-default, 1rem) * var(--s-scale, 1) * var(--s-scale-global, 1)) * 3.5);
    display: flex;
    flex-direction: column;
    gap: calc(var(--s-margin-default, 1rem) * 1.4);
}

.s-slider_title {display: block;font-family: var(--s-font-family-title-font-family, "Roboto"); 
 font-weight: var(--s-font-family-title-font-weight, 500);font-size: calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-80, 4.5) * var(--s-scale, 1) * var(--s-scale-global, 1)));
line-height: 1.3;
max-width: 55ch;
}

@media (max-width: 639px) {

.s-slider_title {font-size: calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-70, 3.2) * var(--s-scale, 1) * var(--s-scale-global, 1)));
}
}

.s-slider_title {
    color: hsla(calc(var(--s-color-accent-h, 0) + var(--s-color-accent-spin ,0)),calc((var(--s-color-accent-s, 0)) * 1%),calc((var(--s-color-accent-l, 0)) * 1%),var(--s-color-accent-a, 1));
}

.s-slider_intro {display: block;font-family: var(--s-font-family-default-font-family, "Roboto"); 
 font-weight: var(--s-font-family-default-font-weight, 400);font-size: calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-40, 1.35) * var(--s-scale, 1) * var(--s-scale-global, 1)));
line-height: 1.6;
max-width: 55ch;
}

@media (max-width: 639px) {

.s-slider_intro {font-size: calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-40, 1.35) * var(--s-scale, 1) * var(--s-scale-global, 1)));
}
}

.s-slider_intro {
    max-width: 100%;
}

.s-slider_text {display: block;font-family: var(--s-font-family-default-font-family, "Roboto"); 
 font-weight: var(--s-font-family-default-font-weight, 400);font-size: calc(var(--s-font-size-default, 16px) * calc(var(--s-font-size-30, 1.1) * var(--s-scale, 1) * var(--s-scale-global, 1)));
line-height: 1.8;
max-width: 55ch;
color: hsla(calc(var(--s-color-main-h, 0) + var(--s-color-main-text-spin ,0)),calc((var(--s-color-main-s, 0) + var(--s-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-color-main-l, 0) + var(--s-color-main-text-lightness-offset, 0)) * 1%),0.7);
    max-width: 100%;
}

.s-slider[behavior='scroll'] > .s-slider_root > .s-slider_slides-wrapper {
            overflow: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;

            /* hide scrollbar */
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

.s-slider[behavior='scroll'] > .s-slider_root > .s-slider_slides-wrapper::-webkit-scrollbar {
                display: none;
            }

.s-slider[behavior='scroll'] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides > .s-slider_slide {
                    scroll-snap-align: center;
                }

.s-slider[behavior='scroll'][direction='vertical'] > .s-slider_root > .s-slider_slides-wrapper {
                overflow-x: hidden;
                overflow-y: auto;
                scroll-snap-type: y mandatory;
            }

.s-slider[lnf^='default'] {
    position: relative;
    --s-slider-space: 20px;
}

.s-slider[lnf^='default']:not([class*='s-ratio']) {
        aspect-ratio: 16/9;
    }

.s-slider[lnf^='default']:not([mounted]) {
        opacity: 0;
    }

.s-slider[lnf^='default'] .s-slider_ui {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 10;
    }

.s-slider[lnf^='default'] .s-slider_ui * {
            pointer-events: all;
        }

.s-slider[lnf^='default'][pad] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides > .s-slider_pad {
                    flex-shrink: 0;
                    flex-grow: 0;
                }

.s-slider[lnf^='default'] > .s-slider_root {
        position: relative;
    }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_slides-wrapper {
            /* position: absolute;
            top: 0;
            left: 0; */
            width: 100%;
            height: 100%;
        }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides {
                display: inline-flex;
                -webkit-user-select: none;
                   -moz-user-select: none;
                        user-select: none;
                height: 100%;
            }

/* white-space: nowrap; */

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides > .s-slider_slide {
                    display: block;
                    flex-shrink: 0;
                    flex-grow: 0;
                    width: 100%;
                    height: 100%;
                    scroll-snap-align: center;

                    /* &:nth-child(1) {
                        background: red;
                        width: 500px !important;
                    }
                    &:nth-child(2) {
                        background: yellow;
                        width: 800px !important;
                    }
                    &:nth-child(3) {
                        background: blue;
                        width: 80vw !important;
                    } */
                }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_nav {
                position: absolute;
                top: calc(100% + var(--s-slider-space));
                left: 50%;
                transform: translate(-50%);
                display: flex;
                gap: calc(var(--s-slider-space) * 0.5);
            }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_nav > * {
                    border-radius: 50%;
                    display: block;
                    width: 0.5em;
                    height: 0.5em;
                    background: currentColor;
                    opacity: 0.2;
                    cursor: pointer;
                }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_nav > *:hover {
                        opacity: 0.5;
                    }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_nav > *.active {
                        opacity: 1;
                    }

.s-slider[lnf^='default'][direction='vertical']
        > .s-slider_root
        > .s-slider_slides-wrapper
        > .s-slider_slides {
        display: block;
        width: 100%;
        height: auto;
    }

.s-slider[lnf^='default'][direction='vertical']
        > .s-slider_root
        > .s-slider_slides-wrapper
        > .s-slider_slides > .s-slider_slide {
            display: block;
            width: 100% !important;

            /* &:nth-child(1) {
                background: red;
                height: 500px !important;
            }
            &:nth-child(2) {
                background: yellow;
                height: 800px !important;
            }
            &:nth-child(3) {
                background: blue;
                height: 400px !important;
            } */
        }

.s-slider[lnf^='default'][lnf$='-contain'] .s-slider_root > .s-slider_ui > .s-slider_nav {
        top: auto;
        bottom: calc(var(--s-slider-space) - 0.5em);
        transform: translate(-50%, -100%);
    }

.s-slider[lnf^='default'][direction='vertical'] .s-slider_root > .s-slider_ui > .s-slider_nav {
        top: 50%;
        left: calc(100% + var(--s-slider-space));
        transform: translate(0, -50%);
        flex-direction: column;
    }

.s-slider[lnf^='default'][lnf$='-contain'][direction='vertical']
        .s-slider_root
        > .s-slider_ui
        > .s-slider_nav {
        bottom: auto;
        left: auto;
        right: calc(var(--s-slider-space));
        transform: translate(0, -50%);
    }

.s-slider[lnf^='default'][lnf$='-tight'][direction='horizontal'][controls] {
        padding-left: calc(var(--s-slider-space) + 1em);
        padding-right: calc(var(--s-slider-space) + 1em);
    }

.s-slider[lnf^='default'][lnf$='-tight'][direction='horizontal'][nav] {
        padding-bottom: calc(var(--s-slider-space) + 1em);
    }

.s-slider[lnf^='default'][lnf$='-tight'][direction='vertical'][controls] {
        padding-top: calc(var(--s-slider-space) + 1em);
        padding-bottom: calc(var(--s-slider-space) + 1em);
    }

.s-slider[lnf^='default'][lnf$='-tight'][direction='vertical'][nav] {
        padding-right: calc(var(--s-slider-space) + 1em);
    }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_progress {
        position: absolute;
        bottom: var(--s-slider-space);
        left: var(--s-slider-space);
        right: var(--s-slider-space);
        height: 0.5em;
    }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_progress:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: currentColor;
            opacity: 0.2;
        }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_progress > .s-slider_progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: calc(
                100% / (var(--s-slider-total-pages)) *
                    (var(--s-slider-page) + 1)
            );
            background: currentColor;
        }

.s-slider[lnf^='default'][lnf$='-contain'] .s-slider_root > .s-slider_ui > .s-slider_progress {
        bottom: calc(var(--s-slider-space) * 2);
    }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-next,
        .s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-previous {
            width: 1em;
            height: 1em;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            opacity: 0.2;
            pointer-events: none;
            color: currentColor;
        }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-next.active, .s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-previous.active {
                pointer-events: all;
                opacity: 1;
            }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-previous {
            right: calc(100% + var(--s-slider-space));
        }

.s-slider[lnf^='default'] > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-next {
            left: calc(100% + var(--s-slider-space));
        }

.s-slider[lnf^='default'][lnf$='-contight'] > .s-slider_root
            > .s-slider_ui
            > .s-slider_controls
            .s-slider_controls-previous, .s-slider[lnf^='default'][lnf$='-contain'] > .s-slider_root
            > .s-slider_ui
            > .s-slider_controls
            .s-slider_controls-previous {
            left: var(--s-slider-space);
            transform: translate(0, -50%);
        }

.s-slider[lnf^='default'][lnf$='-contight'] > .s-slider_root
            > .s-slider_ui
            > .s-slider_controls
            .s-slider_controls-next, .s-slider[lnf^='default'][lnf$='-contain'] > .s-slider_root
            > .s-slider_ui
            > .s-slider_controls
            .s-slider_controls-next {
            left: auto;
            right: var(--s-slider-space);
            transform: translate(0, -50%);
        }

.s-slider[lnf^='default'][direction='vertical']
        > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-next {
        left: 50%;
        top: calc(100% + var(--s-slider-space));
        transform: translate(-50%, 0) rotate(90deg);
    }

.s-slider[lnf^='default'][direction='vertical']
        > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-previous {
        left: 50%;
        bottom: calc(100% + var(--s-slider-space));
        top: auto;
        transform: translate(-50%, 0) rotate(90deg);
    }

.s-slider[lnf^='default'][direction='vertical'][lnf$='-contight'] > .s-slider_root
            > .s-slider_ui
            > .s-slider_controls
            .s-slider_controls-previous, .s-slider[lnf^='default'][direction='vertical'][lnf$='-contain'] > .s-slider_root
            > .s-slider_ui
            > .s-slider_controls
            .s-slider_controls-previous {
            top: calc(var(--s-slider-space));
        }

.s-slider[lnf^='default'][direction='vertical'][lnf$='-contight'] > .s-slider_root
            > .s-slider_ui
            > .s-slider_controls
            .s-slider_controls-next, .s-slider[lnf^='default'][direction='vertical'][lnf$='-contain'] > .s-slider_root
            > .s-slider_ui
            > .s-slider_controls
            .s-slider_controls-next {
            top: auto;
            bottom: calc(var(--s-slider-space));
        }

.s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-next-arrow,
    .s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-previous-arrow {
        width: 1em;
        height: 1em;
        position: absolute;
        top: 0;
        left: 0;
    }

.s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-next-arrow:before,
        .s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-next-arrow:after,
        .s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-previous-arrow:before,
        .s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-previous-arrow:after {
            display: block;
            content: '';
            position: absolute;
            top: calc(50% - 0.1em);
            left: 0;
            background: currentColor;
            width: 100%;
            height: 0.2em;
        }

.s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-next-arrow:before, .s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-previous-arrow:before {
            transform-origin: 0 0;
            transform: rotate(45deg);
        }

.s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-next-arrow:after, .s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-previous-arrow:after {
            transform-origin: 0 100%;
            transform: rotate(-45deg);
        }

.s-slider[lnf^='default'] > .s-slider_root
        > .s-slider_ui
        > .s-slider_controls
        .s-slider_controls-next-arrow {
        transform: rotate(180deg);
    }
`;
class SSliderComponentInterface extends SInterface {
  static get _definition() {
    return {
      direction: {
        description: "Specify the slider direction. Can be `horizontal` or `vertical`",
        values: ["horizontal", "vertical"],
        type: "String",
        physical: true,
        default: "horizontal"
      },
      behaviors: {
        description: "Specify the available behaviors for the slider",
        type: "Object",
        default: {}
      },
      behavior: {
        description: 'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',
        values: ["none", "scroll", "transform"],
        type: "String",
        default: "scroll",
        physical: true
      },
      pad: {
        type: "Boolean",
        description: "Specify if you want to pad the slides if for example the first slide does not take the while width of the slider, a padding-(block|inline)-start will be applied to center this first slide. Same for the last one",
        default: false
      },
      nextIconClass: {
        description: "Specify the class of the next icon",
        type: "String"
      },
      previousIconClass: {
        description: "Specify the class of the previous icon",
        type: "String"
      },
      uiContainer: {
        description: 'Specify if you want an "s-container:..." class applied on the .s-slider_ui element',
        type: "String|Boolean"
      },
      controls: {
        description: "Specify if you want to display the controls or not. Controls are the previous and next icons",
        type: "Boolean",
        default: false
      },
      nav: {
        description: "Specify if you want to display the nav or not. Nav are the dots",
        type: "Boolean",
        default: false
      },
      swipe: {
        description: "Specify if you want your slider to support swipe navigation or not",
        type: "Boolean",
        default: false
      },
      mousewheel: {
        description: "Specify if you want to enable the mousewheel event on the slider or not",
        type: "Boolean",
        default: false
      },
      clickOnSlide: {
        description: "Specify if you want to enable the click on the slides to navigate or not",
        type: "Boolean",
        default: false
      },
      loop: {
        description: "Specify if you want to enable the loop behavior or not",
        type: "Boolean",
        default: false
      },
      slide: {
        description: "Specify the active slide id",
        type: "Number",
        default: 0,
        physical: true
      },
      slidesByPage: {
        description: 'Specify how many slides you want by page. Pages are what is used to construct the dot nav and will determine how many slides will be passed on "next" and "previous"',
        type: "Number",
        default: 1
      },
      progress: {
        description: "Specify if you want to display the progress bar or not",
        type: "Boolean",
        default: false
      },
      timer: {
        description: 'Specify a timer that will be applied on each slides and go to the next one after the timer is over. For custom timer by slide, specify the `timer="1200"` attribute on the slides you want',
        type: "Number"
      },
      autoplay: {
        description: "Specify if you want the slider to auto play itself when some timer(s) has been set",
        type: "Boolean",
        default: true
      },
      intersectionClasses: {
        description: 'Specify if you want the classes that describe each slide intersection classes like "in-10", "in-20", etc...',
        type: "Boolean",
        default: false
      },
      transitionDuration: {
        description: "Specify the transition duration of the slider in ms",
        type: "Number",
        default: 500
      },
      transitionEasing: {
        description: "Specify the transition easing of the slider",
        type: "Function",
        default: __easeOutQuad
      },
      transitionHandler: {
        description: "Specify a function that will take care of transitioning the slider from the current item to the next/previous",
        type: "Function"
      }
    };
  }
}
const __scrollBehavior = {
  setup() {
    return new Promise((resolve, reject) => {
      var _a;
      let scrollTimeout;
      (_a = this.$slidesWrapper) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", (e) => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (this.props.slidesByPage > 1) {
            return;
          }
          let $elm, lowerToCenter = 999999999999;
          for (let [key, $slide] of this.$slides.entries()) {
            const stats = __elementAreaStats($slide, {
              relativeTo: this.$slidesWrapper
            });
            if (this.props.direction === "vertical" && Math.abs(stats.centerOffsetY) <= lowerToCenter) {
              lowerToCenter = Math.abs(stats.centerOffsetY);
              $elm = $slide;
            } else if (this.props.direction === "horizontal" && Math.abs(stats.centerOffsetX) <= lowerToCenter) {
              lowerToCenter = Math.abs(stats.centerOffsetX);
              $elm = $slide;
            }
          }
          if ($elm) {
            const slideObj = this.getSlide($elm);
            this.setCurrentSlideByIdx(slideObj.idx);
          }
        }, 200);
      });
      resolve();
    });
  },
  transition($from, $to) {
    return new Promise((resolve, reject) => {
      this.$slidesWrapper.style.scrollSnapType = "none";
      const toRect = this.getPageRect($to), fromRect = this.getPageRect($from), sliderRect = this.getBoundingClientRect(), _this = this;
      let startX = this.$slidesWrapper.scrollLeft, startY = this.$slidesWrapper.scrollTop, fromOffset, toOffset, dist = 0;
      if (this.props.direction === "vertical") {
        fromOffset = (sliderRect.height - fromRect.height) * 0.5;
        toOffset = (sliderRect.height - toRect.height) * 0.5;
        dist = toRect.y - fromRect.y - toOffset + fromOffset;
      } else {
        fromOffset = (sliderRect.width - fromRect.width) * 0.5;
        toOffset = (sliderRect.width - toRect.width) * 0.5;
        dist = toRect.x - fromRect.x - toOffset + fromOffset;
      }
      __easeInterval(this.props.transitionDuration, (percentage) => {
        const offset = dist / 100 * percentage;
        if (_this.props.direction === "vertical") {
          _this.$slidesWrapper.scroll(0, Math.round(startY + offset));
        } else {
          _this.$slidesWrapper.scroll(Math.round(startX + offset), 0);
        }
      }, {
        easing: _this.props.transitionEasing,
        onEnd() {
          if (_this.props.direction === "vertical") {
            _this.$slidesWrapper.style.scrollSnapType = "y mandatory";
          } else {
            _this.$slidesWrapper.style.scrollSnapType = "x mandatory";
          }
          resolve();
        }
      });
    });
  }
};
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SSliderComponent extends SLitComponent {
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SSliderComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
  }
  static get state() {
    return {
      currentPage: 0,
      previousSlideIdx: 0,
      currentSlideIdx: 0,
      playing: true
    };
  }
  constructor() {
    super(__deepMerge({
      name: "s-slider",
      interface: SSliderComponentInterface
    }));
    this._timer = {
      total: 0,
      current: 0,
      percentage: 0
    };
    this._bindedBehaviors = {};
  }
  mount() {
    return __awaiter(this, void 0, void 0, function* () {
      this.props.behaviors.scroll = __scrollBehavior;
      if (!this.id) {
        this.setAttribute("id", `s-slider-${__uniqid()}`);
      }
      this.$slides = Array.from(this.querySelectorAll(`[s-slider-slide],s-slider-slide`)).filter(($slide) => {
        const $parentSlider = __querySelectorUp($slide, ".s-slider");
        if (!$parentSlider || $parentSlider === this) {
          $slide.classList.add(...this.utils.cls("_slide").split(" "));
          return true;
        }
        return false;
      });
      if (this.props.slide) {
        this.setCurrentSlide(this.props.slide);
      }
      let resizeTimeout;
      window.addEventListener("resize", (e) => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
          yield this.applyPad();
          this.goTo(this.getCurrentSlideIdx(), true);
        }), 200);
      });
    });
  }
  firstUpdated() {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
      this.$root = this.querySelector(`.${this.utils.uCls("_root")}`);
      this.$slidesWrapper = this.querySelector(`.${this.utils.uCls("_slides-wrapper")}:not(s-slider#${this.id} s-slider .${this.utils.uCls("_slides-wrapper")})`);
      this.$slidesContainer = this.querySelector(`.${this.utils.uCls("_slides")}:not(s-slider#${this.id} s-slider .${this.utils.uCls("_slides")})`);
      if (this.props.behavior && this.props.behavior !== "scroll" && this.props.behavior !== "transform") {
        if (typeof this.props.behavior === "string") {
          let behavior;
          for (let [behaviorId, behaviorObj] of Object.entries(this.props.behaviors)) {
            const id = (_b = (_a = behaviorObj.class) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : behaviorObj.id;
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
          this.behavior = new behavior.class((_c = behavior.settings) !== null && _c !== void 0 ? _c : {});
        } else if (isClass(this.props.behavior)) {
          this.behavior = new this.props.behavior({});
        } else if (this.props.behavior instanceof __SSliderBehavior) {
          this.behavior = this.props.behavior;
        } else {
          throw new Error(`Invalid behavior type, must be a string, an SSliderBehavior extended class or an SSliderBehavior instance`);
        }
        (_e = (_d = this.behavior).firstUpdated) === null || _e === void 0 ? void 0 : _e.call(_d);
      }
      yield (_g = (_f = this.getBehavior()).setup) === null || _g === void 0 ? void 0 : _g.call(_f);
      this.applyPad();
      this._preventUserScrollForDefaultBehavior();
      this.props.intersectionClasses && this._handleIntersections();
      this._handleMousewheel();
      this.props.clickOnSlide && this._handleClickOnSlide();
      this.props.swipe && this._handleSwipe();
      this._initAttributesActions();
      this.goTo(this.props.slide, true);
      if (this.props.autoplay && this.props.timer) {
        this.play();
      }
    });
  }
  /**
   * @name        applyPad
   * @type        Function
   * @async
   *
   * This method apply the "pad" start and end on the slides wrapper
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  applyPad() {
    return __awaiter(this, void 0, void 0, function* () {
      setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        if (this.getBehavior().pad) {
          yield this.getBehavior().pad();
        } else {
          yield this._pad();
        }
      }), 20);
    });
  }
  /**
   * Default pad function if not specified in the behavior
   */
  _pad() {
    const sliderRect = this.getBoundingClientRect(), firstPageRect = this.getFirstPageRect(), lastPageRect = this.getLastPageRect();
    let padStart = 0, padEnd = 0;
    if (this.props.direction === "vertical") {
      padStart = (sliderRect.height - firstPageRect.height) * 0.5;
      padEnd = (sliderRect.height - lastPageRect.height) * 0.5;
    } else {
      padStart = (sliderRect.width - firstPageRect.width) * 0.5;
      padEnd = (sliderRect.width - lastPageRect.width) * 0.5;
    }
    this.style.setProperty("--s-slider-pad-start", `${Math.round(padStart)}px`);
    this.style.setProperty("--s-slider-pad-end", `${Math.round(padEnd)}px`);
  }
  /**
   * This function init the swipe listener to pass from slides to slides
   */
  _handleSwipe() {
    __onSwipe(this.$root, (swipe) => {
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
  /**
   * This function prevent user scroll when using the "default" behavior
   */
  _preventUserScrollForDefaultBehavior() {
    return;
  }
  /**
   * This function listen for mousewheel events and will handle the scroll
   */
  _handleMousewheel() {
    this.$slidesWrapper.addEventListener("wheel", (e) => {
      if (!this.props.mousewheel) {
        if (this.props.direction === "horizontal" && Math.abs(e.deltaX) > 0) {
          e.preventDefault();
        } else if (this.props.direction === "vertical" && Math.abs(e.deltaY) > 0) {
          e.preventDefault();
        }
      }
    });
  }
  /**
   * This function listen for click on slides and navigate to it
   */
  _handleClickOnSlide() {
    this.$slidesContainer.addEventListener("pointerup", (e) => {
      for (let [i, $slide] of this.$slides.entries()) {
        if ($slide.contains(e.target) || $slide === e.target) {
          if (this.currentSlide !== $slide) {
            const slide = this.getSlide($slide);
            this.goTo(slide.idx);
          }
        }
      }
    });
  }
  /**
   * This function listen for intersection changes on slides and apply classes depending on this
   */
  _handleIntersections() {
    var _a;
    (_a = this.$slides) === null || _a === void 0 ? void 0 : _a.forEach(($slide) => {
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
  /**
   * This function grab the elements that have attributes like "s-slider-next", "s-slider-previous", "s-slider-goto", etc...
   * and init them to process the action
   */
  _initAttributesActions() {
    ["next", "previous"].forEach((action) => {
      __querySelectorLive(`[s-slider-${action}]:not(s-slider#${this.id} s-slider [s-slider-${action}])`, ($elm) => {
        $elm.addEventListener("pointerup", (e) => {
          e.preventDefault();
          this[action](true);
        });
      }, {
        scopes: false,
        rootNode: this
      });
    });
    __querySelectorLive(`[s-slider-goto]:not(s-slider#${this.id} .s-slider [s-slider-goto])`, ($elm) => {
      $elm.addEventListener("pointerup", (e) => {
        var _a;
        const slideIdx = (_a = parseInt($elm.getAttribute("s-slider-goto"))) !== null && _a !== void 0 ? _a : 0;
        this.goTo(slideIdx, true);
      });
    }, {
      scopes: false,
      rootNode: this
    });
  }
  /**
   * This function is just to dispatch event easier with just the name and the details you want...
   */
  _dispatch(name, detail = {}) {
    this.utils.dispatchEvent(name, {
      detail
    });
  }
  /**
   * @name        isSlideInPage
   * @type        Function
   *
   * This method allows you to check if the passed slide is in the current "page" or not
   *
   * @param       {String|HTMLElement}        slide           A slide idx of the slide element
   * @param       {Number}                [page=this.state.currentPage]       The page to check the slide against
   * @return      {Boolean}           true if the actual slide is the last one, false otherwise
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  isSlideInPage(slide, page = this.state.currentPage) {
    const slideObj = this.getSlide(slide);
    return slideObj.idx >= page * this.props.slidesByPage && slideObj.idx < (page + 1) * this.props.slidesByPage;
  }
  /**
   * @name        isLast
   * @type        Function
   *
   * This method allows you to check if the actual slide is the last one
   *
   * @return      {Boolean}           true if the actual slide is the last one, false otherwise
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  isLast() {
    return this.state.currentSlideIdx >= this.$slides.length - 1;
  }
  /**
   * @name        isFirst
   * @type        Function
   *
   * This method allows you to check if the actual slide is the first one
   *
   * @return      {Boolean}           true if the actual slide is the first one, false otherwise
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  isFirst() {
    return this.state.currentSlideIdx <= 0;
  }
  /**
   * @name        getCurrentSlideIdx
   * @type    Function
   *
   * Access the current slide idx. Begin from 0...
   *
   * @return      {Number}        The current slide idx
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getCurrentSlideIdx() {
    return this.state.currentSlideIdx;
  }
  /**
   * @name        setCurrentSlideByIdx
   * @type    Function
   *
   * Set the current slide idx.
   *
   * @param       {Number}        idx         The current slide idx
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  setCurrentSlideByIdx(idx) {
    if (idx === this.state.currentSlideIdx) {
      return;
    }
    this.state.previousSlideIdx = this.state.currentSlideIdx;
    this.props.slide = idx;
    this.state.currentSlideIdx = idx;
    this.state.currentPage = Math.ceil(idx / this.props.slidesByPage);
    this.updateSlidesClasses();
  }
  /**
   * @name       setCurrentSlide
   * @type        Function
   *
   * This method allows you to get the current clide using an id or an idx.
   *
   * @param       {String|Number|HTMLElement}    idIdxOrElement    The slide id or idx or the slide HTMLElement
   * @return      {SSLiderComponent}              The slider component to maintain chainability
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  setCurrentSlide(idIdxOrElement) {
    const slide = this.getSlide(idIdxOrElement);
    this.setCurrentSlideByIdx(slide.idx);
    return this;
  }
  /**
   * @name        currentSlideIdx
   * @type        Number
   *
   * Access the current slide idx. Begin from 0...
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get currentSlideIdx() {
    return this.getCurrentSlideIdx();
  }
  /**
   * @name        getCurrentSlideElement
   * @type    Function
   *
   * Access the current slide item.
   *
   * @return      {HTMLElement}           The current slide element
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getCurrentSlideElement() {
    return this.$slides[this.state.currentSlideIdx];
  }
  /**
   * @name        currentSlideElement
   * @type    HTMLElement
   *
   * Access the current slide item.
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get currentSlideElement() {
    return this.getCurrentSlideElement();
  }
  /**
   * @name        getNextSlideIdx
   * @type    HTMLElement
   *
   * Access the next slide idx.
   *
   * @return      {Number}        The next slide idx
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getNextSlideIdx() {
    const nextSlideIdx = this.state.currentSlideIdx + this.props.slidesByPage;
    if (nextSlideIdx >= this.$slides.length - 1)
      return this.$slides.length - 1;
    return nextSlideIdx;
  }
  /**
   * @name        nextSlideIdx
   * @type    Number
   *
   * Access the next slide idx.
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get nextSlideIdx() {
    return this.getNextSlideIdx();
  }
  /**
   * @name        getNextSlideElement
   * @type    Function
   *
   * Access the next slide idx.
   *
   * @return      {HTMLElement}           The next slide element
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getNextSlideElement() {
    return this.$slides[this.getNextSlideIdx()];
  }
  /**
   * @name        nextSlideElement
   * @type    Function
   *
   * Access the next slide idx.
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get nextSlideElement() {
    return this.getNextSlideElement();
  }
  /**
   * @name        getPreviousSlideIdx
   * @type    Function
   *
   * Access the previous slide idx.
   *
   * @return      {HTMLElement}           The previous slide idx
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getPreviousSlideIdx() {
    const previousSlideIdx = this.state.currentSlideIdx - this.props.slidesByPage;
    if (previousSlideIdx <= 0)
      return 0;
    return previousSlideIdx;
  }
  /**
   * @name        previousSlideIdx
   * @type    Number
   * @get
   *
   * Access the previous slide idx.
   *
   * @return      {HTMLElement}           The previous slide idx
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get previousSlideIdx() {
    return this.getPreviousSlideIdx();
  }
  /**
   * @name        getPreviousSlideElement
   * @type    Function
   *
   * Access the previous slide element.
   *
   * @return      {HTMLElement}           The previous slide element
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getPreviousSlideElement() {
    return this.$slides[this.getPreviousSlideIdx()];
  }
  /**
   * @name        previousSlideElement
   * @type    Function
   *
   * Access the previous slide element.
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get previousSlideItem() {
    return this.$slides[this.getPreviousSlideIdx()];
  }
  /**
   * @name        getSlideIdxById
   * @type        Function
   *
   * This method allows you to get back the slide idx by its id.
   *
   * @param       {String}    id     The slide id
   * @return      {Number}        The slide idx
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getSlideIdxById(id) {
    for (let i = 0; i < this.$slides.length; i++) {
      if (this.$slides[i].getAttribute("s-slider-slide") === id)
        return i;
    }
  }
  /**
   * @name        getSlideElementByIdx
   * @type        Function
   *
   * This method allows you to get back a slide HTMLElement by its index.
   *
   * @param       {Number}    idx    The slide idx
   * @return      {HTMLElement}        The slide HTMLElement
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getSlideElementByIdx(idx) {
    return this.$slides[idx];
  }
  /**
   * @name        getCurrentSlide
   * @type        Function
   *
   * This method allows you to get back the current slide object <ISSliderComponentSlide> either by it's id, or by it's idx.
   *
   * @return      {ISSliderComponentSlide}        The slide object
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getCurrentSlide() {
    return this.getSlide(this.state.currentSlideIdx);
  }
  /**
   * @name            currentSlide
   * @type            ISSliderComponentSlide
   *
   * Access the current slide object
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get currentSlide() {
    return this.getCurrentSlide();
  }
  /**
   * @name            getLastPage
   * @type            Function
   *
   * Get the last page idx
   *
   * @return      {Number}            The last page idx
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getLastPage() {
    return Math.ceil(this.$slides.length / this.props.slidesByPage) - 1;
  }
  /**
   * @name        getFirstPageSlides
   * @type        Function
   *
   * This method allows you to get all first page slides.
   *
   * @return      {ISSliderComponentSlide[]}          An array of slides
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getFirstPageSlides() {
    return this.getPageSlides(0);
  }
  /**
   * @name        getLastPageSlides
   * @type        Function
   *
   * This method allows you to get all last page slides.
   *
   * @return      {ISSliderComponentSlide[]}          An array of slides
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getLastPageSlides() {
    return this.getPageSlides(this.getLastPage());
  }
  /**
   * @name        getPageRect
   * @type        Function
   *
   * This method allows you to get a page rect just like the getBoundingClientRect native function
   *
   * @param       {Number}               [pageOrSlideElement=this.state.currentPage]        The page you want the rect object from
   * @return      {ISSliderPageRect}          The page rect object
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getPageRect(pageOrSlideElement = this.state.currentPage) {
    let page = pageOrSlideElement;
    if (pageOrSlideElement instanceof HTMLElement) {
      const slide = this.getSlide(pageOrSlideElement);
      page = slide.page;
    }
    const slides = this.getPageSlides(page);
    const rect = {
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      width: -1,
      height: -1,
      x: -1,
      y: -1
    };
    slides.forEach((slide) => {
      const slideRect = slide.$slide.getBoundingClientRect();
      if (rect.top === -1 || slideRect.top < rect.top) {
        rect.top = slideRect.top;
      }
      if (rect.left === -1 || slideRect.left < rect.left) {
        rect.left = slideRect.left;
      }
      if (rect.right === -1 || slideRect.right > rect.right) {
        rect.right = slideRect.right;
      }
      if (rect.bottom === -1 || slideRect.bottom > rect.bottom) {
        rect.bottom = slideRect.bottom;
      }
    });
    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }
  /**
   * @name        getFirstPageRect
   * @type        Function
   *
   * This method allows you to get the first page rect just like the getBoundingClientRect native function
   *
   * @return      {ISSliderPageRect}          The page rect object
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getFirstPageRect() {
    return this.getPageRect(0);
  }
  /**
   * @name        getLastPageRect
   * @type        Function
   *
   * This method allows you to get the last page rect just like the getBoundingClientRect native function
   *
   * @return      {ISSliderPageRect}          The page rect object
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getLastPageRect() {
    return this.getPageRect(this.getLastPage());
  }
  /**
   * @name        getPageSlides
   * @type        Function
   *
   * This method allows you to get all the slides in a particular "page".
   *
   * @param       {Number}        page        The page you want to get slides from
   * @return      {ISSliderComponentSlide[]}          An array of slides
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getPageSlides(page) {
    const slides = [];
    for (let i = page * this.props.slidesByPage; i < (page + 1) * this.props.slidesByPage; i++) {
      if (i < this.$slides.length) {
        slides.push(this.getSlide(i));
      }
    }
    return slides;
  }
  /**
   * @name        getSlide
   * @type        Function
   *
   * This method allows you to get back a slide object <ISSliderComponentSlide> either by it's id, or by it's idx.
   *
   * @param       {String|Number}    idIdxOrElement    The slide id or idx
   * @return      {ISSliderComponentSlide}        The slide object
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
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
          total: (_a = $slide.getAttribute("timer")) !== null && _a !== void 0 ? _a : this.props.timer,
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
          total: (_b = $slide.getAttribute("timer")) !== null && _b !== void 0 ? _b : this.props.timer,
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
      page: Math.ceil(idx / this.props.slidesByPage),
      $slide,
      timer
    };
  }
  /**
   * @name            getFirstSlide
   * @type           Function
   *
   * This method allows you to get the first slide of the slider
   *
   * @return      {ISSliderComponentSlide}       The first slide object
   *
   * @since      2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getFirstSlide() {
    return this.getSlide(0);
  }
  /**
   * @name            getLastSlide
   * @type           Function
   *
   * This method allows you to get the last slide of the slider
   *
   * @return      {ISSliderComponentSlide}       The last slide object
   *
   * @since      2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getLastSlide() {
    return this.getSlide(this.$slides.length - 1);
  }
  getBehavior() {
    if (this._bindedBehaviors[this.props.behavior]) {
      return this._bindedBehaviors[this.props.behavior];
    }
    const behavior = Object.assign({}, this.props.behaviors[this.props.behavior]);
    if (!behavior) {
      throw new Error(`[SSliderComponent] The requested "${this.props.behavior}" does not exists. Here's the available ones:
${Object.keys(this.props.behaviors).map((b) => `
- ${b}`)}`);
    }
    Object.keys(behavior).forEach((fnName) => {
      if (typeof behavior[fnName] === "function") {
        behavior[fnName] = behavior[fnName].bind(this);
      }
    });
    this._bindedBehaviors[this.props.behavior] = behavior;
    return behavior;
  }
  /**
   * @name        updateSlidesClasses
   * @type        Function
   *
   * This method allows you to update the slides "active" class accordingly to the
   * slider state. This can be used inside of a custom behavior for example.
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  updateSlidesClasses() {
    const currentSlide = this.getCurrentSlide();
    this.$slides.forEach(($slide, i) => {
      if (this.props.slidesByPage > 1 && this.isSlideInPage($slide)) {
        $slide.classList.add("active");
      } else if ($slide === currentSlide.$slide) {
        $slide.classList.add("active");
      } else {
        $slide.classList.remove("active");
      }
    });
  }
  /**
   * @name        goTo
   * @type    Function
   *
   * Go to a specific slide.
   *
   * @param       {Number|String}    slideIdIdxOrElement    The slide idx, id or HTMLElement to go to
   * @return      {SSliderComponent}          The slider element to maintain chainability
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  goTo(slideIdIdxOrElement, force = false) {
    return __awaiter(this, void 0, void 0, function* () {
      const nextSlide = this.getSlide(slideIdIdxOrElement);
      if (!force && (!nextSlide || nextSlide.idx === this.currentSlide.idx)) {
        return;
      }
      const currentSlide = this.getCurrentSlide();
      this.setCurrentSlideByIdx(nextSlide.idx);
      this.props.slide = nextSlide.idx;
      if (currentSlide.idx + 1 === nextSlide.idx) {
        this._dispatch("next", {
          currentSlide,
          nextSlide
        });
      } else if (currentSlide.idx - 1 === nextSlide.idx) {
        this._dispatch("previous", {
          currentSlide,
          nextSlide
        });
      }
      this._dispatch("goto", {
        currentSlide,
        nextSlide
      });
      this.updateSlidesClasses();
      currentSlide.$slide.classList.add("post-active");
      currentSlide.$slide.classList.remove("active");
      nextSlide.$slide.classList.add("pre-active");
      yield this._transitionHandler(currentSlide.$slide, nextSlide.$slide);
      currentSlide.$slide.classList.remove("post-active");
      nextSlide.$slide.classList.remove("pre-active");
      nextSlide.$slide.classList.add("active");
      this._dispatch("goto-end", {
        currentSlide,
        nextSlide
      });
      if (this.isPlaying()) {
        this._playSlide(this.state.currentSlideIdx);
      }
      return this;
    });
  }
  /**
   * @name        next
   * @type    Function
   *
   * Go to the next slide
   *
   * @return      {SSliderComponent}          The slider element to maintain chainability
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  next() {
    if (this.props.loop && this.isLast()) {
      return this.goTo(0);
    }
    return this.goTo(this.getNextSlideIdx());
  }
  /**
   * @name        previous
   * @type    Function
   *
   * Go to the previous slide
   *
   * @return      {SSliderComponent}          The slider element to maintain chainability
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  previous() {
    if (this.props.loop && this.isFirst()) {
      return this.goTo(this.getLastSlide().idx);
    }
    return this.goTo(this.getPreviousSlideIdx());
  }
  /**
   * @name        getTimer
   * @type        Function
   *
   * This method allows you to get back the timer object
   *
   * @return      {ISSliderComponentTimer}      The timer object
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getTimer(slideIdIdxOrElement) {
    var _a;
    if (!slideIdIdxOrElement) {
      let total = 0, current = 0;
      for (let i = 0; i < this.$slides.length; i++) {
        const slide2 = this.getSlide(i);
        if (i < this.state.currentSlideIdx) {
          current += slide2.timer.total;
        } else if (i === this.state.currentSlideIdx) {
          current += slide2.timer.current;
        }
        total += (_a = slide2.timer.total) !== null && _a !== void 0 ? _a : 0;
      }
      this._timer.total = total;
      this._timer.current = current;
      this._timer.percentage = Math.round(100 / total * current);
      return this._timer;
    }
    const slide = this.getSlide(slideIdIdxOrElement);
    return slide.timer;
  }
  /**
   * @name        isPlaying
   * @type    Function
   *
   * This method allows you to know if the slider is currently playing or not
   *
   * @return      {Boolean}           trie if the slider is playing or not
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  isPlaying() {
    if (!this.state.playing)
      return false;
    return this.props.timer !== void 0;
  }
  /**
   * @name        play
   * @type    Function
   *
   * This method allows you to play the slider when a `timer` has been defined
   *
   * @return      {SSliderComponent}          The slider element to maintain chainability
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  play() {
    if (!this.props.timer)
      return;
    this.utils.dispatchEvent("play", {
      detail: this
    });
    this.state.playing = true;
    this._playSlide(this.currentSlide.idx);
    return this;
  }
  /**
   * @name        stop
   * @type    Function
   *
   * This method allows you to stop the slider
   *
   * @return      {SSliderComponent}          The slider element to maintain chainability
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  stop() {
    this.utils.dispatchEvent("stop", {
      detail: this
    });
    this.state.playing = false;
    return this;
  }
  /**
   * @name        _playSlide
   * @type    Function
   *
   * This method allows you to play a particular slide
   *
   * @return      {SSliderComponent}          The slider element to maintain chainability
   *
   * @since       2.0.0
   * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
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
      if (elapsed >= slide.timer.total) {
        clearInterval(slideInterval);
        slide.timer.current = 0;
        slide.timer.percentage = 0;
        this.next(false);
      }
    }, interval);
    return this;
  }
  /**
   * Function that is in charge of making the transition happend.
   * It will use the setted behavior if this one support custom transition,
   * of simply changing the current slide.
   */
  _transitionHandler($from, $to) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      var _a, _b, _c;
      this.style.setProperty("--s-slider-slide-height", `${Math.round(this.getCurrentSlide().$slide.getBoundingClientRect().height)}px`);
      this.style.setProperty("--s-slider-slide-width", `${Math.round(this.getCurrentSlide().$slide.getBoundingClientRect().width)}px`);
      if (this.props.transitionHandler) {
        yield this.props.transitionHandler($from, $to);
        return resolve();
      }
      if ((_a = this.props.behavior) === null || _a === void 0 ? void 0 : _a.goTo) {
        yield this.props.behavior.goTo($from, $to);
        return resolve();
      }
      yield (_c = (_b = this.getBehavior()).transition) === null || _c === void 0 ? void 0 : _c.call(_b, $from, $to);
      resolve();
    }));
  }
  render() {
    var _a;
    if (!this.$slides.length)
      return;
    const currentSlide = this.getCurrentSlide();
    let slide = this.getCurrentSlide();
    this.style.setProperty("--s-slider-slide", this.state.currentSlideIdx);
    this.style.setProperty("--s-slider-total-slides", this.$slides.length);
    this.style.setProperty("--s-slider-page", this.state.currentPage);
    this.style.setProperty("--s-slider-total-pages", Math.ceil(this.$slides.length / this.props.slidesByPage));
    this.style.setProperty("--s-slider-slides-by-page", this.props.slidesByPage);
    this.style.setProperty("--s-slider-slide-timer-total", `${(_a = slide.timer.total) !== null && _a !== void 0 ? _a : 0 / 1e3}s`);
    return html`
            <div class="${this.utils.cls("_root")}">
                <div class="${this.utils.cls("_slides-wrapper")}">
                    <div class="${this.utils.cls("_slides")}">
                        <div class="${this.utils.cls("_pad _pad-start")}"></div>
                        ${this.$slides.map(($slide) => {
      return $slide;
    })}
                        <div class="${this.utils.cls("_pad _pad-end")}"></div>
                    </div>
                </div>
                <div
                    class="${this.utils.cls("_ui", `${typeof this.props.uiContainer === "string" ? `s-container--${this.props.uiContainer}` : this.props.uiContainer === true ? "s-container" : ""}`)}"
                >
                    ${this.props.progress ? html`
                              <div class="${this.utils.cls("_progress")}">
                                  <div
                                      class="${this.utils.cls("_progress-bar")}"
                                  ></div>
                              </div>
                          ` : ""}
                    ${this.props.nav ? html`
                              <div class="${this.utils.cls("_nav")}">
                                  ${[
      ...Array(Math.ceil(this.$slides.length / this.props.slidesByPage))
    ].map((i, idx) => {
      return html`
                                          <div
                                              class="${this.utils.cls("_nav-item")} ${this.isSlideInPage(currentSlide.idx, idx) ? "active" : ""}"
                                              @pointerup=${() => this.goTo(idx * this.props.slidesByPage)}
                                          ></div>
                                      `;
    })}
                              </div>
                          ` : ""}
                    ${this.props.controls ? html`
                              <div class="${this.utils.cls("_controls")}">
                                  <div
                                      class="${this.utils.cls("_controls-previous")} ${this.isFirst() && !this.props.loop ? "" : "active"}"
                                      @pointerup=${() => this.previous()}
                                  >
                                      ${this.props.previousIconClass ? html`
                                                <i
                                                    class="${this.props.previousIconClass}"
                                                ></i>
                                            ` : html`<div
                                                class="${this.utils.cls("_controls-previous-arrow")}"
                                            ></div>`}
                                  </div>
                                  <div
                                      class="${this.utils.cls("_controls-next")} ${this.isLast() && !this.props.loop ? "" : "active"}"
                                      @pointerup=${() => this.next()}
                                  >
                                      ${this.props.nextIconClass ? html`
                                                <i
                                                    class="${this.props.nextIconClass}"
                                                ></i>
                                            ` : html`<div
                                                class="${this.utils.cls("_controls-next-arrow")}"
                                            ></div>`}
                                  </div>
                              </div>
                          ` : ""}
                </div>
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-slider", settings) {
  SSliderComponent.define(tagName, SSliderComponent, props, settings);
}
export {
  define as default
};
