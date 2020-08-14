export default function sugarHeading(data = {}) {
  let version = '';
  if (data.version) version = `<white>${data.version}</white>`;
  let author = 'Coffeekraken';
  if (data.author) author = data.author;
  const value = [
    `<yellow>█</yellow>`,
    `<yellow>█     ____                           </yellow>`,
    `<yellow>█   / ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>`,
    // `<yellow>█   / ___| _   _  __ _  __ _ _ __   </yellow>`,
    '<yellow>█   \\___ \\| | | |/ _` |/ _` | `__|  </yellow>',
    `<yellow>█    ___) | |_| | (_| | (_| | |       </yellow>`,
    `<yellow>█   |____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
    `<yellow>█                |___/</yellow>`,
    `<yellow>█</yellow>`
  ].join('\n');

  return value;
}
