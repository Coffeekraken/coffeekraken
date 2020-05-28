const __SBuildJsActionsStream = require('./SBuildJsActionsStream');

module.exports = (settings = {}) => {
  const stream = new __SBuildJsActionsStream();
  return stream.start(settings, {}).on('complete', (res) => {});
};
