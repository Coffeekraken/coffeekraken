import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SParallaxFeatureInterface from './interface/SParallaxFeatureInterface';
import __getTransformProperties from '@coffeekraken/sugar/js/dom/style/getTransformProperties';
import * as __rematrix from 'rematrix';
import __throttle from '@coffeekraken/sugar/shared/function/throttle';

export interface ISParallaxFeatureProps {
    amount: number;
}

/**
 * @name            SParallaxFeature
 * @as              Parallax
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SParallaxFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-parallax-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to easily apply some parallax effect to any HTMLElement items you want.
 *
 * @feature         Specify the amount of parallax you want
 * @feature         Specify amount for X and Y separately
 * @feature         Keep your original transforms
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html
 * <div s-parallax amount="0.1">I will move on mousemove</div>
 * <div s-parallax amount="0.3">I will move on mousemove</div>
 * <div s-parallax amount="0.5">I will move on mousemove</div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SParallaxFeature extends __SFeature implements ISFeature {
    _matrix;
    _originalTransform;

    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    componentUtils: {
                        interface: __SParallaxFeatureInterface,
                    },
                    feature: {},
                },
                settings ?? {},
            ),
        );

        const style = window.getComputedStyle(this.node);
        const transformStr = style.transform;
        this._originalTransform = transformStr;
    }
    mount() {
        document.addEventListener('mousemove', (e) => {
            if (!this.componentUtils.isInViewport()) return;

            const percentage = this._getPositionPercentages(e);
            this._setLayerTransform(percentage);
        });
    }

    _setLayerTransform(percentage) {
        const rotateY = (90 / 100) * percentage.x;
        const rotateX = (90 / 100) * percentage.y;
        const offsetX = (200 / 100) * percentage.x;
        const offsetY = (200 / 100) * percentage.y;
        const amount = this.props.amount ?? '1';

        const matrix = __rematrix.fromString(this._originalTransform);

        const finalRotateY =
            rotateY *
            parseFloat(amount) *
            parseFloat(this.props.amountY) *
            parseFloat(this.props.amountRotateY);
        const finalRotateX =
            rotateX *
            parseFloat(amount) *
            parseFloat(this.props.amountX) *
            parseFloat(this.props.amountRotateX);
        const finalOffsetX =
            offsetX *
            parseFloat(amount) *
            parseFloat(this.props.amountX) *
            parseFloat(this.props.amountTranslateX);
        const finalOffsetY =
            offsetY *
            parseFloat(amount) *
            parseFloat(this.props.amountY) *
            parseFloat(this.props.amountTranslateY);

        const tx = __rematrix.translateX(finalOffsetX),
            ty = __rematrix.translateY(finalOffsetY),
            rx = __rematrix.rotateX(finalRotateX),
            ry = __rematrix.rotateY(finalRotateY);

        let newMatrix = [matrix, tx, ty, rx, ry].reduce(__rematrix.multiply);

        this.node.style.transform = __rematrix.toString(newMatrix);

        // this.node.style.transform = `translateX(calc(-50% + ${finalOffsetX}px)) translateY(${finalOffsetY}px) rotateX(${finalRotateX}deg) rotateY(${
        //     finalRotateY * -1
        // }deg) perspective(350px)`;
    }

    _getPositionPercentages(e) {
        const viewportWidth = document.documentElement.clientWidth,
            viewportHeight = document.documentElement.clientHeight,
            halfViewportWidth = viewportWidth * 0.5,
            halfViewportHeight = viewportHeight * 0.5,
            positionX = e.touches?.[0].clientX ?? e.pageX,
            positionY =
                (e.touches?.[0].clientY ?? e.pageY) -
                document.documentElement.scrollTop,
            percentageX =
                (100 / halfViewportWidth) * (positionX - halfViewportWidth),
            percentageY =
                (100 / halfViewportHeight) * (positionY - halfViewportHeight);
        return {
            x: percentageX,
            y: percentageY,
        };
    }
}

export function define(
    props: Partial<ISParallaxFeatureProps> = {},
    name = 's-parallax',
) {
    __SFeature.defineFeature(name, SParallaxFeature, props);
}
