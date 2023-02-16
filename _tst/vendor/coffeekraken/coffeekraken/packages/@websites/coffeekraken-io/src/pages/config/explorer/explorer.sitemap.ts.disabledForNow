import __SDocmap from '@coffeekraken/s-docmap';
import { ISSitemapBuilderResultItem } from '@coffeekraken/s-sitemap-builder';
import __SPromise from '@coffeekraken/s-promise';
import __SLog from '@coffeekraken/s-log';
import { __fileHash } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';

export default function apiSitemap() {
    return new __SPromise(async ({ resolve, emit }) => {
        const items: ISSitemapBuilderResultItem[] = [
            {
                loc: '/config/explorer',
            },
        ];

        const configIds: string[] = [];

        __SSugarConfig.filesPaths.forEach((filePath) => {
            const fileName = __path.basename(filePath),
                configId = fileName.replace(/\.config\.js/, '');
            if (configIds.includes(configId)) return;
            configIds.push(configId);
            items.push({
                title: `${configId}.config.ts`,
                loc: `/config/explorer/${configId}`,
            });
        });

        resolve(items);
    });
}
