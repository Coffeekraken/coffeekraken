var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './sugar';
// Coffeekraken others
import __SConductor from '@coffeekraken/s-conductor';
// import __SDashboard from '@coffeekraken/s-dashboard';
import __STheme from '@coffeekraken/s-theme';
// Coffeekraken features
import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import __SFeature from '@coffeekraken/s-feature';
// Coffeekraken components
import { define as __sCarpenterComponentDefine } from '@coffeekraken/s-carpenter';
import __SLitComponent from '@coffeekraken/s-lit-component';
// import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
// import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
// import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
// import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
// import { define as __SSliderComponent } from '@coffeekraken/s-slider-component';
// import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';
// import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
// Project level components
// ...
// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// setup conductor
__SConductor.setup({
    log: true,
});
// Init script
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Set some features defaults
    __SFeature.setDefaultProps('*', {});
    // Set some components defaults
    __SLitComponent.setDefaultProps('*', {});
    // Init theme
    __STheme.init();
    // features
    __sActivateFeature();
    __sAppearFeature();
    // __sFloatingFeature();
    // __sRefocusFeature();
    // __sInlineFeature();
    // __sParallaxFeature();
    __sFormValidateFeature({});
    // __sPageTransitionFeature();
    // Project related components
    // ...
    // Components
    // __SCodeExampleWebcomponent();
    // __SFiltrableInputComponent();
    // __SSidePanelWebcomponent();
    // __SColorPickerComponent();
    // __SDatetimePickerComponent();
    // __SScrollComponent();
    // __SRangeWebcomponent();
    // __SSliderComponent({
    //   // behaviors: {
    //   //   slideable: {
    //   //     class: SSliderSlideableBehavior,
    //   //     settings: {},
    //   //   },
    //   // },
    // });
    __sCarpenterComponentDefine();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxDQUFDO0FBQ2pCLHNCQUFzQjtBQUN0QixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCx3REFBd0Q7QUFDeEQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0Msd0JBQXdCO0FBQ3hCLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsbUZBQW1GO0FBQ25GLE9BQU8sRUFBRSxNQUFNLElBQUksc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RiwrRUFBK0U7QUFDL0UsZ0dBQWdHO0FBQ2hHLGlGQUFpRjtBQUNqRixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCwwQkFBMEI7QUFDMUIsT0FBTyxFQUFFLE1BQU0sSUFBSSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xGLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELGlHQUFpRztBQUNqRyw4RkFBOEY7QUFDOUYsb0dBQW9HO0FBQ3BHLG9HQUFvRztBQUNwRyxtRkFBbUY7QUFDbkYsbUZBQW1GO0FBQ25GLHdGQUF3RjtBQUN4RixvRkFBb0Y7QUFFcEYsMkJBQTJCO0FBQzNCLE1BQU07QUFFTixnQkFBZ0I7QUFDaEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUvRCxrQkFBa0I7QUFDbEIsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNqQixHQUFHLEVBQUUsSUFBSTtDQUNWLENBQUMsQ0FBQztBQUVILGNBQWM7QUFDZCxDQUFDLEdBQVMsRUFBRTtJQUNWLDZCQUE2QjtJQUM3QixVQUFVLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVwQywrQkFBK0I7SUFDL0IsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFekMsYUFBYTtJQUNiLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVoQixXQUFXO0lBQ1gsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQixnQkFBZ0IsRUFBRSxDQUFDO0lBQ25CLHdCQUF3QjtJQUN4Qix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLHdCQUF3QjtJQUN4QixzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQiw4QkFBOEI7SUFFOUIsNkJBQTZCO0lBQzdCLE1BQU07SUFFTixhQUFhO0lBQ2IsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyw4QkFBOEI7SUFDOUIsNkJBQTZCO0lBQzdCLGdDQUFnQztJQUNoQyx3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLHVCQUF1QjtJQUN2QixvQkFBb0I7SUFDcEIsc0JBQXNCO0lBQ3RCLDRDQUE0QztJQUM1Qyx5QkFBeUI7SUFDekIsWUFBWTtJQUNaLFVBQVU7SUFDVixNQUFNO0lBQ04sMkJBQTJCLEVBQUUsQ0FBQztJQUU5QixZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIscUNBQXFDO0lBQ3JDLHdDQUF3QztJQUN4Qyw4REFBOEQ7SUFDOUQscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsU0FBUztJQUNULE1BQU07QUFDUixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==