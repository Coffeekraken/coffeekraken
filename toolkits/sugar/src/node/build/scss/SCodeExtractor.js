const __deepMerge = require('../../object/deepMerge');

module.exports = class SCodeExtractor {
  _settings = {};

  constructor(settings = {}) {
    this._settings = __deepMerge({}, settings);
  }

  extract(source, extractors = [], settings = {}) {
    settings = __deepMerge(this._settings, settings);

    const blocks = [];
    let blockObj = {
      opened: false,
      closed: false,
      openCount: 0,
      closeCount: 0
    };
    let currentBlockObj = Object.assign({}, blockObj);
    let thingsToExtract = true;

    while (thingsToExtract) {
      const extractorsMatches = [];
      extractors.forEach((extractorObj) => {
        if (extractorObj.prefix) {
          const matches = source.match(extractorObj.prefix);
          if (matches) {
            extractorsMatches.push({
              extractorObj,
              match: {
                index: matches.index,
                string: matches[extractorObj.prefixMatchIdx || 0]
              }
            });
          }
        }
      });

      let idx = source.length,
        extractorObj;
      extractorsMatches.forEach((obj) => {
        if (obj.match.index < idx) {
          idx = obj.match.index;
          extractorObj = {
            opened: false,
            closed: false,
            openCount: 0,
            closeCount: 0,
            ...obj.extractorObj,
            match: obj.match
          };
        }
      });

      if (extractorObj) {
        blocks.push({
          type: 'string',
          data: source.slice(0, extractorObj.match.index)
        });
        source = source.slice(extractorObj.match.index);
      } else {
        blocks.push({
          type: 'string',
          data: source
        });

        thingsToExtract = false;
        break;
      }

      let blockString = '';
      for (let i = extractorObj.match.string.length; i < source.length; i++) {
        const char = source[i];
        blockString += char;
        if (char === extractorObj.open) {
          if (!extractorObj.opened) {
            extractorObj.opened = true;
          }
          extractorObj.openCount++;
        } else if (char === extractorObj.close) {
          extractorObj.closeCount++;
          if (
            extractorObj.opened &&
            extractorObj.closeCount === extractorObj.openCount
          ) {
            extractorObj.closed = true;

            // check suffix
            if (extractorObj.suffix) {
              const suffixMatch = source.slice(i).match(extractorObj.suffix);
              if (suffixMatch && suffixMatch.index === 1) {
                blockString += suffixMatch[0];
              }
            }

            blockString = `${extractorObj.match.string}${blockString}`;

            let type = extractorObj.type;
            if (extractorObj.exclude) {
              if (!Array.isArray(extractorObj.exclude))
                extractorObj.exclude = [extractorObj.exclude];
              for (let k = 0; k < extractorObj.exclude.length; k++) {
                const excludeReg = extractorObj.exclude[k];
                if (blockString.match(excludeReg)) {
                  type = 'string';
                  break;
                }
              }
            }

            // append the block to the blocks stack
            blocks.push({
              type: type,
              data: blockString
            });

            // crop the source
            source = source.slice(blockString.length);

            // stop the loop here
            break;
          }
        }
      }
    }

    return blocks;
  }
};
