import __SBench from '@coffeekraken/s-bench';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import __SPromise from '@coffeekraken/s-promise';
import __SDocMap from '@coffeekraken/s-docmap';

export default function docmapDocumentationData({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        let html;

        if (!req.params.path) {
            throw new Error(
                `[SFrontendServer.docmapDocumentationData] Missing "path" parameter from the url...`,
            );
        }

        __SBench.start('data.docmapDocumentationData');

        __SBench.step('data.docmapDocumentationData', 'beforeDocmapRead');

        console.log(req.params);

        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();
        const docObj = docmapJson.menu.slug[`/doc/${req.params.path}`];

        if (!docObj) {
            return reject(
                `The documentation "${req.path}" you requested does not exists...`,
            );
        }

        __SBench.step('data.docmapDocumentationData', 'afterDocmapRead');

        const builder = new __SMarkdownBuilder();

        const markdownRes = await pipe(
            builder.build({
                // inRaw: str,
                inPath: docObj.docmap.path,
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
