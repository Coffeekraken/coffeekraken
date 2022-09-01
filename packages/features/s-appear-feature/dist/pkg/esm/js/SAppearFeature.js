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
import __imageLoaded from '@coffeekraken/sugar/js/dom/load/imageLoaded';
import __imagesLoaded from '@coffeekraken/sugar/js/dom/load/imagesLoaded';
import __appendStyleTag from '@coffeekraken/sugar/js/dom/tag/appendStyleTag';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __SAppearFeatureInterface from './interface/SAppearFeatureInterface';
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
            this.node.setAttribute('s-appear', true);
        }
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // check if the element is fully loaded (for images)
            switch (this.node.tagName.toLowerCase()) {
                case 'img':
                    yield __imageLoaded(this.node);
                    this.appear();
                    break;
                default:
                    // get the images in the node
                    const $imgs = this.node.querySelectorAll('img');
                    if ($imgs.length) {
                        yield __imagesLoaded($imgs);
                    }
                    this.appear();
                    break;
            }
        });
    }
    appear() {
        if (this.node.id === 'features-frontend') {
            console.log('APPEAR');
        }
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
            const $style = __appendStyleTag(animationStr);
            this.node.setAttribute('s-appear-id', appearId);
            // after animation, remove the animation totally
            setTimeout(() => {
                this.node.removeAttribute('s-appear-id');
                $style.remove();
            }, duration);
        }, delay);
    }
}
export function define(props = {}, name = 's-appear') {
    __SFeature.defineFeature(name, SAppearFeature, Object.assign({ mountWhen: 'entersViewport' }, props));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sYUFBYSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hFLE9BQU8sY0FBYyxNQUFNLDhDQUE4QyxDQUFDO0FBQzFFLE9BQU8sZ0JBQWdCLE1BQU0sK0NBQStDLENBQUM7QUFDN0UsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUFRLE1BQU0sMENBQTBDLENBQUM7QUFDaEUsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RSxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMENBQTBDLENBQUMsQ0FBQywrQkFBK0I7QUE2RDdGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBZSxTQUFRLFVBQVU7SUFDbEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsVUFBVTtZQUNoQixTQUFTLEVBQUUseUJBQXlCO1lBQ3BDLEtBQUssRUFBRSxLQUFLO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVLLEtBQUs7O1lBQ1Asb0RBQW9EO1lBQ3BELFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3JDLEtBQUssS0FBSztvQkFDTixNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxNQUFNO2dCQUNWO29CQUNJLDZCQUE2QjtvQkFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUNkLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMvQjtvQkFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsTUFBTTthQUNiO1FBQ0wsQ0FBQztLQUFBO0lBRUQsTUFBTTtRQUNGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssbUJBQW1CLEVBQUU7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QjtRQUVELE1BQU0sUUFBUSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDaEMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEtBQUssR0FBRyxRQUFRLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUN0QyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsUUFBUTtnQkFDSixXQUFXLEdBQUcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUN0QyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsUUFBUTtnQkFDSixXQUFXLEdBQUcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pFO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFekIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUNiLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFFbEIsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDbkIsS0FBSyxLQUFLO29CQUNOLFNBQVMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1YsS0FBSyxRQUFRO29CQUNULFNBQVMsR0FBRyxRQUFRLENBQUM7b0JBQ3JCLE1BQU07Z0JBQ1YsS0FBSyxNQUFNO29CQUNQLFNBQVMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1YsS0FBSyxPQUFPO29CQUNSLFNBQVMsR0FBRyxRQUFRLENBQUM7b0JBQ3JCLE1BQU07YUFDYjtZQUVELE1BQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDakQsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFVBQVUsRUFBRSxTQUFTO2FBQ3hCLENBQUMsQ0FBQztZQUVILE1BQU0sWUFBWSxHQUFHO3NDQUNLLFFBQVE7O3FDQUVULGFBQWEsQ0FBQyxNQUFNOzs7O3FDQUlwQixZQUFZLENBQUMsU0FBUzs7OztnQ0FJM0IsUUFBUTswQ0FDRSxRQUFRLElBQ2xDLFFBQVEsR0FBRyxJQUNmLEtBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzs7YUFFbEMsQ0FBQztZQUVGLHVFQUF1RTtZQUN2RSxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFaEQsZ0RBQWdEO1lBQ2hELFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FDbEIsUUFBdUMsRUFBRSxFQUN6QyxJQUFJLEdBQUcsVUFBVTtJQUVqQixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxjQUFjLGtCQUN6QyxTQUFTLEVBQUUsZ0JBQWdCLElBQ3hCLEtBQUssRUFDVixDQUFDO0FBQ1AsQ0FBQyJ9