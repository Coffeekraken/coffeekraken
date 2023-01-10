import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SHighlightFeatureInterface from './interface/SHighlightFeatureInterface';

import __define from './define';

// @ts-ignore
import __css from '../../../../src/css/s-highlight-feature.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SHighlightFeature
 * @as              Highlight
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SHighlightFeatureInterface.ts
 * @menu            Styleguide / Effects               /styleguide/effect/s-highlight-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to apply some nice highlights effects on any HTMLElement.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Highlight
 * <div class="s-radius s-bg:main s-depth s-mbe:30" style="height:100px" s-highlight>
 * </div>
 * <div class="s-radius s-bg:accent s-depth s-mbe:30" style="height:100px" s-highlight intensity="1">
 * </div>
 * <div class="s-radius s-bg:complementary s-depth s-mbe:30" style="height:100px" s-highlight intensity="1">
 * </div>
 * <div class="s-radius s-bg:error s-depth" style="height:100px" s-highlight intensity="1">
 * </div>
 *
 * @see         https://codepen.io/Hyperplexed/pen/MWQeYLW
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISHighlightFeatureProps {
    type: 'light';
    size: number;
    intensity: number;
}

export default class SHighlightFeature extends __SFeature {
    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-highlight',
                    interface: __SHighlightFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );
    }

    async mount() {
        if (this.props.size) {
            this.node.style.setProperty(
                '--s-highlight-size',
                `${this.props.size}px`,
            );
        }
        if (this.props.intensity) {
            this.node.style.setProperty(
                '--s-highlight-intensity',
                this.props.intensity,
            );
        }

        ['mouseover', 'pointerover'].forEach((eventName) => {
            this.node.addEventListener(eventName, (e) => {
                if (!this.cu.isActive()) {
                    return;
                }
                this.node.classList.add('highlight');
            });
        });
        ['mouseout', 'pointerout'].forEach((eventName) => {
            this.node.addEventListener(eventName, (e) => {
                if (!this.cu.isActive()) {
                    return;
                }
                this.node.classList.remove('highlight');
            });
        });

        ['mousemove', 'touchmove'].forEach((eventName) => {
            this.node.addEventListener(eventName, (e) => {
                if (!this.cu.isActive()) {
                    return;
                }
                const rect = this.node.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;

                this.node.style.setProperty('--s-highlight-mouse-x', `${x}px`);
                this.node.style.setProperty('--s-highlight-mouse-y', `${y}px`);
            });
        });
    }
}

export { __define as define };
