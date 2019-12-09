# groupByTimeout

<!-- @namespace: sugar.js.rxjs.groupByTimeout -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Group an rxjs observable by timeout


Return **{ Observable }** An rxjs observable

### Example
```js ^
	import { Observable } from 'rxjs';
require('@coffeekraken/js/util/sugar/rxjs/groupByTimeout');
const observable = new Observable(subscriber => {
   subscriber.groupByTimeout()
});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)