import __deepMerge from "../object/deepMerge";
function sugarBanner(settings = {}) {
  settings = __deepMerge({
    version: "",
    borders: true,
    marginLeft: 2,
    paddingTop: 0,
    paddingBottom: 0
  }, settings);
  let version = "";
  if (settings.version)
    version = `<white>${settings.version}</white>`;
  const value = [
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}  ____                           </yellow>`,
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}/ ____|</yellow><white>Coffee<magenta>kraken</magenta></white><yellow> __ _ _ __   </yellow>`,
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}\\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)} ___) | |_| | (_| | (_| | |       </yellow>`,
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}|____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
    `<yellow>${settings.borders ? "\u2588" : ""}</yellow><white>${" ".repeat(settings.marginLeft)}             </white><yellow>|___/</yellow>`
  ].map((line) => {
    return line;
  });
  if (settings.paddingTop) {
    for (let i = 0; i < settings.paddingTop; i++) {
      value.unshift(`<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}</yellow>`);
    }
  }
  if (settings.paddingBottom) {
    for (let i = 0; i < settings.paddingBottom; i++) {
      value.push(`<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}</yellow>`);
    }
  }
  return value.join("\n");
}
var sugarBanner_default = sugarBanner;
export {
  sugarBanner_default as default
};
