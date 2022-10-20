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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = require("@coffeekraken/sugar/fs");
function sitemap(express, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // handlers
        config.handlers.sitemapJson = {
            description: 'Serve the sitemap.xml in JSON',
            path: `${(0, fs_1.__dirname)()}/sitemapJsonHandler`,
            ettings: {},
        };
        // pages
        config.pages.sitemapXml = {
            description: 'Serve the sitemap.xml in JSON',
            slugs: ['/sitemap.json'],
            handler: 'sitemapJson',
        };
        resolve(true);
    }));
}
exports.default = sitemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELCtDQUFtRDtBQUVuRCxTQUF3QixPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3JELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELFdBQVc7UUFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRztZQUMxQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLHFCQUFxQjtZQUN6QyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixRQUFRO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7WUFDdEIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDeEIsT0FBTyxFQUFFLGFBQWE7U0FDekIsQ0FBQztRQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWxCRCwwQkFrQkMifQ==