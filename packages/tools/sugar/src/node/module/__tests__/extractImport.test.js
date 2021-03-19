"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extractImport_1 = __importDefault(require("../extractImport"));
describe('sugar.node.module.extractImport', () => {
    const content = `import lodash from "dependency-tree";

import defaultExport from "module-name";
import * as name1 from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export2 } from "module-name";
import { foo, bar } from "module-name/path/to/specific/un-exported/file";
import { export2 as alias2 } from "module-name";
import defaultExport1, { export18 } from "module-name";
import defaultExport2, * as name2 from "module-name";

import defaultExport3, * as name3 from "module-name";

import "module-name";
var promise = import("module-name");

const config = require("/path/to/file");
const { something1 } = require("other/thinsf");
const { something2 } = require("other/thinsf.ts");
const { something3 } = require("other");
`;
    it('Should extract the imports from content correctly', (done) => {
        const imports = extractImport_1.default(content);
        expect(imports.length).toBe(19);
        expect(imports[0]).toEqual({
            type: 'import',
            path: 'dependency-tree',
            imported: 'default',
            local: 'lodash'
        });
        done();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEltcG9ydC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXh0cmFjdEltcG9ydC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUVBQStDO0FBRS9DLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7SUFDL0MsTUFBTSxPQUFPLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXFCakIsQ0FBQztJQUVBLEVBQUUsQ0FBQyxtREFBbUQsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9ELE1BQU0sT0FBTyxHQUFHLHVCQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN6QixJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsS0FBSyxFQUFFLFFBQVE7U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=