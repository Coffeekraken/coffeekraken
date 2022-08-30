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
import __SCssFeatureInterface from './interface/SCssFeatureInterface';
export default class SCssFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-css',
            interface: __SCssFeatureInterface,
            // style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // handle partial stylesheet loading
            if (this.props.partial) {
                this._handlePartial();
            }
        });
    }
    /**
     * Load a partial if needed
     */
    _handlePartial() {
        // check if a partial already exists for this
        const $existing = document.querySelector(`link[partial="${this.props.partial}"]`);
        if ($existing) {
            return;
        }
        // create a new link to add in the head
        let finalPartialPath = this.props.partial;
        if (!finalPartialPath.match(/\.css$/)) {
            finalPartialPath += '.css';
        }
        const $link = document.createElement('link');
        $link.setAttribute('rel', 'stylesheet');
        $link.setAttribute('partial', this.props.partial);
        $link.setAttribute('href', `${this.props.partialsPath}/${finalPartialPath}`);
        // add the link in the head section
        document.head.appendChild($link);
    }
}
export function define(props = {}, name = 's-css') {
    __SFeature.defineFeature(name, SCssFeature, Object.assign({ mountWhen: 'nearViewport' }, props));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sc0JBQXNCLE1BQU0sa0NBQWtDLENBQUM7QUFzQ3RFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLFVBQVU7SUFDL0MsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxzQkFBc0I7WUFDakMsZ0JBQWdCO1NBQ25CLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUssS0FBSzs7WUFDUCxvQ0FBb0M7WUFDcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1YsNkNBQTZDO1FBQzdDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLGlCQUFpQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUMxQyxDQUFDO1FBQ0YsSUFBSSxTQUFTLEVBQUU7WUFDWCxPQUFPO1NBQ1Y7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLGdCQUFnQixJQUFJLE1BQU0sQ0FBQztTQUM5QjtRQUNELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDeEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxLQUFLLENBQUMsWUFBWSxDQUNkLE1BQU0sRUFDTixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLGdCQUFnQixFQUFFLENBQ25ELENBQUM7UUFFRixtQ0FBbUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFvQyxFQUFFLEVBQUUsSUFBSSxHQUFHLE9BQU87SUFDekUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxrQkFDdEMsU0FBUyxFQUFFLGNBQWMsSUFDdEIsS0FBSyxFQUNWLENBQUM7QUFDUCxDQUFDIn0=