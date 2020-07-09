const __jsonSass = require('json-sass-vars');
const __deepMerge = require('../../object/deepMerge');

module.exports = function jsObjectToScssMap(object, settings = {}) {
  settings = __deepMerge(
    {
      settingsVariable: '$sugarUserSettings',
      quoteKeys: ['src', 'import', 'font-family', 'defaultAction']
    },
    settings
  );

  const jsObject = object;

  let scssConfigString = __jsonSass.convertJs(jsObject);

  scssConfigString = `${settings.settingsVariable}: ${scssConfigString};`;

  scssConfigString.split('\n').forEach((line) => {
    line = line.trim();
    const isComma = line.substr(-1) === ',';
    if (isComma) {
      line = line.slice(0, -1);
    }
    const prop = line.split(':')[0];
    let value = line.split(':').slice(1).join(':').trim();

    if (prop === '),' || prop === ')' || value === '(') return;

    // process arrays
    const arrayReg = /^\((.*)\),?/;
    const arrayMatches = value.match(arrayReg);
    if (arrayMatches) {
      const res = arrayMatches[1]
        .split(',')
        .map((val) => {
          return `'${val.trim()}'`;
        })
        .join(', ');
      value = value.replace(arrayMatches[1], res);
      scssConfigString = scssConfigString.replace(line, `${prop}: ${value}`);
      return;
    }
    if (settings.quoteKeys.indexOf(prop) === -1) return;
    scssConfigString = scssConfigString.replace(line, `${prop}: "${value}"`);
  });

  // set or append in the "data" property
  return scssConfigString;
};
