var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __dirname } from '@coffeekraken/sugar/fs';
export default function docmap(express, settings, config) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDcEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLGNBQWM7UUFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRztZQUN4QixXQUFXLEVBQ1Asb0ZBQW9GO1lBQ3hGLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxtQkFBbUI7WUFDdkMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsV0FBVztRQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHO1lBQ3pCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLG9CQUFvQjtZQUN4QyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixRQUFRO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7WUFDdEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDdkIsT0FBTyxFQUFFLFlBQVk7U0FDeEIsQ0FBQztRQUVGLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNqQixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsYUFBYTtZQUNqQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUN6QixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUscUJBQXFCO1lBQ3pDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDM0IsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLHVCQUF1QjtZQUMzQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQzlCLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSwwQkFBMEI7WUFDOUMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDcEIsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLGdCQUFnQjtZQUNwQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==