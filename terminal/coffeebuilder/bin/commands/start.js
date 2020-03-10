const __path = require('path');
const __CoffeeBuilder = require('../../src/node/index');

module.exports = async (compileTypes = null) => {

  console.log(compileTypes);

  const coffeebuilder = new __CoffeeBuilder({});
  coffeebuilder.run().then(() => {
    console.log('FINISED');
  });

}
