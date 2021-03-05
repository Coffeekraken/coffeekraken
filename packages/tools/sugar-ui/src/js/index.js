import lodash from "dependency-tree";

import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export1, export2 } from "module-name";
import { foo, bar } from "module-name/path/to/specific/un-exported/file";
import { export1, export2 as alias2 } from "module-name";
import defaultExport, { export1 } from "module-name";
import defaultExport, * as name from "module-name";

import defaultExport, * as name from "module-name";

import "module-name";
var promise = import("module-name");

const config = require("/path/to/file");
const { something } = require("other/thinsf");
const { something } = require("other/thinsf.ts");
const { something } = require("other");
