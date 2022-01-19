import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SRefocusFeatureInterface from './interface/SRefocusFeatureInterface';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __closestScrollable from '@coffeekraken/sugar/js/dom/query/closestScrollable';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';

export interface ISRefocusFeatureProps {
    on: string[];
    timeout: number;
}

/**
 * @name            SRefocusFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SRefocusFeatureInterface.js
 * @menu            Styleguide / Features               /styleguide/features/s-activate-feature
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
 * @example         html
 * <div class="scrollable" s-refocus on="actual">
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        this.props.on.forEach((eventName) => {
            this.node.addEventListener(eventName, (e) => {
                console.log('even', eventName);
                __scrollTo(e.target, {
                    $elm: this.node
                }, this.props.timeout);

            });
        });
    }
    
}

export function define(
    props: Partial<ISRefocusFeatureProps> = {},
    name = 's-refocus',
) {
    __SFeature.defineFeature(name, SRefocusFeature, props);
}
