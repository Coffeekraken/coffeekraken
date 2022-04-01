import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __phone = require("../phone");
require("./phone")(__phone);
