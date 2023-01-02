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
import __SHighlightFeatureInterface from './interface/SHighlightFeatureInterface';
import __define from './define';
// @ts-ignore
import __css from '../../../../src/css/s-highlight-feature.css'; // relative to /dist/pkg/esm/js
export default class SHighlightFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-highlight',
            interface: __SHighlightFeatureInterface,
            style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.size) {
                this.node.style.setProperty('--s-highlight-size', `${this.props.size}px`);
            }
            if (this.props.intensity) {
                this.node.style.setProperty('--s-highlight-intensity', this.props.intensity);
            }
            ['mouseover', 'pointerover'].forEach((eventName) => {
                this.node.addEventListener(eventName, (e) => {
                    if (!this.componentUtils.isActive()) {
                        return;
                    }
                    this.node.classList.add('highlight');
                });
            });
            ['mouseout', 'pointerout'].forEach((eventName) => {
                this.node.addEventListener(eventName, (e) => {
                    if (!this.componentUtils.isActive()) {
                        return;
                    }
                    this.node.classList.remove('highlight');
                });
            });
            ['mousemove', 'touchmove'].forEach((eventName) => {
                this.node.addEventListener(eventName, (e) => {
                    if (!this.componentUtils.isActive()) {
                        return;
                    }
                    const rect = this.node.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
                    this.node.style.setProperty('--s-highlight-mouse-x', `${x}px`);
                    this.node.style.setProperty('--s-highlight-mouse-y', `${y}px`);
                });
            });
        });
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLDRCQUE0QixNQUFNLHdDQUF3QyxDQUFDO0FBRWxGLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sNkNBQTZDLENBQUMsQ0FBQywrQkFBK0I7QUF3Q2hHLE1BQU0sQ0FBQyxPQUFPLE9BQU8saUJBQWtCLFNBQVEsVUFBVTtJQUNyRCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcsQ0FDUDtZQUNJLElBQUksRUFBRSxhQUFhO1lBQ25CLFNBQVMsRUFBRSw0QkFBNEI7WUFDdkMsS0FBSyxFQUFFLEtBQUs7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVLLEtBQUs7O1lBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUN2QixvQkFBb0IsRUFDcEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUN6QixDQUFDO2FBQ0w7WUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO2dCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQ3ZCLHlCQUF5QixFQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDdkIsQ0FBQzthQUNMO1lBRUQsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUNqQyxPQUFPO3FCQUNWO29CQUNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDakMsT0FBTztxQkFDVjtvQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ2pDLE9BQU87cUJBQ1Y7b0JBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUMxQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxFQUN6QixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUU3QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRSxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0o7QUFFRCxPQUFPLEVBQUUsUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFDIn0=