import GithubDocScraping from '../../../dist/js/index';

const scraping = new GithubDocScraping('Coffeekraken/coffeekraken');
// scraping.scrapByNamespace('sugar.util').then(json => {
//   console.log('json');
//   console.log(json);
// }, error => {
//   console.log('error');
//   console.log(error);
// });

scraping.getFileContent("utils/sugar/README.md").then(json => {
  console.log('json');
  console.log(json);
}, error => {
  console.log('error');
  console.log(error);
});
