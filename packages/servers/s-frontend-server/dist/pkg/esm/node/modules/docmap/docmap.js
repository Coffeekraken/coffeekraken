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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
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
        config.data.docmapJson = {
            path: `${__dirname()}/docmapJsonData`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTTtJQUNwRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVELGNBQWM7UUFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRztZQUN4QixXQUFXLEVBQ1Asb0ZBQW9GO1lBQ3hGLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxtQkFBbUI7WUFDdkMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsV0FBVztRQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHO1lBQ3pCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLG9CQUFvQjtZQUN4QyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixRQUFRO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7WUFDdEIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDdkIsT0FBTyxFQUFFLFlBQVk7U0FDeEIsQ0FBQztRQUVGLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNyQixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsaUJBQWlCO1lBQ3JDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ3pCLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxxQkFBcUI7WUFDekMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUMzQixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsdUJBQXVCO1lBQzNDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDOUIsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLDBCQUEwQjtZQUM5QyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNwQixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsZ0JBQWdCO1lBQ3BDLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9