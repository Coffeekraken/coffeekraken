import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-request-component';
import { webcomponent as __SCodeExampleWebcomponent, } from '@coffeekraken/s-code-example-component';
import { webcomponent as __SActivateWebcomponent } from '@coffeekraken/s-activate-component';
import { webcomponent as __SConfigExplorerWebcomponent, } from '@coffeekraken/s-config-explorer-component';
import { webcomponent as __SSidePanelWebcomponent } from '@coffeekraken/s-side-panel-component';
import { webcomponent as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { webcomponent as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { webcomponent as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { webcomponent as __DocNavComponent } from './components/docNav';
import { webcomponent as __VersionSelector } from './components/VersionSelector';
import { webcomponent as __CkSettingsWebcomponent } from './components/CkSettings';
// generic
// import "./generic/docShortcut";
// internal components
__DocNavComponent();
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
__SConfigExplorerWebcomponent();
__SSidePanelWebcomponent();
__SColorPickerWebcomponent();
__SDatePickerWebcomponent();
__SRangeWebcomponent();
// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
__smoothScroll({
    scroll: {
        offset: 188,
    },
});
__linksStateAttributes();
// document.addEventListener('scroll', (e) => {
//     if (document.body.scrollTop >= 10) {
//         document.body.classList.add('scrolled');
//     } else {
//         document.body.classList.remove('scrolled');
//     }
// });
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBZ0MsRUFDNUIsWUFBWSxJQUFJLDBCQUEwQixHQUM3QyxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hELE9BQTZCLEVBQUUsWUFBWSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkgsT0FBMEIsRUFDdEIsWUFBWSxJQUFJLDZCQUE2QixHQUNoRCxNQUFNLDJDQUEyQyxDQUFDO0FBQ25ELE9BQXFCLEVBQUUsWUFBWSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUcsT0FBTyxFQUFFLFlBQVksSUFBSSx5QkFBeUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxZQUFZLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRyxPQUFPLEVBQUUsWUFBWSxJQUFJLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkYsT0FBTyxpQkFBaUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLGlDQUFpQyxNQUFNLDZEQUE2RCxDQUFDO0FBRTVHLE9BQU8sRUFBRSxZQUFZLElBQUksaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakYsT0FBTyxFQUFFLFlBQVksSUFBSSx3QkFBd0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRW5GLFVBQVU7QUFDVixrQ0FBa0M7QUFFbEMsc0JBQXNCO0FBQ3RCLGlCQUFpQixFQUFFLENBQUM7QUFDcEIsaUJBQWlCLEVBQUUsQ0FBQztBQUNwQix3QkFBd0IsRUFBRSxDQUFDO0FBRTNCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDbkMsU0FBUyxFQUFFLFlBQVk7SUFDdkIseUJBQXlCO0lBQ3pCLFlBQVksRUFBRSxJQUFJO0NBQ3JCLENBQUMsQ0FBQztBQUNILHVFQUF1RTtBQUN2RSx3QkFBd0I7QUFDeEIsTUFBTTtBQUNOLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRTtJQUNoRCxlQUFlLEVBQUUsS0FBSztJQUN0QixtQkFBbUIsRUFBRTtRQUNqQixJQUFJLEVBQUUsUUFBUTtLQUNqQjtDQUNKLENBQUMsQ0FBQztBQUVILGdCQUFnQjtBQUNoQiwwQkFBMEIsRUFBRSxDQUFDO0FBQzdCLHVCQUF1QixFQUFFLENBQUM7QUFDMUIsNkJBQTZCLEVBQUUsQ0FBQztBQUNoQyx3QkFBd0IsRUFBRSxDQUFDO0FBQzNCLDBCQUEwQixFQUFFLENBQUM7QUFDN0IseUJBQXlCLEVBQUUsQ0FBQztBQUM1QixvQkFBb0IsRUFBRSxDQUFDO0FBRXZCLFdBQVc7QUFDWCxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxPQUFPLHNCQUFzQixNQUFNLHFEQUFxRCxDQUFDO0FBRXpGLGNBQWMsQ0FBQztJQUNYLE1BQU0sRUFBRTtRQUNKLE1BQU0sRUFBRSxHQUFHO0tBQ2Q7Q0FDSixDQUFDLENBQUM7QUFDSCxzQkFBc0IsRUFBRSxDQUFDO0FBRXpCLCtDQUErQztBQUMvQywyQ0FBMkM7QUFDM0MsbURBQW1EO0FBQ25ELGVBQWU7QUFDZixzREFBc0Q7QUFDdEQsUUFBUTtBQUNSLE1BQU07QUFFTixpQ0FBaUMsRUFBRSxDQUFDIn0=