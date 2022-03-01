import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SRefocusFeatureInterface from './interface/SRefocusFeatureInterface';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __closestScrollable from '@coffeekraken/sugar/js/dom/query/closestScrollable';
import __scrollTo, { IScrollToSettings } from '@coffeekraken/sugar/js/dom/scroll/scrollTo';

export interface ISRefocusFeatureProps {
    trigger: string[];
    scrollToSettings: Partial<IScrollToSettings>;
    timeout: number;
}

/**
 * @name            SRefocusFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SRefocusFeatureInterface.js
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
                    componentUtils: {
                        interface: __SRefocusFeatureInterface,
                    },
                    feature: {},
                },
                settings ?? {},
            ),
        );
    }
    mount() {
        this.props.trigger.forEach((trigger) => {
            switch(trigger) {
                case 'anchor':
                    setTimeout(() => {
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    }, this.props.timeout);
                break;
                case 'history':
                    window.addEventListener('hashchange', (e) => {
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    window.addEventListener('popstate', (e) => {
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
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
        __scrollTo($elm, {
            $elm: this.node,
            ...this.props.scrollToSettings ?? {},
        // @ts-ignore
        });
    }
    
}

export function define(
    props: Partial<ISRefocusFeatureProps> = {},
    name = 's-refocus',
) {
    __SFeature.defineFeature(name, SRefocusFeature, props);
}
