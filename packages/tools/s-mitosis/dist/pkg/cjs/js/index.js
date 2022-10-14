"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const s_component_proxy_1 = __importDefault(require("@coffeekraken/s-component-proxy"));
const webcomponent_1 = require("@coffeekraken/s-specs-editor-component/webcomponent");
const dom_1 = require("@coffeekraken/sugar/dom");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    (0, s_activate_feature_1.define)();
    // components
    setTimeout(() => {
        (0, webcomponent_1.define)();
    }, 1000);
    (0, dom_1.__querySelectorLive)('[component]', ($app) => __awaiter(void 0, void 0, void 0, function* () {
        const component = JSON.parse($app.getAttribute('component')), componentImport = yield Promise.resolve().then(() => __importStar(require(component.path))), componentProxy = new s_component_proxy_1.default(componentImport), $componentContainer = document.querySelector(`#component-${component.target}`);
        componentProxy.create(componentImport.metas.preview, {
            $root: $app,
        });
        $componentContainer === null || $componentContainer === void 0 ? void 0 : $componentContainer.addEventListener('s-specs-editor.change', (e) => {
            componentProxy.setProps(e.detail);
        });
    }));
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBZ0Y7QUFDaEYsd0ZBQWdFO0FBQ2hFLHNGQUE2RztBQUM3RyxpREFBOEQ7QUFFOUQsQ0FBQyxHQUFTLEVBQUU7SUFDUixXQUFXO0lBQ1gsSUFBQSwyQkFBa0IsR0FBRSxDQUFDO0lBRXJCLGFBQWE7SUFDYixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ1osSUFBQSxxQkFBNEIsR0FBRSxDQUFDO0lBQ25DLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVULElBQUEseUJBQW1CLEVBQUMsYUFBYSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7UUFDOUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQ3hELGVBQWUsR0FBRyx3REFBYSxTQUFTLENBQUMsSUFBSSxHQUFDLEVBQzlDLGNBQWMsR0FBRyxJQUFJLDJCQUFpQixDQUFDLGVBQWUsQ0FBQyxFQUN2RCxtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN4QyxjQUFjLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FDbkMsQ0FBQztRQUVOLGNBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakQsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUM7UUFDSCxtQkFBbUIsYUFBbkIsbUJBQW1CLHVCQUFuQixtQkFBbUIsQ0FBRSxnQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pFLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9