import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __opera = require("../opera");
require("./opera")(__opera);
