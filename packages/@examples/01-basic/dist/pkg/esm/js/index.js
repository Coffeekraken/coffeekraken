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
// import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import __SFeature from '@coffeekraken/s-feature';
// Coffeekraken components
import __SLitComponent from '@coffeekraken/s-lit-component';
// import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
// import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
// import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
// import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { define as __SSliderComponent } from '@coffeekraken/s-slider-component';
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
    // __sFormValidateFeature({});
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
    __SSliderComponent({
    // behaviors: {
    //   slideable: {
    //     class: SSliderSlideableBehavior,
    //     settings: {},
    //   },
    // },
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxDQUFDO0FBQ2pCLHNCQUFzQjtBQUN0QixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCx3REFBd0Q7QUFDeEQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0Msd0JBQXdCO0FBQ3hCLE9BQU8sRUFBRSxNQUFNLElBQUksa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxJQUFJLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDNUUsbUZBQW1GO0FBQ25GLDRGQUE0RjtBQUM1RiwrRUFBK0U7QUFDL0UsZ0dBQWdHO0FBQ2hHLGlGQUFpRjtBQUNqRixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCwwQkFBMEI7QUFDMUIsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsaUdBQWlHO0FBQ2pHLDhGQUE4RjtBQUM5RixvR0FBb0c7QUFDcEcsb0dBQW9HO0FBQ3BHLG1GQUFtRjtBQUNuRixPQUFPLEVBQUUsTUFBTSxJQUFJLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsd0ZBQXdGO0FBQ3hGLG9GQUFvRjtBQUVwRiwyQkFBMkI7QUFDM0IsTUFBTTtBQUVOLGdCQUFnQjtBQUNoQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELGtCQUFrQjtBQUNsQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBQ2pCLEdBQUcsRUFBRSxJQUFJO0NBQ1YsQ0FBQyxDQUFDO0FBRUgsY0FBYztBQUNkLENBQUMsR0FBUyxFQUFFO0lBQ1YsNkJBQTZCO0lBQzdCLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXBDLCtCQUErQjtJQUMvQixlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV6QyxhQUFhO0lBQ2IsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhCLFdBQVc7SUFDWCxrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLGdCQUFnQixFQUFFLENBQUM7SUFDbkIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsd0JBQXdCO0lBQ3hCLDhCQUE4QjtJQUM5Qiw4QkFBOEI7SUFFOUIsNkJBQTZCO0lBQzdCLE1BQU07SUFFTixhQUFhO0lBQ2IsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyw4QkFBOEI7SUFDOUIsNkJBQTZCO0lBQzdCLGdDQUFnQztJQUNoQyx3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLGtCQUFrQixDQUFDO0lBQ2pCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsdUNBQXVDO0lBQ3ZDLG9CQUFvQjtJQUNwQixPQUFPO0lBQ1AsS0FBSztLQUNOLENBQUMsQ0FBQztJQUVILFlBQVk7SUFDWixxQkFBcUI7SUFDckIsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixxQ0FBcUM7SUFDckMsd0NBQXdDO0lBQ3hDLDhEQUE4RDtJQUM5RCxxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixTQUFTO0lBQ1QsTUFBTTtBQUNSLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9