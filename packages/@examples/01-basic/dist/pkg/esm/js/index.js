var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import __SDashboard from '@coffeekraken/s-dashboard';
import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';
import { define as __sugarFeatureDefine } from '@coffeekraken/s-sugar-feature/lazy';
import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component/lazy';
// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __sGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component/lazy';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component/lazy';
import { define as __sCarpenterComponentDefine } from '@coffeekraken/s-carpenter';
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (document.querySelector('s-carpenter')) {
        __sCarpenterComponentDefine({
            autoInit: true,
            escape: true,
            features: {
                newPage: true,
                savePage: true,
                delete: true,
                insert: true,
                scopes: true,
            },
        });
        return;
    }
    // Set some features defaults
    __SFeature.setDefaultProps('*', {});
    // Set some components defaults
    __SLitComponent.setDefaultProps('*', {});
    __SFront.init({});
    // sugar feature
    __sugarFeatureDefine();
    // essentials
    __SPackEssentials();
    // features
    // Project related components
    // ...
    // Components
    __SSliderComponentDefine();
    __sGoogleMapComponentDefine();
    __SSpacesSelectorComponentDefine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHdEQUF3RDtBQUN4RCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBRWhFLE9BQU8sRUFBRSxNQUFNLElBQUksb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVwRixPQUFPLEVBQUUsTUFBTSxJQUFJLGdDQUFnQyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFNUcsbUZBQW1GO0FBQ25GLCtFQUErRTtBQUMvRSxnR0FBZ0c7QUFDaEcsaUZBQWlGO0FBQ2pGLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLElBQUksMkJBQTJCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFM0YsT0FBTyxFQUFFLE1BQU0sSUFBSSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxGLGdCQUFnQjtBQUNoQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELGNBQWM7QUFDZCxDQUFDLEdBQVMsRUFBRTtJQUNSLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUN2QywyQkFBMkIsQ0FBQztZQUN4QixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxJQUFJO2FBQ2Y7U0FDSixDQUFDLENBQUM7UUFDSCxPQUFPO0tBQ1Y7SUFFRCw2QkFBNkI7SUFDN0IsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFcEMsK0JBQStCO0lBQy9CLGVBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbEIsZ0JBQWdCO0lBQ2hCLG9CQUFvQixFQUFFLENBQUM7SUFFdkIsYUFBYTtJQUNiLGlCQUFpQixFQUFFLENBQUM7SUFFcEIsV0FBVztJQUVYLDZCQUE2QjtJQUM3QixNQUFNO0lBRU4sYUFBYTtJQUNiLHdCQUF3QixFQUFFLENBQUM7SUFDM0IsMkJBQTJCLEVBQUUsQ0FBQztJQUM5QixnQ0FBZ0MsRUFBRSxDQUFDO0lBRW5DLGtDQUFrQztJQUVsQyxZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIscUNBQXFDO0lBQ3JDLHdDQUF3QztJQUN4Qyw4REFBOEQ7SUFDOUQscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsU0FBUztJQUNULE1BQU07QUFDVixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==