


<!-- @namespace    sugar.js.socket -->

# ```js syncDom ```


Simply connect to a backend socket.io server and listen for specifics messages from it to refresh automatically the DOM.
The messages that are listened are:
- 'SSocketDom.html': Used to send some html to "inject/replace" in the current page HTML
- 'SSocketDom.script': Used to add a script tag to the page
- 'SSocketDom.style': Used to add a style tag to the page




### Author
- 



<!-- @namespace    sugar.js.class -->

# ```js emit ```


Emit an event with an object containing some values to pass to the server

## Parameters

- **event**  String: The event name that you want to emit to the server. It will be prefixed by 'SSocketDom.'

- **data** ([object Object]) Object: The data that you want to pass to the server with the event



## Example (js)

```js
myCoolSocketDomInstance.emit('coco', { hello: 'world' });
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



<!-- @namespace    sugar.js.class -->

# ```js registerEvent ```


Register a new event with an handler function that will handle the event content

## Parameters

- **event**  String: The event name that you want to listen from the server

- **handlerFn**  Function: The function that will handle the event content.



## Example (js)

```js
myCoolSocketDomInstance.registerEvent('hello', (data, settings) => {
   // do something with the event content and the settings
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js  ```






### Author
- 





# ```js  ```






### Author
- 



<!-- @namespace    sugar.js.class -->

# ```js settings.node ```


The root node where the html contents will be injected if no node is passed with the event



### Author
- 



<!-- @namespace    sugar.js class -->

# ```js settings.action ```


Specify which action will be executed if no one is passed with the event.
It can be one of these:
- 'append': Will append the HTML content to the existing one
- 'replace': Will replace the HTML content with the new one
- 'prepend': Will inject the HTML content before the existing one



### Author
- 



<!-- @namespace    sugar.js.class -->

# ```js settings.events ```


Save the events scoped settings objects



### Author
- 

