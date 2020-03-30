const __axios = require('axios').default;

module.exports = async function (params = {}) {

  const username = 'obossel';
  const password = 'Kb8ybwU5yBxMWwmx4Jfk'; // 
  const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
  const authHeaders = {
    headers: {
      'Authorization': `Basic ${token}`
    }
  };

  const res = await __axios.get('https://api.bitbucket.org/2.0/repositories/buzzbrothers', {
    params: {
      pagelen: 100
    },
    ...authHeaders
  });

  if (res.data.values) {
    // res.data.values.forEach(repo => {
    let cliFile = __axios.get(`https://api.bitbucket.org/2.0/teams/buzzbrothers/search/code?search_query=cli.config.js ext:js`, {
      ...authHeaders
    }).catch(error => {
      // handle error
      console.log(error);
    }).then(res => {
      // console.log(res.data.values[0].file.links);
      // loop on all the search results to get the files content
      if (res && res.data.values) {
        let filesQueries = [];
        res.data.values.forEach(file => {
          filesQueries.push(__axios.get(file.file.links.self.href, {
            ...authHeaders
          }).then(fileRes => {
            console.log(fileRes);
          }));
        });
        Promise.all(filesQueries).then(() => {
          console.log('END');
        });
      }

    });

    // });
    // Promise.all(requests).then(() => {
    //   console.log(cliFilesArray);
    // });
  }

  // console.log(res.data);

  return {};
}