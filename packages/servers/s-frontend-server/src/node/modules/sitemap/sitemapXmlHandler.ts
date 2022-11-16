import __SBench from '@coffeekraken/s-bench';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __grabFirstExisting, __readXmlSync } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';

export default function sitemapXmlHandler({ req, res, pageConfig }) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const bench = new __SBench('data.sitemapXmlHandler');

        bench.step('beforeSitemapRead');

        const sitemapPath = __grabFirstExisting([
            `${__packageRootDir()}/sitemap.xml`,
            __SSugarConfig.get('sitemapBuilder.build.output'),
        ]);

        if (!sitemapPath) {
            res.status(404);
            res.type('application/json');
            res.send({});
            return resolve({});
        }

        const json = __readXmlSync(sitemapPath);

        bench.step('afterSitemapRead');

        bench.end();

        res.status(200);
        res.type('application/json');
        res.send(json);
        resolve(json);
    });
}
