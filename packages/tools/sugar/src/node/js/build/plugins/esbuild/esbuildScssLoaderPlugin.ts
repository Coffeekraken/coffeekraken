let __fs = require('fs');
let __SScssCompiler = require('../../../../scss/SScssCompiler');
let __tmpDir = require('../../../../fs/tmpDir');

module.exports = {
  name: 'esbuildScssLoaderPlugin',
  setup(build) {
    // Load ".txt" files and return an array of words
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      let text = await __fs.promises.readFile(args.path, 'utf8');
      const filePath = `${__tmpDir()}/esbuildScssLoaderPlugin.scss`;
      __fs.writeFileSync(filePath, text);

      const compiler = new __SScssCompiler({
        sharedResources: [],
        prod: true
      });
      const resultObj = await compiler.compile(filePath);
      const outputCss = resultObj.css;

      const script = [
        'var css = `' + outputCss + '`,',
        `   $head = document.head || document.getElementsByTagName('head')[0],`,
        `   $style = document.createElement('style');`,
        `$head.appendChild($style);`,
        `if ($style.styleSheet){`,
        `   $style.styleSheet.cssText = css;`,
        `} else {`,
        `   $style.appendChild(document.createTextNode(css));`,
        `}`
      ].join('\n');

      return {
        contents: script,
        loader: 'js'
      };
    });
  }
};
