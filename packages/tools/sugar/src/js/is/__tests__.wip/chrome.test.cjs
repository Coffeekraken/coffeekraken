import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __chrome = require("../chrome");
require("./chrome")(__chrome);
