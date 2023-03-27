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
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
const s_spaces_selector_component_1 = require("@coffeekraken/s-spaces-selector-component");
// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_google_map_component_1 = require("@coffeekraken/s-google-map-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
const s_carpenter_1 = require("@coffeekraken/s-carpenter");
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Set some features defaults
    s_feature_1.default.setDefaultProps('*', {});
    // Set some components defaults
    s_lit_component_1.default.setDefaultProps('*', {});
    s_front_1.default.init({});
    // sugar feature
    (0, s_sugar_feature_1.define)();
    // essentials
    (0, s_pack_essentials_1.default)();
    // features
    // Project related components
    // ...
    // Components
    (0, s_slider_component_1.define)();
    (0, s_google_map_component_1.define)();
    (0, s_carpenter_1.define)();
    (0, s_spaces_selector_component_1.define)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXdEO0FBQ3hELG9FQUE2QztBQUM3Qyx3RkFBZ0U7QUFFaEUsbUVBQStFO0FBRS9FLDJGQUF1RztBQUV2RyxtRkFBbUY7QUFDbkYsK0VBQStFO0FBQy9FLGdHQUFnRztBQUNoRyxpRkFBaUY7QUFDakYsd0VBQWlEO0FBQ2pELGlGQUE2RjtBQUM3RixvRkFBNEQ7QUFDNUQseUVBQXNGO0FBRXRGLDJEQUFrRjtBQUVsRixnQkFBZ0I7QUFDaEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxjQUFjO0FBQ2QsQ0FBQyxHQUFTLEVBQUU7SUFDUiw2QkFBNkI7SUFDN0IsbUJBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBDLCtCQUErQjtJQUMvQix5QkFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFekMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEIsZ0JBQWdCO0lBQ2hCLElBQUEsd0JBQW9CLEdBQUUsQ0FBQztJQUV2QixhQUFhO0lBQ2IsSUFBQSwyQkFBaUIsR0FBRSxDQUFDO0lBRXBCLFdBQVc7SUFFWCw2QkFBNkI7SUFDN0IsTUFBTTtJQUVOLGFBQWE7SUFDYixJQUFBLDJCQUF3QixHQUFFLENBQUM7SUFDM0IsSUFBQSwrQkFBMkIsR0FBRSxDQUFDO0lBQzlCLElBQUEsb0JBQTJCLEdBQUUsQ0FBQztJQUM5QixJQUFBLG9DQUFnQyxHQUFFLENBQUM7SUFFbkMsa0NBQWtDO0lBRWxDLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixxQ0FBcUM7SUFDckMsd0NBQXdDO0lBQ3hDLDhEQUE4RDtJQUM5RCxxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixTQUFTO0lBQ1QsTUFBTTtBQUNWLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9