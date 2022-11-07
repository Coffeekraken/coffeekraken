var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __uniqid } from '@coffeekraken/sugar/string';
export default {
    views: [
        'sections.heading.heading',
        {
            path: 'sugar.bare.layout.layout',
            data({ res, viewRenderer }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const imgPath = '/dist/img/slider/slide-0%i.jpg';
                    const cardData = {
                        image: {
                            url: imgPath,
                            alt: '',
                            title: '',
                        },
                        attributes: {
                            class: 'card',
                            's-appear': true,
                            in: Math.random() > 0.5 ? 'bottom' : 'top',
                            delay: '300-600',
                        },
                        direction: 'vertical',
                        title: `Supercharged!`,
                        intro: 'Up to 18 hours of battery life.',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra libero tincidunt arcu dignissim rhoncus. Vivamus a ipsum eget mauris.',
                        cta: {
                            color: 'accent',
                            link: {
                                text: 'Discover more...',
                                url: 'https://apple.com',
                                target: '_blank',
                                title: 'Discover more on apple.com',
                            },
                        },
                    };
                    const cardsHtml = [];
                    for (let i = 0; i < 3; i++) {
                        cardData.image.url = imgPath.replace('%i', i + 1);
                        const result = yield viewRenderer.render('sugar.components.card.card', Object.assign(Object.assign({}, cardData), { title: `Superchardef #${i + 1}` }));
                        const cellResult = yield viewRenderer.render('sugar.bare.cell.cell', {
                            content: result.value,
                        });
                        cardsHtml.push(cellResult.value);
                    }
                    return {
                        container: 'wide',
                        // frontspec: res.templateData.shared.frontspec,
                        id: 'cards',
                        attributes: {
                            class: 'section-specs',
                        },
                        layout: {
                            desktop: '1 2 3',
                            mobile: '1 _ 2 _ 3',
                        },
                        content: cardsHtml.join('\n'),
                        gap: 50,
                    };
                });
            },
        },
        'sections.separator.separator',
        'sections.tabs.tabs',
        {
            path: 'sections.story.story',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(`../views/sections/story/story-1.data.js?${__uniqid()}`)).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.card.card',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(`../views/sections/card/card.data.js?${__uniqid()}`)).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.story.story',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(`../views/sections/story/story-2.data.js?${__uniqid()}`)).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.separator.separator',
            data() {
                return {
                    title: 'Don\'t be afraid to<br /><span class="s-tc:accent">Contact us</span>!',
                    image: {
                        url: '/dist/img/macos-wallpaper-02.webp',
                        alt: '',
                    },
                };
            },
        },
        'sections.contact.contact',
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
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ2IsS0FBSyxFQUFFO1FBQ0wsMEJBQTBCO1FBQzFCO1lBQ0UsSUFBSSxFQUFFLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFOztvQkFDOUIsTUFBTSxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7b0JBRWpELE1BQU0sUUFBUSxHQUFHO3dCQUNmLEtBQUssRUFBRTs0QkFDTCxHQUFHLEVBQUUsT0FBTzs0QkFDWixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsRUFBRTt5QkFDVjt3QkFDRCxVQUFVLEVBQUU7NEJBQ1YsS0FBSyxFQUFFLE1BQU07NEJBQ2IsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQzFDLEtBQUssRUFBRSxTQUFTO3lCQUNqQjt3QkFDRCxTQUFTLEVBQUUsVUFBVTt3QkFDckIsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLElBQUksRUFBRSwrSUFBK0k7d0JBQ3JKLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsUUFBUTs0QkFDZixJQUFJLEVBQUU7Z0NBQ0osSUFBSSxFQUFFLGtCQUFrQjtnQ0FDeEIsR0FBRyxFQUFFLG1CQUFtQjtnQ0FDeEIsTUFBTSxFQUFFLFFBQVE7Z0NBQ2hCLEtBQUssRUFBRSw0QkFBNEI7NkJBQ3BDO3lCQUNGO3FCQUNGLENBQUM7b0JBRUYsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO29CQUUvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxD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