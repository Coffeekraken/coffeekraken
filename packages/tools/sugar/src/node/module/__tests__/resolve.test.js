import __resolve from '../resolve';
import __path from 'path';
describe('sugar.node.module.resolve', () => {
    const settings = {
        dirs: [`${__dirname}`, `${__dirname}/node_modules`]
    };
    it('Should resolve an existing file with a "./" at start correctly', (done) => {
        const res = __resolve('./pkg/test/test.js', settings);
        expect(res).toBe(__path.resolve(__dirname, 'pkg/test/test.js'));
        done();
    });
    it('Should resolve an existing file without extension', (done) => {
        const res = __resolve('./pkg/test/test', settings);
        expect(res).toBe(__path.resolve(__dirname, 'pkg/test/test.js'));
        done();
    });
    it('Should resolve a package module using "main" field', (done) => {
        const res = __resolve('awesome-package', Object.assign(Object.assign({}, settings), { preferExports: false }));
        expect(res).toBe(__path.resolve(__dirname, 'node_modules/awesome-package/main.js'));
        done();
    });
    it('Should resolve a package module using "export" field and "node/default" fields', (done) => {
        const res = __resolve('exports-package', Object.assign({}, settings));
        expect(res).toBe(__path.resolve(__dirname, 'node_modules/exports-package/main.cjs'));
        done();
    });
    it('Should resolve a package module using "export" field and "require/import" fields', (done) => {
        const resImport = __resolve('exports-method-package', Object.assign(Object.assign({}, settings), { method: 'import' }));
        const resRequire = __resolve('exports-method-package', Object.assign(Object.assign({}, settings), { method: 'require' }));
        expect(resImport).toBe(__path.resolve(__dirname, 'node_modules/exports-method-package/import.js'));
        expect(resRequire).toBe(__path.resolve(__dirname, 'node_modules/exports-method-package/require.js'));
        done();
    });
    it('Should resolve a package module using "export" field and nested "require/import", "node/default" fields', (done) => {
        const resNodeImport = __resolve('exports-method-nested-package', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImport).toBe(__path.resolve(__dirname, 'node_modules/exports-method-nested-package/node-import.js'));
        const resNodeRequire = __resolve('exports-method-nested-package', Object.assign(Object.assign({}, settings), { method: 'require' }));
        expect(resNodeRequire).toBe(__path.resolve(__dirname, 'node_modules/exports-method-nested-package/node-require.js'));
        const resDefaultImport = __resolve('exports-method-nested-package', Object.assign(Object.assign({}, settings), { method: 'import', target: 'default' }));
        expect(resDefaultImport).toBe(__path.resolve(__dirname, 'node_modules/exports-method-nested-package/default-import.js'));
        const resDefaultRequire = __resolve('exports-method-nested-package', Object.assign(Object.assign({}, settings), { method: 'require', target: 'default' }));
        expect(resDefaultRequire).toBe(__path.resolve(__dirname, 'node_modules/exports-method-nested-package/default-require.js'));
        done();
    });
    it('Should resolve a package module using "export" field and some subpath patterns WITHOUT extension specified', (done) => {
        const resNodeImport = __resolve('exports-minimatch-package/myPackage/coco/coolFile', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImport).toBe(__path.resolve(__dirname, 'node_modules/exports-minimatch-package/section1/coolFile.js'));
        done();
    });
    it('Should resolve a package module using "export" field and some subpath patterns WITH extension specified', (done) => {
        const resNodeImportWithExtension = __resolve('exports-minimatch-package/myPackage/coco/section1.js', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImportWithExtension).toBe(__path.resolve(__dirname, 'node_modules/exports-minimatch-package/section1/section1.js'));
        done();
    });
    it('Should resolve a package module using "export" field a subpath pattern without extension and a module path WITHOUT extension either', (done) => {
        const resNodeImportWthoutExtInPackage = __resolve('exports-minimatch-package/other/arch', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImportWthoutExtInPackage).toBe(__path.resolve(__dirname, 'node_modules/exports-minimatch-package/arch2/arch.js'));
        done();
    });
    it('Should resolve a package module using "export" field a subpath pattern without extension and a module path WITH extension specified', (done) => {
        const resNodeImportWthoutExtInPackage = __resolve('exports-minimatch-package/other/arch.txt', Object.assign(Object.assign({}, settings), { method: 'import' }));
        expect(resNodeImportWthoutExtInPackage).toBe(__path.resolve(__dirname, 'node_modules/exports-minimatch-package/arch2/arch.txt'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb2x2ZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxNQUFNLFFBQVEsR0FBRztRQUNmLElBQUksRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLEVBQUUsR0FBRyxTQUFTLGVBQWUsQ0FBQztLQUNwRCxDQUFDO0lBRUYsRUFBRSxDQUFDLGdFQUFnRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDNUUsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbURBQW1ELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2hFLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsa0NBQ2xDLFFBQVEsS0FDWCxhQUFhLEVBQUUsS0FBSyxJQUNwQixD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