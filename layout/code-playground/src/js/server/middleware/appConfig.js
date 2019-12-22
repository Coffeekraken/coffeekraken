const __merge = require('lodash/merge');

module.exports = function(req, res, next) {
  if ( ! req.query.app && ! req.path.split('/')[1]) {
    next();
    return;
  }

  // read the config file
  const _config = require(`${req.config.pwd}/code-playground.config.js`);

  // remove some settings that can not be overrided like port, etc...
  delete _config.port;
  delete _config.apps;
  delete _config.compileServer.port;

  delete req.config.demos;

  // merge configs
  req.config = __merge(req.config, _config);

  // next
  next();
}
