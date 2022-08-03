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
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
function docmap(express, settings, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const docmap = new s_docmap_1.default();
        const docmapJson = yield docmap.read();
        const menu = docmapJson.menu;
        // register handler
        config.handlers.styleguide = {
            path: `${(0, dirname_1.default)()}/styleguideHandler`,
        };
        // @ts-ignore
        // Object.keys(menu.custom.styleguide?.slug).forEach((slug) => {
        //     config.routes[slug] = {
        //         handler: 'styleguide',
        //     };
        // });
        return true;
    });
}
exports.default = docmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQStDO0FBRS9DLGtGQUE0RDtBQUU1RCxTQUE4QixNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNOztRQUMxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFTLEVBQUUsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBRTdCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRztZQUN6QixJQUFJLEVBQUUsR0FBRyxJQUFBLGlCQUFTLEdBQUUsb0JBQW9CO1NBQzNDLENBQUM7UUFFRixhQUFhO1FBQ2IsZ0VBQWdFO1FBQ2hFLDhCQUE4QjtRQUM5QixpQ0FBaUM7UUFDakMsU0FBUztRQUNULE1BQU07UUFFTixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUE7QUFsQkQseUJBa0JDIn0=