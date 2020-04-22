const __DocblockParser = require('../DocblockParser');
const __fs = require('fs');

describe('src.class.DocblockParser', () => {

  it('Should parse the passed docblock correctly', done => {

    const parser = new __DocblockParser({});


    const string = __fs.readFileSync(__dirname + '/sample.txt').toString();

    const result = parser.parse(string);

    expect(result[0]).toEqual({
      name: 'SColor',
      namespace: 'sugar.js.color',
      type: 'Class',
      description: 'Class that provide complete and simple to use color manupilation capabilities like:\n' +
        '- Modifiers\n' +
        '- opacity\n' +
        '- darken\n' +
        '- lighten\n' +
        '- desaturate\n' +
        '- saturate\n' +
        '- spin (change hue)\n' +
        '- transparentize\n' +
        '- alpha\n' +
        '- grayscale\n' +
        '- Conversions\n' +
        '- rgba\n' +
        '- hsl\n' +
        '- hsv\n' +
        '- hex\n' +
        '- Print out formats\n' +
        '- toRgbaString\n' +
        '- toHslString\n' +
        '- toHsvString\n' +
        '- toHexString\n' +
        '- toString(format = null)',
      example: {
        language: 'js',
        code: "import SColor from '@coffeekraken/sugar/js/classes/SColor'\n" +
          'let myColor = new SColor(#ff0000);\n' +
          '// get a lighter color\n' +
          'let ligtherColor = myColor.lighten(20);\n' +
          '// print the color to rgba\n' +
          'console.log(lighterColor.toRgbaString());'
      },
      author: {
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        website: 'https://olivierbossel.com'
      }
    });

    expect(result[1]).toEqual({
      name: 'colors',
      type: 'Object',
      protected: true,
      static: true,
      description: 'Static color names map',
      author: {
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        website: 'https://olivierbossel.com'
      }
    });

    expect(result[2]).toEqual({
      name: '_originalSColor',
      type: 'Object',
      private: true,
      description: 'Original color value',
      author: {
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        website: 'https://olivierbossel.com'
      }
    });

    expect(result[3]).toEqual({
      name: '_r',
      type: 'Number',
      private: true,
      description: 'Internal red value',
      author: {
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        website: 'https://olivierbossel.com'
      }
    });

    expect(result[4]).toEqual({
      constructor: true,
      type: 'Function',
      description: 'This is my awesome constructor function',
      param: {
        "else": {
          "default": undefined,
          "description": "This is the else param",
          "name": "else",
          "type": [
            "Boolean",
            "Array"
          ]
        },
        "myArray": {
          "default": [
            "hello",
            "world",
          ],
          "description": "This is my complexe array param",
          "name": "myArray",
          "type": "Array"
        },
        "something": {
          "default": undefined,
          "description": "This is the something param",
          "name": "something",
          "type": "String"
        },

      },

      return: { type: 'Object', description: 'A cool and awesome object' },
      author: {
        name: 'Olivier Bossel',
        email: 'olivier.bossel@gmail.com',
        website: 'https://olivierbossel.com'
      }
    });

    done();

  });

});