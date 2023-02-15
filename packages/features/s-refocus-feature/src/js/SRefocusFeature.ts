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

var _wr = function (type) {
    var orig = history[type];
    return function () {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
history.pushState = _wr('pushstate');

export default class SRefocusFeature extends __SFeature {
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
        console.log('props', this.props);

        this.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'anchor':
                    setTimeout(() => {
                        console.log('COCO');

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
                    window.addEventListener('hashchange', (e) => {
                        console.log('HASH change!', document.location.hash);

                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(
                                document.location.hash,
                            );
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    window.addEventListener('popstate', (e) => {
                        console.log('HASH', document.location.hash);

                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(
                                document.location.hash,
                            );
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    window.addEventListener('pushstate', (e) => {
                        console.log('PUSH HASH', document.location.hash);
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(
                                document.location.hash,
                            );
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    break;
                default:
                    // if (trigger.match(/^event:/)) {
                    //     const event = trigger.replace('event:', '').trim();
                    //     this.node.addEventListener(event, (e) => {
                    //         this._scrollTo(e.target);
                    //     });
                    // }
                    break;
            }
        });
    }
    async _scrollTo($elm) {
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

        // handle nested scrollable containers
        let $nestedScrollables: HTMLElement[] = [];
        let $scrollable = __closestScrollable($elm);

        // while ($scrollable) {
        //     $nestedScrollables.push($scrollable);
        //     $scrollable = __closestScrollable($scrollable);
        // }

        // if ($scrollable && !$nestedScrollables.includes($scrollable)) {
        //     $nestedScrollables.push($scrollable);
        // }

        // reverse the nestedScrollables to refocus it correctly
        // $nestedScrollables = $nestedScrollables.reverse();

        console.log(
            'Scroll',
            $scrollable === window ? 'window' : 'node',
            $elm,
            'scrollable',
            $scrollable,
        );

        // scroll to element
        await __scrollTo($elm, {
            ...scrollToSettings,
            $elm: $scrollable ?? this.node,
        });

        // add and remove a "focused" class
        if (this.props.focusedClass) {
            $elm.classList.add(this.props.focusedClass);
            setTimeout(() => {
                $elm.classList.remove(this.props.focusedClass);
            }, this.props.focusedClassDuration);
        }
    }
}

export { __define as define };
