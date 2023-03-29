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
        'sections.sandbox.sandbox',
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
                                url: '/contact',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQjtZQUNJLElBQUksRUFBRSwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRTs7b0JBQzVCLE1BQU0sT0FBTyxHQUFHLGdDQUFnQyxDQUFDO29CQUVqRCxNQUFNLFFBQVEsR0FBRzt3QkFDYixLQUFLLEVBQUU7NEJBQ0gsR0FBRyxFQUFFLE9BQU87NEJBQ1osR0FBRyxFQUFFLEVBQUU7NEJBQ1AsS0FBSyxFQUFFLEVBQUU7eUJBQ1o7d0JBQ0QsVUFBVSxFQUFFOzRCQUNSLEtBQUssRUFBRSxNQUFNOzRCQUNiLFVBQVUsRUFBRSxJQUFJOzRCQUNoQixFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLOzRCQUMxQyxLQUFLLEVBQUUsU0FBUzt5QkFDbkI7d0JBQ0QsU0FBUyxFQUFFLFVBQVU7d0JBQ3JCLEtBQUssRUFBRSxhQUFhO3dCQUNwQixLQUFLLEVBQUUsd0JBQXdCO3dCQUMvQixJQUFJLEVBQUUsK0lBQStJO3dCQUNySixHQUFHLEVBQUU7NEJBQ0QsS0FBSyxFQUFFLFFBQVE7NEJBQ2YsSUFBSSxFQUFFO2dDQUNGLElBQUksRUFBRSxjQUFjO2dDQUNwQixHQUFHLEVBQUUsVUFBVTtnQ0FDZixLQUFLLEVBQUUsNEJBQTRCOzZCQUN0Qzt5QkFDSjtxQkFDSixDQUFDO29CQUVGLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztvQkFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMs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
