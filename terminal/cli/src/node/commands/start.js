const __SScreen = require('@coffeekraken/sugar/node/terminal/SScreen');
const __SRouter = require('@coffeekraken/sugar/node/terminal/SRouter');
const __parse = require('@coffeekraken/sugar/node/url/parse');

module.exports = function start() {

  const router = new __SRouter({
    'list': {
      layout: `${__dirname}/../layouts/DefaultLayout`,
      url: 'list/{?client:string}/{?project:string}/{?action:string}',
      dataAdapter: `${__dirname}/../dataAdapters/list`,
      defaultParams: {
        client: null,
        project: null,
        action: null
      }
    },
    'project': {
      layout: `${__dirname}/../layouts/ProjectLayout`,
      url: 'project/{client:string}/{project:string}',
      // dataAdapter: `${__dirname}/../dataAdapters/list`,
    }
  }, {
    default: {
      page: 'list'
    }
  });

  const screen = new __SScreen({
    router
  });

  // setTimeout(() => {
  //   router.goto('project/JTI/ploom');
  // }, 2000);

};
