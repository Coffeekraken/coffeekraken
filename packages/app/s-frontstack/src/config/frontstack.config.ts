import __SugarConfig from '@coffeekraken/s-sugar-config';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __fs from 'fs';
import __path from 'path';

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
      templateDir: __path.resolve(`${__dirname}/../templates/default`),
      defaultStack: 'dev',
      stacks: {
        dev: {
          description: 'Start the development stack',
          actions: {
            frontendServer: '[config.frontstack.actions.frontendServer]',
            vite: '[config.frontstack.actions.vite]'
          }
        },
        prod: {
          description: 'Start the production testing stack',
          sharedParams: {
            env: 'production'
          },
          actions: {
            frontendServer: '[config.frontstack.actions.frontendServer]'
          }
        },
        build: {
          description: 'Build your final production ready dist package',
          actions: {
            postcssBuild: '[config.frontstack.actions.postcssBuild]',
            viteBuild: '[config.frontstack.actions.viteBuild]',
            docmapBuild: '[config.frontstack.actions.docmapBuild]'
          }
        }
      }
    },
    riotComponent: {
      title: 'RiotJs component',
      description: 'RiotJs webcomponent recipe',
      templateDir: __path.resolve(`${__dirname}/../templates/riotComponent`),
      defaultStack: 'dev',
      stacks: {
        dev: {
          description: 'Start the development stack',
          actions: {
            frontendServer: '[config.frontstack.actions.frontendServer]',
            vite: '[config.frontstack.actions.vite]'
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
    postcssBuild: {
      id: 'postcssBuild',
      title: 'PostCSS build action',
      description: 'Build css using the amazing PostCSS package',
      process: 'sugard postcss.build',
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    vite: {
      id: 'vite',
      title: 'Vite development stack',
      description: 'Allow to build files easily while developing',
      process: 'sugard vite',
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    viteBuild: {
      id: 'viteBuild',
      title: 'Vite build stack',
      description: 'Allow to compile javascript (js, ts, riot, react, etc...) files easily',
      process: 'sugard vite.build',
      settings: {
        processManager: {
          restart: true
        }
      }
    },
    docmapBuild: {
      id: 'docmapBuild',
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
