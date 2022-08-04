var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';
import __resolve from '../resolve';
describe('sugar.node.module.resolve', () => {
    const settings = {
        dirs: [`${__dirname}`, `${__dirname}/node_modules`],
    };
    it('Should resolve an existing file with a "./" at start correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield __SSugarConfig.load();
        const res = __resolve('./pkg/test/test.js', settings);
        expect(res).toBe(__path.resolve(__dirname, 'pkg/test/test.js'));
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFFbkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN2QyxNQUFNLFFBQVEsR0FBRztRQUNiLElBQUksRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLEVBQUUsR0FBRyxTQUFTLGVBQWUsQ0FBQztLQUN0RCxDQUFDO0lBRUYsRUFBRSxDQUFDLGdFQUFnRSxFQUFFLEdBQVMsRUFBRTtRQUM1RSxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVILHNFQUFzRTtJQUN0RSwwREFBMEQ7SUFDMUQsdUVBQXVFO0lBQ3ZFLGNBQWM7SUFDZCxNQUFNO0lBRU4sdUVBQXVFO0lBQ3ZFLGlEQUFpRDtJQUNqRCx1QkFBdUI7SUFDdkIsZ0NBQWdDO0lBQ2hDLFVBQVU7SUFDVix3QkFBd0I7SUFDeEIsNkVBQTZFO0lBQzdFLFNBQVM7SUFDVCxjQUFjO0lBQ2QsTUFBTTtJQUVOLG1HQUFtRztJQUNuRyxpREFBaUQ7SUFDakQsdUJBQXVCO0lBQ3ZCLFVBQVU7SUFDVix3QkFBd0I7SUFDeEIsOEVBQThFO0lBQzlFLFNBQVM7SUFDVCxjQUFjO0lBQ2QsTUFBTTtJQUVOLHFHQUFxRztJQUNyRyw4REFBOEQ7SUFDOUQsdUJBQXVCO0lB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