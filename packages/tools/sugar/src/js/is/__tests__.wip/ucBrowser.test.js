import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __ucBrowser = require("../ucBrowser");
require("./ucBrowser")(__ucBrowser);
