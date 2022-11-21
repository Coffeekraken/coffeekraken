import __SFeature from '@coffeekraken/s-feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import * as __rematrix from 'rematrix';
import __SParallaxFeatureInterface from './interface/SParallaxFeatureInterface';
import __define from './define';
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
export default class SParallaxFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-parallax',
            interface: __SParallaxFeatureInterface,
        }, settings !== null && settings !== void 0 ? settings : {}));
        if (!this._originalTransform) {
            const style = window.getComputedStyle(this.node);
            const transformStr = style.transform;
            this._originalTransform = transformStr;
        }
    }
    mount() {
        document.addEventListener('mousemove', (e) => {
            if (!this.componentUtils.isInViewport())
                return;
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
        const finalRotateY = rotateY *
            parseFloat(amount) *
            parseFloat(this.props.amountY) *
            parseFloat(this.props.amountRotateY);
        const finalRotateX = rotateX *
            parseFloat(amount) *
            parseFloat(this.props.amountX) *
            parseFloat(this.props.amountRotateX);
        const finalOffsetX = offsetX *
            parseFloat(amount) *
            parseFloat(this.props.amountX) *
            parseFloat(this.props.amountTranslateX);
        const finalOffsetY = offsetY *
            parseFloat(amount) *
            parseFloat(this.props.amountY) *
            parseFloat(this.props.amountTranslateY);
        const tx = __rematrix.translateX(finalOffsetX), ty = __rematrix.translateY(finalOffsetY), rx = __rematrix.rotateX(finalRotateX), ry = __rematrix.rotateY(finalRotateY);
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
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEtBQUssVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBRWhGLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQU1oQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQUlwRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksSUFBSSxFQUFFLFlBQVk7WUFDbEIsU0FBUyxFQUFFLDJCQUEyQjtTQUN6QyxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztTQUMxQztJQUNMLENBQUM7SUFDRCxLQUFLO1FBQ0QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFBRSxPQUFPO1lBRWhELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyx1QkFB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