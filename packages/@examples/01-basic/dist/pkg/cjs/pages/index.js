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
                        const result = yield viewRenderer.render('sugar.components.card.card', Object.assign(Object.assign({}, cardData), { title: `Card title #${i + 1}` }));
                        const cellResult = yield viewRenderer.render('sugar.bare.cell.cell', {
                            html: result.value,
                        });
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
                    var _a;
                    const d = (yield (_a = `../views/sections/story/story-1.data.js?${(0, string_1.__uniqid)()}`, Promise.resolve().then(() => __importStar(require(_a))))).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.card.card',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const d = (yield (_a = `../views/sections/card/card.data.js?${(0, string_1.__uniqid)()}`, Promise.resolve().then(() => __importStar(require(_a))))).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.story.story',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const d = (yield (_a = `../views/sections/story/story-2.data.js?${(0, string_1.__uniqid)()}`, Promise.resolve().then(() => __importStar(require(_a))))).default;
                    return d;
                });
            },
        },
        {
            path: 'sections.slider.slider',
            data() {
                return __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const d = (yield (_a = `../views/sections/slider/slider.data.js?${(0, string_1.__uniqid)()}`, Promise.resolve().then(() => __importStar(require(_a))))).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0Q7QUFFdEQsa0JBQWU7SUFDWCxLQUFLLEVBQUU7UUFDSCwwQkFBMEI7UUFDMUI7WUFDSSxJQUFJLEVBQUUsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUU7O29CQUM1QixNQUFNLE9BQU8sR0FBRyxnQ0FBZ0MsQ0FBQztvQkFFakQsTUFBTSxRQUFRLEdBQUc7d0JBQ2IsS0FBSyxFQUFFOzRCQUNILEdBQUcsRUFBRSxPQUFPOzRCQUNaLEdBQUcsRUFBRSxFQUFFOzRCQUNQLEtBQUssRUFBRSxFQUFFO3lCQUNaO3dCQUNELFVBQVUsRUFBRTs0QkFDUixLQUFLLEVBQUUsTUFBTTs0QkFDYixVQUFVLEVBQUUsSUFBSTs0QkFDaEIsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSzs0QkFDMUMsS0FBSyxFQUFFLFNBQVM7eUJBQ25CO3dCQUNELFNBQVMsRUFBRSxVQUFVO3dCQUNyQixLQUFLLEVBQUUsYUFBYTt3QkFDcEIsS0FBSyxFQUFFLHdCQUF3Qjt3QkFDL0IsSUFBSSxFQUFFLCtJQUErSTt3QkFDckosR0FBRyxFQUFFOzRCQUNELEtBQUssRUFBRSxRQUFROzRCQUNmLElBQUksRUFBRTtnQ0FDRixJQUFJLEVBQUUsY0FBYztnQ0FDcEIsR0FBRyxFQUFFLFVBQVU7Z0NBQ2YsS0FBSyxFQUFFLDRCQUE0Qjs2QkFDdEM7eUJBQ0o7cUJBQ0osQ0FBQztvQkFFRixNQUFNLFNBQVMsR0FBYSxFQUFFLENBQUM7b0JBRS9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVB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