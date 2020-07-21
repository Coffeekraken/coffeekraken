


<!-- @namespace    sugar.js.config -->
<!-- @name    config -->

# ```js config ```


This class allows you to quickly access/update some configuration depending on the data adapters specified.
The base available data adapters are:
- For node:
- File system adapter: @coffeekraken/sugar/node/config/adapters/SConfigFsAdapter
- For js:
- Localstorage adapter: @coffeekraken/sugar/js/config/adapters/SConfigLsAdapter



## Example (js)

```js
import SConfig from '@coffeekraken/sugar/js/config/SConfig';
import SConfigLsAdapter from '@coffeekraken/sugar/js/config/adapters/SConfigLsAdapter';
const config = new SConfig({
  adapters: [
   new SConfigLsAdapter()
  ]
});
await config.get('log.frontend.mail.host'); // => gmail.google.com
await config.set('log.frontend.mail.host', 'mailchimp.com');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


