import __SBench from '@coffeekraken/s-bench';
import __SClassmap from '@coffeekraken/s-classmap';

export default function classmapJsonHandler({ req, res, pageConfig }) {
    return new Promise(async (resolve) => {
        const bench = new __SBench('data.classmapJsonData');

        bench.step('beforeClassmapRead');

        const classmap = new __SClassmap();

        let classmapJson = {};

        classmapJson = await classmap.read();

        bench.step('afterClassmapRead');

        res.status(200);
        res.type('application/json');
        res.send(classmapJson);
        resolve(classmapJson);
    });
}
