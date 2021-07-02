// import '@coffeekraken/s-inline-svg-component';
// import '@coffeekraken/s-activate-component';
// import "@coffeekraken/s-filtrable-input-component";
// import "@coffeekraken/s-request-component";
// import "@coffeekraken/s-code-example-component";
// import "@coffeekraken/s-opengraph-viewer-component";
// import "@coffeekraken/s-handlebars-component";
// import __SComponentUtils from "@coffeekraken/s-component-utils";
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
// import './components/docNav.riot';
// // generic
// import "./generic/docShortcut";
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
// __SComponentUtils.setDefaultProps('s-code-example', {
//     toolbarPosition: 'nav',
//     defaultStyle: true,
//     defaultStyleClasses: {
//         main: 's-tabs'
//     }
// });
__querySelectorLive('[class*=":"]', ($elm) => {
    $elm.getAttribute('class').split(' ').forEach((cls) => {
        if (!cls.includes(':'))
            return;
        const parts = cls.split(":");
        const startCls = parts[0];
        $elm.classList.add(startCls);
        parts.forEach((p, i) => {
            if (i <= 0)
                return;
            $elm.classList.add(`${startCls}--${p}`);
        });
        $elm.classList.remove(cls);
    });
}, {
    once: false
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpREFBaUQ7QUFDakQsK0NBQStDO0FBQy9DLHNEQUFzRDtBQUN0RCw4Q0FBOEM7QUFDOUMsbURBQW1EO0FBQ25ELHVEQUF1RDtBQUN2RCxpREFBaUQ7QUFDakQsbUVBQW1FO0FBQ25FLE9BQU8sbUJBQW1CLE1BQU0sb0RBQW9ELENBQUM7QUFFckYscUNBQXFDO0FBRXJDLGFBQWE7QUFDYixrQ0FBa0M7QUFFbEMsY0FBYztBQUNkLDRFQUE0RTtBQUU1RSxjQUFjO0FBQ2QsbUJBQW1CO0FBQ25CLGNBQWM7QUFDZCxrQkFBa0I7QUFDbEIsTUFBTTtBQUNOLE1BQU07QUFFTiwrQ0FBK0M7QUFDL0MseUNBQXlDO0FBQ3pDLCtDQUErQztBQUMvQyxhQUFhO0FBQ2Isa0RBQWtEO0FBQ2xELE1BQU07QUFDTixNQUFNO0FBRU4sd0RBQXdEO0FBQ3hELDhCQUE4QjtBQUM5QiwwQkFBMEI7QUFDMUIsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QixRQUFRO0FBQ1IsTUFBTTtBQUVOLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO0lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3JELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU87UUFDL0IsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLE9BQU87WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxFQUFFO0lBQ0QsSUFBSSxFQUFFLEtBQUs7Q0FDWixDQUFDLENBQUMifQ==