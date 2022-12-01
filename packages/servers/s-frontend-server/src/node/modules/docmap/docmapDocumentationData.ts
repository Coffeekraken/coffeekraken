import __SBench from '@coffeekraken/s-bench';
import __SDocmap from '@coffeekraken/s-docmap';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SPromise from '@coffeekraken/s-promise';
import { __packageJsonSync } from '@coffeekraken/sugar/package';

export default function docmapDocumentationData({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        let html;

        if (!req.params.path) {
            throw new Error(
                `[SFrontendServer.docmapDocumentationData] Missing "path" parameter from the url...`,
            );
        }

        const bench = new __SBench('data.docmapDocumentationData');

        bench.step('beforeDocmapRead');

        const docmap = new __SDocmap();
        const docmapJson = await docmap.read();
        let docObj = docmapJson.menu.slug[`/doc/${req.params.path}`];
        if (!docObj) {
            docObj =
                docmapJson.menu.packages?.[
                    `${req.params.organisation}/${req.params.package}`
                ]?.slug?.[
                    `/package/${req.params.organisation}/${req.params.package}/doc/${req.params.path}`
                ];
        }

        if (!docObj) {
            return reject(
                `The documentation "${req.path}" you requested does not exists...`,
            );
        }

        bench.step('afterDocmapRead');

        let packageJson;
        if (docObj.docmap?.package?.name) {
            packageJson = __packageJsonSync(docObj.docmap.package.name);
        }

        const builder = new __SMarkdownBuilder();

        const markdownRes = await pipe(
            builder.build({
                data: {
                    packageJson,
                },
                inPath: docObj.docmap.path,
                target: 'html',
                save: false
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
