import __resolve from '../resolve';
import __path from 'path';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

describe('sugar.node.module.resolve', () => {
    const settings = {
        dirs: [`${__dirname}`, `${__dirname}/node_modules`],
    };

    it('Should resolve an existing file with a "./" at start correctly', async () => {
        await __SSugarConfig.load();
        const res = __resolve('./pkg/test/test.js', settings);
        expect(res).toBe(__path.resolve(__dirname, 'pkg/test/test.js'));
    });

    // it('Should resolve an existing file without extension', (done) => {
    //     const res = __resolve('./pkg/test/test', settings);
    //     expect(res).toBe(__path.resolve(__dirname, 'pkg/test/test.js'));
    //     done();
    // });

    // it('Should resolve a package module using "main" field', (done) => {
    //     const res = __resolve('awesome-package', {
    //         ...settings,
    //         preferExports: false,
    //     });
    //     expect(res).toBe(
    //         __path.resolve(__dirname, 'node_modules/awesome-package/main.js'),
    //     );
    //     done();
    // });

    // it('Should resolve a package module using "export" field and "node/default" fields', (done) => {
    //     const res = __resolve('exports-package', {
    //         ...settings,
    //     });
    //     expect(res).toBe(
    //         __path.resolve(__dirname, 'node_modules/exports-package/main.cjs'),
    //     );
    //     done();
    // });

    // it('Should resolve a package module using "export" field and "require/import" fields', (done) => {
    //     const resImport = __resolve('exports-method-package', {
    //         ...settings,
    //         method: 'import',
    //     });
    //     const resRequire = __resolve('exports-method-package', {
    //         ...settings,
    //         method: 'require',
    //     });
    //     expect(resImport).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-method-package/import.js',
    //         ),
    //     );
    //     expect(resRequire).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-method-package/require.js',
    //         ),
    //     );
    //     done();
    // });

    // it('Should resolve a package module using "export" field and nested "require/import", "node/default" fields', (done) => {
    //     const resNodeImport = __resolve('exports-method-nested-package', {
    //         ...settings,
    //         method: 'import',
    //     });
    //     expect(resNodeImport).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-method-nested-package/node-import.js',
    //         ),
    //     );
    //     const resNodeRequire = __resolve('exports-method-nested-package', {
    //         ...settings,
    //         method: 'require',
    //     });
    //     expect(resNodeRequire).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-method-nested-package/node-require.js',
    //         ),
    //     );
    //     const resDefaultImport = __resolve('exports-method-nested-package', {
    //         ...settings,
    //         method: 'import',
    //         target: 'default',
    //     });
    //     expect(resDefaultImport).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-method-nested-package/default-import.js',
    //         ),
    //     );
    //     const resDefaultRequire = __resolve('exports-method-nested-package', {
    //         ...settings,
    //         method: 'require',
    //         target: 'default',
    //     });
    //     expect(resDefaultRequire).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-method-nested-package/default-require.js',
    //         ),
    //     );
    //     done();
    // });

    // it('Should resolve a package module using "export" field and some subpath patterns WITHOUT extension specified', (done) => {
    //     const resNodeImport = __resolve(
    //         'exports-minimatch-package/myPackage/coco/coolFile',
    //         {
    //             ...settings,
    //             method: 'import',
    //         },
    //     );
    //     expect(resNodeImport).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-minimatch-package/section1/coolFile.js',
    //         ),
    //     );
    //     done();
    // });

    // it('Should resolve a package module using "export" field and some subpath patterns WITH extension specified', (done) => {
    //     const resNodeImportWithExtension = __resolve(
    //         'exports-minimatch-package/myPackage/coco/section1.js',
    //         {
    //             ...settings,
    //             method: 'import',
    //         },
    //     );
    //     expect(resNodeImportWithExtension).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-minimatch-package/section1/section1.js',
    //         ),
    //     );
    //     done();
    // });

    // it('Should resolve a package module using "export" field a subpath pattern without extension and a module path WITHOUT extension either', (done) => {
    //     const resNodeImportWthoutExtInPackage = __resolve(
    //         'exports-minimatch-package/other/arch',
    //         {
    //             ...settings,
    //             method: 'import',
    //         },
    //     );
    //     expect(resNodeImportWthoutExtInPackage).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-minimatch-package/arch2/arch.js',
    //         ),
    //     );

    //     done();
    // });

    // it('Should resolve a package module using "export" field a subpath pattern without extension and a module path WITH extension specified', (done) => {
    //     const resNodeImportWthoutExtInPackage = __resolve(
    //         'exports-minimatch-package/other/arch.txt',
    //         {
    //             ...settings,
    //             method: 'import',
    //         },
    //     );
    //     expect(resNodeImportWthoutExtInPackage).toBe(
    //         __path.resolve(
    //             __dirname,
    //             'node_modules/exports-minimatch-package/arch2/arch.txt',
    //         ),
    //     );

    //     done();
    // });

    // it('Should resolve a file without extension defined', (done) => {
    //   const res = __resolve('pkg/test/test', settings);
    //   expect(res).toBe(__path.resolve(__dirname, 'pkg/test/test.js'));
    //   done();
    // });

    // it('Should resolve a module using package.json main field', (done) => {
    //   const res = __resolve('pkg', settings);
    //   expect(res).toBe(__path.resolve(__dirname, 'pkg/index.js'));
    //   done();
    // });
});
