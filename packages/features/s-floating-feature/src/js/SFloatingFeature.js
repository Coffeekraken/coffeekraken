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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
// @ts-ignore
import __css from '../css/s-floating-feature.css';
import __SFloatingFeatureInterface from './interface/SFloatingFeatureInterface';
import { computePosition, flip, shift, offset, arrow, getScrollParents, autoPlacement, inline } from '@floating-ui/dom';
export default class SFloatingFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            componentUtils: {
                interface: __SFloatingFeatureInterface,
                style: __css,
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        // adding the s-floating class to the node
        this.node.classList.add('s-floating');
        // handle ref
        if (!this.props.ref) {
            this._$ref = this.node.previousElementSibling;
        }
        else {
            this._$ref = document.querySelector(this.props.ref);
        }
    }
    mount() {
        // handling offset when an arrow is wanted and no offset specified
        if (this.props.offset === undefined && this.props.arrow) {
            this.props.offset = this.props.arrowSize;
        }
        // preparing middlewares
        const middlewares = [offset(this.props.offset), shift({
                padding: this.props.shift
            }), inline()];
        // check the placement
        if (this.props.placement !== 'auto') {
            middlewares.push(flip());
        }
        else {
            middlewares.push(autoPlacement());
        }
        // handling arrow injection
        let $arrow;
        if (this.props.arrow) {
            $arrow = document.createElement('div');
            $arrow.classList.add('s-floating__arrow');
            this.node.append($arrow);
            middlewares.push(arrow({
                element: $arrow,
                padding: this.props.arrowPadding
            }));
        }
        // setting the arrow size through a css property
        if (this.props.arrowSize) {
            this.node.style.setProperty(`--arrow-size`, `${this.props.arrowSize}px`);
        }
        // updating routine
        const update = () => __awaiter(this, void 0, void 0, function* () {
            const { x, y, placement, middlewareData } = yield computePosition(this._$ref, this.node, {
                placement: this.props.placement,
                middleware: middlewares,
            });
            Object.assign(this.node.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
            // handle arrow position
            if ($arrow) {
                // Accessing the data
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]];
                Object.assign($arrow.style, {
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: `${this.props.arrowSize * .5 * -1}px`,
                });
            }
        });
        // first update
        update();
        // update when parent scrolling element resize or scroll
        [
            ...getScrollParents(this._$ref),
            ...getScrollParents(this.node),
        ].forEach((el) => {
            el.addEventListener('scroll', update);
            el.addEventListener('resize', update);
        });
    }
}
export function define(props = {}, name = 's-floating') {
    __SFeature.defineFeature(name, SFloatingFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zsb2F0aW5nRmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGbG9hdGluZ0ZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLCtCQUErQixDQUFDO0FBQ2xELE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFFaEYsT0FBTyxFQUFDLGVBQWUsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsZ0JBQWdCLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBaUMvRyxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLFVBQVU7SUFJcEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLDJCQUEyQjtnQkFDdEMsS0FBSyxFQUFFLEtBQUs7YUFDZjtTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRiwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXRDLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1NBQ2pEO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtB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