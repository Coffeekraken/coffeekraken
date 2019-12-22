const __fs = require('fs');
module.exports = function(req, res, next) {
  if ( ! req.config.apps) {
    next();
    return;
  }

  // check if the node env exist
  let apps = req.config.apps;
  if (process.env.NODE_ENV && req.config.apps[process.env.NODE_ENV]) {
    apps = req.config.apps[process.env.NODE_ENV];
  }

  for (let key in apps) {

    if ( ! req.apps) req.apps = {};

    const appPath = apps[key].replace('~', process.env.HOME);;
    const appObj = {};
    // check if a package json exist
    if (__fs.existsSync(`${appPath}/package.json`)) {
      appObj.packageJson = require(`${appPath}/package.json`);

    }
    // check if a package json exist
    if (__fs.existsSync(`${appPath}/code-playground.config.js`)) {
      appObj.config = require(`${appPath}/code-playground.config.js`);

    }
    req.apps[key] = appObj;
  }
  next();
}
