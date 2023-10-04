import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import * as __rematrix from 'rematrix';
import __SParallaxFeatureInterface from './interface/SParallaxFeatureInterface.js';
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
export default class SParallaxFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-parallax',
            interface: __SParallaxFeatureInterface,
        }, settings !== null && settings !== void 0 ? settings : {}));
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
        var _a;
        const rotateY = (90 / 100) * percentage.x;
        const rotateX = (90 / 100) * percentage.y;
        const offsetX = (200 / 100) * percentage.x;
        const offsetY = (200 / 100) * percentage.y;
        const amount = (_a = this.props.amount) !== null && _a !== void 0 ? _a : '1';
        const matrix = __rematrix.fromString(this._originalTransform);
        const finalRotateX = rotateX *
            parseFloat(amount) *
            parseFloat(this.props.amountX) *
            parseFloat(this.props.amountR) *
            parseFloat(this.props.amountRx);
        const finalRotateY = rotateY *
            parseFloat(amount) *
            parseFloat(this.props.amountY) *
            parseFloat(this.props.amountR) *
            parseFloat(this.props.amountRy);
        const finalRotateZ = rotateY *
            parseFloat(amount) *
            parseFloat(this.props.amountZ) *
            parseFloat(this.props.amountR) *
            parseFloat(this.props.amountRz);
        const finalOffsetX = offsetX *
            parseFloat(amount) *
            parseFloat(this.props.amountX) *
            parseFloat(this.props.amountT) *
            parseFloat(this.props.amountTx);
        const finalOffsetY = offsetY *
            parseFloat(amount) *
            parseFloat(this.props.amountY) *
            parseFloat(this.props.amountT) *
            parseFloat(this.props.amountTy);
        const tx = __rematrix.translateX(finalOffsetX), ty = __rematrix.translateY(finalOffsetY), rx = __rematrix.rotateX(finalRotateX), ry = __rematrix.rotateY(finalRotateY), rz = __rematrix.rotateZ(finalRotateZ);
        let newMatrix = [matrix, tx, ty, rx, ry].reduce(__rematrix.multiply);
        this.node.style.transform = __rematrix.toString(newMatrix);
        // this.node.style.transform = `translateX(calc(-50% + ${finalOffsetX}px)) translateY(${finalOffsetY}px) rotateX(${finalRotateX}deg) rotateY(${
        //     finalRotateY * -1
        // }deg) perspective(350px)`;
    }
    _getPositionPercentages(e) {
        var _a, _b, _c, _d;
        const viewportWidth = document.documentElement.clientWidth, viewportHeight = document.documentElement.clientHeight, halfViewportWidth = viewportWidth * 0.5, halfViewportHeight = viewportHeight * 0.5, positionX = (_b = (_a = e.touches) === null || _a === void 0 ? void 0 : _a[0].clientX) !== null && _b !== void 0 ? _b : e.pageX, positionY = ((_d = (_c = e.touches) === null || _c === void 0 ? void 0 : _c[0].clientY) !== null && _d !== void 0 ? _d : e.pageY) -
            document.documentElement.scrollTop, percentageX = (100 / halfViewportWidth) * (positionX - halfViewportWidth), percentageY = (100 / halfViewportHeight) * (positionY - halfViewportHeight);
        return {
            x: percentageX,
            y: percentageY,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEtBQUssVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLDJCQUEyQixNQUFNLDBDQUEwQyxDQUFDO0FBTW5GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQUlwRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksSUFBSSxFQUFFLFlBQVk7WUFDbEIsU0FBUyxFQUFFLDJCQUEyQjtTQUN6QyxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUNELEtBQUs7UUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztRQUV2QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ3hCLE9BQU87YUFDVjtZQUNELGtDQUFrQztZQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFD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