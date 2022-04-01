import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __tablet = require("../tablet");
require("./tablet")(__tablet);
