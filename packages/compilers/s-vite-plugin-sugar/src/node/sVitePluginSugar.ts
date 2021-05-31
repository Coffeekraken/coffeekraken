import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __SEnv from '@coffeekraken/s-env';

/**
 * @name            sVitePluginSugar
 * @namespace       node
 * @type            Function
 *
 * This plugin allows you to automate some things like injecting
 * environment variables in the js, etc...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sVitePluginSugar(settings: any = {}) {
  const jsReg = /\.(j|t)s(\?.*)?$/;
  let areEnvVarsInjected = false;
  let config;

  const packageRoot = __packageRoot();

  function _injectEnvVars(src, id) {
      if (areEnvVarsInjected) return src;
      areEnvVarsInjected = true;

      const envJson = JSON.stringify({
        // @ts-ignore
        ...__SEnv.env,
        ENVIRONMENT: config.isProduction ? 'production' : 'development'
      });

      const code = [
        `// sugar variables`,
        `if (!window.env) window.env = {SUGAR:{}};`,
        `window.env.SUGAR = JSON.parse('${envJson}');`
      ];

      return [code.join('\n'), src].join('\n');
    }

  return {
    name: 's-vite-plugin-sugar',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    transform(src, id) {
      if (jsReg.test(id)) {
      
        if (id.includes(packageRoot) && id.match(/\/index\.(t|j)s/)) {
          src = _injectEnvVars(src, id);
        }        

        return {
          code: src,
          map: null
        };
      }
    }
  };
}
