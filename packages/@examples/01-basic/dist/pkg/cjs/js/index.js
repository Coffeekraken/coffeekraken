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
const dom_1 = require("@coffeekraken/sugar/dom");
// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
const s_form_validate_feature_1 = require("@coffeekraken/s-form-validate-feature");
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
if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        console.log('RELOAD', data);
        // perform custom update
        (0, dom_1.__reloadStylesheets)();
    });
}
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
    (0, s_form_validate_feature_1.define)({});
    // Project related components
    // ...
    // Components
    (0, s_slider_component_1.define)();
    (0, s_google_map_component_1.define)();
    (0, s_carpenter_1.define)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXdEO0FBQ3hELG9FQUE2QztBQUM3Qyx3RkFBZ0U7QUFFaEUsbUVBQStFO0FBRS9FLGlEQUE4RDtBQUU5RCxtRkFBbUY7QUFDbkYsbUZBQXlGO0FBQ3pGLCtFQUErRTtBQUMvRSxnR0FBZ0c7QUFDaEcsaUZBQWlGO0FBQ2pGLHdFQUFpRDtBQUNqRCxpRkFBNkY7QUFDN0Ysb0ZBQTREO0FBQzVELHlFQUFzRjtBQUV0RiwyREFBa0Y7QUFFbEYsZ0JBQWdCO0FBQ2hCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFL0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1Qix3QkFBd0I7UUFDeEIsSUFBQSx5QkFBbUIsR0FBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0NBQ047QUFFRCxjQUFjO0FBQ2QsQ0FBQyxHQUFTLEVBQUU7SUFDUiw2QkFBNkI7SUFDN0IsbUJBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBDLCtCQUErQjtJQUMvQix5QkFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFekMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEIsZ0JBQWdCO0lBQ2hCLElBQUEsd0JBQW9CLEdBQUUsQ0FBQztJQUV2QixhQUFhO0lBQ2IsSUFBQSwyQkFBaUIsR0FBRSxDQUFDO0lBRXBCLFdBQVc7SUFDWCxJQUFBLGdDQUFzQixFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTNCLDZCQUE2QjtJQUM3QixNQUFNO0lBRU4sYUFBYTtJQUNiLElBQUEsMkJBQXdCLEdBQUUsQ0FBQztJQUMzQixJQUFBLCtCQUEyQixHQUFFLENBQUM7SUFDOUIsSUFBQSxvQkFBMkIsR0FBRSxDQUFDO0lBRTlCLGtDQUFrQztJQUVsQyxZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIscUNBQXFDO0lBQ3JDLHdDQUF3QztJQUN4Qyw4REFBOEQ7SUFDOUQscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsU0FBUztJQUNULE1BQU07QUFDVixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==