import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';

export default (opts = {}) => {
  return {
    postcssPlugin: 'sugar-error',
    Once(root, { result }) {
      if (result.warnings().length > 0) {
        const warnObj = result.warnings()[0];
        console.error(
          [
            `<yellow>[${warnObj.plugin}]</yellow> ${warnObj.text}`,
            `<cyan>${warnObj.node.source.input.file.replace(
              `${__packageRootDir()}/`,
              ''
            )}</cyan>:<yellow>${warnObj.line}</yellow>:<yellow>${
              warnObj.column
            }</yellow>`,
            ' ',
            `${warnObj.node.source.input.css
              .split('\n')
              .slice(warnObj.line - 2 ?? 0, warnObj.line + 1 ?? 2)
              .map((l, i) => {
                return `<bgBlack> ${
                  warnObj.line + i - 1
                } </bgBlack> <yellow>${l.replace(/^\s+/, '')}</yellow>`;
              })
              .join('\n')}`
          ].join('\n')
        );
      }
    }
  };
};
