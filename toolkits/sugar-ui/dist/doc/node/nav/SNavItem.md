


<!-- @namespace    sugar.js.nav -->
<!-- @name    SNavItem -->

# ```js SNavItem ```
### Since: 2.0.0

This class represent a navigation item with some properties like the actions, the id, the text, etc...

## Parameters

- **id**  String: A uniqid for this nav item

- **text**  String: The text of the item

- **action**  String: THe action to do on click. Can be a one of these options:
- A standard link like "http://..."
- A mailto link like "mailto:olivier.bossel@gmail.com"
- A scroll link like "scroll:#something"
- Others options coming...
- **settings** ([object Object]) Object: A settings object to configure your nav tree



## Example (js)

```js
import SNavItem from '@coffeekraken/sugar/js/nav/SNavItem';
import SNavItem from '@coffeekraken/sugar/js/SNavItem';
const myNav = new SNav([
   new SNavItem('myCoolItem', 'Something cool', '#anchorLink')
]);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


