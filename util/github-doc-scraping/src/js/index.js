import SAjax from '@coffeekraken/sugar/js/class/SAjax';
import { Base64 } from 'js-base64';

export default class GithubDocScraping {

  /**
   * Repository name/path to scrap
   * @type 	{String}
   */
  repository = null;

  /**
   * @constructor
   * @type    Function
   *
   * Init an instance of the GithubDocScraping class
   *
   * @param       {String}      repository        The repository name/path to srap.
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    repository
  ) {
    // save the repository path
    this.repository = repository
  }

  /**
   * @name      getFileContent
   * @namespace     github-doc-scraping
   * @type    {Function}
   *
   * Make a call to github api to get the passed file path content
   *
   * @param       {String}      filePath          The file path to get the content of
   * @return      {Promise}                       A promise that will be resolved when the api call is finished
   *
   * @example     js
   * import GithubDocScraping from '@Coffeekraken/github-doc-scraping';
   * const scraping = new GithubDocScraping('coolUser/coolRepository');
   * scraping.getFileContent('my/cool/file/path').then(json => {
   *    // make something with the file content...
   * }, error => {
   *    // make something if the file is not found...
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getFileContent(filePath) {
    return new Promise((resolve, reject) => {
      const ajx = new SAjax({
  		    url : 'https://api.github.com/repos/' + this.repository + '/contents/' + filePath,
  		    method : 'GET'
      });
      ajx.send().then(json => {
        // console.log(json);

        const formatedJson = {
          url: json.url,
          content: Base64.decode(json.content)
        };

        resolve(formatedJson);
      }, error => {
        console.log(error);
        reject(error);
      });
    });
  }

  /**
   * @name      scrapByNamespace
   * @namespace     github-doc-scraping
   * @type    {Function}
   *
   * Make a call to github api to scrap the doc using the passed namespace
   *
   * @param       {String}      namespace         A namespace (dotted separed) to search in the markdown files of the setted repository
   * @return      {JSON}                          The JSON formated result of the github query
   *
   * @example     js
   * import GithubDocScraping from '@Coffeekraken/github-doc-scraping';
   * const scraping = new GithubDocScraping('coolUser/coolRepository');
   * scraping.scrapByNamespace('my.cool.namespace').then(json => {
   *    // make something with the result...
   * }, error => {
   *    // make something if the search does return nothing...
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  scrapByNamespace(namespace) {
    return new Promise((resolve, reject) => {
      const ajx = new SAjax({
  		    url : 'https://api.github.com/search/code?q=' + namespace + '+language:markdown+repo:' + this.repository,
  		    method : 'GET'
      });
      ajx.send().then(json => {
        console.log(json);

        // format the JSON
        const formatedJson = {
          count: json.total_count,
          items: []
        };

        // loop on each items to format them
        json.items.forEach(item => {
          // build the item
          const formatedItem = {
            url: item.url,
            name: item.name,

          };
          // append the new formated item in the formated JSON
          formatedJson.items.push(formatedItem);
        });

        resolve(formatedJson);
      }, error => {
        console.log(error);
        reject(error);
      });
    });
  }
}
