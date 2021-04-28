import __path from 'path';

export default {
  compile: {
    input: __path.resolve(`${__dirname}/../src/js/index.js`),
    bundle: true
  }
};
