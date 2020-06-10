


<!-- @namespace    sugar.js.cache -->

# ```js SCache ```


Gives you the ability to manage cache through some defaults available adapters or using yours.
This cache class take care of these features:
- Standard and custom TTL by cache item
- Delete cache items on expires or not



## Example (js)

```js
import SCache from '@coffeekraken/sugar/js/cache/SCache';
const cache = new SCache({
 ttl: '10s' // 10 seconds
});
cache.set('myCoolCacheItem', someData);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


