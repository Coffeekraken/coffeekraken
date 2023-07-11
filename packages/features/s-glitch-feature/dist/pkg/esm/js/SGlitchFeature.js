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
import __SGlitchFeatureInterface from './interface/SGlitchFeatureInterface.js';
import __Glitch from './lib/Glitch.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLGFBQWEsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyx5QkFBeUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUV2QyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMENBQTBDLENBQUMsQ0FBQywrQkFBK0I7QUFvRDdGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBZSxTQUFRLFVBQVU7SUFDbEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsVUFBVTtZQUNoQixTQUFTLEVBQUUseUJBQXlCO1lBQ3BDLEtBQUssRUFBRSxLQUFLO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFSyxLQUFLOztZQUNQLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDdkIscUNBQXFDO1lBQ3JDLHdDQUF3QztZQUN4QyxrQ0FBa0M7WUFFbEMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQzthQUN6QztZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9CLE1BQU0sR0FBRyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ3ZDLGVBQWUsRUFBRSxTQUFTO2FBQzdCLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ3BCLG1DQUFtQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDbkIsa0NBQWtDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLENBQUM7S0FBQTtDQUNKIn0=