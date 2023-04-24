export default {
    type: 'page',
    page: 'my-page',
    // views: [
    //     'sections.heading.heading',
    //     // 'sections.sandbox.sandbox',
    //     // {
    //     //     path: 'sugar.bare.layout.layout',
    //     //     async data({ res, viewRenderer }) {
    //     //         const imgPath = '/dist/img/slider/slide-0%i.jpg';
    //     //         const cardData = {
    //     //             image: {
    //     //                 url: imgPath,
    //     //                 alt: '',
    //     //                 title: '',
    //     //             },
    //     //             attributes: {
    //     //                 class: 'card',
    //     //                 's-appear': true,
    //     //                 in: Math.random() > 0.5 ? 'bottom' : 'top',
    //     //                 delay: '300-600',
    //     //             },
    //     //             direction: {
    //     //                 id: 'vertical',
    //     //                 value: 'vertical',
    //     //             },
    //     //             title: {
    //     //                 value: `Card title!`,
    //     //             },
    //     //             intro: {
    //     //                 value: 'Awesome card component',
    //     //             },
    //     //             text: {
    //     //                 value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra libero tincidunt arcu dignissim rhoncus. Vivamus a ipsum eget mauris.',
    //     //             },
    //     //             cta: {
    //     //                 color: {
    //     //                     id: 'accent',
    //     //                     value: 'accent',
    //     //                 },
    //     //                 link: {
    //     //                     text: 'CTA label...',
    //     //                     url: '/contact',
    //     //                     title: 'Discover more on apple.com',
    //     //                 },
    //     //             },
    //     //         };
    //     //         const cardsHtml: string[] = [];
    //     //         for (let i = 0; i < 3; i++) {
    //     //             cardData.image.url = imgPath.replace('%i', i + 1);
    //     //             const result = await viewRenderer.render(
    //     //                 'sugar.components.card.card',
    //     //                 {
    //     //                     ...cardData,
    //     //                     title: `Card title #${i + 1}`,
    //     //                 },
    //     //             );
    //     //             const cellResult = await viewRenderer.render(
    //     //                 'sugar.bare.cell.cell',
    //     //                 {
    //     //                     html: result.value,
    //     //                 },
    //     //             );
    //     //             cardsHtml.push(cellResult.value);
    //     //         }
    //     //         return {
    //     //             container: 'wide',
    //     //             id: 'cards',
    //     //             attributes: {
    //     //                 class: 'section-specs',
    //     //             },
    //     //             layout: {
    //     //                 media: {
    //     //                     desktop: '1 2 3',
    //     //                     tablet: '1 _ 2 3',
    //     //                     mobile: '1 _ 2 _ 3',
    //     //                     // wide: '1 2 3 4 5 6',
    //     //                     // desktop: '1 2 3 _ 4 5 6',
    //     //                     // tablet: '1 2 _ 3 4 _ 5 6',
    //     //                     // mobile: '2 _ x _ 3 _ 4 _ 5 _ 6',
    //     //                 },
    //     //             },
    //     //             html: cardsHtml.join('\n'),
    //     //             gap: 50,
    //     //         };
    //     //     },
    //     // },
    //     'sections.separator.separator',
    //     'sections.tabs.tabs',
    //     // {
    //     //     path: 'sections.story.story',
    //     //     async data() {
    //     //         const d = (
    //     //             await import(
    //     //                 `../views/sections/story/story-1.data.js?${__uniqid()}`
    //     //             )
    //     //         ).default;
    //     //         return d;
    //     //     },
    //     // },
    //     // {
    //     //     path: 'sections.card.card',
    //     //     async data() {
    //     //         const d = (
    //     //             await import(
    //     //                 `../views/sections/card/card.data.js?${__uniqid()}`
    //     //             )
    //     //         ).default;
    //     //         return d;
    //     //     },
    //     // },
    //     // {
    //     //     path: 'sections.story.story',
    //     //     async data() {
    //     //         const d = (
    //     //             await import(
    //     //                 `../views/sections/story/story-2.data.js?${__uniqid()}`
    //     //             )
    //     //         ).default;
    //     //         return d;
    //     //     },
    //     // },
    //     // {
    //     //     path: 'sections.slider.slider',
    //     //     async data() {
    //     //         const d = (
    //     //             await import(
    //     //                 `../views/sections/slider/slider.data.js?${__uniqid()}`
    //     //             )
    //     //         ).default;
    //     //         return d;
    //     //     },
    //     // },
    //     // {
    //     //     path: 'sections.separator.separator',
    //     //     data() {
    //     //         return {
    //     //             title: {
    //     //                 value: 'Simple separator<br /><span class="s-tc:accent">Usable everywhere</span>!',
    //     //             },
    //     //             image: {
    //     //                 url: '/dist/img/macos-wallpaper-02.webp',
    //     //                 alt: '',
    //     //             },
    //     //         };
    //     //     },
    //     // },
    //     // 'sections.contact.contact',
    //     // // {
    //     // //     path: 'sections.slider.slider',
    //     // //     async data() {
    //     // //         const d = (
    //     // //             await import(
    //     // //                 `../views/sections/slider/slider.data.js?${__uniqid()}`
    //     // //             )
    //     // //         ).default;
    //     // //         return d;
    //     // //     },
    //     // // },
    // ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDWCxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxTQUFTO0lBRWYsV0FBVztJQUNYLGtDQUFrQztJQUNsQyxxQ0FBcUM7SUFDckMsV0FBVztJQUNYLCtDQUErQztJQUMvQyxpREFBaUQ7SUFDakQsbUVBQW1FO0lBRW5FLG9DQUFvQztJQUNwQyw4QkFBOEI7SUFDOUIsdUNBQXVDO0lBQ3ZDLGtDQUFrQztJQUNsQyxvQ0FBb0M7SUFDcEMsd0JBQXdCO0lBQ3hCLG1DQUFtQztJQUNuQyx3Q0FBd0M7SUFDeEMsMkNBQTJDO0lBQzNDLHFFQUFxRTtJQUNyRSwyQ0FBMkM7SUFDM0Msd0JBQXdCO0lBQ3hCLGtDQUFrQztJQUNsQyx5Q0FBeUM7SUFDekMsNENBQTRDO0lBQzVDLHdCQUF3QjtJQUN4Qiw4QkFBOEI7SUFDOUIsK0NBQStDO0lBQy9DLHdCQUF3QjtJQUN4Qiw4QkFBOEI7SUFDOUIsMERBQTBEO0lBQzFELHdCQUF3QjtJQUN4Qiw2QkFBNkI7SUFDN0IsaUxBQWlMO0lBQ2pMLHdCQUF3QjtJQUN4Qiw0QkFBNEI7SUFDNUIsa0NBQWtDO0lBQ2xDLDJDQUEyQztJQUMzQyw4Q0FBOEM7SUFDOUMsNEJBQTRCO0lBQzVCLGlDQUFpQztJQUNqQyxtREFBbUQ7SUFDbkQsOENBQThDO0lBQzlDLGtFQUFrRTtJQUNsRSw0QkFBNEI7SUFDNUIsd0JBQXdCO0lBQ3hCLG9CQUFvQjtJQUVwQixpREFBaUQ7SUFFakQsK0NBQStDO0lBQy9DLHdFQUF3RTtJQUN4RSwrREFBK0Q7SUFDL0QsdURBQXVEO0lBQ3ZELDJCQUEyQjtJQUMzQiwwQ0FBMEM7SUFDMUMsNERBQTREO0lBQzVELDRCQUE0QjtJQUM1Qix3QkFBd0I7SUFDeEIsbUVBQW1FO0lBQ25FLGlEQUFpRDtJQUNqRCwyQkFBMkI7SUFDM0IsaURBQWlEO0lBQ2pELDRCQUE0QjtJQUM1Qix3QkFBd0I7SUFFeEIsdURBQXVEO0lBQ3ZELG1CQUFtQjtJQUVuQiwwQkFBMEI7SUFDMUIsd0NBQXdDO0lBQ3hDLGtDQUFrQztJQUNsQyxtQ0FBbUM7SUFDbkMsaURBQWlEO0lBQ2pELHdCQUF3QjtJQUN4QiwrQkFBK0I7SUFDL0Isa0NBQWtDO0lBQ2xDLCtDQUErQztJQUMvQyxnREFBZ0Q7SUFDaEQsa0RBQWtEO0lBRWxELHFEQUFxRDtJQUNyRCwwREFBMEQ7SUFDMUQsMkRBQTJEO0lBQzNELGlFQUFpRTtJQUNqRSw0QkFBNEI7SUFDNUIsd0JBQXdCO0lBQ3hCLGlEQUFpRDtJQUNqRCw4QkFBOEI7SUFDOUIsb0JBQW9CO0lBQ3BCLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osc0NBQXNDO0lBQ3RDLDRCQUE0QjtJQUM1QixXQUFXO0lBQ1gsMkNBQTJDO0lBQzNDLDRCQUE0QjtJQUM1Qiw2QkFBNkI7SUFDN0IsbUNBQW1DO0lBQ25DLGlGQUFpRjtJQUNqRix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLDJCQUEyQjtJQUMzQixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFdBQVc7SUFDWCx5Q0FBeUM7SUFDekMsNEJBQTRCO0lBQzVCLDZCQUE2QjtJQUM3QixtQ0FBbUM7SUFDbkMsNkVBQTZFO0lBQzdFLHVCQUF1QjtJQUN2Qiw0QkFBNEI7SUFDNUIsMkJBQTJCO0lBQzNCLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osV0FBVztJQUNYLDJDQUEyQztJQUMzQyw0QkFBNEI7SUFDNUIsNkJBQTZCO0lBQzdCLG1DQUFtQztJQUNuQyxpRkFBaUY7SUFDakYsdUJBQXVCO0lBQ3ZCLDRCQUE0QjtJQUM1QiwyQkFBMkI7SUFDM0IsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixXQUFXO0lBQ1gsNkNBQTZDO0lBQzdDLDRCQUE0QjtJQUM1Qiw2QkFBNkI7SUFDN0IsbUNBQW1DO0lBQ25DLGlGQUFpRjtJQUNqRix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLDJCQUEyQjtJQUMzQixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFdBQVc7SUFDWCxtREFBbUQ7SUFDbkQsc0JBQXNCO0lBQ3RCLDBCQUEwQjtJQUMxQiw4QkFBOEI7SUFDOUIsNkdBQTZHO0lBQzdHLHdCQUF3QjtJQUN4Qiw4QkFBOEI7SUFDOUIsbUVBQW1FO0lBQ25FLGtDQUFrQztJQUNsQyx3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1oscUNBQXFDO0lBQ3JDLGNBQWM7SUFDZCxnREFBZ0Q7SUFDaEQsK0JBQStCO0lBQy9CLGdDQUFnQztJQUNoQyxzQ0FBc0M7SUFDdEMsb0ZBQW9GO0lBQ3BGLDBCQUEwQjtJQUMxQiwrQkFBK0I7SUFDL0IsOEJBQThCO0lBQzlCLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsS0FBSztDQUNSLENBQUMifQ==
