const __deepMerge = require('../object/deepMerge');
const __convert = require('../time/convert');

/**
 * @name              objectProperties
 * @namespace         sugar.node.transition
 * @type              Function
 *
 * This function take a start object and a target object and proceed to the transition of all properties
 * depending on the passed settings object that is documented bellow.
 *
 * @param       {Object}        startObj          The start object
 * @param       {Object}        targetObj         The target object
 * @param       {Object}        [settings={}]     An object of settings to configure your transition:
 * - duration (1s) {Number|String}: Specify the transition duration. Can be a number which will be treated as miliseconds, or a string like "1s", "10ms", "1m", etc...
 * - easing ()
 */
module.exports = function objectProperties(startObj, targetObj, settings = {}) {
  settings = __deepMerge(
    {
      duration: '1s',
      easing: 'easeInOutCubic'
    },
    settings
  );

  const duration = __convert(settings.duration, 'ms');

  console.log(settings, duration);
};
