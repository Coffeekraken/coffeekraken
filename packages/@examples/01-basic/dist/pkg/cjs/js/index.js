"use strict";
// import __SDashboard from '@coffeekraken/s-dashboard';
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
const s_pack_essentials_1 = __importDefault(require("@coffeekraken/s-pack-essentials"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
const s_form_validate_feature_1 = require("@coffeekraken/s-form-validate-feature");
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_google_map_component_1 = require("@coffeekraken/s-google-map-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_slider_component_1 = require("@coffeekraken/s-slider-component");
// import __SCarpenterComponent, {
// define as __sCarpenterComponentDefine,
// } from '@coffeekraken/s-carpenter';
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Set some features defaults
    s_feature_1.default.setDefaultProps('*', {});
    // Set some components defaults
    s_lit_component_1.default.setDefaultProps('*', {});
    // Init theme
    yield s_theme_1.default.init({
        variant: 'dark',
        lod: {
            enabled: true,
            level: 3,
        },
    });
    // sugar feature
    document.body.setAttribute('s-sugar', 'true');
    (0, s_sugar_feature_1.define)();
    // essentials
    (0, s_pack_essentials_1.default)();
    // features
    (0, s_form_validate_feature_1.define)({});
    // Project related components
    // ...
    // Components
    (0, s_slider_component_1.define)();
    (0, s_google_map_component_1.define)();
    // __sCarpenterComponentDefine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3REFBd0Q7Ozs7Ozs7Ozs7Ozs7O0FBRXhELHdGQUFnRTtBQUNoRSxvRUFBNkM7QUFFN0MsbUVBQStFO0FBRS9FLG1GQUFtRjtBQUNuRixtRkFBeUY7QUFDekYsK0VBQStFO0FBQy9FLGdHQUFnRztBQUNoRyxpRkFBaUY7QUFDakYsd0VBQWlEO0FBQ2pELGlGQUE2RjtBQUM3RixvRkFBNEQ7QUFDNUQseUVBQXNGO0FBRXRGLGtDQUFrQztBQUNsQyx5Q0FBeUM7QUFDekMsc0NBQXNDO0FBRXRDLGdCQUFnQjtBQUNoQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELGNBQWM7QUFDZCxDQUFDLEdBQVMsRUFBRTtJQUNSLDZCQUE2QjtJQUM3QixtQkFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFcEMsK0JBQStCO0lBQy9CLHlCQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV6QyxhQUFhO0lBQ2IsTUFBTSxpQkFBUSxDQUFDLElBQUksQ0FBQztRQUNoQixPQUFPLEVBQUUsTUFBTTtRQUNmLEdBQUcsRUFBRTtZQUNELE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLENBQUM7U0FDWDtLQUNKLENBQUMsQ0FBQztJQUVILGdCQUFnQjtJQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsSUFBQSx3QkFBb0IsR0FBRSxDQUFDO0lBRXZCLGFBQWE7SUFDYixJQUFBLDJCQUFpQixHQUFFLENBQUM7SUFFcEIsV0FBVztJQUNYLElBQUEsZ0NBQXNCLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFFM0IsNkJBQTZCO0lBQzdCLE1BQU07SUFFTixhQUFhO0lBQ2IsSUFBQSwyQkFBd0IsR0FBRSxDQUFDO0lBQzNCLElBQUEsK0JBQTJCLEdBQUUsQ0FBQztJQUM5QixpQ0FBaUM7SUFFakMsa0NBQWtDO0lBRWxDLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixxQ0FBcUM7SUFDckMsd0NBQXdDO0lBQ3hDLDhEQUE4RDtJQUM5RCxxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixTQUFTO0lBQ1QsTUFBTTtBQUNWLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9