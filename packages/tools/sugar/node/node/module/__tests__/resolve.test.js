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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvbW9kdWxlL19fdGVzdHNfXy9yZXNvbHZlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5REFBbUM7QUFDbkMsZ0RBQTBCO0FBRTFCLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsTUFBTSxRQUFRLEdBQUc7UUFDZixJQUFJLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxFQUFFLEdBQUcsU0FBUyxlQUFlLENBQUM7S0FDcEQsQ0FBQztJQUVGLEVBQUUsQ0FBQyxnRUFBZ0UsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzVFLE1BQU0sR0FBRyxHQUFHLGlCQUFTLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9ELE1BQU0sR0FBRyxHQUFHLGlCQUFTLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLGlCQUFTLENBQUMsaUJBQWlCLGtDQUNsQyxRQUFRLEtBQ1gsYUFBYSxFQUFFLEtB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