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
const object_1 = require("@coffeekraken/sugar/object");
const html2canvas_1 = __importDefault(require("html2canvas"));
const SGlitchFeatureInterface_1 = __importDefault(require("./interface/SGlitchFeatureInterface"));
const Glitch_1 = __importDefault(require("./lib/Glitch"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// @ts-ignore
const s_glitch_feature_css_1 = __importDefault(require("../../../../src/css/s-glitch-feature.css")); // relative to /dist/pkg/esm/js
class SGlitchFeature extends s_feature_1.default {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, (0, object_1.__deepMerge)({
            name: 's-glitch',
            interface: SGlitchFeatureInterface_1.default,
            style: s_glitch_feature_css_1.default,
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
            const res = yield (0, html2canvas_1.default)(this.node, {
                backgroundColor: '#000000',
            });
            let image = new Image();
            image.src = res.toDataURL('image/jpeg');
            const glitch = new Glitch_1.default(image, $canvas);
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
exports.default = SGlitchFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCx1REFBeUQ7QUFDekQsOERBQXdDO0FBQ3hDLGtHQUE0RTtBQUM1RSwwREFBb0M7QUFFcEMsc0RBQWdDO0FBNkZYLGlCQTdGZCxnQkFBUSxDQTZGWTtBQTNGM0IsYUFBYTtBQUNiLG9HQUE2RCxDQUFDLCtCQUErQjtBQXlDN0YsTUFBcUIsY0FBZSxTQUFRLG1CQUFVO0lBQ2xELGFBQWE7SUFDYixZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osSUFBQSxvQkFBVyxFQUNQO1lBQ0ksSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLGlDQUF5QjtZQUNwQyxLQUFLLEVBQUUsOEJBQUs7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVLLEtBQUs7O1lBQ1AsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUN2QixxQ0FBcUM7WUFDckMsd0NBQXdDO1lBQ3hDLGtDQUFrQztZQUVsQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO2FBQ3pDO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFL0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFBLHFCQUFhLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDdkMsZUFBZSxFQUFFLFNBQVM7YUFDN0IsQ0FBQyxDQUFDO1lBRUgsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ3BCLG1DQUFtQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDbkIsa0NBQWtDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLENBQUM7S0FBQTtDQUNKO0FBL0NELGlDQStDQyJ9