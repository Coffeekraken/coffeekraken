"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extractImport_1 = __importDefault(require("../extractImport"));
describe('sugar.node.module.extractImport', () => {
    //     const content = `import lodash from "dependency-tree";
    // import defaultExport from "module-name";
    // import * as name1 from "module-name";
    // import { export1 } from "module-name";
    // import { export1 as alias1 } from "module-name";
    // import { export2 } from "module-name";
    // import { foo, bar } from "module-name/path/to/specific/un-exported/file";
    // import { export2 as alias2 } from "module-name";
    // import defaultExport1, { export18 } from "module-name";
    // import defaultExport2, * as name2 from "module-name";
    // import defaultExport3, * as name3 from "module-name";
    // import "module-name";
    // var promise = import("module-name");
    // const config = require("/path/to/file");
    // const { something1 } = require("other/thinsf");
    // const { something2 } = require("other/thinsf.ts");
    // const { something3 } = require("other");
    // `;
    it('Should extract correctly a very simple import statement', () => {
        const str = 'import lodash from "dependency-tree"';
        const imports = (0, extractImport_1.default)(str);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'dependency-tree',
            raw: 'import lodash from "dependency-tree";',
            imported: 'default',
            local: 'lodash',
        });
    });
    it('Should extract correctly a simple * as import statement', () => {
        const str = 'import * as name1 from "module-name";';
        const imports = (0, extractImport_1.default)(str);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'module-name',
            raw: 'import * as name1 from "module-name";',
            imported: '*',
            local: 'name1',
        });
    });
    it('Should extract correctly a simple scoped import statement', () => {
        const str = 'import { export1 } from "module-name";';
        const imports = (0, extractImport_1.default)(str);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'module-name',
            raw: 'import {export1} from "module-name";',
            imported: 'export1',
            local: 'export1',
        });
    });
    it('Should extract correctly a simple scoped as import statement', () => {
        const str = 'import { export1 as alias1 } from "module-name";';
        const imports = (0, extractImport_1.default)(str);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'module-name',
            raw: 'import {export1 as alias1} from "module-name";',
            imported: 'export1',
            local: 'alias1',
        });
    });
    it('Should extract correctly a multiple scoped import statement', () => {
        const str = 'import { foo, bar } from "module-name/path/to/specific/un-exported/file";';
        const imports = (0, extractImport_1.default)(str);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'module-name/path/to/specific/un-exported/file',
            raw: 'import {foo, bar} from "module-name/path/to/specific/un-exported/file";',
            imported: 'foo',
            local: 'foo',
        });
        expect(imports[1]).toEqual({
            type: 'import',
            path: 'module-name/path/to/specific/un-exported/file',
            raw: 'import {foo, bar} from "module-name/path/to/specific/un-exported/file";',
            imported: 'bar',
            local: 'bar',
        });
    });
    it('Should extract correctly a default and a scoped import statement', () => {
        const str = 'import defaultExport1, { export18 } from "module-name";';
        const imports = (0, extractImport_1.default)(str);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'module-name',
            raw: 'import defaultExport1, {export18} from "module-name";',
            imported: 'default',
            local: 'defaultExport1',
        });
        expect(imports[1]).toEqual({
            type: 'import',
            path: 'module-name',
            raw: 'import defaultExport1, {export18} from "module-name";',
            imported: 'export18',
            local: 'export18',
        });
    });
    it('Should extract correctly a default and a scoped import statement', () => {
        const str = 'import defaultExport2, * as name2 from "module-name";';
        const imports = (0, extractImport_1.default)(str);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'module-name',
            raw: 'import defaultExport2, * as name2 from "module-name";',
            imported: 'default',
            local: 'defaultExport2',
        });
        expect(imports[1]).toEqual({
            type: 'import',
            path: 'module-name',
            raw: 'import defaultExport2, * as name2 from "module-name";',
            imported: '*',
            local: 'name2',
        });
    });
    it('Should extract correctly a no variable import statement', () => {
        const str = 'import "module-name";';
        const imports = (0, extractImport_1.default)(str);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'module-name',
            raw: 'import "module-name";',
            imported: '*',
            local: undefined,
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUVBQStDO0FBRS9DLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7SUFDN0MsNkRBQTZEO0lBRTdELDJDQUEyQztJQUMzQyx3Q0FBd0M7SUFDeEMseUNBQXlDO0lBQ3pDLG1EQUFtRDtJQUNuRCx5Q0FBeUM7SUFDekMsNEVBQTRFO0lBQzVFLG1EQUFtRDtJQUNuRCwwREFBMEQ7SUFDMUQsd0RBQXdEO0lBRXhELHdEQUF3RDtJQUV4RCx3QkFBd0I7SUFDeEIsdUNBQXVDO0lBRXZDLDJDQUEyQztJQUMzQyxrREFBa0Q7SUFDbEQscURBQXFEO0lBQ3JELDJDQUEyQztJQUMzQyxLQUFLO0lBRUwsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtRQUMvRCxNQUFNLEdBQUcsR0FBRyxzQ0FBc0MsQ0FBQztRQUNuRCxNQUFNLE9BQU8sR0FBRyxJQUFBLHVCQUFlLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN2QixJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsR0FBRyxFQUFFLHVDQUF1QztZQUM1QyxRQUFRLEVBQUUsU0FBUztZQUNuQixLQUFLLEVBQUUsUUFBUTtTQUNsQixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyx5REFBeUQsRUFBRSxHQUFHLEVBQUU7UUFDL0QsTUFBTSxHQUFHLEdBQUcsdUNBQXVDLENBQUM7UUFDcEQsTUFBTSxPQUFPLEdBQUcsSUFBQSx1QkFBZSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDdkIsSUFBSSxFQUFFLFFB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