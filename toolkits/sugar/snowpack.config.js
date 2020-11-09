const __sugarConfig = require('./src/node/config/sugar');
const __packageRoot = require('./src/node/path/packageRoot');
const snowpackConfig = __sugarConfig('snowpack');
const frontendConfig = __sugarConfig('frontend');
const __deepMerge = require('./src/node/object/deepMerge');
const __toString = require('./src/node/string/toString');
const __isChildProcess = require('./src/node/is/childProcess');

let finalConfig = Object.assign({}, snowpackConfig);
if (process.env.SNOWPACK_IS_INSTALL) {
  finalConfig = __deepMerge(finalConfig, finalConfig.installSpecific || {});
} else if (process.env.SNOWPACK_IS_BUILD) {
  finalConfig = __deepMerge(finalConfig, finalConfig.buildSpecific || {});
} else {
  finalConfig = __deepMerge(finalConfig, finalConfig.devSpecific || {});
  if (!finalConfig.proxy) finalConfig.proxy = {};
  Object.keys(frontendConfig.handlers).forEach((handlerName) => {
    finalConfig.proxy[frontendConfig.handlers[handlerName].slug] = {
      target: `http://${frontendConfig.hostname}:${frontendConfig.port}${frontendConfig.handlers[handlerName].slug}`
    };
  });
}
// Object.keys(frontendConfig.staticDirs).forEach((slug) => {
//   snowpackConfig.proxy[slug] = {
//     target: `http://${frontendConfig.hostname}:${
//       frontendConfig.port
//     }${frontendConfig.staticDirs[slug].replace(__packageRoot(), '')}`
//   };
// });

delete finalConfig.devSpecific;
delete finalConfig.buildSpecific;
delete finalConfig.installSpecific;

if (__isChildProcess()) {
  console.log(finalConfig.installOptions.rollup.plugins);
  throw 'coco';
}
module.exports = finalConfig;
