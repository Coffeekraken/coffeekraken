const __SActionsStreamAction = require('../SActionsStreamAction');
const __packageRoot = require('../../path/packageRoot');
const __fs = require('fs');
const __ensureDirSync = require('../../fs/ensureDirSync');
const __deepMerge = require('../../object/deepMerge');
const __md5 = require('../../crypt/md5');
const __writeJsonSync = require('../../fs/writeJsonSync');

/**
 * @name            SExtractDocblocksIntoFiles
 * @namespace           node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This actions allows you to extract the docblocks into separated files depending on their "namespace" tag
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * - sourceProp ('data') {String}: Specify the source property you want to extract data from
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SExtractDocblocksIntoFiles extends __SActionsStreamAction {
  /**
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    outputStack: {
      type: 'Object<String>',
      required: true
    },
    outputDir: {
      type: 'String',
      required: true
    }
  };

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
          id: 'actionStream.action.extractDocblocksIntoFiles',
          sourceProp: 'data'
        },
        settings
      )
    );
    this.constructor.definitionObj = {
      ...this.constructor.definitionObj,
      [this._settings.sourceProp]: {
        type: 'String',
        required: true
      }
    };
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
    return super.run(streamObj, async (resolve, reject) => {
      const reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
      const blocks = streamObj[settings.sourceProp].match(reg);
      streamObj.extractDocblocksIntoFiles = {};
      let currentNamespace = null;

      blocks.forEach((block, i) => {
        const namespaceReg = /\s?@namespace\s{1,9999999}([a-zA-Z0-9_.-]+)\s/gm;
        const namespaceMatches = block.match(namespaceReg);
        const nameReg = /\s?@name\s{1,9999999}([a-zA-Z0-9_.-]+)\s/gm;
        const nameMatches = block.match(nameReg);
        let namespace = namespaceMatches ? namespaceMatches[0] : null;
        let name = nameMatches ? nameMatches[0] : null;
        if (!namespace || !name) return;

        namespace = namespace.replace('@namespace', '').trim();
        name = name.replace('@name', '').trim();
        const fullName = `${namespace}.${name}`.split('.').join('/');

        if (!streamObj.extractDocblocksIntoFiles[fullName])
          streamObj.extractDocblocksIntoFiles[fullName] = '';
        streamObj.extractDocblocksIntoFiles[fullName] += `\n\n${block}`;

        streamObj.outputStack[
          `extractDocblocksIntoFiles.${fullName}`
        ] = `${streamObj.outputDir}/doc/${fullName}.css`;
      });

      resolve(streamObj);
    });
  }
};
