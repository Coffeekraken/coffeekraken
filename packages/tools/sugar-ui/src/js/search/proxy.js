import __request from '@coffeekraken/sugar/js/http/request';
import __SWebComponent from '@coffeekraken/sugar/js/webcomponent/SWebComponent';

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
