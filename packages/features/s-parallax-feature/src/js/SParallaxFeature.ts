import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import * as __rematrix from 'rematrix';
import __SParallaxFeatureInterface from './interface/SParallaxFeatureInterface.js';

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
 * @import          import { define as __SParallaxFeatureDefine } from '@coffeekraken/s-parallax-feature';
 *
 * @snippet         __SParallaxFeatureDefine($1)
 *
 * @install         js
 * import { define as __SParallaxFeatureDefine } from '@coffeekraken/s-parallax-feature';
 * __SParallaxFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @example         html
 * <div class="s-position:relative" style="width:150px; height:150px;">
 *      <div s-parallax amount="0.1" class="s-ratio:1 s-radius s-bc:error" style="position:absolute; top:0; width:150px"></div>
 *      <div s-parallax amount="0.3" class="s-ratio:1 s-radius s-bc:complementary" style="position:absolute; top:0; width:150px"></div>
 *      <div s-parallax amount="0.5" class="s-ratio:1 s-radius s-bc:accent" style="position:absolute; top:0; width:150px"></div>
 * </div>
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
                    name: 's-parallax',
                    interface: __SParallaxFeatureInterface,
                },
                settings ?? {},
            ),
        );
    }
    mount() {
        const style = window.getComputedStyle(this.node);
        const transformStr = style.transform;
        this._originalTransform = transformStr;

        document.addEventListener('mousemove', (e) => {
            if (!this.utils.isActive()) {
                return;
            }
            // console.log('PARA', this.node);
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

        const finalRotateX =
            rotateX *
            parseFloat(amount) *
            parseFloat(this.props.amountX) *
            parseFloat(this.props.amountR) *
            parseFloat(this.props.amountRx);
        const finalRotateY =
            rotateY *
            parseFloat(amount) *
            parseFloat(this.props.amountY) *
            parseFloat(this.props.amountR) *
            parseFloat(this.props.amountRy);
        const finalRotateZ =
            rotateY *
            parseFloat(amount) *
            parseFloat(this.props.amountZ) *
            parseFloat(this.props.amountR) *
            parseFloat(this.props.amountRz);
        const finalOffsetX =
            offsetX *
            parseFloat(amount) *
            parseFloat(this.props.amountX) *
            parseFloat(this.props.amountT) *
            parseFloat(this.props.amountTx);
        const finalOffsetY =
            offsetY *
            parseFloat(amount) *
            parseFloat(this.props.amountY) *
            parseFloat(this.props.amountT) *
            parseFloat(this.props.amountTy);

        const tx = __rematrix.translateX(finalOffsetX),
            ty = __rematrix.translateY(finalOffsetY),
            rx = __rematrix.rotateX(finalRotateX),
            ry = __rematrix.rotateY(finalRotateY),
            rz = __rematrix.rotateZ(finalRotateZ);

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
