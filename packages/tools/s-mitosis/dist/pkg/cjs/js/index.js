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
Object.defineProperty(exports, "__esModule", { value: true });
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const webcomponent_1 = require("@coffeekraken/s-specs-editor-component/webcomponent");
const dom_1 = require("@coffeekraken/sugar/dom");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    (0, s_activate_feature_1.define)();
    // components
    (0, webcomponent_1.define)();
    (0, dom_1.__querySelectorLive)('[component]', ($app) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const component = JSON.parse($app.getAttribute('component'));
        const componentImport = yield Promise.resolve().then(() => __importStar(require(component.path)));
        const $componentContainer = document.querySelector(`#component-${component.target}`);
        switch (component.target) {
            case 'webcomponent':
                componentImport.define();
                $app.innerHTML = (_a = componentImport.metas) === null || _a === void 0 ? void 0 : _a.preview;
                let $component = $app.children[0], componentTagName = $component.tagName;
                $componentContainer === null || $componentContainer === void 0 ? void 0 : $componentContainer.addEventListener('s-specs-editor.change', (e) => {
                    const updatedProp = e.detail;
                    // const prop = e.detail;
                    // if (typeof prop.value === 'boolean') {
                    //     if (prop.value) {
                    //         $component.setAttribute(prop.id, 'true');
                    //     } else {
                    //         $component.removeAttribute(prop.id);
                    //     }
                    // } else {
                    //     if (!prop.value) {
                    //         $component.removeAttribute(prop.id);
                    //     } else {
                    //         $component.setAttribute(prop.id, prop.value);
                    //     }
                    // }
                    $component.remove();
                    const domParser = new DOMParser();
                    const $dom = domParser.parseFromString(componentImport.metas.preview, 'text/html');
                    $component = $dom.body.children[0];
                    for (let [prop, value] of Object.entries(component.specs.props)) {
                        if (prop === updatedProp.id) {
                            console.log(prop, value);
                        }
                    }
                    $app.appendChild();
                    console.log('Updated', e.detail);
                });
                break;
        }
    }));
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBZ0Y7QUFDaEYsc0ZBQTZHO0FBQzdHLGlEQUE4RDtBQUU5RCxDQUFDLEdBQVMsRUFBRTtJQUNSLFdBQVc7SUFDWCxJQUFBLDJCQUFrQixHQUFFLENBQUM7SUFFckIsYUFBYTtJQUNiLElBQUEscUJBQTRCLEdBQUUsQ0FBQztJQUUvQixJQUFBLHlCQUFtQixFQUFDLGFBQWEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFOztRQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM3RCxNQUFNLGVBQWUsR0FBRyx3REFBYSxTQUFTLENBQUMsSUFBSSxHQUFDLENBQUM7UUFFckQsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5QyxjQUFjLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FDbkMsQ0FBQztRQUVGLFFBQVEsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QixLQUFLLGNBQWM7Z0JBQ2YsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQUEsZUFBZSxDQUFDLEtBQUssMENBQUUsT0FBTyxDQUFDO2dCQUVoRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUM3QixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUUxQyxtQkFBbUIsYUFBbkIsbUJBQW1CLHVCQUFuQixtQkFBbUIsQ0FBRSxnQkFBZ0IsQ0FDakMsdUJBQXVCLEVBQ3ZCLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ0YsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFFN0IseUJBQXlCO29CQUN6Qix5Q0FBeUM7b0JBQ3pDLHdCQUF3QjtvQkFDeEIsb0RBQW9EO29CQUNwRCxlQUFlO29CQUNmLCtDQUErQztvQkFDL0MsUUFBUTtvQkFDUixXQUFXO29CQUNYLHlCQUF5QjtvQkFDekIsK0NBQStDO29CQUMvQyxlQUFlO29CQUNmLHdEQUF3RDtvQkFDeEQsUUFBUTtvQkFDUixJQUFJO29CQUVKLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFFcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztvQkFDbEMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGVBQWUsQ0FDbEMsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQzdCLFdBQVcsQ0FDZCxDQUFDO29CQUNGLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFbkMsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ3BDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUN4QixFQUFFO3dCQUNDLElBQUksSUFBSSxLQUFLLFdBQVcsQ0FBQyxFQUFFLEVBQUU7NEJBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUM1QjtxQkFDSjtvQkFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBRW5CLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxDQUNKLENBQUM7Z0JBRUYsTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9