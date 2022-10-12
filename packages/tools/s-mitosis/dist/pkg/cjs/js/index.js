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
const dom_1 = require("@coffeekraken/sugar/dom");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    (0, s_activate_feature_1.define)();
    (0, dom_1.__querySelectorLive)('[component]', ($app) => __awaiter(void 0, void 0, void 0, function* () {
        const component = JSON.parse($app.getAttribute('component'));
        console.log(component);
        const componentImport = yield Promise.resolve().then(() => __importStar(require(component.path)));
        switch (component.target) {
            case 'webcomponent':
                componentImport.define();
                $app.innerHTML = componentImport.preview;
                break;
        }
    }));
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBZ0Y7QUFDaEYsaURBQThEO0FBRTlELENBQUMsR0FBUyxFQUFFO0lBQ1IsV0FBVztJQUNYLElBQUEsMkJBQWtCLEdBQUUsQ0FBQztJQUVyQixJQUFBLHlCQUFtQixFQUFDLGFBQWEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1FBQzlDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkIsTUFBTSxlQUFlLEdBQUcsd0RBQWEsU0FBUyxDQUFDLElBQUksR0FBQyxDQUFDO1FBRXJELFFBQVEsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN0QixLQUFLLGNBQWM7Z0JBQ2YsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7Z0JBQ3pDLE1BQU07U0FDYjtJQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==