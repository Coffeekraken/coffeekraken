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
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
function docmap(express, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // middlewares
        config.middlewares.docmap = {
            description: 'Gives access to a "docmap" object in the "res.templateData" passed to the template',
            path: `${(0, dirname_1.default)()}/docmapMiddleware`,
            settings: {},
        };
        // handlers
        config.handlers.docmapJson = {
            description: 'Load and serve the SDocmap().read() json',
            path: `${(0, dirname_1.default)()}/docmapJsonHandler`,
            ettings: {},
        };
        // pages
        config.pages.docmapJson = {
            description: 'Serve the SDocmap().read() json',
            slugs: ['/docmap.json'],
            handler: 'docmapJson',
        };
        // data
        config.data.docmapJson = {
            path: `${(0, dirname_1.default)()}/docmapJsonData`,
            settings: {},
        };
        config.data.docmapMarkdown = {
            path: `${(0, dirname_1.default)()}/docmapMarkdownData`,
            settings: {},
        };
        config.data.docmapStyleguide = {
            path: `${(0, dirname_1.default)()}/docmapStyleguideData`,
            settings: {},
        };
        config.data.docmapDocumentation = {
            path: `${(0, dirname_1.default)()}/docmapDocumentationData`,
            settings: {},
        };
        config.data.docmapApi = {
            path: `${(0, dirname_1.default)()}/docmapApiData`,
            settings: {},
        };
        resolve(true);
    }));
}
exports.default = docmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELGtGQUE0RDtBQUU1RCxTQUF3QixNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3BELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELGNBQWM7UUFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRztZQUN4QixXQUFXLEVBQ1Asb0ZBQW9GO1lBQ3hGLElBQUksRUFBRSxHQUFHLElBQUEsaUJBQVMsR0FBRSxtQkFBbUI7WUFDdkMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsV0FBVztRQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHO1lBQ3pCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsSUFBSSxFQUFFLEdBQUcsSUFBQSxpQkFBUyxHQUFFLG9CQUFvQjtZQUN4QyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixRQUFRO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7WUFDdEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDdkIsT0FBTyxFQUFFLFlBQVk7U0FDeEIsQ0FBQztRQUVGLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNyQixJQUFJLEVBQUUsR0FBRyxJQUFBLGlCQUFTLEdBQUUsaUJBQWlCO1lBQ3JDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ3pCLElBQUksRUFBRSxHQUFHLElBQUEsaUJBQVMsR0FBRSxxQkFBcUI7WUFDekMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUMzQixJQUFJLEVBQUUsR0FBRyxJQUFBLGlCQUFTLEdBQUUsdUJBQXVCO1lBQzNDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDOUIsSUFBSSxFQUFFLEdBQUcsSUFBQSxpQkFBUyxHQUFFLDBCQUEwQjtZQUM5QyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNwQixJQUFJLEVBQUUsR0FBRyxJQUFBLGlCQUFTLEdBQUUsZ0JBQWdCO1lBQ3BDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWhERCx5QkFnREMifQ==