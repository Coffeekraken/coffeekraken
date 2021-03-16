// @ts-nocheck
// @shared

import __deepMerge from '../object/deepMerge';
import __parseHtml from '../console/parseHtml';

/**
 * @name          sugarHeading
 * @namespace     sugar.js.ascii
 * @type          Function
 * @stable
 *
 * This function returns an ascii version of the sugar logo
 *
 * @param     {Object}      [settings={}]       A settings object:
 * - version (2.0.0) {String}: The version you want to display
 * - borders (true) {Boolean}: If you want to display the border left or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import sugarHeading from '@coffeekraken/sugar/js/ascii/sugarHeading';
 * sugarHeading();
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
interface ISugarHeadingSettings {
  version?: string;
  borders?: boolean;
}
function sugarHeading(settings: ISugarHeadingSettings = {}): string {
  settings = __deepMerge(
    {
      version: '2.0.0',
      borders: true
    },
    settings
  );
  let version = '';
  if (settings.version) version = `<white>${settings.version}</white>`;
  const value = [
    `<yellow>${settings.borders ? '█' : ''}</yellow>`,
    `<yellow>${
      settings.borders ? '█' : ''
    }     ____                           </yellow>`,
    `<yellow>${
      settings.borders ? '█' : ''
    }   / ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>`,
    `<yellow>${
      settings.borders ? '█' : ''
    }   \\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
    `<yellow>${
      settings.borders ? '█' : ''
    }    ___) | |_| | (_| | (_| | |       </yellow>`,
    `<yellow>${
      settings.borders ? '█' : ''
    }   |____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
    `<yellow>${settings.borders ? '█' : ''}                |___/</yellow>`,
    `<yellow>${settings.borders ? '█' : ''}</yellow>`
  ]
    .map((line) => {
      return __parseHtml(line).trim();
    })
    .join('\n');

  return value;
}

export default sugarHeading;
