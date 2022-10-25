"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("@coffeekraken/sugar/string");
exports.default = {
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
                    const d = (yield Promise.resolve().then(() => __importStar(require(`../views/sections/story/story-1.data.js?${(0, string_1.__uniqid)()}`)))).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.card.card',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield Promise.resolve().then(() => __importStar(require(`../views/sections/card/card.data.js?${(0, string_1.__uniqid)()}`)))).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.story.story',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield Promise.resolve().then(() => __importStar(require(`../views/sections/story/story-2.data.js?${(0, string_1.__uniqid)()}`)))).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0Q7QUFFdEQsa0JBQWU7SUFDYixLQUFLLEVBQUU7UUFDTCwwQkFBMEI7UUFDMUI7WUFDRSxJQUFJLEVBQUUsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUU7O29CQUM5QixNQUFNLE9BQU8sR0FBRyxnQ0FBZ0MsQ0FBQztvQkFFakQsTUFBTSxRQUFRLEdBQUc7d0JBQ2YsS0FBSyxFQUFFOzRCQUNMLEdBQUcsRUFBRSxPQUFPOzRCQUNaLEdBQUcsRUFBRSxFQUFFOzRCQUNQLEtBQUssRUFBRSxFQUFFO3lCQUNWO3dCQUNELFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsTUFBTTs0QkFDYixVQUFVLEVBQUUsSUFBSTs0QkFDaEIsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSzs0QkFDMUMsS0FBSyxFQUFFLFNBQVM7eUJBQ2pCO3dCQUNELEtBQUssRUFBRSxlQUFlO3dCQUN0QixLQUFLLEVBQUUsaUNBQWlDO3dCQUN4QyxJQUFJLEVBQUUsK0lBQStJO3dCQUNySixHQUFHLEVBQUU7NEJBQ0gsS0FBSyxFQUFFLGtCQUFrQjs0QkFDekIsS0FBSyxFQUFFLFFBQVE7NEJBQ2YsSUFBSSxFQUFFO2dDQUNKLEdBQUcsRUFBRSxtQkFBbUI7Z0NBQ3hCLE1BQU0sRUFBRSxRQUFRO2dDQUNoQixLQUFLLEVBQUUsNEJBQTRCOzZCQUNwQzt5QkFDRjtxQkFDRixDQUFDO29CQUVGLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztvQkFFL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDMUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQ3RDLDRCQUE0QixFQUM1QixRQUFRLENBQ1QsQ0FBQzt3QkFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUU7NEJBQ25FLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSzt5QkFDdEIsQ0FBQyxDQUFDO3dCQUVILFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNsQztvQkFFRCxPQUFPO3dCQUNMLFNBQVMsRUFBRSxNQUFNO3dCQUNqQixnREFBZ0Q7d0JBQ2hELEVBQUUsRUFBRSxPQUFPO3dCQUNYLFVBQVUsRUFBRTs0QkFDVixLQUFLLEVBQUUsZUFBZTt5QkFDdkI7d0JBQ0QsTUFBTSxFQUFFOzRCQUNOLE9BQU8sRUFBRSxPQUFPOzRCQUNoQixNQUFNLEVBQUUsV0FBVzt5QkFDcEI7d0JBQ0QsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUM3QixHQUFHLEVBQUUsRUFBRTtxQkFDUixDQUFDO2dCQUNKLENBQUM7YUFBQTtTQUNGO1FBQ0QsOEJBQThCO1FBQzlCLG9CQUFvQjtRQUNwQjtZQUNFLElBQUksRUFBRSxzQkFBc0I7WUFDdEIsSUFBSTs7b0JBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FDUix3REFBYSwyQ0FBMkMsSUFBQSxpQkFBUSxHQUFFLEVBQUUsR0FBQyxDQUN0RSxDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQUE7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLG9CQUFvQjtZQUNwQixJQUFJOztvQkFDUixNQUFNLENBQUMsR0FBRyxDQUNSLHdEQUFhLHVDQUF1QyxJQUFBLGlCQUFRLEdBQUUsRUFBRSxHQUFDLENBQ2xFLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFBQTtTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsc0JBQXNCO1lBQ3RCLElBQUk7O29CQUNSLE1BQU0sQ0FBQyxHQUFHLENBQ1Isd0RBQWEsMkNBQTJDLElBQUEsaUJBQVEsR0FBRSxFQUFFLEdBQUMsQ0FDdEUsQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQzthQUFBO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsSUFBSTtnQkFDRixPQUFPO29CQUNMLEtBQUssRUFDSCx1RUFBdUU7b0JBQ3pFLEtBQUssRUFBRTt3QkFDTCxHQUFHLEVBQUUsbUNBQW1DO3dCQUN4QyxHQUFHLEVBQUUsRUFBRTtxQkFDUjtpQkFDRixDQUFDO1lBQ0osQ0FBQztTQUNGO1FBQ0QsMEJBQTBCO1FBQzFCLElBQUk7UUFDSixzQ0FBc0M7UUFDdEMscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsMEVBQTBFO1FBQzFFLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxLQUFLO0tBQ047Q0FDRixDQUFDIn0=