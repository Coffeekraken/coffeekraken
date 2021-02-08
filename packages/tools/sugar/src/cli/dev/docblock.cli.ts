import __SDocblock from '../../node/docblock/SDocblock';
import __SDocblockHtmlRenderer from '../../node/docblock/renderers/SDocblockHtmlRenderer';
import __fs from 'fs';

export default async (stringArgs = '') => {
  const content = __fs.readFileSync(
    `${__dirname}/../../js/class/SInterface.ts`,
    'utf8'
  );
  const blocks = new __SDocblock(content);
  const renderer = new __SDocblockHtmlRenderer(blocks);

  const res = await renderer.render();

  console.log(res);
};
