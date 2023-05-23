import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __deepMap } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';

export default async function () {
  let viteConfig = __SSugarConfig.get('vite');

  delete viteConfig.server.proxy;

  viteConfig = JSON.parse(JSON.stringify(viteConfig));
  const packageRoot = __packageRootDir(),
    monoRoot = __packageRootDir(process.cwd(), {
      highest: true,
    });

  __deepMap(viteConfig, ({ value }) => {
    if (typeof value === 'string') {
      return value.replace(`${packageRoot}`, '.').replace(monoRoot, '.');
    }
    return value;
  });

  return {
    viteConfig: JSON.stringify(viteConfig, null, 4).replace(/\\\\/gm, '\\'),
  };
}
