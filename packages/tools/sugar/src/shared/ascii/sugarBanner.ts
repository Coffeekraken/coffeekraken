// @ts-nocheck

import __deepMerge from '../object/deepMerge';

/**
 * @name          sugarBanner
 * @namespace            shared.ascii
 * @type          Function
 * @platform          js
 * @platform          node
 * @status            beta
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
interface ISugarBannerSettings {
    version?: string;
    borders?: boolean;
    marginLeft: number;
    paddingTop: number;
    paddingBottom: number;
}
function sugarBanner(settings: Partial<ISugarBannerSettings> = {}): string {
    settings = __deepMerge(
        {
            version: '',
            borders: true,
            marginLeft: 2,
            paddingTop: 0,
            paddingBottom: 0,
        },
        settings,
    );
    let version = '';
    if (settings.version) version = `<white>${settings.version}</white>`;
    const value = [
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
            settings.marginLeft,
        )}  ____                           </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
            settings.marginLeft,
        )}/ ____|</yellow><white>Coffee<magenta>kraken</magenta></white><yellow> __ _ _ __   </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
            settings.marginLeft,
        )}\\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
            settings.marginLeft,
        )} ___) | |_| | (_| | (_| | |       </yellow>`,
        `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
            settings.marginLeft,
        )}|____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
        `<yellow>${settings.borders ? '█' : ''}</yellow><white>${' '.repeat(
            settings.marginLeft,
        )}             </white><yellow>|___/</yellow>`,
    ].map((line) => {
        return line;
    });
    if (settings.paddingTop) {
        for (let i = 0; i < settings.paddingTop; i++) {
            value.unshift(
                `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
                    settings.marginLeft,
                )}</yellow>`,
            );
        }
    }
    if (settings.paddingBottom) {
        for (let i = 0; i < settings.paddingBottom; i++) {
            value.push(
                `<yellow>${settings.borders ? '█' : ''}${' '.repeat(
                    settings.marginLeft,
                )}</yellow>`,
            );
        }
    }

    return value.join('\n');
}

export default sugarBanner;
