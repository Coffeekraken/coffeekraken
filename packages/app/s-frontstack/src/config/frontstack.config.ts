export default {
  receipes: {
    default: {
      title: 'Default',
      description: 'Default s-frontstack receipe ',
      actions: {
        js: '[config.frontstack.actions.js]',
        svelte: '[config.frontstack.actions.svelte]'
      }
    },

    react: {}
  },

  actions: {
    js: {
      id: 'js',
      title: 'Javascript compile action',
      description: 'Allow to compile .js and .ts files easily',
      process: 'sugar-dev js.compile -w',
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
    }
  }
};
