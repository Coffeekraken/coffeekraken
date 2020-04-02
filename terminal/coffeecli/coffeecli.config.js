/**
 * @name                        coffeecli.config.js
 * @namespace                   terminal.coffeecli
 * @type                        Object
 * 
 * This is the default configuration for a coffeecli based app.
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {

  /**
   * @name                cliName
   * @type                String
   * 
   * This define the name of the CLI that will be installed on the user system.
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cliName: 'coffee',

  /**
   * @name                  sources
   * @type                  Object
   * 
   * This define the data sources on which the system will search for "coffeecli.config.js" files.
   * You can change the searched filename either for the whole installation using the "filename" setting, or for
   * a particular source by specifying a "filename" property in the source object like in the example bellow.
   * Here's the list of properties available by source:
   * - adapter (null) {String|CoffeeCliAdapter}: Specify the adapter wanted for this source. Here's the available adapters available:
   *    - bitbucket: This adapter allows you to connect on the atlassian git service. Here's the available settings for this adapter:
   *      - team (null) {String}: Specify a team name in which you want to scope the researches
   * @example           js
   * module.exports = {
   *    sources: {
   *      bitbucket: {
   *        adapter: 'bitbucket',
   *        filename: 'my-cool-file.config.js'
   *      }
   *    }
   * };
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  sources: {}

};