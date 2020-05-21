const __SProcess = require('../../terminal/SProcess');
const __deepMerge = require('../../object/deepMerge');
const __sugarConfig = require('../../config/sugar');
const __parseArgs = require('../../cli/parseArgs');

/**
 * @name              ScssBuildSProcess
 * @namespace         sugar.node.build.process
 * @type              Class
 * @extends           SProcess
 *
 * This class expose some scss build processes with some features like:
 * - Watch the files and launch automatically the build command
 *
 * @param         {Object}          [settings={}]           A settings object to configure your scss build process
 */
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
    // build the command line
    let commandLine = '';

    if (settings.input) {
      commandLine += ` -i ${settings.input}`;
    }
    if (settings.output) {
      commandLine += ` -o ${settings.output}`;
    }
    if (settings.watch === true) {
      commandLine += ` -w`;
    }
    if (settings.style) {
      commandLine += ` -s ${settings.style}`;
    }
    if (settings.map === true) {
      commandLine += ` -m`;
    }
    if (settings.prod) {
      commandLine += ` -p`;
    }
    if (settings.include) {
      if (settings.include.sugar === true) {
        commandLine += ` --include.sugar`;
      }
    }

    // init parent class
    super(
      {
        build: {
          command: `sugar build.scss ${commandLine}`,
          title: 'Build SCSS',
          concurrent: false,
          watch: {
            patterns: __sugarConfig('build.scss.watch'),
            type: 'new,update'
          }
        },
        watch: {
          command: `sugar fs.watch`,
          title: 'Watch SCSS',
          color: 'cyan',
          concurrent: false
        }
      },
      __deepMerge(
        {
          keys: {
            watch: {
              key: 'w',
              text: 'Watch',
              type: 'toggle'
            },
            build: {
              key: 'b',
              text: 'Build',
              type: 'run',
              command: 'build'
            }
          }
        },
        settings
      )
    );
  }
};
