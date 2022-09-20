import __SFeature from '@coffeekraken/s-feature';
import { __scrollTo } from '@coffeekraken/sugar/dom';
import type { IScrollToSettings } from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SRefocusFeatureInterface from './interface/SRefocusFeatureInterface';

import __define from './define';

export interface ISRefocusFeatureProps {
    trigger: string[];
    scrollToSettings: Partial<IScrollToSettings>;
    timeout: number;
    duration: number;
    easing: Function;
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
                    window.addEventListener('hashchange', (e) => {
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
    _scrollTo($elm) {
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

        __scrollTo($elm, scrollToSettings);
    }
}

export { __define as define };
