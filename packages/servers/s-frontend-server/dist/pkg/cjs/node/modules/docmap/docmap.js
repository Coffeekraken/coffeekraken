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
function docmap(express, settings, config) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW1EO0FBRW5ELFNBQXdCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDcEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLGNBQWM7UUFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRztZQUN4QixXQUFXLEVBQ1Asb0ZBQW9GO1lBQ3hGLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLG1CQUFtQjtZQUN2QyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixXQUFXO1FBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUc7WUFDekIsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxvQkFBb0I7WUFDeEMsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBRUYsUUFBUTtRQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHO1lBQ3RCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsS0FBSyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxZQUFZO1NBQ3hCLENBQUM7UUFFRixPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDakIsSUFBSSxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUsYUFBYTtZQUNqQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUN6QixJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxxQkFBcUI7WUFDekMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUMzQixJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSx1QkFBdUI7WUFDM0MsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUM5QixJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSwwQkFBMEI7WUFDOUMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBQSxjQUFTLEdBQUUsZ0JBQWdCO1lBQ3BDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWhERCx5QkFnREMifQ==