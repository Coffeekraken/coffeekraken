var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import { __dirname } from '@coffeekraken/sugar/fs';
export default function docmap(express, settings, config) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // middlewares
        config.middlewares.docmap = {
            description: 'Gives access to a "docmap" object in the "res.templateData" passed to the template',
            path: `${__dirname()}/docmapMiddleware`,
            settings: {},
        };
        // handlers
        config.handlers.docmapJson = {
            description: 'Load and serve the SDocmap().read() json',
            path: `${__dirname()}/docmapJsonHandler`,
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
            path: `${__dirname()}/docmapData`,
            settings: {},
        };
        config.data.docmapMarkdown = {
            path: `${__dirname()}/docmapMarkdownData`,
            settings: {},
        };
        config.data.docmapStyleguide = {
            path: `${__dirname()}/docmapStyleguideData`,
            settings: {},
        };
        config.data.docmapDocumentation = {
            path: `${__dirname()}/docmapDocumentationData`,
            settings: {},
        };
        config.data.docmapApi = {
            path: `${__dirname()}/docmapApiData`,
            settings: {},
        };
        resolve(true);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDcEQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1RCxjQUFjO1FBQ2QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUc7WUFDeEIsV0FBVyxFQUNQLG9GQUFvRjtZQUN4RixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsbUJBQW1CO1lBQ3ZDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLFdBQVc7UUFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRztZQUN6QixXQUFXLEVBQUUsMENBQTBDO1lBQ3ZELElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxvQkFBb0I7WUFDeEMsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBRUYsUUFBUTtRQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHO1lBQ3RCLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsS0FBSyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxZQUFZO1NBQ3hCLENBQUM7UUFFRixPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDakIsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLGFBQWE7WUFDakMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDekIsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLHFCQUFxQjtZQUN6QyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQzNCLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSx1QkFBdUI7WUFDM0MsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUM5QixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsMEJBQTBCO1lBQzlDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ3BCLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxnQkFBZ0I7WUFDcEMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=