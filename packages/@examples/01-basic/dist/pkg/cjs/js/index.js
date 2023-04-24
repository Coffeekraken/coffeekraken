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
// import __SDashboard from '@coffeekraken/s-dashboard';
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
const s_pack_essentials_1 = __importDefault(require("@coffeekraken/s-pack-essentials"));
const lazy_1 = require("@coffeekraken/s-sugar-feature/lazy");
const lazy_2 = require("@coffeekraken/s-spaces-selector-component/lazy");
// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const lazy_3 = require("@coffeekraken/s-google-map-component/lazy");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lazy_4 = require("@coffeekraken/s-slider-component/lazy");
const s_carpenter_1 = require("@coffeekraken/s-carpenter");
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (document.querySelector('s-carpenter')) {
        (0, s_carpenter_1.define)({
            savePageUrl: '/store',
            saveComponentUrl: '/store',
        });
        return;
    }
    // Set some features defaults
    s_feature_1.default.setDefaultProps('*', {});
    // Set some components defaults
    s_lit_component_1.default.setDefaultProps('*', {});
    s_front_1.default.init({});
    // sugar feature
    (0, lazy_1.define)();
    // essentials
    (0, s_pack_essentials_1.default)();
    // features
    // Project related components
    // ...
    // Components
    (0, lazy_4.define)();
    (0, lazy_3.define)();
    (0, lazy_2.define)();
    // __SCarpenterComponent.create();
    // Dashboard
    // new __SDashboard({
    //     dashboard: {
    //         components: {
    //             's-dashboard-pages': {
    //                 onSelect: (page) => {
    //                     document.location.href = page.item.loc;
    //                 },
    //             },
    //         },
    //     },
    // });
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXdEO0FBQ3hELG9FQUE2QztBQUM3Qyx3RkFBZ0U7QUFFaEUsNkRBQW9GO0FBRXBGLHlFQUE0RztBQUU1RyxtRkFBbUY7QUFDbkYsK0VBQStFO0FBQy9FLGdHQUFnRztBQUNoRyxpRkFBaUY7QUFDakYsd0VBQWlEO0FBQ2pELG9FQUFrRztBQUNsRyxvRkFBNEQ7QUFDNUQsZ0VBQTJGO0FBRTNGLDJEQUFrRjtBQUVsRixnQkFBZ0I7QUFDaEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxjQUFjO0FBQ2QsQ0FBQyxHQUFTLEVBQUU7SUFDUixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDdkMsSUFBQSxvQkFBMkIsRUFBQztZQUN4QixXQUFXLEVBQUUsUUFBUTtZQUNyQixnQkFBZ0IsRUFBRSxRQUFRO1NBQzdCLENBQUMsQ0FBQztRQUNILE9BQU87S0FDVjtJQUVELDZCQUE2QjtJQUM3QixtQkFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFcEMsK0JBQStCO0lBQy9CLHlCQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV6QyxpQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVsQixnQkFBZ0I7SUFDaEIsSUFBQSxhQUFvQixHQUFFLENBQUM7SUFFdkIsYUFBYTtJQUNiLElBQUEsMkJBQWlCLEdBQUUsQ0FBQztJQUVwQixXQUFXO0lBRVgsNkJBQTZCO0lBQzdCLE1BQU07SUFFTixhQUFhO0lBQ2IsSUFBQSxhQUF3QixHQUFFLENBQUM7SUFDM0IsSUFBQSxhQUEyQixHQUFFLENBQUM7SUFDOUIsSUFBQSxhQUFnQyxHQUFFLENBQUM7SUFFbkMsa0NBQWtDO0lBRWxDLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixxQ0FBcUM7SUFDckMsd0NBQXdDO0lBQ3hDLDhEQUE4RDtJQUM5RCxxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixTQUFTO0lBQ1QsTUFBTTtBQUNWLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9