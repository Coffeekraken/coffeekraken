import __SDuration from '@coffeekraken/s-duration';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SConfigExplorerWebcomponent } from '@coffeekraken/s-config-explorer-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __VersionSelector } from './components/VersionSelector';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
const duration = new __SDuration();
import { register as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { register as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
// (async () => {
console.log('LOADED');
__SLitComponent.setDefaultProps('*', {
    mountWhen: 'inViewport',
});
__SLitComponent.setDefaultProps(['s-side-panel', 'ck-settings'], {
    mountWhen: 'direct',
});
// layout related
__expandPleasantCssClassnamesLive();
// features
__sActivateFeature();
// internal components
// __DocNavComponent();
__VersionSelector();
__CKSearchComponent();
document.addEventListener('scroll', (e) => {
    if (window.scrollY >= 10) {
        document.body.classList.add('scrolled');
    }
    else {
        document.body.classList.remove('scrolled');
    }
});
// await __wait(1500);
console.log('LOADED', 2);
// components
__CKSettingsComponent();
__SCodeExampleWebcomponent();
// __SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
__SDatePickerWebcomponent();
__SRangeWebcomponent();
// await __wait(1000);
console.log('LOADED', 3);
// features
__sFormValidateFeature({
    customValidations: {
        coffeekraken: (value, helpers) => {
            if (value === 'coffeekraken') {
                return helpers.message('Are you sure? Krakens are dangerous...');
            }
            return value;
        },
    },
});
__smoothScroll({
    scroll: {
        offset: 188,
    },
});
__linksStateAttributes();
// })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUYsdUdBQXVHO0FBQ3ZHLE9BQU8sRUFBRSxNQUFNLElBQUksd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDNUYsT0FBTyxFQUFFLE1BQU0sSUFBSSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxNQUFNLElBQUksb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGlDQUFpQyxNQUFNLDZEQUE2RCxDQUFDO0FBRzVHLE9BQU8sRUFBRSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxJQUFJLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTFFLFdBQVc7QUFDWCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLHNCQUFzQixNQUFNLHFEQUFxRCxDQUFDO0FBRXpGLGFBQWE7QUFDYixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9ELE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFFbkMsT0FBTyxFQUFFLFFBQVEsSUFBSSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxRQUFRLElBQUksc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUUzRixpQkFBaUI7QUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV0QixlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtJQUNqQyxTQUFTLEVBQUUsWUFBWTtDQUMxQixDQUFDLENBQUM7QUFDSCxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxFQUFFO0lBQzdELFNBQVMsRUFBRSxRQUFRO0NBQ3RCLENBQUMsQ0FBQztBQUVILGlCQUFpQjtBQUNqQixpQ0FBaUMsRUFBRSxDQUFDO0FBRXBDLFdBQVc7QUFDWCxrQkFBa0IsRUFBRSxDQUFDO0FBRXJCLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFDdkIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQixtQkFBbUIsRUFBRSxDQUFDO0FBRXRCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMzQztTQUFNO1FBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzlDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxzQkFBc0I7QUFFdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFekIsYUFBYTtBQUNiLHFCQUFxQixFQUFFLENBQUM7QUFDeEIsMEJBQTBCLEVBQUUsQ0FBQztBQUM3QixtQ0FBbUM7QUFDbkMsd0JBQXdCLEVBQUUsQ0FBQztBQUMzQiwwQkFBMEIsRUFBRSxDQUFDO0FBQzdCLHlCQUF5QixFQUFFLENBQUM7QUFDNUIsb0JBQW9CLEVBQUUsQ0FBQztBQUV2QixzQkFBc0I7QUFFdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFekIsV0FBVztBQUNYLHNCQUFzQixDQUFDO0lBQ25CLGlCQUFpQixFQUFFO1FBQ2YsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQzdCLElBQUksS0FBSyxLQUFLLGNBQWMsRUFBRTtnQkFDMUIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUNsQix3Q0FBd0MsQ0FDM0MsQ0FBQzthQUNMO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztLQUNKO0NBQ0osQ0FBQyxDQUFDO0FBRUgsY0FBYyxDQUFDO0lBQ1gsTUFBTSxFQUFFO1FBQ0osTUFBTSxFQUFFLEdBQUc7S0FDZDtDQUNKLENBQUMsQ0FBQztBQUNILHNCQUFzQixFQUFFLENBQUM7QUFDekIsUUFBUSJ9