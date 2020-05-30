const __SBuildJsActionsStream = require('./SBuildJsActionsStream');

module.exports = (settings = {}) => {
  const stream = new __SBuildJsActionsStream({
    name: 'Build JS'
  });
  return stream.start(settings, {}).on('complete', (res) => {});
};
