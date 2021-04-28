export default {
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

    react: {}
  },

  actions: {
    frontendServer: {
      id: 'frontendServer',
      title: 'Frontend server',
      description:
        'Frontend server using the @coffeekraken/s-frontend-server package',
      process: 'sugar-dev frontendServer.start',
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
      process: 'sugar-dev postcss.compile -w',
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
      process: 'sugar-dev js.compile -w',
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
      process: 'sugar-dev ts.compile -w',
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
      process: 'sugar-dev svelte.compile -w',
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
      process: 'sugar-dev docmap.generate --watch',
      settings: {
        processManager: {
          restart: true
        }
      }
    }
  }
};
