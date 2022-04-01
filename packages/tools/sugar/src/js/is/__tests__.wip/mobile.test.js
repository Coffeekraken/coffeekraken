import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __mobile = require("../mobile");
require("./mobile")(__mobile);
