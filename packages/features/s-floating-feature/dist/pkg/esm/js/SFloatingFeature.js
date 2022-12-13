import __SFeature from '@coffeekraken/s-feature';
import { __makeFloat } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SFloatingFeatureInterface from './interface/SFloatingFeatureInterface';
import __define from './define';
// @ts-ignore
import __css from '../../../../src/css/s-floating-feature.css'; // relative to /dist/pkg/esm/js
export default class SFloatingFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-floating',
            interface: __SFloatingFeatureInterface,
            style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
        // handle ref
        if (!this.props.ref) {
            this._$ref = this.node.parentElement;
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
        __makeFloat(this.node, this._$ref, this.props);
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTywyQkFBMkIsTUFBTSx1Q0FBdUMsQ0FBQztBQUVoRixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEMsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDRDQUE0QyxDQUFDLENBQUMsK0JBQStCO0FBb0MvRixNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLFVBQVU7SUFHcEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsWUFBWTtZQUNsQixTQUFTLEVBQUUsMkJBQTJCO1lBQ3RDLEtBQUssRUFBRSxLQUFLO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUN4QzthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkQ7SUFDTCxDQUFDO0lBRUQsS0FBSztRQUNELGtFQUFrRTtRQUNsRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUM1QztRQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQUVELE9BQU8sRUFBRSxRQUFRLElBQUksTUFBTSxFQUFFLENBQUMifQ==