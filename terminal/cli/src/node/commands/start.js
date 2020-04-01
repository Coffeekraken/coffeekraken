const __SScreen = require('@coffeekraken/sugar/node/terminal/SScreen');
const __SRouter = require('@coffeekraken/sugar/node/terminal/SRouter');
const __parse = require('@coffeekraken/sugar/node/url/parse');

const __SCache = require('@coffeekraken/sugar/node/cache/SCache');

const __SBitbucketApi = require('@coffeekraken/sugar/node/api/SBitbucketApi');

module.exports = async function start() {

  const api = new __SBitbucketApi('cli');

  const response = api.get('repositories');

  console.log('re', response);


  // const router = new __SRouter({
  //   'list': {
  //     layout: `${__dirname}/../layouts/DefaultLayout`,
  //     url: 'list/{?client:string}/{?project:string}/{?action:string}',
  //     dataAdapter: `${__dirname}/../dataAdapters/list`,
  //     defaultParams: {
  //       client: null,
  //       project: null,
  //       action: null
  //     }
  //   },
  //   'project': {
  //     layout: `${__dirname}/../layouts/ProjectLayout`,
  //     url: 'project/{client:string}/{project:string}',
  //     // dataAdapter: `${__dirname}/../dataAdapters/list`,
  //   }
  // }, {
  //   default: {
  //     page: 'list'
  //   }
  // });

  // const screen = new __SScreen({
  //   router
  // });

  // setTimeout(() => {
  //   router.goto('project/JTI/ploom');
  // }, 2000);

};
