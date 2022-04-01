import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __firefox = require("../firefox");
require("./firefox")(__firefox);
