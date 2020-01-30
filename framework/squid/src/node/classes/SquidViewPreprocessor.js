const __uniqid = require('@coffeekraken/sugar/js/string/uniqid');

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
  process() {
    this._injectScriptTags(); // inject the common squid script tag in the header
    this._processSquidToken(); // process the @squid token
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
  _processSquidToken() {

    const tokenHash = __uniqid();
    const tokenReg = /\@squid\(('|")([^\r\n]*)('|")\)/gm;
    let matches;
    const qualities = [];

    while (matches = tokenReg.exec(this._viewContent)) {

      const token = matches[0];
      const content = matches[2];

      // parse the squid token content
      const tokenObject = this._parseSquidTokenContent(content);
      if ( ! tokenObject.id) tokenObject.id = tokenHash;

      const htmlId = tokenObject.id === tokenHash ? tokenHash : tokenObject.id + '-' + tokenHash;

      this._viewContent = this._viewContent.replace(token, `
        <div id="${htmlId}">
          <script>
            window.Squid.view.call(${JSON.stringify(tokenObject)}, '${htmlId}');
          </script>
        </div>
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
  _injectScriptTags() {

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
  _parseSquidTokenContent(content) {

    // split by spaces
    const parts = content.split(' ');

    // get the action that is the first part
    const action = parts[0];

    // init the token object
    const tokenObject = {
      action: action
    };

    // parse differently depending on the action
    switch(action) {
      case 'view':
        tokenObject.view = parts[1];
      break;
    }

    // get the global parameters like id, etc...
    parts.forEach(async part => {

      // ids that begin with a #
      if (part.charAt(0) === '#') tokenObject.id = part.slice(1);

      // animation in
      if (part.startsWith('in:')) tokenObject.animationIn = part.slice(3);
      else if (await Squid.config('animations.defaultIn')) tokenObject.animationIn = await Squid.config('animations.defaultIn');

      // animation out
      if (part.startsWith('out:')) tokenObject.animationOut = part.slice(4);
      else if (await Squid.config('animations.defaultOut')) tokenObject.animationOut = await Squid.config('animations.defaultOut');

    });

    // return the token object
    return tokenObject;

  }

}
