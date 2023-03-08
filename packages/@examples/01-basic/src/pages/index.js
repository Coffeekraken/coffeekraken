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
                        title: `Card title!`,
                        intro: 'Awesome card component',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra libero tincidunt arcu dignissim rhoncus. Vivamus a ipsum eget mauris.',
                        cta: {
                            color: 'accent',
                            link: {
                                text: 'CTA label...',
                                url: 'https://apple.com',
                                target: '_blank',
                                title: 'Discover more on apple.com',
                            },
                        },
                    };
                    const cardsHtml = [];
                    for (let i = 0; i < 3; i++) {
                        cardData.image.url = imgPath.replace('%i', i + 1);
                        const result = yield viewRenderer.render(
                            'sugar.components.card.card',
                            Object.assign(Object.assign({}, cardData), {
                                title: `Card title #${i + 1}`,
                            }),
                        );
                        const cellResult = yield viewRenderer.render(
                            'sugar.bare.cell.cell',
                            {
                                html: result.value,
                            },
                        );
                        cardsHtml.push(cellResult.value);
                    }
                    return {
                        container: 'wide',
                        id: 'cards',
                        attributes: {
                            class: 'section-specs',
                        },
                        layout: {
                            media: {
                                desktop: '1 2 3',
                                tablet: '1 _ 2 3',
                                mobile: '1 _ 2 _ 3',
                                // wide: '1 2 3 4 5 6',
                                // desktop: '1 2 3 _ 4 5 6',
                                // tablet: '1 2 _ 3 4 _ 5 6',
                                // mobile: '2 _ x _ 3 _ 4 _ 5 _ 6',
                            },
                        },
                        html: cardsHtml.join('\n'),
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
            path: 'sections.slider.slider',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(
                        `../views/sections/slider/slider.data.js?${__uniqid()}`
                    )).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.separator.separator',
            data() {
                return {
                    title: 'Simple separator<br /><span class="s-tc:accent">Usable everywhere</span>!',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ2IsS0FBSyxFQUFFO1FBQ0wsMEJBQTBCO1FBQzFCO1lBQ0UsSUFBSSxFQUFFLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFOztvQkFDOUIsTUFBTSxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7b0JBRWpELE1BQU0sUUFBUSxHQUFHO3dCQUNmLEtBQUssRUFBRTs0QkFDTCxHQUFHLEVBQUUsT0FBTzs0QkFDWixHQUFHLEVBQUUsRUFBRTs0QkFDUCxLQUFLLEVBQUUsRUFBRTt5QkFDVjt3QkFDRCxVQUFVLEVBQUU7NEJBQ1YsS0FBSyxFQUFFLE1BQU07NEJBQ2IsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQzFDLEtBQUssRUFBRSxTQUFTO3lCQUNqQjt3QkFDRCxTQUFTLEVBQUUsVUFBVTt3QkFDckIsS0FBSyxFQUFFLGFBQWE7d0JBQ3BCLEtBQUssRUFBRSx3QkFBd0I7d0JBQy9CLElBQUksRUFBRSwrSUFBK0k7d0JBQ3JKLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsUUFBUTs0QkFDZixJQUFJLEVBQUU7Z0NBQ0osSUFBSSxFQUFFLGNBQWM7Z0NBQ3BCLEdBQUcsRUFBRSxtQkFBbUI7Z0NBQ3hCLE1BQU0sRUFBRSxRQUFRO2dDQUNoQixLQUFLLEVBQUUsNEJBQTRCOzZCQUNwQzt5QkFDRjtxQkFDRixDQUFDO29CQUVGLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztvQkFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FB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
