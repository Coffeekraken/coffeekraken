import __sugarConfig from '@coffeekraken/s-sugar-config';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';

let receipe = 'default';
if (__fs.existsSync(`${__packageRoot()}/sugar.json`)) {
  const sugarJson = require(`${__packageRoot()}/sugar.json`);
  if (sugarJson.receipe) receipe = sugarJson.receipe;
}

export default {
  receipe,

  exclude: [],

  receipes: {
    default: {
      title: 'Default',
      description: 'Default s-frontstack receipe ',
      actions: {
        frontendServer: '[config.frontstack.actions.frontendServer]',
        css: '[config.frontstack.actions.css]',
        js: '[config.frontstack.actions.js]',
        ts: '[config.frontstack.actions.ts]',
        svelte: '[config.frontstack.actions.svelte]',
        docmap: '[config.frontstack.actions.docmap]'
      }
    },
    svelteComponent: {
      title: 'Svelte webcomponent',
      description: 'Svelte webcomponent receipe ',
      actions: {
        frontendServer: '[config.frontstack.actions.frontendServer]',
        // js: '[config.frontstack.actions.js]',
        jsBundle: '[config.frontstack.actions.jsBundle]',
        ts: '[config.frontstack.actions.ts]',
        svelte: '[config.frontstack.actions.svelte]'
        // docmap: '[config.frontstack.actions.docmap]'
      }
    },
    jsLib: {
      title: 'Javascript library',
      description: 'Javascript browser destinated library',
      actions: {
        // js: '[config.frontstack.actions.js]',
        ts: '[config.frontstack.actions.ts]'
        // docmap: '[config.frontstack.actions.docmap]'
      }
    },

    react: {}
  },

  actions: {
    frontendServer: {
      id: 'frontendServer',
      title: 'Frontend server',
      description:
        'Frontend server using the @coffeekraken/s-frontend-server package',
      process: 'sugard frontendServer.start',
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    css: {
      id: 'css',
      title: 'PostCSS compile action',
      description: 'Compile css using the amazing PostCSS package',
      process: 'sugard postcss.compile -w',
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    js: {
      id: 'js',
      title: 'Javascript compile action',
      description: 'Allow to compile .js files easily',
      process: 'sugard js.compile -w',
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    jsBundle: {
      id: 'jsBundle',
      title: 'Javascript bundle action',
      description: 'Allow to compile .js files easily into a bundle file',
      process: `sugard js.compile ${__sugarConfig('storage.distDir').replace(
        __sugarConfig('storage.rootDir') + '/',
        ''
      )}/js/index.js -b -w`,
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    ts: {
      id: 'ts',
      title: 'Typescript compile action',
      description: 'Allow to compile .ts files easily',
      process: 'sugard ts.compile -w',
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    svelte: {
      id: 'svelte',
      title: 'Svelte compile action',
      description: 'Allow to compile .svelte files easily',
      process: 'sugard svelte.compile -w',
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    docmap: {
      id: 'docmap',
      title: 'Docmap generation action',
      description:
        'Allow to generate and maintain up to date the docmap.json file',
      process: 'sugard docmap.generate --watch',
      settings: {
        processManager: {
          restart: true
        }
      }
    }
  }
};
