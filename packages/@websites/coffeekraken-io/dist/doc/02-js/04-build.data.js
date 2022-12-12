import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __packageRootDir } from '@coffeekraken/sugar/path';

export default async function () {
  const packageRoot = __packageRootDir(),
    monoRoot = __packageRootDir(process.cwd(), {
      highest: true,
    });
  const viteConfig = __SSugarConfig.get('vite');
  // const viteConfig = __deepMap(
  //   __SSugarConfig.get('vite'),
  //   ({ prop, value }) => {
  //     if (typeof value === 'string') {
  //       value = value.replace(packageRoot, '');
  //       value = value.replace(monoRoot, '');
  //       if (value.match(/^\//)) {
  //         value = value.replace(/^\//, '');
  //       }
  //     }
  //     return value;
  //   }
  // );

  // delete viteConfig.server;
  // delete viteConfig.rewrites;

  return {
    viteConfig,
  };
}
