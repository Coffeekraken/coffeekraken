export default {
    type: 'page',
    page: 'my-page',
    views: [
        'sections.heading.heading',
        // 'sections.sandbox.sandbox',
        // {
        //     path: 'sugar.bare.layout.layout',
        //     async data({ res, viewRenderer }) {
        //         const imgPath = '/dist/img/slider/slide-0%i.jpg';
        //         const cardData = {
        //             image: {
        //                 url: imgPath,
        //                 alt: '',
        //                 title: '',
        //             },
        //             attributes: {
        //                 class: 'card',
        //                 's-appear': true,
        //                 in: Math.random() > 0.5 ? 'bottom' : 'top',
        //                 delay: '300-600',
        //             },
        //             direction: {
        //                 id: 'vertical',
        //                 value: 'vertical',
        //             },
        //             title: {
        //                 value: `Card title!`,
        //             },
        //             intro: {
        //                 value: 'Awesome card component',
        //             },
        //             text: {
        //                 value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra libero tincidunt arcu dignissim rhoncus. Vivamus a ipsum eget mauris.',
        //             },
        //             cta: {
        //                 color: {
        //                     id: 'accent',
        //                     value: 'accent',
        //                 },
        //                 link: {
        //                     text: 'CTA label...',
        //                     url: '/contact',
        //                     title: 'Discover more on apple.com',
        //                 },
        //             },
        //         };
        //         const cardsHtml: string[] = [];
        //         for (let i = 0; i < 3; i++) {
        //             cardData.image.url = imgPath.replace('%i', i + 1);
        //             const result = await viewRenderer.render(
        //                 'sugar.components.card.card',
        //                 {
        //                     ...cardData,
        //                     title: `Card title #${i + 1}`,
        //                 },
        //             );
        //             const cellResult = await viewRenderer.render(
        //                 'sugar.bare.cell.cell',
        //                 {
        //                     html: result.value,
        //                 },
        //             );
        //             cardsHtml.push(cellResult.value);
        //         }
        //         return {
        //             container: 'wide',
        //             id: 'cards',
        //             attributes: {
        //                 class: 'section-specs',
        //             },
        //             layout: {
        //                 media: {
        //                     desktop: '1 2 3',
        //                     tablet: '1 _ 2 3',
        //                     mobile: '1 _ 2 _ 3',
        //                     // wide: '1 2 3 4 5 6',
        //                     // desktop: '1 2 3 _ 4 5 6',
        //                     // tablet: '1 2 _ 3 4 _ 5 6',
        //                     // mobile: '2 _ x _ 3 _ 4 _ 5 _ 6',
        //                 },
        //             },
        //             html: cardsHtml.join('\n'),
        //             gap: 50,
        //         };
        //     },
        // },
        'sections.separator.separator',
        'sections.tabs.tabs',
        // {
        //     path: 'sections.story.story',
        //     async data() {
        //         const d = (
        //             await import(
        //                 `../views/sections/story/story-1.data.js?${__uniqid()}`
        //             )
        //         ).default;
        //         return d;
        //     },
        // },
        // {
        //     path: 'sections.card.card',
        //     async data() {
        //         const d = (
        //             await import(
        //                 `../views/sections/card/card.data.js?${__uniqid()}`
        //             )
        //         ).default;
        //         return d;
        //     },
        // },
        // {
        //     path: 'sections.story.story',
        //     async data() {
        //         const d = (
        //             await import(
        //                 `../views/sections/story/story-2.data.js?${__uniqid()}`
        //             )
        //         ).default;
        //         return d;
        //     },
        // },
        // {
        //     path: 'sections.slider.slider',
        //     async data() {
        //         const d = (
        //             await import(
        //                 `../views/sections/slider/slider.data.js?${__uniqid()}`
        //             )
        //         ).default;
        //         return d;
        //     },
        // },
        // {
        //     path: 'sections.separator.separator',
        //     data() {
        //         return {
        //             title: {
        //                 value: 'Simple separator<br /><span class="s-tc:accent">Usable everywhere</span>!',
        //             },
        //             image: {
        //                 url: '/dist/img/macos-wallpaper-02.webp',
        //                 alt: '',
        //             },
        //         };
        //     },
        // },
        // 'sections.contact.contact',
        // // {
        // //     path: 'sections.slider.slider',
        // //     async data() {
        // //         const d = (
        // //             await import(
        // //                 `../views/sections/slider/slider.data.js?${__uniqid()}`
        // //             )
        // //         ).default;
        // //         return d;
        // //     },
        // // },
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDWCxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxTQUFTO0lBRWYsS0FBSyxFQUFFO1FBQ0gsMEJBQTBCO1FBQzFCLDhCQUE4QjtRQUM5QixJQUFJO1FBQ0osd0NBQXdDO1FBQ3hDLDBDQUEwQztRQUMxQyw0REFBNEQ7UUFFNUQsNkJBQTZCO1FBQzdCLHVCQUF1QjtRQUN2QixnQ0FBZ0M7UUFDaEMsMkJBQTJCO1FBQzNCLDZCQUE2QjtRQUM3QixpQkFBaUI7UUFDakIsNEJBQTRCO1FBQzVCLGlDQUFpQztRQUNqQyxvQ0FBb0M7UUFDcEMsOERBQThEO1FBQzlELG9DQUFvQztRQUNwQyxpQkFBaUI7UUFDakIsMkJBQTJCO1FBQzNCLGtDQUFrQztRQUNsQyxxQ0FBcUM7UUFDckMsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2Qix3Q0FBd0M7UUFDeEMsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixtREFBbUQ7UUFDbkQsaUJBQWlCO1FBQ2pCLHNCQUFzQjtRQUN0QiwwS0FBMEs7UUFDMUssaUJBQWlCO1FBQ2pCLHFCQUFxQjtRQUNyQiwyQkFBMkI7UUFDM0Isb0NBQW9DO1FBQ3BDLHVDQUF1QztRQUN2QyxxQkFBcUI7UUFDckIsMEJBQTBCO1FBQzFCLDRDQUE0QztRQUM1Qyx1Q0FBdUM7UUFDdkMsMkRBQTJEO1FBQzNELHFCQUFxQjtRQUNyQixpQkFBaUI7UUFDakIsYUFBYTtRQUViLDBDQUEwQztRQUUxQyx3Q0FBd0M7UUFDeEMsaUVBQWlFO1FBQ2pFLHdEQUF3RDtRQUN4RCxnREFBZ0Q7UUFDaEQsb0JBQW9CO1FBQ3BCLG1DQUFtQztRQUNuQyxxREFBcUQ7UUFDckQscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQiw0REFBNEQ7UUFDNUQsMENBQTBDO1FBQzFDLG9CQUFvQjtRQUNwQiwwQ0FBMEM7UUFDMUMscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUVqQixnREFBZ0Q7UUFDaEQsWUFBWTtRQUVaLG1CQUFtQjtRQUNuQixpQ0FBaUM7UUFDakMsMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUM1QiwwQ0FBMEM7UUFDMUMsaUJBQWlCO1FBQ2pCLHdCQUF3QjtRQUN4QiwyQkFBMkI7UUFDM0Isd0NBQXdDO1FBQ3hDLHlDQUF5QztRQUN6QywyQ0FBMkM7UUFFM0MsOENBQThDO1FBQzlDLG1EQUFtRDtRQUNuRCxvREFBb0Q7UUFDcEQsMERBQTBEO1FBQzFELHFCQUFxQjtRQUNyQixpQkFBaUI7UUFDakIsMENBQTBDO1FBQzFDLHVCQUF1QjtRQUN2QixhQUFhO1FBQ2IsU0FBUztRQUNULEtBQUs7UUFDTCw4QkFBOEI7UUFDOUIsb0JBQW9CO1FBQ3BCLElBQUk7UUFDSixvQ0FBb0M7UUFDcEMscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsMEVBQTBFO1FBQzFFLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxLQUFLO1FBQ0wsSUFBSTtRQUNKLGtDQUFrQztRQUNsQyxxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1QixzRUFBc0U7UUFDdEUsZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIsU0FBUztRQUNULEtBQUs7UUFDTCxJQUFJO1FBQ0osb0NBQW9DO1FBQ3BDLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLDBFQUEwRTtRQUMxRSxnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsS0FBSztRQUNMLElBQUk7UUFDSixzQ0FBc0M7UUFDdEMscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsMEVBQTBFO1FBQzFFLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxLQUFLO1FBQ0wsSUFBSTtRQUNKLDRDQUE0QztRQUM1QyxlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2QixzR0FBc0c7UUFDdEcsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2Qiw0REFBNEQ7UUFDNUQsMkJBQTJCO1FBQzNCLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2IsU0FBUztRQUNULEtBQUs7UUFDTCw4QkFBOEI7UUFDOUIsT0FBTztRQUNQLHlDQUF5QztRQUN6Qyx3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLCtCQUErQjtRQUMvQiw2RUFBNkU7UUFDN0UsbUJBQW1CO1FBQ25CLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsWUFBWTtRQUNaLFFBQVE7S0FDWDtDQUNKLENBQUMifQ==
