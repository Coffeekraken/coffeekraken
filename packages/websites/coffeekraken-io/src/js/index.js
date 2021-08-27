import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-request-component';
import { webcomponent as __SCodeExampleWebcomponent, } from '@coffeekraken/s-code-example-component';
import { webcomponent as __SActivateWebcomponent } from '@coffeekraken/s-activate-component';
import { webcomponent as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { webcomponent as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { webcomponent as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { webcomponent as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { webcomponent as __VersionSelector } from './components/VersionSelector';
import { webcomponent as __CkSettingsWebcomponent } from './components/CkSettings';
// generic
// import "./generic/docShortcut";
// internal components
// __DocNavComponent();
__VersionSelector();
__CkSettingsWebcomponent();
__SComponentUtils.setDefaultProps('*', {
    mountWhen: 'inViewport',
    // mountWhen: 'directly',
    defaultStyle: true,
});
// __SComponentUtils.setDefaultProps(['s-side-panel', 'ck-settings'], {
//   mountWhen: 'direct'
// });
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyleClasses: {
        main: 's-tabs',
    },
});
// webcomponents
__SCodeExampleWebcomponent();
__SActivateWebcomponent();
// __SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
__SDatePickerWebcomponent();
__SRangeWebcomponent();
// features
// import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
// import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
// features
// __smoothScroll({
//     scroll: {
//         offset: 188,
//     },
// });
// __linksStateAttributes();
// document.addEventListener('scroll', (e) => {
//     if (document.body.scrollTop >= 10) {
//         document.body.classList.add('scrolled');
//     } else {
//         document.body.classList.remove('scrolled');
//     }
// });
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBZ0MsRUFDNUIsWUFBWSxJQUFJLDBCQUEwQixHQUM3QyxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hELE9BQTZCLEVBQUUsWUFBWSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFJbkgsT0FBcUIsRUFBRSxZQUFZLElBQUksd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RyxPQUFPLEVBQUUsWUFBWSxJQUFJLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEcsT0FBTyxFQUFFLFlBQVksSUFBSSwwQkFBMEIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxZQUFZLElBQUksb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RixPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8saUNBQWlDLE1BQU0sNkRBQTZELENBQUM7QUFHNUcsT0FBTyxFQUFFLFlBQVksSUFBSSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxZQUFZLElBQUksd0JBQXdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRixVQUFVO0FBQ1Ysa0NBQWtDO0FBRWxDLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFDdkIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQix3QkFBd0IsRUFBRSxDQUFDO0FBRTNCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDbkMsU0FBUyxFQUFFLFlBQVk7SUFDdkIseUJBQXlCO0lBQ3pCLFlBQVksRUFBRSxJQUFJO0NBQ3JCLENBQUMsQ0FBQztBQUNILHVFQUF1RTtBQUN2RSx3QkFBd0I7QUFDeEIsTUFBTTtBQUNOLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRTtJQUNoRCxlQUFlLEVBQUUsS0FBSztJQUN0QixtQkFBbUIsRUFBRTtRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNqQjtDQUNKLENBQUMsQ0FBQztBQUVILGdCQUFnQjtBQUNoQiwwQkFBMEIsRUFBRSxDQUFDO0FBQzdCLHVCQUF1QixFQUFFLENBQUM7QUFDMUIsbUNBQW1DO0FBQ25DLHdCQUF3QixFQUFFLENBQUM7QUFDM0IsMEJBQTBCLEVBQUUsQ0FBQztBQUM3Qix5QkFBeUIsRUFBRSxDQUFDO0FBQzVCLG9CQUFvQixFQUFFLENBQUM7QUFFdkIsV0FBVztBQUNYLDRFQUE0RTtBQUM1RSw0RkFBNEY7QUFFNUYsV0FBVztBQUNYLG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFDaEIsdUJBQXVCO0FBQ3ZCLFNBQVM7QUFDVCxNQUFNO0FBQ04sNEJBQTRCO0FBRTVCLCtDQUErQztBQUMvQywyQ0FBMkM7QUFDM0MsbURBQW1EO0FBQ25ELGVBQWU7QUFDZixzREFBc0Q7QUFDdEQsUUFBUTtBQUNSLE1BQU07QUFFTixpQ0FBaUMsRUFBRSxDQUFDIn0=