import __extractImport from '../extractImport';

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
    const imports = __extractImport(content);
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
