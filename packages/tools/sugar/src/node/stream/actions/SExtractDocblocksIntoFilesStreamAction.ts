// @ts-nocheck

import __SActionsStreamAction from '../SActionsStreamAction';
import __packageRoot from '../../path/packageRoot';
import __packageJson from '../../package/json';
import __fs from 'fs';
import __removeSync from '../../fs/removeSync';
import __ensureDirSync from '../../fs/ensureDirSync';
import __deepMerge from '../../object/deepMerge';
import __md5 from '../../crypt/md5';
import __writeJsonSync from '../../fs/writeJsonSync';
import __SInterface from '../../class/SInterface';

class SExtractDocblocksIntoFilesInterface extends __SInterface {
  static definition = {
    outputStack: {
      type: 'Object<String>',
      required: true
    },
    outputDir: {
      type: 'String',
      required: true
    }
  };
}

/**
 * @name            SExtractDocblocksIntoFiles
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              wip
 *
 * This actions allows you to extract the docblocks into separated files depending on their "namespace" tag
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * - sourceProp ('data') {String}: Specify the source property you want to extract data from
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SExtractDocblocksIntoFiles extends __SActionsStreamAction {
  /**
   * @name            definition
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interfaces = {
    this: SExtractDocblocksIntoFilesInterface
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
    this.constructor.definition = {
      ...this.constructor.definition,
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
    return super.run(streamObj, async ({ resolve, reject }) => {
      const reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
      const blocks = streamObj[settings.sourceProp].match(reg);
      streamObj.extractDocblocksIntoFiles = {};
      let currentNamespace = null;

      __removeSync(`${streamObj.outputDir}/doc`);

      const packageJson = __packageJson();
      const packageName = packageJson.name.split('/').slice(-1)[0];

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

        const packageNameReg = new RegExp(`^${packageName}.`, 'gm');
        if (!fullName.match(packageNameReg)) return;

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
}
