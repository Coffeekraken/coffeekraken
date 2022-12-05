import __SDocmap from '@coffeekraken/s-docmap';
import __SEnv from '@coffeekraken/s-env';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SPromise from '@coffeekraken/s-promise';

export default function docmapData({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        // building the namespace with the passed
        // :organisation and :package params in the url
        let namespaceAr = [];
        if (req.params.organisation) {
            namespaceAr.push(req.params.organisation);
        }
        if (req.params.package) {
            namespaceAr.push(req.params.package);
        }

        // searching the docmap
        const docmap = new __SDocmap();
        const result = await docmap.search({
            slug: req.params.path,
            namespace: namespaceAr.length
                ? `${namespaceAr.join('.')}.**`
                : '**',
        });

        // handle no results
        if (!Object.keys(result.items).length) {
            return resolve({
                body: `No data found in the docmap for the request "${req.url}"`,
            });
        }

        // initiate the html array
        // that will handle the result of the different
        // builders bellow
        let htmlAr = [];

        // Markdown builder
        const builder = new __SMarkdownBuilder({
            log: {
                summary: false,
            },
        });

        // loop on each results to build them in html
        for (let [namespace, item] of Object.entries(result.items)) {
            // markdown
            if (item.path.match(/\.md(\.[a-zA-Z0-9]+)?$/)) {
                const markdownResPromise = builder.build({
                    inPath: item.path,
                    target: 'html',
                    save: false,
                });
                if (__SEnv.is('verbose')) {
                    pipe(markdownResPromise);
                }
                const markdownRes = await markdownResPromise;

                if (!markdownRes.length) {
                    htmlAr.push(
                        `Error when building the markdown file "${item.path}"`,
                    );
                } else {
                    if (markdownRes[0].error) {
                        console.log(markdownRes[0].error);
                        htmlAr.push(markdownRes[0].error);
                    } else {
                        htmlAr.push(markdownRes[0].code);
                    }
                }
            }
        }

        resolve({
            body: htmlAr.join('\n'),
        });
    });
}
