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
Object.defineProperty(exports, "__esModule", { value: true });
const s_activate_feature_1 = require("@coffeekraken/s-activate-feature");
const SCarpenterComponent_1 = require("./SCarpenterComponent");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // features
    (0, s_activate_feature_1.define)();
    // components
    console.log(SCarpenterComponent_1.define);
    (0, SCarpenterComponent_1.define)();
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEseUVBQWdGO0FBQ2hGLCtEQUE2RTtBQUU3RSxDQUFDLEdBQVMsRUFBRTtJQUNSLFdBQVc7SUFDWCxJQUFBLDJCQUFrQixHQUFFLENBQUM7SUFFckIsYUFBYTtJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTBCLENBQUMsQ0FBQztJQUN4QyxJQUFBLDRCQUEwQixHQUFFLENBQUM7QUFDakMsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDIn0=