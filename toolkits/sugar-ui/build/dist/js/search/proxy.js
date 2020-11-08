import __request from '../../../web_modules/@coffeekraken/sugar/js/http/request.js';
import __SWebComponent from '../../../web_modules/@coffeekraken/sugar/js/webcomponent/SWebComponent.js';

__SWebComponent.on('s-filtrable-input.ready', ({ target, value }) => {
  target.on('input', (value) => {
    __request({
      url: `/search/${value}`,
      method: 'get'
    }).then((response) => {
      // set the items in the search dropdown
      const items = response.data.map((item) => {
        return {
          title: item.title,
          description: item.description
        };
      });

      target.prop('items', items);

      console.log(items);

      // do something...
    });
  });
});
