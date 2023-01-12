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
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/datetime/wait"));
(() => {
    (0, s_filtrable_input_component_1.define)({
        items: () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, wait_1.default)(1000);
            return [
                { title: 'Hello', value: 'World' },
                { title: 'Plop', value: 'Yop' },
            ];
        }),
        templates: ({ type, item, html }) => {
            switch (type) {
                case 'item':
                    return html `
                            <li class="_item">My title: ${item.title}</li>
                        `;
                    break;
                case 'loading':
                    return html `
                            <li class="_loading">Loading, please wait...</li>
                        `;
                    break;
                case 'empty':
                    return html `
                            <li class="_empty">No items found...</li>
                        `;
                    break;
            }
        },
    }, 'my-cool-filtrable-input');
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkZBQW1FO0FBQ25FLG9GQUE4RDtBQUU5RCxDQUFDLEdBQUcsRUFBRTtJQUNGLElBQUEsb0NBQU0sRUFDRjtRQUNJLEtBQUssRUFBRSxHQUFTLEVBQUU7WUFDZCxNQUFNLElBQUEsY0FBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLE9BQU87Z0JBQ0gsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7Z0JBQ2xDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2FBQ2xDLENBQUM7UUFDTixDQUFDLENBQUE7UUFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNoQyxRQUFRLElBQUksRUFBRTtnQkFDVixLQUFLLE1BQU07b0JBQ1AsT0FBTyxJQUFJLENBQUE7MERBQ3VCLElBQUksQ0FBQyxLQUFLO3lCQUMzQyxDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxTQUFTO29CQUNWLE9BQU8sSUFBSSxDQUFBOzt5QkFFVixDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxPQUFPO29CQUNSLE9BQU8sSUFBSSxDQUFBOzt5QkFFVixDQUFDO29CQUNGLE1BQU07YUFDYjtRQUNMLENBQUM7S0FDSixFQUNELHlCQUF5QixDQUM1QixDQUFDO0FBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9