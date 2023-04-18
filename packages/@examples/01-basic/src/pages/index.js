export default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDWCxLQUFLLEVBQUU7UUFDSCwwQkFBMEI7UUFDMUIsOEJBQThCO1FBQzlCLElBQUk7UUFDSix3Q0FBd0M7UUFDeEMsMENBQTBDO1FBQzFDLDREQUE0RDtRQUU1RCw2QkFBNkI7UUFDN0IsdUJBQXVCO1FBQ3ZCLGdDQUFnQztRQUNoQywyQkFBMkI7UUFDM0IsNkJBQTZCO1FBQzdCLGlCQUFpQjtRQUNqQiw0QkFBNEI7UUFDNUIsaUNBQWlDO1FBQ2pDLG9DQUFvQztRQUNwQyw4REFBOEQ7UUFDOUQsb0NBQW9DO1FBQ3BDLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0Isa0NBQWtDO1FBQ2xDLHFDQUFxQztRQUNyQyxpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLHdDQUF3QztRQUN4QyxpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLG1EQUFtRDtRQUNuRCxpQkFBaUI7UUFDakIsc0JBQXNCO1FBQ3RCLDBLQUEwSztRQUMxSyxpQkFBaUI7UUFDakIscUJBQXFCO1FBQ3JCLDJCQUEyQjtRQUMzQixvQ0FBb0M7UUFDcEMsdUNBQXVDO1FBQ3ZDLHFCQUFxQjtRQUNyQiwwQkFBMEI7UUFDMUIsNENBQTRDO1FBQzVDLHVDQUF1QztRQUN2QywyREFBMkQ7UUFDM0QscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQixhQUFhO1FBRWIsMENBQTBDO1FBRTFDLHdDQUF3QztRQUN4QyxpRUFBaUU7UUFDakUsd0RBQXdEO1FBQ3hELGdEQUFnRDtRQUNoRCxvQkFBb0I7UUFDcEIsbUNBQW1DO1FBQ25DLHFEQUFxRDtRQUNyRCxxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLDREQUE0RDtRQUM1RCwwQ0FBMEM7UUFDMUMsb0JBQW9CO1FBQ3BCLDBDQUEwQztRQUMxQyxxQkFBcUI7UUFDckIsaUJBQWlCO1FBRWpCLGdEQUFnRDtRQUNoRCxZQUFZO1FBRVosbUJBQW1CO1FBQ25CLGlDQUFpQztRQUNqQywyQkFBMkI7UUFDM0IsNEJBQTRCO1FBQzVCLDBDQUEwQztRQUMxQyxpQkFBaUI7UUFDakIsd0JBQXdCO1FBQ3hCLDJCQUEyQjtRQUMzQix3Q0FBd0M7UUFDeEMseUNBQXlDO1FBQ3pDLDJDQUEyQztRQUUzQyw4Q0FBOEM7UUFDOUMsbURBQW1EO1FBQ25ELG9EQUFvRDtRQUNwRCwwREFBMEQ7UUFDMUQscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQiwwQ0FBMEM7UUFDMUMsdUJBQXVCO1FBQ3ZCLGFBQWE7UUFDYixTQUFTO1FBQ1QsS0FBSztRQUNMLDhCQUE4QjtRQUM5QixvQkFBb0I7UUFDcEIsSUFBSTtRQUNKLG9DQUFvQztRQUNwQyxxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1QiwwRUFBMEU7UUFDMUUsZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIsU0FBUztRQUNULEtBQUs7UUFDTCxJQUFJO1FBQ0osa0NBQWtDO1FBQ2xDLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLHNFQUFzRTtRQUN0RSxnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixTQUFTO1FBQ1QsS0FBSztRQUNMLElBQUk7UUFDSixvQ0FBb0M7UUFDcEMscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsMEVBQTBFO1FBQzFFLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxLQUFLO1FBQ0wsSUFBSTtRQUNKLHNDQUFzQztRQUN0QyxxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1QiwwRUFBMEU7UUFDMUUsZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIsU0FBUztRQUNULEtBQUs7UUFDTCxJQUFJO1FBQ0osNENBQTRDO1FBQzVDLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHNHQUFzRztRQUN0RyxpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLDREQUE0RDtRQUM1RCwyQkFBMkI7UUFDM0IsaUJBQWlCO1FBQ2pCLGFBQWE7UUFDYixTQUFTO1FBQ1QsS0FBSztRQUNMLDhCQUE4QjtRQUM5QixPQUFPO1FBQ1AseUNBQXlDO1FBQ3pDLHdCQUF3QjtRQUN4Qix5QkFBeUI7UUFDekIsK0JBQStCO1FBQy9CLDZFQUE2RTtRQUM3RSxtQkFBbUI7UUFDbkIsd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2QixZQUFZO1FBQ1osUUFBUTtLQUNYO0NBQ0osQ0FBQyJ9
