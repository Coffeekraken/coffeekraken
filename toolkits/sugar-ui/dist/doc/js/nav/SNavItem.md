


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



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toMarkdown -->

# ```js toMarkdown ```


This method transform the navigation item to a markdown string

## Parameters

- **settings** (settings.markdown) Object: An object of settings to use for the conversion. Here's are the available settings:
- ordered (false) {Boolean}: Specify if you want an ordered list




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toHtml -->

# ```js toHtml ```


This method transform the navigation item to an HTML string

## Parameters

- **settings** (settings.html) Object: An object of settings to use for the conversion. Here's are the available settings:
- ordered (false) {Boolean}: Specify if you want an ordered list




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _settings -->

# ```js _settings ```


Store the settings object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _id -->

# ```js _id ```


Store the id of the nav item



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _text -->

# ```js _text ```


Store the text of the nav item



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _action -->

# ```js _action ```


Store the action of the nav item



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _sNav -->

# ```js _sNav ```


Store the SNav instance in which has been added this nav item



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    id -->

# get ```js id ```


Access the navigation item id



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    index -->

# get ```js index ```


Access the navigation item index in the navigation.
Return -1 if not in a navigation



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    text -->

# get ```js text ```


Access the navigation item text



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    action -->

# get ```js action ```


Access the navigation item action



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    target -->

# get ```js target ```


Access the navigation item target



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

