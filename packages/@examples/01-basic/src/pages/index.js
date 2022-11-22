var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
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
                    for (let i = 0; i < 6; i++) {
                        cardData.image.url = imgPath.replace('%i', i + 1);
                        const result = yield viewRenderer.render(
                            'sugar.components.card.card',
                            Object.assign(Object.assign({}, cardData), {
                                title: `Superchardef #${i + 1}`,
                            }),
                        );
                        const cellResult = yield viewRenderer.render(
                            'sugar.bare.cell.cell',
                            {
                                content: result.value,
                            },
                        );
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
                            media: {
                                // desktop: '1 2 3',
                                // tablet: '1 _ 2 3',
                                // mobile: '1 _ 2 _ 3',
                                wide: '1 2 3 4 5 6',
                                desktop: '1 2 3 _ 4 5 6',
                                tablet: '1 2 _ 3 4 _ 5 6',
                                mobile: '2 _ x _ 3 _ 4 _ 5 _ 6',
                            },
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
                    const d = (yield import(
                        `../views/sections/story/story-1.data.js?${__uniqid()}`
                    )).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.card.card',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(
                        `../views/sections/card/card.data.js?${__uniqid()}`
                    )).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.story.story',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(
                        `../views/sections/story/story-2.data.js?${__uniqid()}`
                    )).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsMEJBQTBCO1FBQzFCO1lBQ0ksSUFBSSxFQUFFLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFOztvQkFDNUIsTUFBTSxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7b0JBRWpELE1BQU0sUUFBUSxHQUFHO3dCQUNiLEtBQUssRUFBRTs0QkFDSCxHQUFHLEVBQUUsT0FBTzs0QkFDWixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsRUFBRTt5QkFDWjt3QkFDRCxVQUFVLEVBQUU7NEJBQ1IsS0FBSyxFQUFFLE1BQU07NEJBQ2IsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQzFDLEtBQUssRUFBRSxTQUFTO3lCQUNuQjt3QkFDRCxTQUFTLEVBQUUsVUFBVTt3QkFDckIsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLElBQUksRUFBRSwrSUFBK0k7d0JBQ3JKLEdBQUcsRUFBRTs0QkFDRCxLQUFLLEVBQUUsUUFBUTs0QkFDZixJQUFJLEVBQUU7Z0NBQ0YsSUFBSSxFQUFFLGtCQUFrQjtnQ0FDeEIsR0FBRyxFQUFFLG1CQUFtQjtnQ0FDeEIsTUFBTSxFQUFFLFFBQVE7Z0NBQ2hCLEtBQUssRUFBRSw0QkFBNEI7NkJBQ3RDO3lCQUNKO3FCQUNKLENBQUM7b0JBRUYsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO29CQUUvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxD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
