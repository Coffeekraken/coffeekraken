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
import __when from '@coffeekraken/sugar/js/dom/detect/when';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDepsFeatureInterface from './interface/SDepsFeatureInterface';
export default class SDepsFeature extends __SFeature {
    static registerDeps(selector, props = {}) {
        __querySelectorLive(selector, ($elm) => __awaiter(this, void 0, void 0, function* () {
            // wait for element to be near the viewport
            yield __whenNearViewport($elm);
            // process passed props
            props = __SDepsFeatureInterface.apply(props !== null && props !== void 0 ? props : {});
            // handle dependencies
            this._handleDepsForElement($elm, props);
        }));
    }
    /**
     * Handle css dependencies for the passed element
     */
    static _handleCssDepsForElement($elm, props = {}) {
        // check if a partial already exists for this
        const $existing = document.querySelector(`link[s-deps-css="${props.css}"]`);
        if ($existing) {
            return;
        }
        // create a new link to add in the head
        let finalPartialPath = props.css;
        // @ts-ignore
        if (!finalPartialPath.match(/\.css$/)) {
            finalPartialPath += '.css';
        }
        const $link = document.createElement('link');
        $link.setAttribute('rel', 'stylesheet');
        // @ts-ignore
        $link.setAttribute('s-deps-css', props.css);
        $link.setAttribute('href', `${props.cssPartialsPath}/${finalPartialPath}`);
        // add the link in the head section
        document.head.appendChild($link);
    }
    /**
     * Load a partial if needed
     */
    static _handleDepsForElement($elm, props = {}) {
        if (props.css) {
            this._handleCssDepsForElement($elm, props);
        }
    }
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-deps',
            interface: __SDepsFeatureInterface,
            // style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // wait until visible
            yield __when(this.node, ['visible', 'nearViewport']);
            // handle partial stylesheet loading
            // @ts-ignore
            SDepsFeature._handleDepsForElement(this.node, this.props);
        });
    }
}
export function define(props = {}, name = 's-deps') {
    __SFeature.defineFeature(name, SDepsFeature, Object.assign({ mountWhen: 'nearViewport' }, props));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sTUFBTSxNQUFNLHdDQUF3QyxDQUFDO0FBQzVELE9BQU8sa0JBQWtCLE1BQU0sb0RBQW9ELENBQUM7QUFDcEYsT0FBTyxtQkFBbUIsTUFBTSxvREFBb0QsQ0FBQztBQUNyRixPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLHVCQUF1QixNQUFNLG1DQUFtQyxDQUFDO0FBeUN4RSxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxVQUFVO0lBQ2hELE1BQU0sQ0FBQyxZQUFZLENBQ2YsUUFBZ0IsRUFDaEIsUUFBcUMsRUFBRTtRQUV2QyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRTtZQUN6QywyQ0FBMkM7WUFDM0MsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUvQix1QkFBdUI7WUFDdkIsS0FBSyxHQUFHLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUMsQ0FBQztZQUVuRCxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLHdCQUF3QixDQUMzQixJQUFpQixFQUNqQixRQUFxQyxFQUFFO1FBRXZDLDZDQUE2QztRQUM3QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyxvQkFBb0IsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUNwQyxDQUFDO1FBQ0YsSUFBSSxTQUFTLEVBQUU7WUFDWCxPQUFPO1NBQ1Y7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2pDLGFBQWE7UUFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLGdCQUFnQixJQUFJLE1BQU0sQ0FBQztTQUM5QjtRQUNELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDeEMsYUFBYTtRQUNiLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsWUFBWSxDQUNkLE1BQU0sRUFDTixHQUFHLEtBQUssQ0FBQyxlQUFlLElBQUksZ0JBQWdCLEVBQUUsQ0FDakQsQ0FBQztRQUVGLG1DQUFtQztRQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMscUJBQXFCLENBQ3hCLElBQWlCLEVBQ2pCLFFBQXFDLEVBQUU7UUFFdkMsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFRCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcsQ0FDUDtZQUNJLElBQUksRUFBRSxRQUFRO1lBQ2QsU0FBUyxFQUFFLHVCQUF1QjtZQUNsQyxnQkFBZ0I7U0FDbkIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFSyxLQUFLOztZQUNQLHFCQUFxQjtZQUNyQixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFFckQsb0NBQW9DO1lBQ3BDLGFBQWE7WUFDYixZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQztLQUFBO0NBQ0o7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUNsQixRQUFxQyxFQUFFLEVBQ3ZDLElBQUksR0FBRyxRQUFRO0lBRWYsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxrQkFDdkMsU0FBUyxFQUFFLGNBQWMsSUFDdEIsS0FBSyxFQUNWLENBQUM7QUFDUCxDQUFDIn0=