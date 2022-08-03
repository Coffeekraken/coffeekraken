"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
(() => {
    (0, s_filtrable_input_component_1.define)({
        items: () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, wait_1.default)(1000);
            return [
                { title: "Hello", value: "World" },
                { title: "Plop", value: "Yop" },
            ];
        }),
        templates: ({ type, item, html }) => {
            switch (type) {
                case "item":
                    return html ` <li class="__item">My title: ${item.title}</li> `;
                    break;
                case "loading":
                    return html ` <li class="__loading">Loading, please wait...</li> `;
                    break;
                case "empty":
                    return html ` <li class="__empty">No items found...</li> `;
                    break;
            }
        },
    }, "my-cool-filtrable-input");
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkZBQW1FO0FBQ25FLGdGQUEwRDtBQUUxRCxDQUFDLEdBQUcsRUFBRTtJQUNKLElBQUEsb0NBQU0sRUFDSjtRQUNFLEtBQUssRUFBRSxHQUFTLEVBQUU7WUFDaEIsTUFBTSxJQUFBLGNBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixPQUFPO2dCQUNMLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO2dCQUNsQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTthQUNoQyxDQUFDO1FBQ0osQ0FBQyxDQUFBO1FBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbEMsUUFBUSxJQUFJLEVBQUU7Z0JBQ1osS0FBSyxNQUFNO29CQUNULE9BQU8sSUFBSSxDQUFBLGlDQUFpQyxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUM7b0JBQy9ELE1BQU07Z0JBQ1IsS0FBSyxTQUFTO29CQUNaLE9BQU8sSUFBSSxDQUFBLHNEQUFzRCxDQUFDO29CQUNsRSxNQUFNO2dCQUNSLEtBQUssT0FBTztvQkFDVixPQUFPLElBQUksQ0FBQSw4Q0FBOEMsQ0FBQztvQkFDMUQsTUFBTTthQUNUO1FBQ0gsQ0FBQztLQUNGLEVBQ0QseUJBQXlCLENBQzFCLENBQUM7QUFDSixDQUFDLENBQUMsRUFBRSxDQUFDIn0=