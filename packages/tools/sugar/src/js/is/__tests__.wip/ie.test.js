import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __ie = require("../ie");
require("./ie")(__ie);
