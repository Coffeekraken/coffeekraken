const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __glob = require('glob');

module.exports = {

  start: (stats, settings, api) => {
    return new Promise((resolve, reject) => {

      if (settings.resourcesPattern) {
        const resourcesArray = __glob.sync(settings.resourcesPattern);
        if (resourcesArray.length) {
          resourcesArray.forEach(resourcePath => {
            const name = resourcePath.split('/').pop();
            const ext = __getExtension(name);
            const selector = name.replace(`.${ext}`, '');
            if (settings.resources[selector]) {
              throw new Error(`CoffeeBuilder: The "<yellow>${settings.resourcesPattern}</yellow>" resourcesPattern has found a file named "<cyan>${name}</cyan>" that try to override the manually setted "<yellow>resources.${selector}</yellow>" config...`);
            }
            settings.resources[selector] = resourcePath;
          });
        }
      }

      let script = `
        import __appendScriptTag from '@coffeekraken/sugar/js/dom/appendScriptTag';
        import __querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive';
        import __when from '@coffeekraken/sugar/js/dom/when';
      `;

      CoffeeBuilder.api.injectScript(script);

      resolve();

    });

  }

  //
  // compiler.hooks.entryOption.tap('LazyDomLoadPlugin', (context, entry) => {
  //   this._entry = entry;
  //
  //   let script = `
  //     import __appendScriptTag from '@coffeekraken/sugar/js/dom/appendScriptTag';
  //     import __querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive';
  //     import __when from '@coffeekraken/sugar/js/dom/when';
  //   `;
  //
  //   const files = Object.keys(entry);
  //   for (let i=0; i<files.length; i++) {
  //     const fileName = files[i];
  //     if (fileName !== this._options.outputEntry) continue;
  //     const filePath = entry[files[i]];
  //
  //     const entryNames = Object.keys(entry);
  //     for (let j=0; j<entryNames.length; j++) {
  //       const entryName = entryNames[j];
  //       const reg = new RegExp(this._options.entryRegexp, 'g');
  //       const match = reg.exec(entryName);
  //       if ( ! match) continue;
  //       const path = match[0];
  //       let selector = this._options.decryptSelectorFn ? this._options.decryptSelectorFn(match[1]) : match[1];
  //       let when = null;
  //       const scriptSrc = this._options.scriptSrc.replace('[path]', entryName).replace('[name]', entryName);
  //
  //       const splitedSelector = selector.split(':');
  //       if (splitedSelector.length === 2) {
  //         selector = splitedSelector[0];
  //         when = splitedSelector[1];
  //       }
  //
  //       script += `
  //         __querySelectorLive('${selector}', async ($elm, clearFn) => {
  //
  //           clearFn();
  //
  //           ${when ? 'await __when($elm, "' + when + '");' : ''}
  //
  //           __appendScriptTag('${scriptSrc}', document.head);
  //
  //         });
  //       `;
  //     }
  //
  //     break;
  //   }
  //
  //   // create the lazydomload.js file and add it to the entry
  //   __fs.writeFileSync(`${__tmpDir()}/lazydomload.js`, script);
  //   entry[`_lazydomload.js`] = `${__tmpDir()}/lazydomload.js`;
  //
  // });
  //
  // compiler.hooks.done.tap('LazyDomLoadPlugin', (stats) => {
  //
  //   // check if we find the output entry where we need to put the final lazydomload script
  //   const outputFilePath = __path.resolve(`${compiler.options.output.path}/${this._options.outputEntry}`);
  //   const finalLazyDomLoadScript = __fs.readFileSync(`${compiler.options.output.path}/_lazydomload.js`);
  //
  //   if (__fs.existsSync(outputFilePath)) {
  //     __fs.appendFileSync(outputFilePath, finalLazyDomLoadScript);
  //   } else {
  //     __fs.writeFileSync(outputFilePath, finalLazyDomLoadScript);
  //   }
  //
  //   // delete the _lazydomload temp file
  //   __fs.unlinkSync(`${compiler.options.output.path}/_lazydomload.js`);
  //
  //   __log(`LazyDomLoadPlugin: The script files that need to be lazy loaded have been generated...`, 'success');
  //   __log(`LazyDomLoadPlugin: The "querySelectorLive" listeners have been added to the "${this._options.outputEntry}" entry...`, 'success');
  //
  // });

}
