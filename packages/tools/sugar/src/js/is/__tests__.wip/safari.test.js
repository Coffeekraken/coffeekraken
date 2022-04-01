import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __safari = require("../safari");
require("./safari")(__safari);
