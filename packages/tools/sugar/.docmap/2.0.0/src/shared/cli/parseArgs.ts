/**
*
* @name                        parseArgs
* @namespace            js.cli
* @type                        Function
* @platform          js
* @platform          ts
* @platform          node
* @status            beta
*
* Parse a string to find the provided arguments into the list and return a corresponding object.
*
* @param             {String}                    string                      The string to parse
* @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
* @return            {Object}                                                The object of funded arguments and their values
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
* parseArgs('hello -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep" #blop', {
*    param1: { type: 'String', alias: 'p' },
*    world: { type: 'Array', alias: 'w', validator: value => {
*      return Array.isArray(value);
*    }},
*    bool: { type: 'Boolean', alias: 'b', default: false, required: true },
*    'hello.world': { type: 'String' },
*    help: { type: 'String', alias: 'h' },
*    id: { type: 'String', alias: 'i', regexp: /^#([\S]+)$/ }
* }, {
*    treatDotsAsObject: true,
*    handleOrphanOptions: true
* });
* {
*    param1: 'hello',
*    world: [10, 'yop', 'hello world'],
*    bool: true,
*    hello: {
*      world: 'Nelson'
*    },
*    help: 'coco yep',
*    id: '#blop'
* }
*
* @since     2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/