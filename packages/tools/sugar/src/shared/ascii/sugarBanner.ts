// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __parseHtml from '../console/parseHtml';

/**
 * @name          sugarBanner
 * @namespace            shared.ascii
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
 * import sugarBanner from '@coffeekraken/sugar/js/ascii/sugarBanner';
 * sugarBanner();
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
interface ISugarBannerSettings {
  version?: string;
  borders?: boolean;
}
function sugarBanner(settings: ISugarBannerSettings = {}): string {
  settings = __deepMerge(
    {
      version: '',
      borders: true,
      marginLeft: 2
    },
    settings
  );
  let version = '';
  if (settings.version) version = `<white>${settings.version}</white>`;
  const value = [
    `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
      settings.marginLeft
    )}  ____                           </yellow>`,
    `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
      settings.marginLeft
    )}/ ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>`,
    `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
      settings.marginLeft
    )}\\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
    `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
      settings.marginLeft
    )} ___) | |_| | (_| | (_| | |       </yellow>`,
    `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
      settings.marginLeft
    )}|____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
    `<yellow>${settings.borders ? '█' : ''}</yellow><white>${' '.repeat(
      settings.marginLeft
    )}             </white><yellow>|___/</yellow>`
  ]
    .map((line) => {
      return line;
    })
    .join('\n');

  return value;
}

export default sugarBanner;
