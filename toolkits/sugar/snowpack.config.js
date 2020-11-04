const __sugarConfig = require('./src/node/config/sugar');
const __packageRoot = require('./src/node/path/packageRoot');
const snowpackConfig = __sugarConfig('snowpack');
const frontendConfig = __sugarConfig('frontend');
if (!snowpackConfig.proxy) snowpackConfig.proxy = {};
// Object.keys(frontendConfig.handlers).forEach((handlerName) => {
//   snowpackConfig.proxy[frontendConfig.handlers[handlerName].slug] = {
//     target: `http://${frontendConfig.hostname}:${frontendConfig.port}${frontendConfig.handlers[handlerName].slug}`
//   };
// });
// Object.keys(frontendConfig.staticDirs).forEach((slug) => {
//   snowpackConfig.proxy[slug] = {
//     target: `http://${frontendConfig.hostname}:${
//       frontendConfig.port
//     }${frontendConfig.staticDirs[slug].replace(__packageRoot(), '')}`
//   };
// });

module.exports = snowpackConfig;
