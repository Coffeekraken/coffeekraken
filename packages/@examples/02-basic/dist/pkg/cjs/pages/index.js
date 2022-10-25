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
                    const d = (yield Promise.resolve().then(() => __importStar(require(`../views/sections/story/story-1.data.js?${(0, string_1.__uniqid)()}`)))).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.slider.slider',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    const d = (yield Promise.resolve().then(() => __importStar(require(`../views/sections/slider/slider.data.js?${(0, string_1.__uniqid)()}`)))).default;
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
                    image: null,
                };
            },
        },
        'sections.contact.contact',
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0Q7QUFFdEQsa0JBQWU7SUFDWCxLQUFLLEVBQUU7UUFDSCwwQkFBMEI7UUFDMUIsOEJBQThCO1FBQzlCLG9CQUFvQjtRQUNwQjtZQUNJLElBQUksRUFBRSwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRTs7b0JBQzVCLE1BQU0sT0FBTyxHQUFHLHlCQUF5QixDQUFDO29CQUUxQyxNQUFNLFFBQVEsR0FBRzt3QkFDYixLQUFLLEVBQUU7NEJBQ0gsR0FBRyxFQUFFLE9BQU87NEJBQ1osR0FBRyxFQUFFLEVBQUU7NEJBQ1AsS0FBSyxFQUFFLEVBQUU7eUJBQ1o7d0JBQ0QsVUFBVSxFQUFFOzRCQUNSLEtBQUssRUFBRSxNQUFNO3lCQUNoQjt3QkFDRCxLQUFLLEVBQUUsZUFBZTt3QkFDdEIsS0FBSyxFQUFFLGlDQUFpQzt3QkFDeEMsSUFBSSxFQUFFLCtJQUErSTt3QkFDckosR0FBRyxFQUFFOzRCQUNELEtBQUssRUFBRSxrQkFBa0I7NEJBQ3pCLEtBQUssRUFBRSxRQUFROzRCQUNmLElBQUksRUFBRTtnQ0FDRixHQUFHLEVBQUUsbUJBQW1CO2dDQUN4QixNQUFNLEVBQUUsUUFBUTtnQ0FDaEIsS0FBSyxFQUFFLDRCQUE0Qjs2QkFDdEM7eUJBQ0o7cUJBQ0osQ0FBQztvQkFFRixNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7b0JBRS9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUNwQyw0QkFBNEIsRUFDNUIsUUFBUSxDQUNYLENBQUM7d0JBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQztjQUNyQixNQUFNLENBQUMsS0FBSztpQkFDVCxDQUFDLENBQUM7cUJBQ0Y7b0JBRUQsT0FBTzt3QkFDSCxTQUFTLEVBQUUsTUFBTTt3QkFDakIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTO3dCQUN4QixFQUFFLEVBQUUsT0FBTzt3QkFDWCxVQUFVLEVBQUU7NEJBQ1IsS0FBSyxFQUFFLGVBQWU7eUJBQ3pCO3dCQUNELE1BQU0sRUFBRTs0QkFDSixPQUFPLEVBQUUsT0FBTzs0QkFDaEIsTUFBTSxFQUFFLFdBQVc7eUJBQ3RCO3dCQUNELE9BQU8sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDN0IsR0FBRyxFQUFFLEVBQUU7cUJBQ1YsQ0FBQztnQkFDTixDQUFDO2FBQUE7U0FDSjtRQUNEO1lBQ0ksSUFBSSxFQUFFLHNCQUFzQjtZQUN0QixJQUFJOztvQkFDTixNQUFNLENBQUMsR0FBRyxDQUNOLHdEQUNJLDJDQUEyQyxJQUFBLGlCQUFRLEdBQUUsRUFBRSxHQUMxRCxDQUNKLENBQUMsT0FBTyxDQUFDO29CQUNWLE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUM7YUFBQTtTQUNKO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsd0JBQXdCO1lBQ3hCLElBQUk7O29CQUNOLE1BQU0sQ0FBQyxHQUFHLENBQ04sd0RBQ0ksMkNBQTJDLElBQUEsaUJBQVEsR0FBRSxFQUFFLEdBQzFELENBQ0osQ0FBQyxPQUFPLENBQUM7b0JBQ1YsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQzthQUFBO1NBQ0o7UUFDRDtZQUNJLElBQUksRUFBRSxzQkFBc0I7WUFDdEIsSUFBSTs7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FDTix3REFDSSwyQ0FBMkMsSUFBQSxpQkFBUSxHQUFFLEVBQUUsR0FDMUQsQ0FDSixDQUFDLE9BQU8sQ0FBQztvQkFDVixPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDO2FBQUE7U0FDSjtRQUNEO1lBQ0ksSUFBSSxFQUFFLDhCQUE4QjtZQUNwQyxJQUFJO2dCQUNBLE9BQU87b0JBQ0gsS0FBSyxFQUFFLHVFQUF1RTtvQkFDOUUsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQztZQUNOLENBQUM7U0FDSjtRQUNELDBCQUEwQjtLQUM3QjtDQUNKLENBQUMifQ==