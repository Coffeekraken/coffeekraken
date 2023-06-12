var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFeature from '@coffeekraken/s-feature';
import __SSugarElement from '@coffeekraken/s-sugar-element';
import __STheme from '@coffeekraken/s-theme';
import { __injectStyle, __whenImageLoaded, __whenImagesLoaded, } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';
import __SAppearFeatureInterface from './interface/SAppearFeatureInterface';
import __define from './define';
// @ts-ignore
import __css from '../../../../src/css/s-appear-feature.css'; // relative to /dist/pkg/esm/js
export default class SAppearFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-appear',
            interface: __SAppearFeatureInterface,
            style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
        // add the s-appear attribute if not present
        if (!this.node.hasAttribute('s-appear')) {
            this.node.setAttribute('s-appear', 'true');
        }
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // check if the element is fully loaded (for images)
            switch (this.node.tagName.toLowerCase()) {
                case 'img':
                    yield __whenImageLoaded(this.node);
                    this.appear();
                    break;
                default:
                    // get the images in the node
                    const $imgs = this.node.querySelectorAll('img');
                    if ($imgs.length) {
                        yield __whenImagesLoaded($imgs);
                    }
                    this.appear();
                    break;
            }
        });
    }
    appear() {
        const appearId = __uniqid();
        let delay = this.props.delay[0];
        if (this.props.delay.length === 2) {
            const minDelay = this.props.delay[0], maxDelay = this.props.delay[1];
            delay = minDelay + (maxDelay - minDelay) * Math.random();
        }
        let duration = this.props.duration[0];
        if (this.props.duration.length === 2) {
            const minDuration = this.props.duration[0], maxDuration = this.props.duration[1];
            duration =
                minDuration + (maxDuration - minDuration) * Math.random();
        }
        let distance = this.props.distance[0];
        if (this.props.distance.length === 2) {
            const minDistance = this.props.distance[0], maxDistance = this.props.distance[1];
            distance =
                minDistance + (maxDistance - minDistance) * Math.random();
        }
        const sugarElement = new __SSugarElement(this.node);
        setTimeout(() => {
            this.props.appear = true;
            let distanceX = 0, distanceY = 0;
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
                    animation: s-appear-${appearId} ${duration / 1000}s ${__STheme.get('easing.default')} forwards;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFDSCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGtCQUFrQixHQUNyQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RSxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEMsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDBDQUEwQyxDQUFDLENBQUMsK0JBQStCO0FBd0U3RixNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxVQUFVO0lBQ2xELGFBQWE7SUFDYixZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyxLQUFLLEVBQUUsS0FBSztTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFSyxLQUFLOztZ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