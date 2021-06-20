import __SugarConfig from '@coffeekraken/s-sugar-config';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __fs from 'fs';

let recipe = 'default';
if (__fs.existsSync(`${__packageRootDir()}/sugar.json`)) {
  const sugarJson = require(`${__packageRootDir()}/sugar.json`);
  if (sugarJson.recipe) recipe = sugarJson.recipe;
}

export default {
  recipe,

  exclude: [],

  recipes: {
    default: {
      title: 'Default',
      description: 'Default s-frontstack recipe ',
      defaultStack: 'dev',
      stacks: {
        dev: {
          description: 'Start the development stack',
          actions: {
            frontendServer: '[config.frontstack.actions.frontendServer]',
            vite: '[config.frontstack.actions.vite]'
          }
        },
        build: {
          description: 'Build your final production ready dist package',
          actions: {}
        }
      }
    },
    riotjsComponent: {
      title: 'RiotJs component',
      description: 'RiotJs webcomponent recipe',
      defaultStack: 'dev',
      stacks: {
        dev: {
          description: 'Start the development stack',
          actions: {
            frontendServer: '[config.frontstack.actions.frontendServer]',
            vite: '[config.frontstack.actions.vite]'
            // docmap: '[config.frontstack.actions.docmap]'
          }
        }
      }
    }
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
    vite: {
      id: 'vite',
      title: 'Vite development stack',
      description: 'Allow to compile files easily',
      process: 'sugard vite',
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
      title: 'Docmap build action',
      description:
        'Allow to build and maintain up to date the docmap.json file',
      process: 'sugard docmap.build --noExtends',
      settings: {
        processManager: {
          restart: true
        }
      }
    }
  }
};
