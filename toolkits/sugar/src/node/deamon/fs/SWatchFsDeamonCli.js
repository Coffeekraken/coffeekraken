const __SCli = require('../../cli/SCli');
const __SPromise = require('../../promise/SPromise');
const __deepMerge = require('../../object/deepMerge');
const __chokidar = require('chokidar');
const __getFilename = require('../../fs/filename');
const __extension = require('../../fs/extension');
const __packageRoot = require('../../path/packageRoot');
const __fs = require('fs');
const __argsToString = require('../../cli/argsToString');
const __childProcess = require('child_process');

/**
 * @name            SWatchFsDeamonCli
 * @namespace           node.deamon.fs
 * @type            Class
 * @extends         SCli
 *
 * This class represent the watch filesystem deamon Cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SWatchFsDeamonCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar deamon.fs %arguments';

  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    name: {
      type: 'String',
      alias: 'n',
      description:
        'Specify the name of a configured deamon in the "deamons.config.js" file',
      level: 1,
      required: false
    },
    input: {
      type: 'String',
      alias: 'i',
      description: 'Input files glob pattern',
      level: 1,
      required: false
    },
    command: {
      type: 'String',
      alias: 'c',
      description:
        'Specify the command you want to launch when fs update has been detected',
      level: 1,
      required: false
    }
  };

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          id: 'deamon.fs',
          name: 'Deamon Fs'
        },
        settings
      )
    );
  }

  /**
   * @name            _run
   * @type            Function
   * @private
   *
   * This method is the one that will be called once you call ```run```.
   * The params passed are processed by the ```run``` parent method so you can
   * confidently trust them.
   * You MUST return an SPromise instance so that the spawned process can be
   * managed automatically in the parent ```run``` method.
   *
   * @param       {Object}        argsObj         The object of passed arguments
   * @param       {Object}        [settings={}]     The passed settings object
   * @return      {SPromise}                      An SPromise instance through which the parent method can register for events like "success", "log", etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _run(argsObj, settings = {}) {
    return new __SPromise(
      async function (resolve, reject, trigger, cancel) {
        const runningTests = {};

        trigger('log', {
          value: `#start Starting the "<yellow>${settings.name}</yellow>" filesystem deamon...`
        });

        __chokidar
          .watch(argsObj.input, {
            persistent: true,
            followSymlinks: true,
            ...settings
          })
          .on('ready', () => {
            trigger('log', {
              value: `#success The "<yellow>${settings.name}</yellow>" deamon is <green>ready</green>`
            });
          })
          .on('change', (filepath) => {
            if (runningTests[filepath]) return;
            runningTests[filepath] = true;

            const filename = __getFilename(filepath);
            const path = filepath.replace(`/${filename}`, '');
            const name = filename.replace(`.${__extension(filename)}`, '');

            trigger('log', {
              value: '#clear'
            });

            trigger('log', {
              value: `Update detected on the file "<cyan>${path.replace(
                __packageRoot(filepath) + '/',
                ''
              )}</cyan>"`
            });

            // reading the file content
            const content = __fs.readFileSync(filepath, 'utf8');
            const deamonReg = /\*\s?@deamon\.fs\s+(.*)/g;
            const deamonMatches = content.match(deamonReg);
            let command;
            if (deamonMatches && deamonMatches[0]) {
              command = deamonMatches[0]
                .replace(/\s?\*\s?@deamon\.fs\s+/, '')
                .trim();
            } else {
              command = argsObj.command;
            }

            // preparing the command to run
            const args = __argsToString(argsObj);
            command = command.replace('%path', path).replace('%name', name);

            trigger('log', {
              value: `Launching the command "<magenta>${command.replace(
                `${__packageRoot()}/`,
                ''
              )}</magenta>"...`
            });

            const childProcess = __childProcess
              .spawn(command, null, {
                stdio: 'inherit',
                shell: true
              })
              .on('data', (d) => {
                // console.log('d', data.toString());
              })
              .on('close', () => {
                // trigger('log', {
                //   value: `#success Process finished successfully`
                // });
                delete runningTests[filepath];
              })
              .on('error', (e) => {
                console.log('EORROROROR', e);
              });

            // childProcess.stdout.on('data', (data) => {
            //   console.log('data', data.toString());
            // });
            // childProcess.stderr.on('data', (data) => {
            //   console.log('data', data.toString());
            // });
          });

        // process.stdin.resume();
      },
      {
        id: 'cli.deamon.fs'
      }
    ).start();
  }
};
