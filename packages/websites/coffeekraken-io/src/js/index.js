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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sbUNBQW1DLENBQUM7QUFDM0MsT0FBZ0MsRUFDNUIsWUFBWSxJQUFJLDBCQUEwQixHQUM3QyxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hELE9BQTZCLEVBQUUsWUFBWSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkgsT0FBMEIsRUFDdEIsWUFBWSxJQUFJLDZCQUE2QixHQUNoRCxNQUFNLDJDQUEyQyxDQUFDO0FBQ25ELE9BQXFCLEVBQUUsWUFBWSxJQUFJLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUcsT0FBTyxFQUFFLFlBQVksSUFBSSx5QkFBeUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxZQUFZLElBQUksMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRyxPQUFPLEVBQUUsWUFBWSxJQUFJLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkYsT0FBTyxpQkFBaUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLGlDQUFpQyxNQUFNLDZEQUE2RCxDQUFDO0FBRzVHLE9BQU8sRUFBRSxZQUFZLElBQUksaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxJQUFJLHdCQUF3QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFbkYsVUFBVTtBQUNWLGtDQUFrQztBQUVsQyxzQkFBc0I7QUFDdEIsdUJBQXVCO0FBQ3ZCLGlCQUFpQixFQUFFLENBQUM7QUFDcEIsd0JBQXdCLEVBQUUsQ0FBQztBQUUzQixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO0lBQ25DLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLHlCQUF5QjtJQUN6QixZQUFZLEVBQUUsSUFBSTtDQUNyQixDQUFDLENBQUM7QUFDSCx1RUFBdUU7QUFDdkUsd0JBQXdCO0FBQ3hCLE1BQU07QUFDTixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUU7SUFDaEQsZUFBZSxFQUFFLEtBQUs7SUFDdEIsbUJBQW1CLEVBQUU7UUFDakIsSUFBSSxFQUFFLFFBQVE7S0FDakI7Q0FDSixDQUFDLENBQUM7QUFFSCxnQkFBZ0I7QUFDaEIsMEJBQTBCLEVBQUUsQ0FBQztBQUM3Qix1QkFBdUIsRUFBRSxDQUFDO0FBQzFCLDZCQUE2QixFQUFFLENBQUM7QUFDaEMsd0JBQXdCLEVBQUUsQ0FBQztBQUMzQiwwQkFBMEIsRUFBRSxDQUFDO0FBQzdCLHlCQUF5QixFQUFFLENBQUM7QUFDNUIsb0JBQW9CLEVBQUUsQ0FBQztBQUV2QixXQUFXO0FBQ1gsT0FBTyxjQUFjLE1BQU0sNkNBQTZDLENBQUM7QUFDekUsT0FBTyxzQkFBc0IsTUFBTSxxREFBcUQsQ0FBQztBQUV6RixjQUFjLENBQUM7SUFDWCxNQUFNLEVBQUU7UUFDSixNQUFNLEVBQUUsR0FBRztLQUNkO0NBQ0osQ0FBQyxDQUFDO0FBQ0gsc0JBQXNCLEVBQUUsQ0FBQztBQUV6QiwrQ0FBK0M7QUFDL0MsMkNBQTJDO0FBQzNDLG1EQUFtRDtBQUNuRCxlQUFlO0FBQ2Ysc0RBQXNEO0FBQ3RELFFBQVE7QUFDUixNQUFNO0FBRU4saUNBQWlDLEVBQUUsQ0FBQyJ9