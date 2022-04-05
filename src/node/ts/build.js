#!/usr/bin/env node --trace-warnings --trace-uncaught --no-warnings --es-module-specifier-resolution node

// import __STypescriptBuilder from '../../../packages/builders/s-typescript-builder/dist/pkg/esm/node/STypescriptBuilder';
import __SMonorepo from '@coffeekraken/s-monorepo';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';

(async () => {
    await __SSugarConfig.load();

    const monorepo = new __SMonorepo();
    const packages = await monorepo.list();

    packages.forEach((packageObj) => {
        const builder = new __STypescriptBuilder();
        const pro = builder.build({});
        pro.on('log', (data) => {
            console.log(data.value);
        });
    });

    // const monorepo = new __SMonorepo();
    // console.log(await monorepo.list());
})();
