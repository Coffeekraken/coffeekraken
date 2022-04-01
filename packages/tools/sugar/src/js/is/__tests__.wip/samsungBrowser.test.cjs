import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const __samsungBrowser = require("../samsungBrowser");
require("./samsungBrowser")(__samsungBrowser);
