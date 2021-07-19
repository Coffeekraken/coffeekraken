import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import { webcomponent as __SCodeExampleWebcomponent } from "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-handlebars-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { webcomponent as __DocNavComponent } from './components/docNav';
import { webcomponent as __VersionSelector } from './components/VersionSelector';
// generic
// import "./generic/docShortcut";
// internal components
__DocNavComponent();
__VersionSelector();
__SComponentUtils.setDefaultProps('*', {
    mountWhen: 'inViewport'
});
__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    adoptStyles: ['main'],
    defaultStyleClasses: {
        main: 's-tabs'
    }
});
// webcomponents
__SCodeExampleWebcomponent();
// // features
// import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';
// // features
// __smoothScroll({
//   scroll: {
//     offset: 188
//   }
// });
// document.addEventListener('scroll', (e) => {
//   if (document.body.scrollTop >= 10) {
//     document.body.classList.add('scrolled');
//   } else {
//     document.body.classList.remove('scrolled');
//   }
// });
__expandPleasantCssClassnamesLive();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sb0NBQW9DLENBQUM7QUFDNUMsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLG1DQUFtQyxDQUFDO0FBQzNDLE9BQWdDLEVBQUUsWUFBWSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0gsT0FBTyxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8saUNBQWlDLE1BQU0sNkRBQTZELENBQUM7QUFFNUcsT0FBTyxFQUFFLFlBQVksSUFBSSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxZQUFZLElBQUksaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVqRixVQUFVO0FBQ1Ysa0NBQWtDO0FBRWxDLHNCQUFzQjtBQUN0QixpQkFBaUIsRUFBRSxDQUFDO0FBQ3BCLGlCQUFpQixFQUFFLENBQUM7QUFFcEIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtJQUNyQyxTQUFTLEVBQUUsWUFBWTtDQUN4QixDQUFDLENBQUM7QUFDSCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUU7SUFDaEQsZUFBZSxFQUFFLEtBQUs7SUFDdEIsWUFBWSxFQUFFLElBQUk7SUFDbEIsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3JCLG1CQUFtQixFQUFFO1FBQ2pCLElBQUksRUFBRSxRQUFRO0tBQ2pCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLDBCQUEwQixFQUFFLENBQUM7QUFFN0IsY0FBYztBQUNkLDRFQUE0RTtBQUU1RSxjQUFjO0FBQ2QsbUJBQW1CO0FBQ25CLGNBQWM7QUFDZCxrQkFBa0I7QUFDbEIsTUFBTTtBQUNOLE1BQU07QUFFTiwrQ0FBK0M7QUFDL0MseUNBQXlDO0FBQ3pDLCtDQUErQztBQUMvQyxhQUFhO0FBQ2Isa0RBQWtEO0FBQ2xELE1BQU07QUFDTixNQUFNO0FBRU4saUNBQWlDLEVBQUUsQ0FBQyJ9