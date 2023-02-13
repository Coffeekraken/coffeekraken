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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
function docmap({ express, settings, config }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
        config.data.docmap = {
            path: `${(0, fs_1.__dirname)()}/docmapData`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW1EO0FBRW5ELFNBQXdCLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO0lBQ3hELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxjQUFjO1FBQ2QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUc7WUFDeEIsV0FBVyxFQUNQLG9GQUFvRjtZQUN4RixJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxtQkFBbUI7WUFDdkMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsV0FBVztRQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHO1lBQ3pCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsSUFBSSxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUsb0JBQW9CO1lBQ3hDLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUVGLFFBQVE7UUFDUixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRztZQUN0QixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLEtBQUssRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN2QixPQUFPLEVBQUUsWUFBWTtTQUN4QixDQUFDO1FBRUYsT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ2pCLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLGFBQWE7WUFDakMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDekIsSUFBSSxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUscUJBQXFCO1lBQ3pDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDM0IsSUFBSSxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUsdUJBQXVCO1lBQzNDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDOUIsSUFBSSxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUsMEJBQTBCO1lBQzlDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ3BCLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLGdCQUFnQjtZQUNwQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFoREQseUJBZ0RDIn0=