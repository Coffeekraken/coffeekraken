import __SFeature from '@coffeekraken/s-feature';
import { __scrollTo } from '@coffeekraken/sugar/dom';
import type { IScrollToSettings } from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SRefocusFeatureInterface from './interface/SRefocusFeatureInterface';

import { __closestScrollable } from '@coffeekraken/sugar/dom';

import __define from './define';

export interface ISRefocusFeatureProps {
    trigger: string[];
    scrollToSettings: Partial<IScrollToSettings>;
    timeout: number;
    duration: number;
    easing: Function;
    focusedClass: string | boolean;
    focusedClassDuration: number;
    // minToScroll: number;
    offset: number;
    offsetX: number;
    offsetY: number;
    align: 'start' | 'center' | 'end';
    justify: 'start' | 'center' | 'end';
}

/**
 * @name            SRefocusFeature
 * @as              Refocus
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SRefocusFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-activate-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to automatically visually refocus an element that is inside a scrollable one on different trigger(s) like events, etc...
 * This feature will occurs on these actions:
 * - At page display, check the anchor and refocus if found an element with the correct id
 * - At some events like: popstate, hashchange and pushstate.
 *    - Note that the "pushstate" event is emitted by a proxies `history.pushState` method.
 *    - In order to make the refocus happend, your pushed state MUST have the `scroll` property to `true`
 * - On any events specified in the `props.trigger` property using this syntax: `event:click`, etc...
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Simple usage
 * <div class="scrollable" s-refocus trigger="event:actual">
 *    <ul>
 *       <li>
 *          <a href="#hello">Hello</a>
 *          <!-- when this element dispatch an "actual" event,
 *               it will be refocused -->
 *       </li>
 *       <li>
 *          <a href="#world">World</a>
 *       </li>
 *    </ul>
 * </div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SRefocusFeature extends __SFeature {
    _currentScrolledTargets: HTMLElement[] = [];

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-refocus',
                    interface: __SRefocusFeatureInterface,
                },
                settings ?? {},
            ),
        );
    }
    mount() {
        this.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'anchor':
                    setTimeout(() => {
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(
                                document.location.hash,
                            );
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    }, this.props.timeout);
                    break;
                case 'history':
                    ['hashchange', 'popstate', 'pushstate'].forEach(
                        (eventName) => {
                            window.addEventListener(eventName, (e) => {
                                // if the event is the custom "pushstate"
                                // make sure that the state object has the "scroll" property to "true"
                                if (
                                    eventName === 'pushstate' &&
                                    !e.detail?.scroll
                                ) {
                                    return;
                                }

                                if (document.location.hash) {
                                    const $targetElm = this.node.querySelector(
                                        document.location.hash,
                                    );
                                    if ($targetElm) {
                                        this._scrollTo($targetElm);
                                    }
                                } else {
                                    setTimeout(() => {
                                        // scroll to top
                                        this._scrollTo(document.body);
                                    }, 100);
                                }
                            });
                        },
                    );
                    break;
                default:
                    if (trigger.match(/^event:/)) {
                        const event = trigger.replace('event:', '').trim();
                        this.node.addEventListener(event, (e) => {
                            this._scrollTo(e.target);
                        });
                    }
                    break;
            }
        });
    }
    async _scrollTo($elm) {
        // do not scroll to an element already in the current stack
        if (this._currentScrolledTargets.includes($elm)) {
            return;
        }
        // do not scroll to a none existing element
        if ($elm !== document.body && !this.node.contains($elm)) {
            return;
        }

        // // avoid scrolling if unecessary
        // const scrollTop =
        //     $elm === document.body
        //         ? document.documentElement.scrollTop
        //         : $elm.scrollTop;
        // const bounds = $elm.getBoundingClientRect();
        // console.log('bounds', bounds);

        // if (scrollTop > this.props.minToScroll) {
        const scrollToSettings = {
            $elm: this.node,
        };
        if (this.props.duration)
            scrollToSettings.duration = this.props.duration;
        if (this.props.easing) scrollToSettings.easing = this.props.easing;
        if (this.props.offset) scrollToSettings.offset = this.props.offset;
        if (this.props.offsetX) scrollToSettings.offsetX = this.props.offsetX;
        if (this.props.offsetY) scrollToSettings.offsetY = this.props.offsetY;
        if (this.props.align) scrollToSettings.align = this.props.align;
        if (this.props.justify) scrollToSettings.justify = this.props.justify;

        // handle scrollable containers
        let $scrollable = __closestScrollable($elm);

        // do not scroll multiple times the same container
        if ($scrollable._isScrolling) {
            return;
        }
        $scrollable._isScrolling = true;

        // maintain the current scrollable stack
        if ($scrollable._sRefocusFeatureCurrentElm) {
            this._currentScrolledTargets.splice(
                this._currentScrolledTargets.indexOf(
                    $scrollable._sRefocusFeatureCurrentElm,
                    1,
                ),
            );
        }
        $scrollable._sRefocusFeatureCurrentElm = $elm;
        this._currentScrolledTargets.push($elm);

        // scroll to element
        await __scrollTo($elm, {
            ...scrollToSettings,
            $elm: $scrollable,
        });

        // reset the scrolling state
        $scrollable._isScrolling = false;
        // }

        // add and remove a "focused" class
        if (this.props.focusedClass && $elm !== document.body) {
            $elm.classList.add(this.props.focusedClass);
            setTimeout(() => {
                $elm.classList.remove(this.props.focusedClass);
            }, this.props.focusedClassDuration);
        }
    }
}

export { __define as define };
