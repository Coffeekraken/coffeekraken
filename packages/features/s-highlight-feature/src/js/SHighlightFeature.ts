import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SHighlightFeatureInterface from './interface/SHighlightFeatureInterface';

import __define from './define';

// @ts-ignore
import __css from '../../../../src/css/s-highlight-feature.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SHighlightFeature
 * @as              Highlight feature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SHighlightFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-highlight-feature
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
 * @example         html            Simple partial
 * <section class="s-ratio:1 s-bkg:accent" s-highlight>
 *      Hello world
 * </section>
 *
 * @see         https://codepen.io/Hyperplexed/pen/MWQeYLW
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISHighlightFeatureProps {
    size: number;
    opacity: number;
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
        if (this.props.opacity) {
            this.node.style.setProperty(
                '--s-highlight-opacity',
                this.props.opacity,
            );
        }

        ['mouseover', 'pointerover'].forEach((eventName) => {
            this.node.addEventListener(eventName, (e) => {
                this.node.classList.add('highlight');
            });
        });
        ['mouseout', 'pointerout'].forEach((eventName) => {
            this.node.addEventListener(eventName, (e) => {
                this.node.classList.remove('highlight');
            });
        });

        ['mousemove', 'touchmove'].forEach((eventName) => {
            document.addEventListener(eventName, (e) => {
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
