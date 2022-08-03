"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const path_1 = __importDefault(require("path"));
const resolve_1 = __importDefault(require("../resolve"));
describe('sugar.node.module.resolve', () => {
    const settings = {
        dirs: [`${__dirname}`, `${__dirname}/node_modules`],
    };
    it('Should resolve an existing file with a "./" at start correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield s_sugar_config_1.default.load();
        const res = (0, resolve_1.default)('./pkg/test/test.js', settings);
        expect(res).toBe(path_1.default.resolve(__dirname, 'pkg/test/test.js'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELGdEQUEwQjtBQUMxQix5REFBbUM7QUFFbkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN2QyxNQUFNLFFBQVEsR0FBRztRQUNiLElBQUksRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLEVBQUUsR0FBRyxTQUFTLGVBQWUsQ0FBQztLQUN0RCxDQUFDO0lBRUYsRUFBRSxDQUFDLGdFQUFnRSxFQUFFLEdBQVMsRUFBRTtRQUM1RSxNQUFNLHdCQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBUyxFQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxzRUFBc0U7SUFDdEUsMERBQTBEO0lBQzFELHVFQUF1RTtJQUN2RSxjQUFjO0lBQ2QsTUFBTTtJQUVOLHVFQUF1RTtJQUN2RSxpREFBaUQ7SUFDakQsdUJBQXVCO0lBQ3ZCLGdDQUFnQztJQUNoQyxVQUFVO0lBQ1Ysd0JBQXdCO0lBQ3hCLDZFQUE2RTtJQUM3RSxTQUFTO0lBQ1QsY0FBYztJQUNkLE1BQU07SUFFTixtR0FBbUc7SUFDbkcsaURBQWlEO0lBQ2pELHVCQUF1QjtJQUN2QixVQUFVO0lBQ1Ysd0JBQXdCO0lBQ3hCLDhFQUE4RTtJQUM5RSxTQUFTO0lBQ1QsY0FBYztJQUNkLE1BQU07SUFFTixxR0FBcUc7SUFDckcsOERBQThEO0lBQzlELHVCQUF1QjtJQUN2Qiw0QkFBNEI7SUFDNUIsVUFBVTtJQUNWLCtEQUErRDtJQUMvRCx1QkFB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