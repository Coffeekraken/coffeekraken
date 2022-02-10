import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SParallaxFeatureInterface from './interface/SParallaxFeatureInterface';
import * as __rematrix from 'rematrix';
import __throttle from '@coffeekraken/sugar/shared/function/throttle';
/**
 * @name            SParallaxFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SParallaxFeatureInterface.js
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SParallaxFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            componentUtils: {
                interface: __SParallaxFeatureInterface,
            },
            feature: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        const style = window.getComputedStyle(this.node);
        const transformStr = style.transform;
        this._originalTransform = transformStr;
    }
    mount() {
        const transformFn = __throttle((e) => { }, 0);
        document.addEventListener('mousemove', (e) => {
            if (!this.componentUtils.isInViewport())
                return;
            const percentage = this._getPositionPercentages(e);
            this._setLayerTransform(percentage);
            // transformFn(e);
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
export function define(props = {}, name = 's-parallax') {
    __SFeature.defineFeature(name, SParallaxFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BhcmFsbGF4RmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQYXJhbGxheEZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFFaEYsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxVQUFVLE1BQU0sOENBQThDLENBQUM7QUFNdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQUlwRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSwyQkFBMkI7YUFDekM7WUFDRCxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztJQUMzQyxDQUFDO0lBQ0QsS0FBSztRQUNELE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTdDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxD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