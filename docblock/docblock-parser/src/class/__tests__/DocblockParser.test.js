const __DocblockParser = require('../DocblockParser');
const __fs = require('fs');

describe('src.class.DocblockParser', () => {

  it('Should parse the passed docblock correctly', done => {

    const parser = new __DocblockParser({});



    const string = __fs.readFileSync(__dirname + '/sample.txt').toString();

    const result = parser.parse(string);

    console.log(result);

    done();

  });

});