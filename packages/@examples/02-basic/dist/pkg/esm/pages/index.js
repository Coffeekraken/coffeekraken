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
        'sections.separator.separator',
        'sections.tabs.tabs',
        {
            path: 'sugar.bare.layout.layout',
            data({ res, viewRenderer }) {
                return __awaiter(this, void 0, void 0, function* () {
                    const imgPath = '/dist/img/album-0%i.jpg';
                    const cardData = {
                        image: {
                            url: imgPath,
                            alt: '',
                            title: '',
                        },
                        attributes: {
                            class: 'card',
                        },
                        title: 'Supercharged!',
                        intro: 'Up to 18 hours of battery life.',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra libero tincidunt arcu dignissim rhoncus. Vivamus a ipsum eget mauris.',
                        cta: {
                            label: 'Discover more...',
                            color: 'accent',
                            link: {
                                url: 'https://apple.com',
                                target: '_blank',
                                title: 'Discover more on apple.com',
                            },
                        },
                    };
                    const cardsHtml = [];
                    for (let i = 0; i < 3; i++) {
                        cardData.image.url = imgPath.replace('%i', i + 1);
                        const result = yield viewRenderer.render('sugar.components.card.card', cardData);
                        cardsHtml.push(`<div s-appear in="bottom" delay="500-1000">
            ${result.value}
          </div>`);
                    }
                    return {
                        container: 'wide',
                        frontspec: res.frontspec,
                        id: 'cards',
                        attributes: {
                            class: 'section-specs',
                        },
                        layout: {
                            default: '1 2 3',
                            mobile: '1 _ 2 _ 3',
                        },
                        content: cardsHtml.join('\n'),
                        gap: 50,
                    };
                });
            },
        },
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
            path: 'sections.slider.slider',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield import(`../views/sections/slider/slider.data.js?${__uniqid()}`)).default;
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
                    image: null,
                };
            },
        },
        'sections.contact.contact',
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RCxlQUFlO0lBQ1gsS0FBSyxFQUFFO1FBQ0gsMEJBQTBCO1FBQzFCLDhCQUE4QjtRQUM5QixvQkFBb0I7UUFDcEI7WUFDSSxJQUFJLEVBQUUsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUU7O29CQUM1QixNQUFNLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztvQkFFMUMsTUFBTSxRQUFRLEdBQUc7d0JBQ2IsS0FBSyxFQUFFOzRCQUNILEdBQUcsRUFBRSxPQUFPOzRCQUNaLEdBQUcsRUFBRSxFQUFFOzRCQUNQLEtBQUssRUFBRSxFQUFFO3lCQUNaO3dCQUNELFVBQVUsRUFBRTs0QkFDUixLQUFLLEVBQUUsTUFBTTt5QkFDaEI7d0JBQ0QsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLEtBQUssRUFBRSxpQ0FBaUM7d0JBQ3hDLElBQUksRUFBRSwrSUFBK0k7d0JBQ3JKLEdBQUcsRUFBRTs0QkFDRCxLQUFLLEVBQUUsa0JBQWtCOzRCQUN6QixLQUFLLEVBQUUsUUFBUTs0QkFDZixJQUFJLEVBQUU7Z0NBQ0YsR0FBRyxFQUFFLG1CQUFtQjtnQ0FDeEIsTUFBTSxFQUFFLFFBQVE7Z0NBQ2hCLEtBQUssRUFBRSw0QkFBNEI7NkJBQ3RDO3lCQUNKO3FCQUNKLENBQUM7b0JBRUYsTUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO29CQUUvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN4QixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FDcEMsNEJBQTRCLEVBQzVCLFFBQVEsQ0FDWCxDQUFDO3dCQUNGLFNBQVMsQ0FBQyxJQUFJLENBQUM7Y0FDckIsTUFBTSxDQUFDLEtBQUs7aUJBQ1QsQ0FBQyxDQUFDO3FCQUNGO29CQUVELE9BQU87d0JBQ0gsU0FBUyxFQUFFLE1BQU07d0JBQ2pCLFNBQVMsRUFBRSxHQUFHLENBQUMsU0FBUzt3QkFDeEIsRUFBRSxFQUFFLE9BQU87d0JBQ1gsVUFBVSxFQUFFOzRCQUNSLEtBQUssRUFBRSxlQUFlO3lCQUN6Qjt3QkFDRCxNQUFNLEVBQUU7NEJBQ0osT0FBTyxFQUFFLE9BQU87NEJBQ2hCLE1BQU0sRUFBRSxXQUFXO3lCQUN0Qjt3QkFDRCxPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQzdCLEdBQUcsRUFBRSxFQUFFO3FCQUNWLENBQUM7Z0JBQ04sQ0FBQzthQUFBO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSxzQkFBc0I7WUFDdEIsSUFBSTs7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FDTixNQUFNLE1BQU0sQ0FDUiwyQ0FBMkMsUUFBUSxFQUFFLEVBQUUsQ0FDMUQsQ0FDSixDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDO2FBQUE7U0FDSjtRQUNEO1lBQ0ksSUFBSSxFQUFFLHdCQUF3QjtZQUN4QixJQUFJOztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUNOLE1BQU0sTUFBTSxDQUNSLDJDQUEyQyxRQUFRLEVBQUUsRUFBRSxDQUMxRCxDQUNKLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUM7YUFBQTtTQUNKO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsc0JBQXNCO1lBQ3RCLElBQUk7O29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQ04sTUFBTSxNQUFNLENBQ1IsMkNBQTJDLFFBQVEsRUFBRSxFQUFFLENBQzFELENBQ0osQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQzthQUFBO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsSUFBSTtnQkFDQSxPQUFPO29CQUNILEtBQUssRUFBRSx1RUFBdUU7b0JBQzlFLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUM7WUFDTixDQUFDO1NBQ0o7UUFDRCwwQkFBMEI7S0FDN0I7Q0FDSixDQUFDIn0=