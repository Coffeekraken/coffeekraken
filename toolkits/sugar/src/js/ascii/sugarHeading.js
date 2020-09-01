import __deepMerge from '../object/deepMerge';

export default function sugarHeading(settings = {}) {
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
  ].join('\n');

  return value;
}
