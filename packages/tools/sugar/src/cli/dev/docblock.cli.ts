import __SDocblock from '@coffeekraken/s-docblock';
import { SDocblockHtmlRenderer } from '@coffeekraken/s-docblock-renderer';
import __fs from 'fs';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

export default async (stringArgs = '') => {
  const content = __fs.readFileSync(
    `${__dirname()}/../../js/class/SInterface.ts`,
    'utf8'
  );
  const blocks = new __SDocblock(content);
  const renderer = new SDocblockHtmlRenderer(blocks);

  const res = await renderer.render();

  console.log(res);
};
