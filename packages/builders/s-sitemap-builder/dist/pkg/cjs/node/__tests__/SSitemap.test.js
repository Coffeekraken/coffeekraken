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
const SSitemapBuilder_1 = __importDefault(require("../SSitemapBuilder"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
describe('s-sitemap.node.SSitemap', () => {
    it('Should generate a simple sitemap from a static source', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const sitemap = new SSitemapBuilder_1.default();
        const resPromise = sitemap.build();
        // @ts-ignore
        resPromise.on('log', (data) => {
            console.log(data.value);
        });
        const res = yield resPromise;
        // console.log(res);
        expect(true).toBe(true);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQTRDO0FBQzVDLGtGQUEwRDtBQUUxRCxRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO0lBQ3JDLEVBQUUsQ0FBQyx1REFBdUQsRUFBRSxHQUFTLEVBQUU7UUFDbkUsTUFBTSx3QkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUkseUJBQVUsRUFBRSxDQUFDO1FBRWpDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxhQUFhO1FBQ2IsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDO1FBRTdCLG9CQUFvQjtRQUVwQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9