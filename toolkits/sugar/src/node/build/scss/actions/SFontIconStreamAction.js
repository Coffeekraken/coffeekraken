const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __deepMerge = require('../../../object/deepMerge');
const __SBuildScssInterface = require('../interface/SBuildScssInterface');
const __SScssCompiler = require('../../../scss/SScssCompiler');
const __folderPath = require('../../../fs/folderPath');
const __copy = require('../../../clipboard/copy');
const __childProcess = require('child_process');
const __ensureDirSync = require('../../../fs/ensureDirSync');
const __removeSync = require('../../../fs/removeSync');
const __IconFontBuildr = require('icon-font-buildr');
const __SGlob = require('../../../glob/SGlob');

/**
 * @name                SFontIconStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of generating the icon font from the passed source directory
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFontIconStreamAction extends __SActionsStreamAction {
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
          name: 'Font icons generator',
          id: 'SFontIconStreamAction'
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
      // compile using the SScssCompiler class

      __removeSync(`${streamObj.outputDir}/icons`);
      __ensureDirSync(`${streamObj.outputDir}/icons`);

      // const pro = __childProcess.spawn(
      //   `npx icon-font-generator ${streamObj.iconsInput} -o ${streamObj.outputDir}/icons`,
      //   [],
      //   {
      //     shell: true,
      //     stdout: 'inherit'
      //   }
      // );

      const glob = new __SGlob(streamObj.iconsInput);
      const files = await glob.resolve();

      const iconNames = [],
        sourcesPathes = [];

      files.forEach((file) => {
        if (sourcesPathes.indexOf(file.dirPath) === -1)
          sourcesPathes.push(`${file.dirPath}/[icon].svg`);
        iconNames.push(file.name.replace(`.${file.extension}`, ''));
      });

      const builder = new __IconFontBuildr({
        sources: sourcesPathes,
        icons: iconNames,
        output: {
          // codepoints: true, // Enable support for codepoints
          // ligatures: false, // Disable support for ligatures
          icons: `${streamObj.outputDir}/icons`, // Where to save the icons, if not provided they won't be stored permanently
          fonts: `${streamObj.outputDir}/icons`, // Where to save the fonts
          fontName: 'sugar-icons', // The name of the font to generate
          formats: [
            // Font formats to output
            'eot',
            'ttf',
            'woff',
            'woff2'
          ]
        }
      });

      await builder.build();

      const codepoints = builder.getIconsCodepoints(); // Get a map of icon names to codepoints, useful for generating HTML/CSS/SCSS etc.
      const ligatures = builder.getIconsLigatures(); // Get a map of icon names to ligatures, useful for generating HTML/CSS/SCSS etc.

      let cssString = '';
      cssString += `
      @font-face {
        font-family: 'Sugar Icons';
        font-style: normal;
        font-weight: 400;
        font-display: block;
        src: url("./sugar-icons.eot");
        src: url("./sugar-icons.eot?#iefix") format("embedded-opentype"),
             url("./sugar-icons.woff2") format("woff2"),
             url("./sugar-icons.woff") format("woff"),
             url("./sugar-icons.ttf") format("truetype"),
             url("./sugar-icons.svg#sugar") format("svg");
        }
        [class^="icon-"] {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          display: inline-block;
          font-family: 'Sugar Icons';
          font-style: normal;
          font-weight: 400;
          font-variant: normal;
          text-rendering: auto;
          line-height: 1;
        }
      `;

      Object.keys(codepoints).forEach((iconName) => {
        const codepoint = codepoints[iconNames][0];
        cssString += `
          .icon-${iconName}:before {
            content: "${codepoint}"; }
          `;
      });

      streamObj.iconsCss = cssString;
      if (!streamObj.outputStack) streamObj.outputStack = {};
      streamObj.outputStack.iconsCss = `${streamObj.outputDir}/icons/sugar-icons.css`;

      // import the icon css into
      streamObj.data = `
        @import "icons/sugar-icons.css";
        ${streamObj.data}
      `;

      resolve(streamObj);
    });
  }
};
