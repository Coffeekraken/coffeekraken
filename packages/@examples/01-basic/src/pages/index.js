export default {
    // type: 'page',
    // page: 'my-page',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDWCxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBRW5CLEtBQUssRUFBRTtRQUNILDBCQUEwQjtRQUMxQiw4QkFBOEI7UUFDOUIsSUFBSTtRQUNKLHdDQUF3QztRQUN4QywwQ0FBMEM7UUFDMUMsNERBQTREO1FBRTVELDZCQUE2QjtRQUM3Qix1QkFBdUI7UUFDdkIsZ0NBQWdDO1FBQ2hDLDJCQUEyQjtRQUMzQiw2QkFBNkI7UUFDN0IsaUJBQWlCO1FBQ2pCLDRCQUE0QjtRQUM1QixpQ0FBaUM7UUFDakMsb0NBQW9DO1FBQ3BDLDhEQUE4RDtRQUM5RCxvQ0FBb0M7UUFDcEMsaUJBQWlCO1FBQ2pCLDJCQUEyQjtRQUMzQixrQ0FBa0M7UUFDbEMscUNBQXFDO1FBQ3JDLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsd0NBQXdDO1FBQ3hDLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsbURBQW1EO1FBQ25ELGlCQUFpQjtRQUNqQixzQkFBc0I7UUFDdEIsMEtBQTBLO1FBQzFLLGlCQUFpQjtRQUNqQixxQkFBcUI7UUFDckIsMkJBQTJCO1FBQzNCLG9DQUFvQztRQUNwQyx1Q0FBdUM7UUFDdkMscUJBQXFCO1FBQ3JCLDBCQUEwQjtRQUMxQiw0Q0FBNEM7UUFDNUMsdUNBQXVDO1FBQ3ZDLDJEQUEyRDtRQUMzRCxxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLGFBQWE7UUFFYiwwQ0FBMEM7UUFFMUMsd0NBQXdDO1FBQ3hDLGlFQUFpRTtRQUNqRSx3REFBd0Q7UUFDeEQsZ0RBQWdEO1FBQ2hELG9CQUFvQjtRQUNwQixtQ0FBbUM7UUFDbkMscURBQXFEO1FBQ3JELHFCQUFxQjtRQUNyQixpQkFBaUI7UUFDakIsNERBQTREO1FBQzVELDBDQUEwQztRQUMxQyxvQkFBb0I7UUFDcEIsMENBQTBDO1FBQzFDLHFCQUFxQjtRQUNyQixpQkFBaUI7UUFFakIsZ0RBQWdEO1FBQ2hELFlBQVk7UUFFWixtQkFBbUI7UUFDbkIsaUNBQWlDO1FBQ2pDLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsMENBQTBDO1FBQzFDLGlCQUFpQjtRQUNqQix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLHdDQUF3QztRQUN4Qyx5Q0FBeUM7UUFDekMsMkNBQTJDO1FBRTNDLDhDQUE4QztRQUM5QyxtREFBbUQ7UUFDbkQsb0RBQW9EO1FBQ3BELDBEQUEwRDtRQUMxRCxxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLDBDQUEwQztRQUMxQyx1QkFBdUI7UUFDdkIsYUFBYTtRQUNiLFNBQVM7UUFDVCxLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLG9CQUFvQjtRQUNwQixJQUFJO1FBQ0osb0NBQW9DO1FBQ3BDLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLDBFQUEwRTtRQUMxRSxnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsS0FBSztRQUNMLElBQUk7UUFDSixrQ0FBa0M7UUFDbEMscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsc0VBQXNFO1FBQ3RFLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxLQUFLO1FBQ0wsSUFBSTtRQUNKLG9DQUFvQztRQUNwQyxxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1QiwwRUFBMEU7UUFDMUUsZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIsU0FBUztRQUNULEtBQUs7UUFDTCxJQUFJO1FBQ0osc0NBQXNDO1FBQ3RDLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLDBFQUEwRTtRQUMxRSxnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsS0FBSztRQUNMLElBQUk7UUFDSiw0Q0FBNEM7UUFDNUMsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQix1QkFBdUI7UUFDdkIsc0dBQXNHO1FBQ3RHLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsNERBQTREO1FBQzVELDJCQUEyQjtRQUMzQixpQkFBaUI7UUFDakIsYUFBYTtRQUNiLFNBQVM7UUFDVCxLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLE9BQU87UUFDUCx5Q0FBeUM7UUFDekMsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6QiwrQkFBK0I7UUFDL0IsNkVBQTZFO1FBQzdFLG1CQUFtQjtRQUNuQix3QkFBd0I7UUFDeEIsdUJBQXVCO1FBQ3ZCLFlBQVk7UUFDWixRQUFRO0tBQ1g7Q0FDSixDQUFDIn0=
