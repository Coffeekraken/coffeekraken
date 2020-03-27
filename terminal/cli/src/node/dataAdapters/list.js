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
    let cliFilesArray = [];
    const requests = [];
    res.data.values.forEach(repo => {
      let cliFile = __axios.get(`https://api.bitbucket.org/2.0/repositories/${repo.full_name}/src/develop/cli.config.js`, {
        ...authHeaders
      }).catch(error => {
        // handle error
        console.log(error);
      }).then(res => {
        console.log(res);
        if (res && res.data) {
          cliFilesArray.push(res.data);
        }
      });
      requests.push(cliFile);

    });
    Promise.all(requests).then(() => {
      console.log(cliFilesArray);
    });
  }

  // console.log(res.data);

  return {};
}