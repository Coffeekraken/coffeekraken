const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __sass = require('sass');
const __deepMerge = require('../../../object/deepMerge');
const __packageRoot = require('../../../path/packageRoot');
const __globImporter = require('node-sass-glob-importer');
const __getFilename = require('../../../fs/filename');
const __SPromise = require('../../../promise/SPromise');
const __SBuildScssInterface = require('../interface/SBuildScssInterface');
const __gonzalesPe = require('gonzales-pe');
const { parse, stringify } = require('scss-parser');
const __copy = require('../../../clipboard/copy');
const __tokenize = require('scss-tokenizer').tokenize;
const __toString = require('../../../string/toString');
const __path = require('path');
const __SCodeExtractor = require('../SCodeExtractor');
const __SCache = require('../../../cache/SCache');
const __md5 = require('../../../crypt/md5');
const { compile } = require('handlebars');

/**
 * @name                SRenderSassStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of rendering the sass string in the "data" property
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SRenderSassStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildScssInterface;

  /**
   * @name            constructor
   * @type            Function
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
          name: 'Render',
          id: 'actionStream.action.scss.render'
        },
        settings
      )
    );
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * Override the base class run method
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(streamObj, settings) {
    return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
      // const tree = __gonzalesPe.parse(streamObj.data, {
      //   syntax: 'scss'
      // });
      // const tree = parse(streamObj.data);

      // console.log(tree.value.slice(0, 30));
      // throw 'coco';

      const extractor = new __SCodeExtractor();

      const extracted = extractor.extract(streamObj.data, [
        {
          type: 'selector',
          prefix: /(^(?!.*@media)[\t ]*([a-zA-Z#.:*[][^{\/]*\s*)\s?){/m,
          prefixMatchIdx: 1,
          open: '{',
          close: '}'
        },
        {
          type: 'query',
          prefix: /@media\s?\([^{]*\)\s?/,
          open: '{',
          close: '}'
        },
        {
          type: 'include',
          prefix: /@include\s[a-zA-Z0-9-_\.]+/,
          suffix: /;/,
          open: '(',
          close: ')',
          exclude: [/@include Sugar\.setup\(.*\);/]
        },
        {
          type: 'mixin',
          prefix: /@mixin\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
          open: '{',
          close: '}'
        }
      ]);

      // const res = streamObj.data.match(

      // __copy(
      //   __toString(extracted, {
      //     beautify: true
      //   })
      // );

      // );
      // delete res.input;
      // console.log(res);

      const cache = new __SCache('SRenderSassStreamAction', {});

      // (\.|#)[a-zA-Z0-9-_ \.,\[\]"'#\n\r]+{

      if (!streamObj.outputStack) streamObj.outputStack = {};

      // loop on extracted blocks
      const previousBlocks = [];
      for (let i = 0; i < extracted.length; i++) {
        const block = extracted[i];

        switch (block.type) {
          case 'string':
          case 'mixin':
            // case 'include':
            previousBlocks.push(block.data);
            break;
          default:
            let stringToCompile = '';
            previousBlocks.forEach((bl) => {
              stringToCompile += `      
                ${bl}
              `;
            });
            stringToCompile += `
              ${block.data}
            `;

            let result,
              compiledString = '';

            const hash = __md5.encrypt(stringToCompile);
            const cachedValue = await cache.get(hash);
            if (cachedValue) {
              compiledString = cachedValue;
            } else {
              console.log('compile', block.type);
              console.log(typeof hash);
              try {
                result = __sass.renderSync(
                  __deepMerge(
                    {
                      importer: __globImporter(),
                      data: stringToCompile,
                      includePaths: [
                        `${streamObj.input.replace(
                          __getFilename(streamObj.input),
                          ''
                        )}`,
                        `${__packageRoot(process.cwd())}/node_modules`,
                        `${__packageRoot(__dirname)}/src/scss`,
                        `${__packageRoot(process.cwd())}/src/scss`
                      ],
                      sourceMap: streamObj.map
                    },
                    settings
                  )
                );

                const resultString = result.css.toString();
                compiledString = resultString.trim();

                console.log('SAVE');
                // save in cache
                await cache.set(hash, compiledString);
              } catch (e) {
                compiledString = e.toString();
                // return reject(e);
              }
            }

            stringToCompile = stringToCompile.replace(
              /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g,
              ''
            );
            compiledString = compiledString.replace(
              /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g,
              ''
            );

            streamObj[`output_${i}`] = stringToCompile;
            const filename = `output_${i}.scss`;
            streamObj.outputStack[`output_${i}`] = __path.resolve(
              streamObj.outputDir,
              streamObj.prod
                ? filename.replace('.scss', '.prod.scss')
                : filename.replace('.scss', '.scss')
            );
            streamObj[`output_${i}_compiled`] = compiledString;
            const filenameCompiled = `output_${i}_compiled.scss`;
            streamObj.outputStack[`output_${i}_compiled`] = __path.resolve(
              streamObj.outputDir,
              streamObj.prod
                ? filenameCompiled.replace('.scss', '.prod.scss')
                : filenameCompiled.replace('.scss', '.scss')
            );

            break;
        }
      }

      return resolve(streamObj);

      throw 'coco';
    });
  }
};
