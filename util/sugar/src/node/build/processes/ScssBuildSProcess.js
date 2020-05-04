const __SProcess = require('../../terminal/SProcess');
const __deepMerge = require('../../object/deepMerge');

module.exports = class ScssBuildSProcess extends __SProcess {
  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(settings = {}) {
    // init parent class
    super(
      'sugar build.scss',
      __deepMerge(
        {
          keys: {
            watch: {
              key: 'w',
              once: false,
              type: 'toggle'
            }
          },
          dependencies: {
            php: {
              version: '7.1.16'
            }
          }
        },
        settings
      )
    );
  }
};
