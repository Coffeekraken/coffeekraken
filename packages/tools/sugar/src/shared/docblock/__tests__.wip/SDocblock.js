"use strict";
// TODO: More tests
module.exports = (__SDocblock) => {
    describe('sugar.js.docblock.SDocblockParser', () => {
        it('Should parse a simple docblick correctly', (done) => {
            const docblock = `
      /**
       * @name                  DockblockParser
       * @namespace           js.docblock
       * @type                  Class
       *
       * This is the main class that expose the methods like "parse", etc...
       * You have to instanciate it by passing a settings object. Here's the available options:
       *
       * @example         js
       * import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';
       * new SDocblockParser({
       *    // override some settings here...
       * }).parse(myString);
       *
       * @since     2.0.0
       * @author 	Olivier Bossel <olivier.bossel@gmail.com>
       */

      /**
       * @name        debounce
       * @namespace           js.function
       * @type      Function
       *
       * This utils function allows you to make sure that a function that will normally be called
       * several times, for example during a scroll event, to be called only once after
       * the delay passed
       *
       * @example 		js
       * import debounce from '@coffeekraken/sugar/js/function/debounce';
       * const myDebouncedFn = debounce(() => {
       * 		// my function content that will be
       * 		// executed only once after the 1 second delay
       * }, 1000);
       *
       * document.addEventListener('scroll', (e) => {
       * 		// call my debounced function
       * 		myDebouncedFn();
       * });
       *
       * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name          definition
       * @type          Object
       * @get
       * @static
       *
       * Store the definition object
       *
       * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name        includes
       * @namespace           js.string
       * @type      Function
       *
       * Same as the native String.includes function but accept either an array of items
       * or a simple comma separated string like "something,cool,hello,world"
       *
       * @param    {String}    string    The string to check
       * @param     {Array|String}    values      An array or comma separated string to check
       * @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match
       *
       * @example    js
       * import includes from '@coffeekraken/sugar/js/string/includes'
       * includes('Hello world', 'world,coco') // ['world']
       *
       * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      `;
            const parser = new __SDocblock(docblock);
            const renderedBlocks = parser.toMarkdown();
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtQkFBbUI7QUFFbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFO0lBQy9CLFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLEVBQUU7UUFDakQsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEQsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdFaEIsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUUzQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==