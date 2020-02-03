const __uniqid = require('@coffeekraken/sugar/js/string/uniqid');
const __parseArgs = require('@coffeekraken/sugar/js/string/parseArgs');

/**
 * @name                  SquidViewPreprocessor
 * @namespace             squid.node.classes
 * @type                  Class
 *
 * Class that take a view raw content and preprocess it by replacing some tokens like @squid, etc...
 *
 * @param             {String}                      viewContent                   The raw view content that will be preprocessed
 *
 * @example         js
 * const SquidViewPreprocessor = require('./classes/SquidViewPreprocessor');
 * const viewPreprocessor = new SquidViewPreprocessor('Something cool....');
 * viewPreprocessor.process().then((newViewContent) => {
 *    // do something
 * });
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SquidViewPreprocessor {

  /**
   * Store the raw view content to process
   * @type          String
   */
  _viewContent = null;

  /**
   * @name          constructor
   * @namespace     squid.node.classes.SquidViewPreprocessor
   * @type          Function
   *
   * Init the view preprocessor
   *
   * @param         {String}            viewContent             The raw view content that will be preprocessed
   *
   * @example         js
   * const SquidViewPreprocessor = require('./classes/SquidViewPreprocessor');
   * const viewPreprocessor = new SquidViewPreprocessor('Something cool....');
   * viewPreprocessor.process().then((newViewContent) => {
   *    // do something
   * });
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(viewContent) {

    // save the view content
    this._viewContent = viewContent;

  }

  /**
   * @name                        process
   * @namespace                   squid.node.classes.SquidViewPreprocessor
   * @type                        Function
   *
   * Process the view raw content and replace the tokens like @squid, etc...
   *
   * @return            {Promise}                         A promise with the processed raw view content
   *
   * @example           js
   * const SquidViewPreprocessor = require('./classes/SquidViewPreprocessor');
   * const viewPreprocessor = new SquidViewPreprocessor('Something cool....');
   * viewPreprocessor.process().then((newViewContent) => {
   *    // do something
   * });
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async process() {
    await this._injectScriptTags(); // inject the common squid script tag in the header
    await this._processSquidToken(); // process the @squid token
    return this._viewContent;
  }

  /**
   * @name                        _processSquidToken
   * @namespace                   squid.node.classes.SquidViewPreprocessor
   * @type                        Function
   * @private
   *
   * Process the @squid token
   *
   * @return          {Promise}                   A promise with the processed raw view content
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _processSquidToken() {

    const tokenReg = /\@squid\(('|")([^\r\n]*)('|")\)/gm;
    let matches;
    const qualities = [];

    while (matches = tokenReg.exec(this._viewContent)) {

      const tokenHash = __uniqid();
      const token = matches[0];
      const content = matches[2];

      // parse the squid token content
      const tokenObject = await this._parseSquidTokenContent(content);
      if ( ! tokenObject.id) tokenObject.id = tokenHash;

      // const htmlId = tokenObject.id === tokenHash ? tokenHash : tokenObject.id + '-' + tokenHash;

      this._viewContent = this._viewContent.replace(token, `
        <div id="${tokenObject.id}" class="view"></div>
        <script>
          window.Squid.view.call(${JSON.stringify(tokenObject)}, '${tokenObject.id}');
        </script>
      `);

    }

    return this._viewContent;

  }

  /**
   * @name                  _injectScriptTags
   * @namespace             squid.node.classes.SquidViewPreprocessor
   * @type                  Function
   * @private
   *
   * Inject the scripts tags into the view if needed
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _injectScriptTags() {

    // search for the <head> tag and replace it if founded
    if ( ! this._viewContent.includes('</head>')) {
      return this._viewContent;
    }

    // create the script html content
    const html = `
      <script src="/app/js"></script>
      <link rel="stylesheet" type="text/css" href="/app/css">
      </head>
    `;

    // inject the script tag to load the global squid javascript
    this._viewContent = this._viewContent.replace('</head>', html);

    // resolve the promise
    return this._viewContent;

  }


  /**
   * @name                  _parseSquidTokenContent
   * @namespace             squid.node.classes.SquidViewPreprocessor
   * @type                  Function
   * @private
   *
   * Parse the @squid token content and return an object representing the squid token parameters
   *
   * @param           {String}            content             The token content to parse
   * @return          {Object}                                The token content in object format
   *
   * @example         js
   * viewPreprocessor._parseSquidTokenContent('view home.header #header');
   * {
   *  action: 'view',
   *  view: 'home.header',
   *  id: 'header'
   * }
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _parseSquidTokenContent(content) {

    // get the action wanted
    const action = content.split(' ')[0];

    // init the args object
    let args = {};

    // console.log({
    //   action: 'String -a --action',
    //   view: 'String -v --view',
    //   id: `String -i --id /^#([\\S]+)$/`,
    //   in: `String --in ${await Squid.config('animation.defaultIn') || ''}`,
    //   out: `String --out ${await Squid.config('animation.defaultOut') || ''}`
    // });

    // parse differenctly depending on action
    switch(action) {
      case 'view':
        args = __parseArgs(content, {
          action: 'String -a --action',
          view: 'String -v --view',
          id: `String -i --id /^#([\\S]+)$/`,
          in: `String --in "${await Squid.config('animation.defaultIn') || ''}"`,
          out: `String --out "${await Squid.config('animation.defaultOut' || '')}"`,
          when: 'String -w --when "inViewport"'
        });
      break;
    }

    // init the token object
    const tokenObject = {
      action: action,
      ...args
    };

    // return the token object
    return tokenObject;

  }

}
