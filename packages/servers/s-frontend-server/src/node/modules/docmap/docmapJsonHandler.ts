import __SBench from '@coffeekraken/s-bench';
import __SDocmap from '@coffeekraken/s-docmap';

export default function docmapJsonHandler({ req, res, pageConfig }) {
    return new Promise(async (resolve) => {
        const bench = new __SBench('data.docmapJsonData');

        bench.step('beforeDocmapRead');

        let docmapJson = {};

        try {
            const docmap = new __SDocmap();
            docmapJson = await docmap.read();
        } catch (e) {}

        bench.step('afterDocmapRead');

        res.status(200);
        res.type('application/json');
        res.send(docmapJson);
        resolve(docmapJson);
    });
}
