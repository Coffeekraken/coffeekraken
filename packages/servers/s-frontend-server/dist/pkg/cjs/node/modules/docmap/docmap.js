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
function docmap(express, settings, config) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // middlewares
        config.middlewares.docmap = {
            description: 'Gives access to a "docmap" object in the "res.templateData" passed to the template',
            path: `${(0, fs_1.__dirname)()}/docmapMiddleware`,
            settings: {},
        };
        // handlers
        config.handlers.docmapJson = {
            description: 'Load and serve the SDocmap().read() json',
            path: `${(0, fs_1.__dirname)()}/docmapJsonHandler`,
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
            path: `${(0, fs_1.__dirname)()}/docmapJsonData`,
            settings: {},
        };
        config.data.docmapMarkdown = {
            path: `${(0, fs_1.__dirname)()}/docmapMarkdownData`,
            settings: {},
        };
        config.data.docmapStyleguide = {
            path: `${(0, fs_1.__dirname)()}/docmapStyleguideData`,
            settings: {},
        };
        config.data.docmapDocumentation = {
            path: `${(0, fs_1.__dirname)()}/docmapDocumentationData`,
            settings: {},
        };
        config.data.docmapApi = {
            path: `${(0, fs_1.__dirname)()}/docmapApiData`,
            settings: {},
        };
        resolve(true);
    }));
}
exports.default = docmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELCtDQUFtRDtBQUVuRCxTQUF3QixNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO0lBQ3BELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELGNBQWM7UUFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRztZQUN4QixXQUFXLEVBQ1Asb0ZBQW9GO1lBQ3hGLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLG1CQUFtQjtZQUN2QyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixXQUFXO1FBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUc7WUFDekIsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxvQkFBb0I7WUFDeEMsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBRUYsUUFBUTtRQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHO1lBQ3RCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsS0FBSyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxZQUFZO1NBQ3hCLENBQUM7UUFFRixPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDckIsSUFBSSxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUsaUJBQWlCO1lBQ3JDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ3pCLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLHFCQUFxQjtZQUN6QyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQzNCLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLHVCQUF1QjtZQUMzQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQzlCLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLDBCQUEwQjtZQUM5QyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNwQixJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxnQkFBZ0I7WUFDcEMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBaERELHlCQWdEQyJ9