import __SDocMap from '@coffeekraken/s-docmap';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SPromise from '@coffeekraken/s-promise';

export default function docmapMarkdownData({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        let html;

        if (!req.params.namespace) {
            throw new Error(
                `[SFrontendServer.docmapMarkdownData] Missing namespace parameter from the url...`,
            );
        }

        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();

        const builder = new __SMarkdownBuilder();

        const markdownRes = await pipe(
            builder.build({
                inPath: docmapJson.map[req.params.namespace].path,
                target: 'html',
                save: false,
            }),
        );
        if (markdownRes instanceof Error) {
            throw markdownRes;
        }

        html = markdownRes[0].code;

        resolve({
            body: html,
        });
    });
}
