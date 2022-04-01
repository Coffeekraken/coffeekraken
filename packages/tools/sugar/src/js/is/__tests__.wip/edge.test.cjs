import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __edge = require("../edge");
require("./edge")(__edge);
