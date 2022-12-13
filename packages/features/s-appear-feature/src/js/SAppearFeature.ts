import __SFeature from '@coffeekraken/s-feature';
import __SSugarElement from '@coffeekraken/s-sugar-element';
import __STheme from '@coffeekraken/s-theme';
import {
    __injectStyle,
    __whenImageLoaded,
    __whenImagesLoaded,
} from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';
import __SAppearFeatureInterface from './interface/SAppearFeatureInterface';

import __define from './define';

// @ts-ignore
import __css from '../../../../src/css/autoload.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SAppearFeature
 * @as              Appear elements
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SAppearFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-appear-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to make some elements appear when it enter the viewport with different
 * apparition animation as well as custom one depending on your needs.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Bottom
 * <div class="s-ratio:16-9 s-width:50 s-bg:main-surface s-p:30 s-mbe:50">
 *   <div class="s-ratio:16-9 s-bg:accent s-color:accent s-radius s-p:30" s-appear in="bottom">
 *      I'm the appear element
 *  </div>
 * </div>
 *
 * @example         html            Top
 * <div class="s-ratio:16-9 s-width:50 s-bg:main-surface s-p:30 s-mbe:50">
 *   <div class="s-ratio:16-9 s-bg:accent s-color:accent s-radius s-p:30" s-appear in="top">
 *      I'm the appear element
 *  </div>
 * </div>
 *
 * @example         html            Right
 * <div class="s-ratio:16-9 s-width:50 s-bg:main-surface s-p:30 s-mbe:50">
 *   <div class="s-ratio:16-9 s-bg:accent s-color:accent s-radius s-p:30" s-appear in="right">
 *      I'm the appear element
 *  </div>
 * </div>
 *
 * @example         html            Left
 * <div class="s-ratio:16-9 s-width:50 s-bg:main-surface s-p:30 s-mbe:50">
 *   <div class="s-ratio:16-9 s-bg:accent s-color:accent s-radius s-p:30" s-appear in="left">
 *      I'm the appear element
 *  </div>
 * </div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISAppearFeatureProps {
    in: string | 'fade' | 'top' | 'right' | 'bottom' | 'left';
    out: string | 'fade' | 'top' | 'right' | 'bottom' | 'left';
    delay: number[];
    duration: number[];
    distance: number[];
    appear: boolean;
}

export default class SAppearFeature extends __SFeature {
    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-appear',
                    interface: __SAppearFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );

        // add the s-appear attribute if not present
        this.componentUtils.fastdom.mutate(() => {
            if (!this.node.hasAttribute('s-appear')) {
                this.node.setAttribute('s-appear', true);
            }
        });
    }

    async mount() {
        // check if the element is fully loaded (for images)
        switch (this.node.tagName.toLowerCase()) {
            case 'img':
                await __whenImageLoaded(this.node);
                this.appear();
                break;
            default:
                // get the images in the node
                const $imgs = this.node.querySelectorAll('img');
                if ($imgs.length) {
                    await __whenImagesLoaded($imgs);
                }
                this.appear();
                break;
        }
    }

    appear() {
        const appearId = __uniqid();
        let delay = this.props.delay[0];
        if (this.props.delay.length === 2) {
            const minDelay = this.props.delay[0],
                maxDelay = this.props.delay[1];
            delay = minDelay + (maxDelay - minDelay) * Math.random();
        }
        let duration = this.props.duration[0];
        if (this.props.duration.length === 2) {
            const minDuration = this.props.duration[0],
                maxDuration = this.props.duration[1];
            duration =
                minDuration + (maxDuration - minDuration) * Math.random();
        }

        let distance = this.props.distance[0];
        if (this.props.distance.length === 2) {
            const minDistance = this.props.distance[0],
                maxDistance = this.props.distance[1];
            distance =
                minDistance + (maxDistance - minDistance) * Math.random();
        }

        const sugarElement = new __SSugarElement(this.node);

        setTimeout(() => {
            this.props.appear = true;

            let distanceX = 0,
                distanceY = 0;

            switch (this.props.in) {
                case 'top':
                    distanceY = distance * -1;
                    break;
                case 'bottom':
                    distanceY = distance;
                    break;
                case 'left':
                    distanceX = distance * -1;
                    break;
                case 'right':
                    distanceX = distance;
                    break;
            }

            const newTransforms = sugarElement.simulateTransform({
                translateX: distanceX,
                translateY: distanceY,
            });

            const animationStr = `
                @keyframes s-appear-${appearId} {
                    from {
                        transform: ${newTransforms.matrix};
                        opacity: 0;
                    }
                    to {
                        transform: ${sugarElement.matrixStr};
                        opacity: 1;
                    }
                }
                [s-appear-id="${appearId}"] {
                    animation: s-appear-${appearId} ${
                duration / 1000
            }s ${__STheme.get('easing.default')} forwards;
                }
            `;

            // add style into the page and assign the animation to the node element
            const $style = __injectStyle(animationStr);
            this.node.setAttribute('s-appear-id', appearId);

            // after animation, remove the animation totally
            setTimeout(() => {
                this.node.removeAttribute('s-appear-id');
                $style.remove();
            }, duration);
        }, delay);
    }
}

export { __define as define };
