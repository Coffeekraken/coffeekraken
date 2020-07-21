import __request from '@coffeekraken/sugar/js/http/request';

document.addEventListener('DOMContentLoaded', () => {
  const $searchInput = document.querySelector('input#search');

  $searchInput.on('input', (value) => {
    console.log('d', value);

    __request({
      url: `/search/${value}`,
      method: 'get'
    }).then((response) => {
      console.log('res', response);
      // do something...
    });
  });
});
