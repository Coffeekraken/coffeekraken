import __SBench from '@coffeekraken/s-bench';
import __SDocmap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';

export default function docmapJsonHandler({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        __SBench.start('data.docmapJsonData');

        __SBench.step('data.docmapJsonData', 'beforeDocmapRead');

        const docmap = new __SDocmap();
        const docmapJson = await docmap.read();

        __SBench.step('data.docmapJsonData', 'afterDocmapRead');

        res.status(200);
        res.type('application/json');
        res.send(docmapJson);
        resolve(docmapJson);
    });
}
