"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const when_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/when"));
const whenNearViewport_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/whenNearViewport"));
const querySelectorLive_1 = __importDefault(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SDepsFeatureInterface_1 = __importDefault(require("./interface/SDepsFeatureInterface"));
class SDepsFeature extends s_feature_1.default {
    static registerDeps(selector, props = {}) {
        (0, querySelectorLive_1.default)(selector, ($elm) => __awaiter(this, void 0, void 0, function* () {
            // wait for element to be near the viewport
            yield (0, whenNearViewport_1.default)($elm);
            // process passed props
            props = SDepsFeatureInterface_1.default.apply(props !== null && props !== void 0 ? props : {});
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
        super(name, node, (0, deepMerge_1.default)({
            name: 's-deps',
            interface: SDepsFeatureInterface_1.default,
            // style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // wait until visible
            yield (0, when_1.default)(this.node, ['visible', 'nearViewport']);
            // handle partial stylesheet loading
            // @ts-ignore
            SDepsFeature._handleDepsForElement(this.node, this.props);
        });
    }
}
exports.default = SDepsFeature;
function define(props = {}, name = 's-deps') {
    s_feature_1.default.defineFeature(name, SDepsFeature, Object.assign({ mountWhen: 'nearViewport' }, props));
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxrRkFBNEQ7QUFDNUQsMEdBQW9GO0FBQ3BGLDJHQUFxRjtBQUNyRiw0RkFBc0U7QUFDdEUsOEZBQXdFO0FBeUN4RSxNQUFxQixZQUFhLFNBQVEsbUJBQVU7SUFDaEQsTUFBTSxDQUFDLFlBQVksQ0FDZixRQUFnQixFQUNoQixRQUFxQyxFQUFFO1FBRXZDLElBQUEsMkJBQW1CLEVBQUMsUUFBUSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7WUFDekMsMkNBQTJDO1lBQzNDLE1BQU0sSUFBQSwwQkFBa0IsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUUvQix1QkFBdUI7WUFDdkIsS0FBSyxHQUFHLCtCQUF1QixDQUFDLEtBQUssQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUMsQ0FBQztZQUVuRCxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLHdCQUF3QixDQUMzQixJQUFpQixFQUNqQixRQUFxQyxFQUFFO1FBRXZDLDZDQUE2QztRQUM3QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNwQyxvQkFBb0IsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUNwQyxDQUFDO1FBQ0YsSUFBSSxTQUFTLEVBQUU7WUFDWCxPQUFPO1NBQ1Y7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2pDLGFBQWE7UUFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLGdCQUFnQixJQUFJLE1BQU0sQ0FBQztTQUM5QjtRQUNELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDeEMsYUFBYTtRQUNiLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsWUFBWSxDQUNkLE1BQU0sRUFDTixHQUFHLEtBQUssQ0FBQyxlQUFlLElBQUksZ0JBQWdCLEVBQUUsQ0FDakQsQ0FBQztRQUVGLG1DQUFtQztRQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMscUJBQXFCLENBQ3hCLElBQWlCLEVBQ2pCLFFBQXFDLEVBQUU7UUFFdkMsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFRCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsbUJBQVcsRUFDUDtZQUNJLElBQUksRUFBRSxRQUFRO1lBQ2QsU0FBUyxFQUFFLCtCQUF1QjtZQUNsQyxnQkFBZ0I7U0FDbkIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFSyxLQUFLOztZQUNQLHFCQUFxQjtZQUNyQixNQUFNLElBQUEsY0FBTSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUVyRCxvQ0FBb0M7WUFDcEMsYUFBYTtZQUNiLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDO0tBQUE7Q0FDSjtBQXZGRCwrQkF1RkM7QUFFRCxTQUFnQixNQUFNLENBQ2xCLFFBQXFDLEVBQUUsRUFDdkMsSUFBSSxHQUFHLFFBQVE7SUFFZixtQkFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsWUFBWSxrQkFDdkMsU0FBUyxFQUFFLGNBQWMsSUFDdEIsS0FBSyxFQUNWLENBQUM7QUFDUCxDQUFDO0FBUkQsd0JBUUMifQ==