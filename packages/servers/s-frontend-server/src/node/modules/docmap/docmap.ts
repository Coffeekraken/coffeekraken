import __SPromise from '@coffeekraken/s-promise';
import { __dirname } from '@coffeekraken/sugar/fs';

export default function docmap(express, settings, config) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        // middlewares
        config.middlewares.docmap = {
            description:
                'Gives access to a "docmap" object in the "res.templateData" passed to the template',
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
    });
}
