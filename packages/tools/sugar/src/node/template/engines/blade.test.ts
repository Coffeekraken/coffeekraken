// @ts-nocheck

import __path from 'path';
import __tmp from 'tmp';
import __SBladeTemplateEngine from './SBladeTemplateEngine';
import __STemplate from '../STemplate';

(async () => {
  // const engine = new __SBladeTemplateEngine({
  //   cacheDir: __tmp.tmpNameSync()
  // });

  // const res = await engine.render(
  //   __path.resolve(__dirname, '__tests__/views/index.blade.php'),
  //   {
  //     title: 'Hello',
  //     body: 'World'
  //   }
  // );

  const template = new __STemplate('index', {
    rootDirs: [__path.resolve(__dirname, '__tests__/views')],
    defaultData: {},
    engineSettings: {
      cacheDir: __tmp.tmpNameSync()
    }
  });
  // const template = new __STemplate(
  //   `
  //   <h1>{{ $hello }}</h1>
  //   <p>{{ $world }}</p>
  // `,
  //   {
  //     rootDirs: [__path.resolve(__dirname, '__tests__/views')],
  //     defaultData: {}
  //   }
  // );

  const res = await template.render(
    {
      // title: 'plop',
      body: 'woooooorld'
    },
    {}
  );

  process.exit();
  // const other = await template.render(
  //   {
  //     title: 'plop',
  //     body: 'woooooorld'
  //   },
  //   {}
  // );
})();
