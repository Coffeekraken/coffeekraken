import __parse from './parse';

/**
 * @name                        parseArgs
 * @namespace                   sugar.js.string
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    arguments                   The arguments object description
 * @return            {Object}                                                The object of funded arguments
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
 * parseArgs('hello -w 10 --help "coco yep" #blop', {
 *    action: 'String -a --action /^\\S$/',
 *    world: 'Integer -w --world',
 *    help: 'String -h --help',
 *    id: 'String -i --id /^#([\\S]+)$/',
 *    yop: 'String -y --yop "Default value"'
 * });
 * // {
 * //   action: 'hello',
 * //   world: 10,
 * //   help: 'coco yep',
 * //   id: 'blop',
 * //   yop: 'Default value'
 * // }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function parseArgsString(string, argsDefinitions = {}) {

  // process the passed string
  let stringArray = string.match(/(?:[^\s("|')]+|("|')[^("|')]*("|'))+/gm);
  let currentArg = null;
  const argsObj = {};
  stringArray = stringArray.filter(part => {
    if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
      currentArg = part.replace(/^[-]{1,2}/, '');
      argsObj[currentArg] = true;
      return false;
    }
    if (currentArg) {
      argsObj[currentArg] = __parse(part);
      currentArg = null;
      return false;
    }
    return true;
  });

  // process the argsObj object to update alias keys to full argument name
  Object.keys(argsObj).forEach(argName => {
    const argsNames = Object.keys(argsDefinitions);
    for (let i = 0; i < argsNames.length; i++) {
      const argumentObj = argsDefinitions[argsNames[i]];
      if (argName === argumentObj.alias) {
        argsObj[argsNames[i]] = argsObj[argName];
        delete argsObj[argName];
        break;
      }
    }
  });

  // get the list of arguments that does not have value for now
  let argsWithoutValues = Object.keys(argsDefinitions).filter(argName => {
    return argsObj[argName] === undefined;
  });

  // loop on these "unknown" values and try to get the argument that correspond to it
  stringArray = stringArray.filter(value => {
    let hasFoundAnArgument = false;
    // loop on the args without values
    argsWithoutValues = argsWithoutValues.filter(argName => {
      // check that the argument does not have any value
      if (argsObj[argName]) return false;
      // check if the value correspond to the argument
      console.log('Check', value, argsDefinitions[argName]);
      if (isValueCorrespondToArgDefinition(value, argsDefinitions[argName])) {
        // set the value in the argsObj
        argsObj[argName] = value;
        // tell that this value has found an argument
        hasFoundAnArgument = true;
        // tell that this argument is now fullfiled with a value
        return false;
      }
      // the argument does not have any value
      return true;
    });
    // filter the stringArray
    return !hasFoundAnArgument;
  });


  console.log(argsWithoutValues);

  console.log(argsObj);

  console.log(stringArray);

  // loop on every arguments available
  // Object.keys(argsDefinitions).forEach(argName => {



  // });


}

function isValueCorrespondToArgDefinition(value, argDefinition) {

  // checking type first
  let types = null;
  if (argDefinition.type) {
    types = typeof argDefinition.type === 'string' ? argDefinition.type.toLowerCase().split(',').map(a => a.trim()) : types.map(a => a.trim());
  }
  if (types && types.indexOf(typeof __parse(value)) === -1) return false;

  // checking regexp
  if (argDefinition.regexp && typeof value === 'string') {
    if (!argDefinition.regexp.test(value)) return false;
  }

  // checking validator
  if (argDefinition.validator && typeof argDefinition.validator === 'function') {
    if (!argDefinition.validator(value)) return false;
  }

  // all good
  return true;

}