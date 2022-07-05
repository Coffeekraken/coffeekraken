import __SFeature from '@coffeekraken/s-feature';
import __imageLoaded from '@coffeekraken/sugar/js/dom/load/imageLoaded';
import __imagesLoaded from '@coffeekraken/sugar/js/dom/load/imagesLoaded';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SAppearFeatureInterface from './interface/SAppearFeatureInterface';

// @ts-ignore
import __css from '../../../../src/css/s-appear-feature.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SAppearFeature
 * @as              Floating elements
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
 * @example         html            Email field
 * <div class="s-ratio:16-9 s-width:50 s-bg:main-surface s-p:30">
 *   Floating element preview. Try to scroll...
 *   <div class="s-ratio:16-9 s-bg:accent s-color:accent s-radius s-p:30" s-appear>
 *      I'm the appear element
 *  </div>
 * </div>
 * <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
 * <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISAppearFeatureProps {
    in: string | 'fade';
    out: string | 'fade';
    delay: number;
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
                    interface: __SAppearFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );

        // adding the s-appear class to the node
        this.node.classList.add('s-appear');

        // add the s-appear attribute if not present
        if (!this.node.hasAttribute('s-appear')) {
            this.node.setAttribute('s-appear', true);
        }
    }

    async mount() {
        // check if the element is fully loaded (for images)
        switch (this.node.tagName.toLowerCase()) {
            case 'img':
                await __imageLoaded(this.node);
                this.appear();
                break;
            default:
                // get the images in the node
                const $imgs = this.node.querySelectorAll('img');
                if ($imgs.length) {
                    await __imagesLoaded($imgs);
                }
                this.appear();
                break;
        }
    }

    appear() {
        setTimeout(() => {
            this.props.appear = true;
        }, this.props.delay ?? 0);
    }
}

export function define(
    props: Partial<ISAppearFeatureProps> = {},
    name = 's-appear',
) {
    __SFeature.defineFeature(name, SAppearFeature, {
        mountWhen: 'entersViewport',
        ...props,
    });
}
