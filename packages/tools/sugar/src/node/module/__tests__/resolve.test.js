"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_1 = __importDefault(require("../resolve"));
const path_1 = __importDefault(require("path"));
describe('sugar.node.module.resolve', () => {
    const settings = {
        dirs: [`${__dirname}`, `${__dirname}/node_modules`]
    };
    it('Should resolve an existing file with a "./" at start correctly', (done) => {
        const res = resolve_1.default('./pkg/test/test.js', settings);
        expect(res).toBe(path_1.default.resolve(__dirname, 'pkg/test/test.js'));
        done();
    });
    it('Should resolve an existing file without extension', (done) => {
        const res = resolve_1.default('./pkg/test/test', settings);
        expect(res).toBe(path_1.default.resolve(__dirname, 'pkg/test/test.js'));
        done();
    });
    it('Should resolve a package module using "main" field', (done) => {
        const res = resolve_1.default('awesome-package', Object.assign(Object.assign({}, settings), { preferExports: false }));
        expect(res).toBe(path_1.default.resolve(__dirname, 'node_modules/awesome-package/main.js'));
        done();
    });
    it('Should resolve a package module using "export" field and "node/default" fields', (done) => {
        const res = resolve_1.default('exports-package', Object.assign({}, settings));
        expect(res).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-package/main.cjs'));
        done();
    });
    it('Should resolve a package module using "export" field and "require/import" fields', (done) => {
        const resImport = resolve_1.default('exports-method-package', Object.assign(Object.assign({}, settings), { method: 'import' }));
        const resRequire = resolve_1.default('exports-method-package', Object.assign(Object.assign({}, settings), { method: 'require' }));
        expect(resImport).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-method-package/import.js'));
        expect(resRequire).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-method-package/require.js'));
        done();
    });
    it('Should resolve a package module using "export" field and nested "require/import", "node/default" fields', (done) => {
        const resNodeImport = resolve_1.default('exports-method-nested-package', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImport).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-method-nested-package/node-import.js'));
        const resNodeRequire = resolve_1.default('exports-method-nested-package', Object.assign(Object.assign({}, settings), { method: 'require' }));
        expect(resNodeRequire).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-method-nested-package/node-require.js'));
        const resDefaultImport = resolve_1.default('exports-method-nested-package', Object.assign(Object.assign({}, settings), { method: 'import', target: 'default' }));
        expect(resDefaultImport).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-method-nested-package/default-import.js'));
        const resDefaultRequire = resolve_1.default('exports-method-nested-package', Object.assign(Object.assign({}, settings), { method: 'require', target: 'default' }));
        expect(resDefaultRequire).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-method-nested-package/default-require.js'));
        done();
    });
    it('Should resolve a package module using "export" field and some subpath patterns WITHOUT extension specified', (done) => {
        const resNodeImport = resolve_1.default('exports-minimatch-package/myPackage/coco/coolFile', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImport).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-minimatch-package/section1/coolFile.js'));
        done();
    });
    it('Should resolve a package module using "export" field and some subpath patterns WITH extension specified', (done) => {
        const resNodeImportWithExtension = resolve_1.default('exports-minimatch-package/myPackage/coco/section1.js', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImportWithExtension).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-minimatch-package/section1/section1.js'));
        done();
    });
    it('Should resolve a package module using "export" field a subpath pattern without extension and a module path WITHOUT extension either', (done) => {
        const resNodeImportWthoutExtInPackage = resolve_1.default('exports-minimatch-package/other/arch', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImportWthoutExtInPackage).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-minimatch-package/arch2/arch.js'));
        done();
    });
    it('Should resolve a package module using "export" field a subpath pattern without extension and a module path WITH extension specified', (done) => {
        const resNodeImportWthoutExtInPackage = resolve_1.default('exports-minimatch-package/other/arch.txt', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImportWthoutExtInPackage).toBe(path_1.default.resolve(__dirname, 'node_modules/exports-minimatch-package/arch2/arch.txt'));
        done();
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb2x2ZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseURBQW1DO0FBQ25DLGdEQUEwQjtBQUUxQixRQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO0lBQ3pDLE1BQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsRUFBRSxHQUFHLFNBQVMsZUFBZSxDQUFDO0tBQ3BELENBQUM7SUFFRixFQUFFLENBQUMsZ0VBQWdFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM1RSxNQUFNLEdBQUcsR0FBRyxpQkFBUyxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbURBQW1ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvRCxNQUFNLEdBQUcsR0FBRyxpQkFBUyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0RBQW9ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNoRSxNQUFNLEdBQUcsR0FBRyxpQkFBUyxDQUFDLGlCQUFpQixrQ0FDbEMsUUFBUSxLQUNYLGFBQWEsRUFBRSxLQUFLLElBQ3BCLENBQUM7UUFDSCxNQUFNLENBQUMsR0FBRyxDQUFD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