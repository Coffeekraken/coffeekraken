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
import { __deepMerge } from '@coffeekraken/sugar/object';
import __html2canvas from 'html2canvas';
import __SGlitchFeatureInterface from './interface/SGlitchFeatureInterface';
import __Glitch from './lib/Glitch';
// @ts-ignore
import __css from '../../../../src/css/s-glitch-feature.css'; // relative to /dist/pkg/esm/js
export default class SGlitchFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-glitch',
            interface: __SGlitchFeatureInterface,
            style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            const $canvas = document.createElement('div');
            $canvas.style.position = 'absolute';
            $canvas.style.top = 0;
            $canvas.style.left = 0;
            // $canvas.style.userSelect = 'none';
            // $canvas.style.pointerEvents = 'none';
            // $canvas.style.display = 'none';
            if (!['absolute', 'relative'].includes(this.node.style.position)) {
                this.node.style.position = 'relative';
            }
            this.node.appendChild($canvas);
            const res = yield __html2canvas(this.node, {
                backgroundColor: '#000000',
            });
            let image = new Image();
            image.src = res.toDataURL('image/jpeg');
            const glitch = new __Glitch(image, $canvas);
            glitch.on('start', () => {
                // $canvas.style.display = 'block';
            });
            glitch.on('stop', () => {
                // $canvas.style.display = 'none';
            });
            glitch.start();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLGFBQWEsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RSxPQUFPLFFBQVEsTUFBTSxjQUFjLENBQUM7QUFFcEMsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDBDQUEwQyxDQUFDLENBQUMsK0JBQStCO0FBb0Q3RixNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxVQUFVO0lBQ2xELGFBQWE7SUFDYixZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyxLQUFLLEVBQUUsS0FBSztTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUssS0FBSzs7WUFDUCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLHFDQUFxQztZQUNyQyx3Q0FBd0M7WUFDeEMsa0NBQWtDO1lBRWxDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7YUFDekM7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUvQixNQUFNLEdBQUcsR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUN2QyxlQUFlLEVBQUUsU0FBUzthQUM3QixDQUFDLENBQUM7WUFFSCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNwQixtQ0FBbUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ25CLGtDQUFrQztZQUN0QyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixDQUFDO0tBQUE7Q0FDSiJ9